import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import { supabase } from '../lib/supabase'
import { CheckCircle2, AlertTriangle, ExternalLink, Copy, Check } from 'lucide-react'

export default function SettingsPage() {
  const [connected, setConnected] = useState<boolean | null>(null)
  const [testing, setTesting] = useState(false)
  const [copied, setCopied] = useState(false)

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '(not set)'
  const projectRef = 'txvyplfaaisrzbwpoqcd'

  async function testConnection() {
    setTesting(true)
    try {
      const { error } = await supabase.from('slcc_members').select('id', { count: 'exact', head: true })
      setConnected(!error)
    } catch {
      setConnected(false)
    } finally {
      setTesting(false)
    }
  }

  useEffect(() => { testConnection() }, [])

  function copyEnvExample() {
    const text = `NEXT_PUBLIC_SUPABASE_URL=https://${projectRef}.supabase.co\nNEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Layout title="Settings">
      <div className="px-8 py-7 max-w-2xl">
        <PageHeader title="Settings" subtitle="Supabase connection and project configuration" />

        {/* Connection Status */}
        <div className="card mb-6">
          <h2 className="text-sm font-semibold text-slate-300 mb-4">Connection Status</h2>
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm mb-4 ${
            connected === null ? 'bg-slate-800/50 border-slate-700 text-slate-400' :
            connected ? 'bg-emerald-500/10 border-emerald-800/40 text-emerald-400' :
            'bg-red-500/10 border-red-800/40 text-red-400'
          }`}>
            {connected === null ? '⏳ Testing connection…' :
             connected ? <><CheckCircle2 size={16}/> Connected to Supabase</> :
             <><AlertTriangle size={16}/> Connection failed — check your env vars</>}
          </div>
          <button
            onClick={testConnection}
            disabled={testing}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {testing ? 'Testing…' : 'Test Connection'}
          </button>
        </div>

        {/* Project Info */}
        <div className="card mb-6">
          <h2 className="text-sm font-semibold text-slate-300 mb-4">Project Details</h2>
          <dl className="space-y-3 text-sm">
            {[
              ['Project Reference', projectRef],
              ['Supabase URL', `https://${projectRef}.supabase.co`],
              ['NEXT_PUBLIC_SUPABASE_URL', supabaseUrl],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <dt className="text-slate-500">{label}</dt>
                <dd className="font-mono text-xs text-slate-300 bg-slate-800 px-2 py-0.5 rounded">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* .env.local setup */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-300">.env.local Setup</h2>
            <button
              onClick={copyEnvExample}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              {copied ? <><Check size={13} className="text-emerald-400"/> Copied</> : <><Copy size={13}/> Copy</>}
            </button>
          </div>
          <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-xs font-mono text-slate-300 overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=https://${projectRef}.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here`}
          </pre>
          <p className="text-xs text-slate-600 mt-2">
            Find your anon key at Supabase → Project Settings → API
          </p>
        </div>

        {/* Quick links */}
        <div className="card">
          <h2 className="text-sm font-semibold text-slate-300 mb-4">Quick Links</h2>
          <div className="space-y-2">
            {[
              [`https://supabase.com/dashboard/project/${projectRef}/editor`, 'Supabase Table Editor'],
              [`https://supabase.com/dashboard/project/${projectRef}/sql`, 'Supabase SQL Editor'],
              [`https://supabase.com/dashboard/project/${projectRef}/settings/api`, 'Supabase API Settings'],
              ['https://github.com/jp169zx-gh/slcc', 'GitHub Repository: slcc'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-slate-800 hover:border-slate-600 hover:bg-slate-800/40 transition-all text-sm text-slate-300 group"
              >
                {label}
                <ExternalLink size={13} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
