import { GenericTablePage } from '../components/GenericTablePage'
import { TABLES } from '../lib/supabase'

export default function IotDevicesPage() {
  return (
    <GenericTablePage
      title="IoT Devices"
      tableName={TABLES.IOT_DEVICES}
      subtitle="slcc_iot_devices — MQTT-connected sensors and monitors"
      orderBy="created_at"
      selectQuery="*, slcc_members(member_no, name_en)"
      columns={[
        { key: 'id',           label: 'ID',         render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        { key: 'device_id',    label: 'Device ID' },
        { key: 'device_type',  label: 'Type' },
        { key: 'manufacturer', label: 'Manufacturer' },
        { key: 'model',        label: 'Model' },
        { key: 'location',     label: 'Location' },
        {
          key: 'member_id', label: 'Assigned To',
          render: (_v, row) => {
            const m = row.slcc_members as { member_no?: string; name_en?: string } | null
            return m ? <span>{m.member_no}{m.name_en ? ` — ${m.name_en}` : ''}</span> : <span className="text-slate-600">—</span>
          },
        },
        { key: 'status',       label: 'Status',     render: v => {
          const s = String(v || '')
          const cls = s === 'online' ? 'badge-active' : s === 'offline' ? 'badge-inactive' : 'badge-pending'
          return <span className={`badge ${cls}`}>{s}</span>
        }},
        { key: 'last_seen',    label: 'Last Seen',  render: v => v ? new Date(String(v)).toLocaleString() : '—' },
      ]}
      fields={[
        { key: 'device_id',    label: 'Device ID', required: true, placeholder: 'DEV-0001' },
        { key: 'device_type',  label: 'Device Type', placeholder: 'e.g. fall-sensor, health-kiosk' },
        { key: 'manufacturer', label: 'Manufacturer' },
        { key: 'model',        label: 'Model' },
        { key: 'location',     label: 'Location', placeholder: 'e.g. Room 204' },
        {
          key: 'member_id', label: 'Assigned Member No. (optional)',
          type: 'lookup', lookupTable: TABLES.MEMBERS, lookupBy: 'member_no', lookupJoinKey: 'slcc_members',
          placeholder: 'F0003',
        },
        { key: 'status',       label: 'Status', type: 'select', options: ['online', 'offline', 'pending'] },
        { key: 'last_seen',    label: 'Last Seen', type: 'datetime-local' },
      ]}
    />
  )
}
