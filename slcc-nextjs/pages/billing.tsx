import { GenericTablePage } from '../components/GenericTablePage'
import { TABLES } from '../lib/supabase'

const statusBadge = (v: unknown) => {
  const s = String(v || '')
  const cls = s === 'paid' ? 'badge-active' : s === 'overdue' ? 'badge-critical' : 'badge-pending'
  return <span className={`badge ${cls}`}>{s}</span>
}

export default function BillingPage() {
  return (
    <GenericTablePage
      title="Billing"
      tableName={TABLES.BILLING}
      subtitle="slcc_billing — Invoices and payment records"
      orderBy="issued_at"
      selectQuery="*, slcc_members(member_no, name_en)"
      columns={[
        { key: 'id',            label: 'ID',          render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        { key: 'invoice_no',    label: 'Invoice No.' },
        {
          key: 'member_id', label: 'Member',
          render: (_v, row) => {
            const m = row.slcc_members as { member_no?: string; name_en?: string } | null
            return m ? <span>{m.member_no}{m.name_en ? ` — ${m.name_en}` : ''}</span> : <span className="text-slate-600">—</span>
          },
        },
        { key: 'amount',        label: 'Amount',      render: v => v ? `NT$ ${Number(v).toLocaleString()}` : '—' },
        { key: 'currency',      label: 'Currency' },
        { key: 'status',        label: 'Status',      render: statusBadge },
        { key: 'issued_at',     label: 'Issued',      render: v => v ? new Date(String(v)).toLocaleDateString() : '—' },
        { key: 'due_date',      label: 'Due',         render: v => v ? new Date(String(v)).toLocaleDateString() : '—' },
        { key: 'paid_at',       label: 'Paid',        render: v => v ? new Date(String(v)).toLocaleDateString() : '—' },
      ]}
      fields={[
        {
          key: 'member_id', label: 'Member No.', required: true,
          type: 'lookup', lookupTable: TABLES.MEMBERS, lookupBy: 'member_no',
          placeholder: 'F0003',
        },
        { key: 'invoice_no', label: 'Invoice No.', required: true, placeholder: 'INV-0001' },
        { key: 'amount',     label: 'Amount', type: 'number', required: true },
        { key: 'currency',   label: 'Currency', placeholder: 'TWD' },
        { key: 'status',     label: 'Status', type: 'select', options: ['paid', 'pending', 'overdue'] },
        { key: 'issued_at',  label: 'Issued At', type: 'datetime-local' },
        { key: 'due_date',   label: 'Due Date', type: 'date' },
        { key: 'paid_at',    label: 'Paid At', type: 'datetime-local' },
      ]}
    />
  )
}
