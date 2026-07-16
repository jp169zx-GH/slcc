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
      selectQuery="*, slcc_members(member_no, name_en), slcc_membership_plans(plan_code)"
      columns={[
        { key: 'id',          label: 'ID',         render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        {
          key: 'member_id', label: 'Member No.',
          render: (_v, row) => {
            const m = row.slcc_members as { member_no?: string; name_en?: string } | null
            return m ? <span>{m.member_no}{m.name_en ? ` — ${m.name_en}` : ''}</span> : <span className="text-slate-600">—</span>
          },
        },
        {
          key: 'plan_id', label: 'Plan Code',
          render: (_v, row) => {
            const p = row.slcc_membership_plans as { plan_code?: string } | null
            return p ? <span>{p.plan_code}</span> : <span className="text-slate-600">—</span>
          },
        },
        { key: 'start_date',  label: 'Start' },
        { key: 'end_date',    label: 'End' },
        { key: 'status',      label: 'Status',     render: statusBadge },
        { key: 'fee_paid',    label: 'Fee Paid',   render: v => v ? `NT$ ${Number(v).toLocaleString()}` : '—' },
        { key: 'created_at',  label: 'Created',    render: v => v ? new Date(String(v)).toLocaleDateString() : '—' },
      ]}
      fields={[
        {
          key: 'member_id', label: 'Member No.', required: true,
          type: 'lookup', lookupTable: TABLES.MEMBERS, lookupBy: 'member_no', lookupJoinKey: 'slcc_members',
          placeholder: 'F0003',
        },
        {
          key: 'plan_id', label: 'Plan Code',
          type: 'lookup', lookupTable: TABLES.MEMBERSHIP_PLANS, lookupBy: 'plan_code', lookupJoinKey: 'slcc_membership_plans',
          placeholder: 'PLN-GOLD',
        },
        { key: 'start_date',label: 'Start Date', type: 'date', required: true },
        { key: 'end_date',  label: 'End Date',   type: 'date' },
        { key: 'status',    label: 'Status', type: 'select', options: ['active', 'expired', 'pending'] },
        { key: 'fee_paid',  label: 'Fee Paid', type: 'number' },
      ]}
    />
  )
}
