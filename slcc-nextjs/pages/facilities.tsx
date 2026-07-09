import { GenericTablePage } from '../components/GenericTablePage'
import { TABLES } from '../lib/supabase'

export default function FacilitiesPage() {
  return (
    <GenericTablePage
      title="Facilities"
      tableName={TABLES.FACILITIES}
      subtitle="slcc_facilities — Rooms, suites, and amenities"
      orderBy="created_at"
      columns={[
        { key: 'id',              label: 'ID',          render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        { key: 'facility_code',   label: 'Code' },
        { key: 'name_zh',         label: '設施名稱' },
        { key: 'name_en',         label: 'Facility Name' },
        { key: 'facility_type',   label: 'Type' },
        { key: 'floor',           label: 'Floor' },
        { key: 'capacity',        label: 'Capacity' },
        { key: 'status',          label: 'Status',     render: v => {
          const s = String(v || '')
          const cls = s === 'available' ? 'badge-active' : s === 'occupied' ? 'badge-pending' : 'badge-inactive'
          return <span className={`badge ${cls}`}>{s}</span>
        }},
      ]}
      fields={[
        { key: 'facility_code', label: 'Facility Code', required: true, placeholder: 'FAC-001' },
        { key: 'name_zh',       label: '設施名稱', required: true },
        { key: 'name_en',       label: 'Facility Name', required: true },
        { key: 'facility_type', label: 'Type', placeholder: 'e.g. suite, common-room, clinic' },
        { key: 'floor',         label: 'Floor' },
        { key: 'capacity',      label: 'Capacity', type: 'number' },
        { key: 'status',        label: 'Status', type: 'select', options: ['available', 'occupied', 'maintenance'] },
      ]}
    />
  )
}
