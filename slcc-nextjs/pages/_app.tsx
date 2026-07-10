import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Loader2 } from 'lucide-react'
import { AuthProvider, useAuth } from '../lib/auth-context'
import '../styles/globals.css'

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <Loader2 size={24} className="animate-spin text-slate-500" />
    </div>
  )
}

function AuthGate({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()
  const router = useRouter()
  const isLoginPage = router.pathname === '/login'

  useEffect(() => {
    if (loading) return
    if (!session && !isLoginPage) router.replace('/login')
    if (session && isLoginPage) router.replace('/')
  }, [loading, session, isLoginPage, router])

  if (loading) return <LoadingScreen />
  if (!session && !isLoginPage) return <LoadingScreen />

  return <>{children}</>
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AuthGate>
        <Component {...pageProps} />
      </AuthGate>
    </AuthProvider>
  )
}
