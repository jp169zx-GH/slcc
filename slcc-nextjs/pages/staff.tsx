import { GenericTablePage } from '../components/GenericTablePage'
import { TABLES } from '../lib/supabase'

export default function StaffPage() {
  return (
    <GenericTablePage
      title="Staff"
      tableName={TABLES.STAFF}
      subtitle="slcc_staff — Care center personnel"
      orderBy="created_at"
      columns={[
        { key: 'id',          label: 'ID',       render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        { key: 'staff_no',    label: 'Staff No.' },
        { key: 'name_zh',     label: '姓名' },
        { key: 'name_en',     label: 'Name (EN)' },
        { key: 'role',        label: 'Role' },
        { key: 'department',  label: 'Dept' },
        { key: 'license_no',  label: 'License No.' },
        { key: 'phone',       label: 'Phone' },
        { key: 'status',      label: 'Status',   render: v => <span className={`badge ${v === 'active' ? 'badge-active' : 'badge-inactive'}`}>{String(v)}</span> },
      ]}
      fields={[
        { key: 'staff_no',    label: 'Staff No.', required: true, placeholder: 'S-0001' },
        { key: 'name_zh',     label: '姓名', required: true },
        { key: 'name_en',     label: 'Name (EN)', required: true },
        { key: 'role',        label: 'Role', placeholder: 'e.g. nurse, caregiver, administrator' },
        { key: 'department',  label: 'Department' },
        { key: 'license_no',  label: 'License No.' },
        { key: 'phone',       label: 'Phone' },
        { key: 'status',      label: 'Status', type: 'select', options: ['active', 'inactive'] },
      ]}
    />
  )
}
