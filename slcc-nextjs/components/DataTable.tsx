import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react'

interface Column {
  key: string
  label: string
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode
}

interface DataTableProps {
  columns: Column[]
  data: Record<string, unknown>[]
  loading?: boolean
  error?: string | null
  page?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  onRefresh?: () => void
  emptyMessage?: string
}

export default function DataTable({
  columns, data, loading, error, page = 1,
  totalPages = 1, onPageChange, onRefresh, emptyMessage = 'No records found'
}: DataTableProps) {

  if (loading) return (
    <div className="flex items-center justify-center h-48 text-slate-500">
      <RefreshCw size={20} className="animate-spin mr-2" />
      Loading data from Supabase…
    </div>
  )

  if (error) return (
    <div className="rounded-xl bg-red-900/20 border border-red-800/50 p-6 text-red-400 text-sm">
      <p className="font-semibold mb-1">Error loading data</p>
      <p className="font-mono text-xs">{error}</p>
    </div>
  )

  return (
    <div>
      {/* Table */}
      <div className="rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full data-table">
            <thead className="bg-slate-900/80 border-b border-slate-800">
              <tr>
                {columns.map(col => (
                  <th key={col.key}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 bg-slate-900/40">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center text-slate-600 py-12">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                    {columns.map(col => (
                      <td key={col.key}>
                        {col.render
                          ? col.render(row[col.key], row)
                          : String(row[col.key] ?? '—')}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          <RefreshCw size={13} /> Refresh
        </button>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => onPageChange?.(page - 1)}
              className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="text-xs text-slate-500">
              Page {page} / {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => onPageChange?.(page + 1)}
              className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
