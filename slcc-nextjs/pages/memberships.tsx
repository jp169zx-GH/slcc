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
      fields={[
        { key: 'member_id', label: 'Member ID (UUID)', required: true, placeholder: 'Paste member id from Members tab' },
        { key: 'plan_id',   label: 'Plan ID (UUID)',   placeholder: 'Paste plan id from Membership Plans tab' },
        { key: 'start_date',label: 'Start Date', type: 'date', required: true },
        { key: 'end_date',  label: 'End Date',   type: 'date' },
        { key: 'status',    label: 'Status', type: 'select', options: ['active', 'expired', 'pending'] },
        { key: 'fee_paid',  label: 'Fee Paid', type: 'number' },
      ]}
    />
  )
}
