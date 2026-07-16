import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

export interface FormField {
  key: string
  label: string
  type?: 'text' | 'textarea' | 'number' | 'date' | 'datetime-local' | 'select' | 'checkbox' | 'json' | 'lookup'
  options?: string[]       // for type: 'select'
  required?: boolean
  placeholder?: string
  // for type: 'lookup' — lets the user type a readable code (e.g. member_no "F0003")
  // and resolves it to the actual UUID foreign key before insert.
  lookupTable?: string       // table to search, e.g. TABLES.MEMBERS
  lookupBy?: string          // readable column to match on, e.g. 'member_no'
  lookupValueKey?: string    // column to store instead (defaults to 'id')
  // when editing, the key in the row for the embedded/joined relation (must match
  // the alias used in GenericTablePage's selectQuery), used to show the readable
  // code instead of the raw UUID, e.g. 'slcc_members'
  lookupJoinKey?: string
}

// Builds the modal's initial form state from an existing row when editing.
// Converts stored values into the shapes each field type's input expects,
// and resolves lookup fields back to their readable code via the joined relation.
export function buildEditValues(fields: FormField[], row: Record<string, unknown>): Record<string, unknown> {
  const values: Record<string, unknown> = {}
  for (const f of fields) {
    if (f.type === 'lookup' && f.lookupJoinKey) {
      const joined = row[f.lookupJoinKey] as Record<string, unknown> | null
      values[f.key] = joined && f.lookupBy ? (joined[f.lookupBy] ?? '') : ''
      continue
    }
    const raw = row[f.key]
    if (raw === null || raw === undefined) {
      values[f.key] = f.type === 'checkbox' ? false : ''
      continue
    }
    if (f.type === 'json') { values[f.key] = JSON.stringify(raw, null, 2); continue }
    if (f.type === 'date') { values[f.key] = String(raw).slice(0, 10); continue }
    if (f.type === 'datetime-local') { values[f.key] = String(raw).slice(0, 16); continue }
    if (f.type === 'checkbox') { values[f.key] = Boolean(raw); continue }
    values[f.key] = raw
  }
  return values
}

interface AddRecordModalProps {
  title: string
  tableName: string
  fields: FormField[]
  onClose: () => void
  onSuccess: () => void
  mode?: 'add' | 'edit'
  initialValues?: Record<string, unknown>
  recordId?: unknown
  idColumn?: string
}

export default function AddRecordModal({
  title, tableName, fields, onClose, onSuccess,
  mode = 'add', initialValues, recordId, idColumn = 'id',
}: AddRecordModalProps) {
  const [values, setValues] = useState<Record<string, unknown>>(() => initialValues ?? {})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setField = (key: string, val: unknown) => {
    setValues(prev => ({ ...prev, [key]: val }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    // Strip empty-string values so optional fields insert as null, not ''
    const payload: Record<string, unknown> = {}
    for (const f of fields) {
      const v = values[f.key]
      if (v === undefined || v === '') continue

      if (f.type === 'json') {
        try {
          payload[f.key] = JSON.parse(String(v))
        } catch {
          setError(`"${f.label}" must be valid JSON, e.g. {"key": "value"}`)
          setSaving(false)
          return
        }
        continue
      }

      if (f.type === 'lookup' && f.lookupTable && f.lookupBy) {
        const valueKey = f.lookupValueKey ?? 'id'
        const { data: match, error: lookupErr } = await supabase
          .from(f.lookupTable)
          .select(valueKey)
          .eq(f.lookupBy, String(v).trim())
          .maybeSingle()

        if (lookupErr) {
          setError(`Lookup failed for "${f.label}": ${lookupErr.message}`)
          setSaving(false)
          return
        }
        if (!match) {
          setError(`No match found for "${f.label}" = "${v}". Check the code and try again.`)
          setSaving(false)
          return
        }
        payload[f.key] = (match as unknown as Record<string, unknown>)[valueKey]
        continue
      }

      payload[f.key] = v
    }

    const { error: err } = mode === 'edit'
      ? await supabase.from(tableName).update(payload).eq(idColumn, recordId as string)
      : await supabase.from(tableName).insert(payload)

    if (err) {
      setError(err.message)
      setSaving(false)
      return
    }

    setSaving(false)
    onSuccess()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
          <h2 className="text-base font-semibold text-white">{mode === 'edit' ? 'Edit' : 'Add'} {title}</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          {error && (
            <div className="rounded-lg bg-red-900/20 border border-red-800/50 px-4 py-3 text-red-400 text-xs font-mono">
              {error}
            </div>
          )}

          {fields.map(f => (
            <div key={f.key} className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400">
                {f.label}{f.required && <span className="text-red-400 ml-0.5">*</span>}
              </label>

              {f.type === 'textarea' || f.type === 'json' ? (
                <textarea
                  required={f.required}
                  placeholder={f.placeholder}
                  rows={3}
                  className="form-input"
                  value={String(values[f.key] ?? '')}
                  onChange={e => setField(f.key, e.target.value)}
                />
              ) : f.type === 'select' ? (
                <select
                  required={f.required}
                  className="form-input"
                  value={String(values[f.key] ?? '')}
                  onChange={e => setField(f.key, e.target.value)}
                >
                  <option value="">Select…</option>
                  {f.options?.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : f.type === 'lookup' ? (
                <input
                  type="text"
                  required={f.required}
                  placeholder={f.placeholder}
                  className="form-input"
                  value={String(values[f.key] ?? '')}
                  onChange={e => setField(f.key, e.target.value)}
                />
              ) : f.type === 'checkbox' ? (
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500/50"
                  checked={Boolean(values[f.key])}
                  onChange={e => setField(f.key, e.target.checked)}
                />
              ) : (
                <input
                  type={f.type ?? 'text'}
                  required={f.required}
                  placeholder={f.placeholder}
                  step={f.type === 'number' ? 'any' : undefined}
                  className="form-input"
                  value={String(values[f.key] ?? '')}
                  onChange={e => setField(
                    f.key,
                    f.type === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value
                  )}
                />
              )}
            </div>
          ))}

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              {saving ? 'Saving…' : (mode === 'edit' ? 'Save Changes' : 'Save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
