import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { supabase, TABLES } from '../lib/supabase'
import {
  Users, CreditCard, HeartPulse, CalendarCheck,
  Receipt, Cpu, Activity, UserCog, Building2,
  TrendingUp, AlertTriangle, CheckCircle2
} from 'lucide-react'
import Link from 'next/link'

interface StatCard {
  label: string
  table: string
  href: string
  icon: React.ElementType
  color: string
  description: string
}

const statCards: StatCard[] = [
  { label: 'Members',           table: TABLES.MEMBERS,           href: '/members',          icon: Users,         color: 'blue',    description: 'Registered members' },
  { label: 'Memberships',       table: TABLES.MEMBERSHIPS,       href: '/memberships',      icon: CreditCard,    color: 'violet',  description: 'Active subscriptions' },
  { label: 'Health Records',    table: TABLES.HEALTH_RECORDS,    href: '/health-records',   icon: HeartPulse,    color: 'rose',    description: 'Medical records' },
  { label: 'Care Bookings',     table: TABLES.CARE_BOOKINGS,     href: '/care-bookings',    icon: CalendarCheck, color: 'emerald', description: 'Scheduled bookings' },
  { label: 'Billing Records',   table: TABLES.BILLING,           href: '/billing',          icon: Receipt,       color: 'amber',   description: 'Invoices & payments' },
  { label: 'IoT Devices',       table: TABLES.IOT_DEVICES,       href: '/iot-devices',      icon: Cpu,           color: 'cyan',    description: 'Connected sensors' },
  { label: 'IoT Events',        table: TABLES.IOT_EVENTS,        href: '/iot-events',       icon: Activity,      color: 'teal',    description: 'Sensor alerts & data' },
  { label: 'Staff',             table: TABLES.STAFF,             href: '/staff',            icon: UserCog,       color: 'indigo',  description: 'Staff members' },
  { label: 'Facilities',        table: TABLES.FACILITIES,        href: '/facilities',       icon: Building2,     color: 'sky',     description: 'Rooms & facilities' },
]

const colorMap: Record<string, string> = {
  blue:    'bg-blue-500/10 text-blue-400 border-blue-800/40',
  violet:  'bg-violet-500/10 text-violet-400 border-violet-800/40',
  rose:    'bg-rose-500/10 text-rose-400 border-rose-800/40',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-800/40',
  amber:   'bg-amber-500/10 text-amber-400 border-amber-800/40',
  cyan:    'bg-cyan-500/10 text-cyan-400 border-cyan-800/40',
  teal:    'bg-teal-500/10 text-teal-400 border-teal-800/40',
  indigo:  'bg-indigo-500/10 text-indigo-400 border-indigo-800/40',
  sky:     'bg-sky-500/10 text-sky-400 border-sky-800/40',
}

const iconColorMap: Record<string, string> = {
  blue:    'text-blue-400',
  violet:  'text-violet-400',
  rose:    'text-rose-400',
  emerald: 'text-emerald-400',
  amber:   'text-amber-400',
  cyan:    'text-cyan-400',
  teal:    'text-teal-400',
  indigo:  'text-indigo-400',
  sky:     'text-sky-400',
}

export default function Dashboard() {
  const [counts, setCounts] = useState<Record<string, number | null>>({})
  const [loading, setLoading] = useState(true)
  const [connected, setConnected] = useState<boolean | null>(null)

  useEffect(() => {
    async function fetchCounts() {
      try {
        const results: Record<string, number | null> = {}
        for (const card of statCards) {
          const { count, error } = await supabase
            .from(card.table)
            .select('*', { count: 'exact', head: true })
          results[card.table] = error ? null : (count ?? 0)
        }
        setCounts(results)
        setConnected(true)
      } catch {
        setConnected(false)
      } finally {
        setLoading(false)
      }
    }
    fetchCounts()
  }, [])

  const totalRecords = Object.values(counts).reduce((sum, v) => sum! + (v ?? 0), 0)

  return (
    <Layout title="Dashboard">
      <div className="px-8 py-7">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white">SLCC Database Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">
            Senior Living Care Center — Supabase Project: <span className="font-mono text-slate-400">txvyplfaaisrzbwpoqcd</span>
          </p>
        </div>

        {/* Connection status banner */}
        {!loading && (
          <div className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-xl border text-sm ${
            connected
              ? 'bg-emerald-500/10 border-emerald-800/40 text-emerald-400'
              : 'bg-red-500/10 border-red-800/40 text-red-400'
          }`}>
            {connected
              ? <><CheckCircle2 size={16} /> Connected to Supabase — {totalRecords?.toLocaleString()} total records across all tables</>
              : <><AlertTriangle size={16} /> Cannot connect to Supabase. Check your environment variables in <code className="font-mono text-xs">.env.local</code></>
            }
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {statCards.map(card => {
            const Icon = card.icon
            const count = counts[card.table]
            return (
              <Link
                key={card.table}
                href={card.href}
                className={`stat-card border hover:border-slate-600 transition-all group cursor-pointer ${colorMap[card.color]}`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg bg-slate-800/60`}>
                    <Icon size={18} className={iconColorMap[card.color]} />
                  </div>
                  <TrendingUp size={14} className="text-slate-700 group-hover:text-slate-500 transition-colors" />
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-semibold text-white">
                    {loading ? (
                      <span className="inline-block w-12 h-6 bg-slate-800 rounded animate-pulse" />
                    ) : count === null ? '—' : count.toLocaleString()}
                  </p>
                  <p className="text-sm font-medium text-slate-300 mt-0.5">{card.label}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{card.description}</p>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Quick links */}
        <div className="card">
          <h2 className="text-sm font-semibold text-slate-300 mb-4">Quick Setup Guide</h2>
          <ol className="space-y-2 text-sm text-slate-400">
            <li className="flex gap-3">
              <span className="text-blue-500 font-mono text-xs w-5 shrink-0 pt-0.5">1.</span>
              Copy <code className="font-mono text-xs bg-slate-800 px-1.5 py-0.5 rounded">.env.local.example</code> → <code className="font-mono text-xs bg-slate-800 px-1.5 py-0.5 rounded">.env.local</code> and fill in your Supabase URL and anon key
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500 font-mono text-xs w-5 shrink-0 pt-0.5">2.</span>
              Run <code className="font-mono text-xs bg-slate-800 px-1.5 py-0.5 rounded">npm install && npm run dev</code> to start locally
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500 font-mono text-xs w-5 shrink-0 pt-0.5">3.</span>
              Push to <code className="font-mono text-xs bg-slate-800 px-1.5 py-0.5 rounded">jp169zx-gh/slcc</code> — GitHub Actions will build and deploy to GitHub Pages automatically
            </li>
          </ol>
        </div>
      </div>
    </Layout>
  )
}
