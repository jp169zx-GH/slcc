import { GenericTablePage } from '../components/GenericTablePage'
import { TABLES } from '../lib/supabase'

const statusBadge = (v: unknown) => {
  const s = String(v || '')
  const cls = s === 'confirmed' ? 'badge-active' : s === 'cancelled' ? 'badge-inactive' : 'badge-pending'
  return <span className={`badge ${cls}`}>{s}</span>
}

export default function CareBookingsPage() {
  return (
    <GenericTablePage
      title="Care Bookings"
      tableName={TABLES.CARE_BOOKINGS}
      subtitle="slcc_care_bookings — Scheduled care appointments"
      orderBy="scheduled_at"
      columns={[
        { key: 'id',            label: 'ID',        render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        { key: 'member_id',     label: 'Member',    render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        { key: 'service_id',    label: 'Service',   render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        { key: 'staff_id',      label: 'Staff',     render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        { key: 'scheduled_at',  label: 'Scheduled', render: v => v ? new Date(String(v)).toLocaleString() : '—' },
        { key: 'status',        label: 'Status',    render: statusBadge },
        { key: 'notes',         label: 'Notes',     render: v => v ? String(v).slice(0, 40) + (String(v).length > 40 ? '…' : '') : '—' },
      ]}
      fields={[
        { key: 'member_id',    label: 'Member ID (UUID)', required: true, placeholder: 'Paste member id from Members tab' },
        { key: 'service_id',   label: 'Service ID (UUID)', placeholder: 'Paste service id from Care Services tab' },
        { key: 'staff_id',     label: 'Staff ID (UUID)', placeholder: 'Paste staff id from Staff tab' },
        { key: 'scheduled_at', label: 'Scheduled At', type: 'datetime-local', required: true },
        { key: 'status',       label: 'Status', type: 'select', options: ['confirmed', 'pending', 'cancelled'] },
        { key: 'notes',        label: 'Notes', type: 'textarea' },
      ]}
    />
  )
}
