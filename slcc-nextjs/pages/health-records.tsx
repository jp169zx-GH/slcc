import { GenericTablePage } from '../components/GenericTablePage'
import { TABLES } from '../lib/supabase'

export default function HealthRecordsPage() {
  return (
    <GenericTablePage
      title="Health Records"
      tableName={TABLES.HEALTH_RECORDS}
      subtitle="slcc_health_records — Member medical and health data"
      orderBy="recorded_at"
      columns={[
        { key: 'id',          label: 'ID',          render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        { key: 'member_id',   label: 'Member ID',   render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        { key: 'record_type', label: 'Type' },
        { key: 'diagnosis',   label: 'Diagnosis' },
        { key: 'blood_type',  label: 'Blood Type' },
        { key: 'allergies',   label: 'Allergies' },
        { key: 'recorded_by', label: 'Recorded By' },
        { key: 'recorded_at', label: 'Date',        render: v => v ? new Date(String(v)).toLocaleDateString() : '—' },
      ]}
    />
  )
}
