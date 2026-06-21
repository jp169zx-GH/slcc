import { useEffect, useState, useCallback } from 'react'
import Layout from '../components/Layout'
import DataTable from '../components/DataTable'
import PageHeader from '../components/PageHeader'
import { supabase, TABLES } from '../lib/supabase'

const PAGE_SIZE = 20

const columns = [
  { key: 'id',           label: 'ID',           render: (v: unknown) => <span className="font-mono text-xs text-slate-500">{String(v).slice(0,8)}…</span> },
  { key: 'member_no',    label: 'Member No.' },
  { key: 'name_zh',      label: '姓名' },
  { key: 'name_en',      label: 'Name (EN)' },
  { key: 'gender',       label: 'Gender' },
  { key: 'date_of_birth',label: 'DOB' },
  { key: 'phone',        label: 'Phone' },
  { key: 'email',        label: 'Email' },
  { key: 'nationality',  label: 'Nationality' },
  {
    key: 'status', label: 'Status',
    render: (v: unknown) => {
      const s = String(v || '')
      const cls = s === 'active' ? 'badge-active' : s === 'inactive' ? 'badge-inactive' : 'badge-pending'
      return <span className={`badge ${cls}`}>{s}</span>
    }
  },
  { key: 'created_at',   label: 'Created',      render: (v: unknown) => v ? new Date(String(v)).toLocaleDateString() : '—' },
]

export default function MembersPage() {
  const [data, setData] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [count, setCount] = useState<number | null>(null)

  const fetchData = useCallback(async (p: number) => {
    setLoading(true); setError(null)
    const from = (p - 1) * PAGE_SIZE
    const { data: rows, error: err, count: total } = await supabase
      .from(TABLES.MEMBERS)
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, from + PAGE_SIZE - 1)
    if (err) setError(err.message)
    else { setData(rows ?? []); setCount(total) }
    setLoading(false)
  }, [])

  useEffect(() => { fetchData(page) }, [fetchData, page])

  return (
    <Layout title="Members">
      <div className="px-8 py-7">
        <PageHeader
          title="Members"
          subtitle="slcc_members — All registered senior living community members"
          count={count}
        />
        <DataTable
          columns={columns}
          data={data}
          loading={loading}
          error={error}
          page={page}
          totalPages={Math.ceil((count ?? 0) / PAGE_SIZE)}
          onPageChange={setPage}
          onRefresh={() => fetchData(page)}
        />
      </div>
    </Layout>
  )
}
