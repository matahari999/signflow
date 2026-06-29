import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export default async function HomePage() {
  let user = null
  try {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch {}

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b px-8 py-4 flex justify-between items-center">
        <span className="font-bold text-xl">SignFlow</span>
        <div className="flex gap-4 items-center">
          <Link href="/pricing" className="text-sm text-gray-600 hover:text-black">Pricing</Link>
          {user ? (
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-black">Dashboard</Link>
          ) : (
            <>
              <Link href="/login" className="text-sm text-gray-600 hover:text-black">Log In</Link>
              <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">Get Started</Link>
            </>
          )}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-8 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
          Professional contracts.<br /><span className="text-blue-600">Done in minutes.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Create, send, and collect e-signatures for your freelance contracts. No more chasing clients for signatures.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href={user ? '/templates' : '/signup'} className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition">
            {user ? 'Browse Templates' : 'Start for Free'}
          </Link>
          {user && <Link href="/dashboard" className="border border-gray-300 px-8 py-3 rounded-xl text-lg font-medium hover:bg-gray-50 transition">View Dashboard</Link>}
        </div>
      </main>

      <section className="max-w-4xl mx-auto px-8 pb-24">
        <div className="grid grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-gray-50">
            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1.5">Pick a Template</h3>
            <p className="text-sm text-gray-600">Choose from 13 contract templates for any freelance niche.</p>
          </div>
          <div className="p-6 rounded-xl bg-gray-50">
            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1.5">Send to Client</h3>
            <p className="text-sm text-gray-600">Fill in the details and share a signing link with your client instantly.</p>
          </div>
          <div className="p-6 rounded-xl bg-gray-50">
            <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1.5">Get Signed</h3>
            <p className="text-sm text-gray-600">Clients draw their digital signature. Status updates automatically.</p>
          </div>
        </div>
      </section>

      <footer className="border-t px-8 py-6 text-center text-xs text-gray-400">
        <div className="flex justify-center gap-4 mb-2">
          <Link href="/pricing" className="hover:text-gray-600">Pricing</Link>
          <Link href="/legal/privacy" className="hover:text-gray-600">Privacy</Link>
          <Link href="/legal/terms" className="hover:text-gray-600">Terms</Link>
          <a href="mailto:sinab7500@gmail.com" className="hover:text-gray-600">Support</a>
        </div>
        <p>&copy; {new Date().getFullYear()} SignFlow. All rights reserved.</p>
      </footer>
    </div>
  )
}
