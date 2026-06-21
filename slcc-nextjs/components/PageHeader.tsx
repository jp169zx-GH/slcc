interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  count?: number | null
}

export default function PageHeader({ title, subtitle, actions, count }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-white">{title}</h1>
          {count != null && (
            <span className="bg-blue-600/20 text-blue-400 text-xs font-medium px-2.5 py-1 rounded-full">
              {count.toLocaleString()} rows
            </span>
          )}
        </div>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}
