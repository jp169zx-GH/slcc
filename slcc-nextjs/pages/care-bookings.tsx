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
      selectQuery="*, slcc_members(member_no, name_en), slcc_care_services(service_code, service_name_en), slcc_staff(employee_no, full_name)"
      columns={[
        { key: 'id',            label: 'ID',        render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        {
          key: 'member_id', label: 'Member',
          render: (_v, row) => {
            const m = row.slcc_members as { member_no?: string; name_en?: string } | null
            return m ? <span>{m.member_no}{m.name_en ? ` — ${m.name_en}` : ''}</span> : <span className="text-slate-600">—</span>
          },
        },
        {
          key: 'service_id', label: 'Service',
          render: (_v, row) => {
            const s = row.slcc_care_services as { service_code?: string; service_name_en?: string } | null
            return s ? <span>{s.service_code}{s.service_name_en ? ` — ${s.service_name_en}` : ''}</span> : <span className="text-slate-600">—</span>
          },
        },
        {
          key: 'staff_id', label: 'Staff',
          render: (_v, row) => {
            const s = row.slcc_staff as { employee_no?: string; full_name?: string } | null
            return s ? <span>{s.employee_no}{s.full_name ? ` — ${s.full_name}` : ''}</span> : <span className="text-slate-600">—</span>
          },
        },
        { key: 'scheduled_at',  label: 'Scheduled', render: v => v ? new Date(String(v)).toLocaleString() : '—' },
        { key: 'status',        label: 'Status',    render: statusBadge },
        { key: 'notes',         label: 'Notes',     render: v => v ? String(v).slice(0, 40) + (String(v).length > 40 ? '…' : '') : '—' },
      ]}
      fields={[
        {
          key: 'member_id', label: 'Member No.', required: true,
          type: 'lookup', lookupTable: TABLES.MEMBERS, lookupBy: 'member_no', lookupJoinKey: 'slcc_members',
          placeholder: 'F0003',
        },
        {
          key: 'service_id', label: 'Service Code',
          type: 'lookup', lookupTable: TABLES.CARE_SERVICES, lookupBy: 'service_code', lookupJoinKey: 'slcc_care_services',
          placeholder: 'SVC-001',
        },
        {
          key: 'staff_id', label: 'Employee No.',
          type: 'lookup', lookupTable: TABLES.STAFF, lookupBy: 'employee_no', lookupJoinKey: 'slcc_staff',
          placeholder: 'E-0001',
        },
        { key: 'scheduled_at', label: 'Scheduled At', type: 'datetime-local', required: true },
        { key: 'status',       label: 'Status', type: 'select', options: ['confirmed', 'pending', 'cancelled'] },
        { key: 'notes',        label: 'Notes', type: 'textarea' },
      ]}
    />
  )
}
