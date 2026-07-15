import { GenericTablePage } from '../components/GenericTablePage'
import { TABLES } from '../lib/supabase'

export default function HealthRecordsPage() {
  return (
    <GenericTablePage
      title="Health Records"
      tableName={TABLES.HEALTH_RECORDS}
      subtitle="slcc_health_records — Member medical and health data"
      orderBy="recorded_at"
      selectQuery="*, slcc_members(member_no, name_en), slcc_staff(employee_no, full_name)"
      columns={[
        { key: 'id',          label: 'ID',          render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        {
          key: 'member_id', label: 'Member No.',
          render: (_v, row) => {
            const m = row.slcc_members as { member_no?: string; name_en?: string } | null
            return m ? <span>{m.member_no}{m.name_en ? ` — ${m.name_en}` : ''}</span> : <span className="text-slate-600">—</span>
          },
        },
        { key: 'record_type', label: 'Type' },
        { key: 'diagnosis',   label: 'Diagnosis' },
        { key: 'blood_type',  label: 'Blood Type' },
        { key: 'allergies',   label: 'Allergies' },
        {
          key: 'recorded_by', label: 'Recorded By',
          render: (_v, row) => {
            const s = row.slcc_staff as { employee_no?: string; full_name?: string } | null
            return s ? <span>{s.employee_no}{s.full_name ? ` — ${s.full_name}` : ''}</span> : <span className="text-slate-600">—</span>
          },
        },
        { key: 'recorded_at', label: 'Date',        render: v => v ? new Date(String(v)).toLocaleDateString() : '—' },
      ]}
      fields={[
        {
          key: 'member_id', label: 'Member No.', required: true,
          type: 'lookup', lookupTable: TABLES.MEMBERS, lookupBy: 'member_no',
          placeholder: 'F0003',
        },
        { key: 'record_type', label: 'Type' },
        { key: 'diagnosis',   label: 'Diagnosis', type: 'textarea' },
        { key: 'blood_type',  label: 'Blood Type', placeholder: 'e.g. O+' },
        { key: 'allergies',   label: 'Allergies', type: 'textarea' },
        {
          key: 'recorded_by', label: 'Recorded By (Employee No.)',
          type: 'lookup', lookupTable: TABLES.STAFF, lookupBy: 'employee_no',
          placeholder: 'E0001',
        },
        { key: 'recorded_at', label: 'Recorded At', type: 'datetime-local' },
      ]}
    />
  )
}
