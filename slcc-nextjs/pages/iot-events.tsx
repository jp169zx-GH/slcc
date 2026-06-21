import { GenericTablePage } from '../components/GenericTablePage'
import { TABLES } from '../lib/supabase'

export default function IotEventsPage() {
  return (
    <GenericTablePage
      title="IoT Events"
      tableName={TABLES.IOT_EVENTS}
      subtitle="slcc_iot_events — Sensor alerts, fall detections, vital signs"
      orderBy="event_time"
      columns={[
        { key: 'id',          label: 'ID',        render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
        { key: 'device_id',   label: 'Device',    render: v => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
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
    />
  )
}
