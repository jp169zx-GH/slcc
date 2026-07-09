import { GenericTablePage } from '../components/GenericTablePage'
import { TABLES } from '../lib/supabase'

export default function CareServicesPage() {
  return (
    <GenericTablePage
      title="Care Services"
      tableName={TABLES.CARE_SERVICES}
      subtitle="slcc_care_services — Available care and medical services"
      orderBy="created_at"
      columns={[
        { key: 'id',              label: 'ID',          render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        { key: 'service_code',    label: 'Code' },
        { key: 'service_name_zh', label: '服務名稱' },
        { key: 'service_name_en', label: 'Service Name' },
        { key: 'category',        label: 'Category' },
        { key: 'unit_price',      label: 'Unit Price',  render: v => v ? `NT$ ${Number(v).toLocaleString()}` : '—' },
        { key: 'duration_min',    label: 'Duration (min)' },
        { key: 'is_active',       label: 'Active',      render: v => <span className={`badge ${v ? 'badge-active' : 'badge-inactive'}`}>{v ? 'Yes' : 'No'}</span> },
      ]}
      fields={[
        { key: 'service_code',    label: 'Service Code', required: true, placeholder: 'SVC-001' },
        { key: 'service_name_zh', label: '服務名稱', required: true },
        { key: 'service_name_en', label: 'Service Name', required: true },
        { key: 'category',        label: 'Category', placeholder: 'e.g. medical, wellness, daily-care' },
        { key: 'unit_price',      label: 'Unit Price', type: 'number' },
        { key: 'duration_min',    label: 'Duration (min)', type: 'number' },
        { key: 'is_active',       label: 'Active', type: 'checkbox' },
      ]}
    />
  )
}
