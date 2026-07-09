import { GenericTablePage } from '../components/GenericTablePage'
import { TABLES } from '../lib/supabase'

export default function MembersPage() {
  return (
    <GenericTablePage
      title="Members"
      tableName={TABLES.MEMBERS}
      subtitle="slcc_members — All registered senior living community members"
      orderBy="created_at"
      columns={[
        { key: 'id',            label: 'ID',            render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        { key: 'member_no',     label: 'Member No.' },
        { key: 'name_zh',       label: '姓名' },
        { key: 'name_en',       label: 'Name (EN)' },
        { key: 'gender',        label: 'Gender' },
        { key: 'date_of_birth', label: 'DOB' },
        { key: 'phone',         label: 'Phone' },
        { key: 'email',         label: 'Email' },
        { key: 'nationality',   label: 'Nationality' },
        {
          key: 'status', label: 'Status',
          render: v => {
            const s = String(v || '')
            const cls = s === 'active' ? 'badge-active' : s === 'inactive' ? 'badge-inactive' : 'badge-pending'
            return <span className={`badge ${cls}`}>{s}</span>
          }
        },
        { key: 'created_at', label: 'Created', render: v => v ? new Date(String(v)).toLocaleDateString() : '—' },
      ]}
      fields={[
        { key: 'member_no',     label: 'Member No.',  required: true, placeholder: 'M-0001' },
        { key: 'name_zh',       label: '姓名',        required: true },
        { key: 'name_en',       label: 'Name (EN)',   required: true },
        { key: 'gender',        label: 'Gender',      type: 'select', options: ['male', 'female', 'other'] },
        { key: 'date_of_birth', label: 'Date of Birth', type: 'date' },
        { key: 'phone',         label: 'Phone' },
        { key: 'email',         label: 'Email' },
        { key: 'nationality',   label: 'Nationality' },
        { key: 'status',        label: 'Status', type: 'select', options: ['active', 'inactive', 'pending', 'suspended', 'deceased'] },
        { key: 'care_level',    label: 'Care Level', type: 'select', options: ['independent', 'assisted', 'memory_care', 'skilled_nursing'] },
      ]}
    />
  )
}
