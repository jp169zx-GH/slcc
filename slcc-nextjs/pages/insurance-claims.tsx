import { GenericTablePage } from '../components/GenericTablePage'
import { TABLES } from '../lib/supabase'

const statusBadge = (v: unknown) => {
  const s = String(v || '')
  const cls = s === 'approved' ? 'badge-active' : s === 'rejected' ? 'badge-critical' : 'badge-pending'
  return <span className={`badge ${cls}`}>{s}</span>
}

export default function InsuranceClaimsPage() {
  return (
    <GenericTablePage
      title="Insurance Claims"
      tableName={TABLES.INSURANCE_CLAIMS}
      subtitle="slcc_insurance_claims — NHI and private insurance submissions"
      orderBy="submitted_at"
      columns={[
        { key: 'id',            label: 'ID',        render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        { key: 'claim_no',      label: 'Claim No.' },
        { key: 'member_id',     label: 'Member',    render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        { key: 'insurer',       label: 'Insurer' },
        { key: 'claim_type',    label: 'Type' },
        { key: 'amount',        label: 'Amount',    render: v => v ? `NT$ ${Number(v).toLocaleString()}` : '—' },
        { key: 'status',        label: 'Status',    render: statusBadge },
        { key: 'submitted_at',  label: 'Submitted', render: v => v ? new Date(String(v)).toLocaleDateString() : '—' },
        { key: 'settled_at',    label: 'Settled',   render: v => v ? new Date(String(v)).toLocaleDateString() : '—' },
      ]}
      fields={[
        { key: 'member_id',    label: 'Member ID (UUID)', required: true, placeholder: 'Paste member id from Members tab' },
        { key: 'claim_no',     label: 'Claim No.', required: true, placeholder: 'CLM-0001' },
        { key: 'insurer',      label: 'Insurer' },
        { key: 'claim_type',   label: 'Claim Type', placeholder: 'e.g. NHI, private' },
        { key: 'amount',       label: 'Amount', type: 'number', required: true },
        { key: 'status',       label: 'Status', type: 'select', options: ['approved', 'pending', 'rejected'] },
        { key: 'submitted_at', label: 'Submitted At', type: 'datetime-local' },
        { key: 'settled_at',   label: 'Settled At', type: 'datetime-local' },
      ]}
    />
  )
}
