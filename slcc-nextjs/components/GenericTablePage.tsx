import { useEffect, useState, useCallback } from 'react'
import { Plus } from 'lucide-react'
import Layout from '../components/Layout'
import DataTable from '../components/DataTable'
import PageHeader from '../components/PageHeader'
import AddRecordModal, { FormField, buildEditValues } from '../components/AddRecordModal'
import { supabase } from '../lib/supabase'

const PAGE_SIZE = 20

interface GenericTablePageProps {
  title: string
  tableName: string
  subtitle: string
  columns: {
    key: string
    label: string
    required?: boolean
    placeholder?: string
    render?: (v: unknown, row: Record<string, unknown>) => React.ReactNode
  }[]
  orderBy?: string
  fields?: FormField[]   // if provided, shows an "+ Add" button and insert form, and enables Edit
  selectQuery?: string   // optional Supabase select string for embedding joins, e.g. '*, slcc_members(member_no)'
  idColumn?: string      // primary key column used for edit/update, defaults to 'id'
}

export function GenericTablePage({ title, tableName, subtitle, columns, orderBy = 'created_at', fields, selectQuery = '*', idColumn = 'id' }: GenericTablePageProps) {
  const [data, setData] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [count, setCount] = useState<number | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingRow, setEditingRow] = useState<Record<string, unknown> | null>(null)

  const fetchData = useCallback(async (p: number) => {
    setLoading(true); setError(null)
    const from = (p - 1) * PAGE_SIZE
    const { data: rows, error: err, count: total } = await supabase
      .from(tableName)
      .select(selectQuery, { count: 'exact' })
      .order(orderBy, { ascending: false })
      .range(from, from + PAGE_SIZE - 1)
    if (err) setError(err.message)
    else { setData((rows ?? []) as unknown as Record<string, unknown>[]); setCount(total) }
    setLoading(false)
  }, [tableName, orderBy, selectQuery])

  useEffect(() => { fetchData(page) }, [fetchData, page])

  return (
    <Layout title={title}>
      <div className="px-8 py-7">
        <PageHeader
          title={title}
          subtitle={subtitle}
          count={count}
          actions={fields && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
            >
              <Plus size={15} /> Add {title.replace(/s$/, '')}
            </button>
          )}
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
          onEdit={fields ? setEditingRow : undefined}
        />
      </div>
      {showAddModal && fields && (
        <AddRecordModal
          title={title.replace(/s$/, '')}
          tableName={tableName}
          fields={fields}
          onClose={() => setShowAddModal(false)}
          onSuccess={() => { setShowAddModal(false); setPage(1); fetchData(1) }}
        />
      )}
      {editingRow && fields && (
        <AddRecordModal
          mode="edit"
          title={title.replace(/s$/, '')}
          tableName={tableName}
          fields={fields}
          idColumn={idColumn}
          recordId={editingRow[idColumn]}
          initialValues={buildEditValues(fields, editingRow)}
          onClose={() => setEditingRow(null)}
          onSuccess={() => { setEditingRow(null); fetchData(page) }}
        />
      )}
    </Layout>
  )
}
