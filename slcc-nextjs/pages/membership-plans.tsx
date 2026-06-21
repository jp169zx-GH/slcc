import { GenericTablePage } from '../components/GenericTablePage'
import { TABLES } from '../lib/supabase'

export default function MembershipPlansPage() {
  return (
    <GenericTablePage
      title="Membership Plans"
      tableName={TABLES.MEMBERSHIP_PLANS}
      subtitle="slcc_membership_plans — Available plan tiers and pricing"
      orderBy="created_at"
      columns={[
        { key: 'id',            label: 'ID',          render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        { key: 'plan_code',     label: 'Plan Code' },
        { key: 'plan_name_zh',  label: '方案名稱' },
        { key: 'plan_name_en',  label: 'Plan Name' },
        { key: 'tier',          label: 'Tier' },
        { key: 'monthly_fee',   label: 'Monthly Fee', render: v => v ? `NT$ ${Number(v).toLocaleString()}` : '—' },
        { key: 'annual_fee',    label: 'Annual Fee',  render: v => v ? `NT$ ${Number(v).toLocaleString()}` : '—' },
        { key: 'is_active',     label: 'Active',      render: v => <span className={`badge ${v ? 'badge-active' : 'badge-inactive'}`}>{v ? 'Yes' : 'No'}</span> },
      ]}
    />
  )
}
