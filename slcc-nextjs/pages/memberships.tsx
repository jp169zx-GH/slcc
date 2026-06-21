import { GenericTablePage } from '../components/GenericTablePage'
import { TABLES } from '../lib/supabase'

const statusBadge = (v: unknown) => {
  const s = String(v || '')
  const cls = s === 'active' ? 'badge-active' : s === 'expired' ? 'badge-inactive' : 'badge-pending'
  return <span className={`badge ${cls}`}>{s}</span>
}

export default function MembershipsPage() {
  return (
    <GenericTablePage
      title="Memberships"
      tableName={TABLES.MEMBERSHIPS}
      subtitle="slcc_memberships — Member subscription records"
      orderBy="start_date"
      columns={[
        { key: 'id',          label: 'ID',         render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        { key: 'member_id',   label: 'Member ID',  render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        { key: 'plan_id',     label: 'Plan ID',    render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        { key: 'start_date',  label: 'Start' },
        { key: 'end_date',    label: 'End' },
        { key: 'status',      label: 'Status',     render: statusBadge },
        { key: 'fee_paid',    label: 'Fee Paid',   render: v => v ? `NT$ ${Number(v).toLocaleString()}` : '—' },
        { key: 'created_at',  label: 'Created',    render: v => v ? new Date(String(v)).toLocaleDateString() : '—' },
      ]}
    />
  )
}
