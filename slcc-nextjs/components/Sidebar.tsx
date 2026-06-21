import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  LayoutDashboard, Users, CreditCard, HeartPulse,
  Stethoscope, CalendarCheck, Receipt, ShieldCheck,
  Cpu, Activity, UserCog, Building2, Settings, ChevronRight
} from 'lucide-react'

const navGroups = [
  {
    label: 'Overview',
    items: [
      { href: '/',            icon: LayoutDashboard, label: 'Dashboard' },
    ]
  },
  {
    label: 'Members & Plans',
    items: [
      { href: '/members',          icon: Users,        label: 'Members' },
      { href: '/memberships',      icon: CreditCard,   label: 'Memberships' },
      { href: '/membership-plans', icon: ShieldCheck,  label: 'Membership Plans' },
    ]
  },
  {
    label: 'Health & Care',
    items: [
      { href: '/health-records',   icon: HeartPulse,   label: 'Health Records' },
      { href: '/care-services',    icon: Stethoscope,  label: 'Care Services' },
      { href: '/care-bookings',    icon: CalendarCheck,label: 'Care Bookings' },
    ]
  },
  {
    label: 'Finance',
    items: [
      { href: '/billing',          icon: Receipt,      label: 'Billing' },
      { href: '/insurance-claims', icon: ShieldCheck,  label: 'Insurance Claims' },
    ]
  },
  {
    label: 'IoT & Monitoring',
    items: [
      { href: '/iot-devices',      icon: Cpu,          label: 'IoT Devices' },
      { href: '/iot-events',       icon: Activity,     label: 'IoT Events' },
    ]
  },
  {
    label: 'Operations',
    items: [
      { href: '/staff',            icon: UserCog,      label: 'Staff' },
      { href: '/facilities',       icon: Building2,    label: 'Facilities' },
    ]
  },
  {
    label: 'System',
    items: [
      { href: '/settings',         icon: Settings,     label: 'Settings' },
    ]
  },
]

export default function Sidebar() {
  const router = useRouter()

  return (
    <aside className="w-64 min-h-screen bg-slate-950 border-r border-slate-800 flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <div>
            <p className="font-semibold text-white text-sm leading-tight">SLCC Admin</p>
            <p className="text-xs text-slate-500">Senior Living Care Center</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-6">
        {navGroups.map(group => (
          <div key={group.label}>
            <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map(item => {
                const active = router.pathname === item.href
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                        active
                          ? 'bg-blue-600/15 text-blue-400 font-medium'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      <Icon size={15} className={active ? 'text-blue-400' : 'text-slate-500'} />
                      {item.label}
                      {active && <ChevronRight size={13} className="ml-auto text-blue-500" />}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-800">
        <p className="text-[11px] text-slate-600">Supabase: txvyplfaaisrzbwpoqcd</p>
      </div>
    </aside>
  )
}
