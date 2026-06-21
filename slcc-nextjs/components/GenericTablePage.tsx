import { useEffect, useState, useCallback } from 'react'
import Layout from '../components/Layout'
import DataTable from '../components/DataTable'
import PageHeader from '../components/PageHeader'
import { supabase } from '../lib/supabase'

const PAGE_SIZE = 20

interface GenericTablePageProps {
  title: string
  tableName: string
  subtitle: string
  columns: {
    key: string
    label: string
    render?: (v: unknown, row: Record<string, unknown>) => React.ReactNode
  }[]
  orderBy?: string
}

export function GenericTablePage({ title, tableName, subtitle, columns, orderBy = 'created_at' }: GenericTablePageProps) {
  const [data, setData] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [count, setCount] = useState<number | null>(null)

  const fetchData = useCallback(async (p: number) => {
    setLoading(true); setError(null)
    const from = (p - 1) * PAGE_SIZE
    const { data: rows, error: err, count: total } = await supabase
      .from(tableName)
      .select('*', { count: 'exact' })
      .order(orderBy, { ascending: false })
      .range(from, from + PAGE_SIZE - 1)
    if (err) setError(err.message)
    else { setData(rows ?? []); setCount(total) }
    setLoading(false)
  }, [tableName, orderBy])

  useEffect(() => { fetchData(page) }, [fetchData, page])

  return (
    <Layout title={title}>
      <div className="px-8 py-7">
        <PageHeader title={title} subtitle={subtitle} count={count} />
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
