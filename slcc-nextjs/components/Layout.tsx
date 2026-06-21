import Sidebar from './Sidebar'
import Head from 'next/head'

interface LayoutProps {
  children: React.ReactNode
  title?: string
}

export default function Layout({ children, title = 'SLCC Admin' }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title} | SLCC Dashboard</title>
        <meta name="description" content="SLCC Senior Living Care Center — Admin Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen overflow-hidden bg-slate-950">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </>
  )
}
