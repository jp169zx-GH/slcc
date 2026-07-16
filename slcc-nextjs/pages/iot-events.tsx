import { GenericTablePage } from '../components/GenericTablePage'
import { TABLES } from '../lib/supabase'

export default function IotEventsPage() {
  return (
    <GenericTablePage
      title="IoT Events"
      tableName={TABLES.IOT_EVENTS}
      subtitle="slcc_iot_events — Sensor alerts, fall detections, vital signs"
      orderBy="event_time"
      selectQuery="*, slcc_iot_devices(device_id, device_type)"
      columns={[
        { key: 'id',          label: 'ID',        render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        {
          key: 'device_id', label: 'Device',
          render: (_v, row) => {
            const d = row.slcc_iot_devices as { device_id?: string; device_type?: string } | null
            return d ? <span>{d.device_id}{d.device_type ? ` — ${d.device_type}` : ''}</span> : <span className="text-slate-600">—</span>
          },
        },
        { key: 'event_type',  label: 'Type',      render: v => {
          const s = String(v || '')
          const cls = s.includes('fall') || s.includes('alert') ? 'badge-critical' : 'badge-pending'
          return <span className={`badge ${cls}`}>{s}</span>
        }},
        { key: 'severity',    label: 'Severity' },
        { key: 'payload',     label: 'Payload',   render: v => {
          if (!v) return '—'
          const str = typeof v === 'object' ? JSON.stringify(v) : String(v)
          return <span className="font-mono text-xs">{str.slice(0, 50)}{str.length > 50 ? '…' : ''}</span>
        }},
        { key: 'event_time',  label: 'Time',      render: v => v ? new Date(String(v)).toLocaleString() : '—' },
        { key: 'acknowledged',label: 'Ack',       render: v => <span className={`badge ${v ? 'badge-active' : 'badge-pending'}`}>{v ? 'Yes' : 'No'}</span> },
      ]}
      fields={[
        {
          key: 'device_id', label: 'Device ID', required: true,
          type: 'lookup', lookupTable: TABLES.IOT_DEVICES, lookupBy: 'device_id', lookupJoinKey: 'slcc_iot_devices',
          placeholder: 'DEV-0001',
        },
        { key: 'event_type',  label: 'Event Type', required: true, placeholder: 'e.g. fall-detected, vitals-alert' },
        { key: 'severity',    label: 'Severity', type: 'select', options: ['low', 'medium', 'high', 'critical'] },
        { key: 'payload',     label: 'Payload (JSON)', type: 'json', placeholder: '{"heart_rate": 78}' },
        { key: 'event_time',  label: 'Event Time', type: 'datetime-local' },
        { key: 'acknowledged',label: 'Acknowledged', type: 'checkbox' },
      ]}
    />
  )
}
