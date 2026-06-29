import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

function Check() {
  return (
    <svg className="w-4 h-4 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function Cross() {
  return (
    <svg className="w-4 h-4 shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export default async function PricingPage() {
  let user = null
  try {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch {}

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">SignFlow</Link>
        <div className="flex gap-4 items-center">
          {user ? (
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-black">Dashboard</Link>
          ) : (
            <>
              <Link href="/login" className="text-sm text-gray-600 hover:text-black">Sign In</Link>
              <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Get Started</Link>
            </>
          )}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-8 py-20">
        <h1 className="text-4xl font-bold text-center mb-4">Simple, transparent pricing</h1>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
          Start for free. Upgrade when you need more contracts and premium templates.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free */}
          <div className="bg-white rounded-2xl border p-8 flex flex-col">
            <h2 className="text-lg font-semibold mb-1">Free</h2>
            <p className="text-4xl font-bold mb-1">$0</p>
            <p className="text-sm text-gray-500 mb-6">forever — no credit card</p>
            <ul className="space-y-3 mb-8 flex-1 text-sm">
              <li className="flex items-center gap-2"><Check /> Up to 3 contracts</li>
              <li className="flex items-center gap-2"><Check /> 7 basic templates</li>
              <li className="flex items-center gap-2"><Check /> Email signing links</li>
              <li className="flex items-center gap-2"><Check /> Basic PDF generation</li>
              <li className="flex items-center gap-2 text-gray-400"><Cross /> Pro templates (6 locked)</li>
              <li className="flex items-center gap-2 text-gray-400"><Cross /> Unlimited contracts</li>
            </ul>
            {user ? (
              <span className="block text-center bg-gray-100 text-gray-500 py-2.5 rounded-lg text-sm font-medium cursor-default">
                Current Plan
              </span>
            ) : (
              <Link href="/signup" className="block text-center bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                Start Free
              </Link>
            )}
          </div>

          {/* Pro */}
          <div className="bg-white rounded-2xl border-2 border-yellow-400 p-8 flex flex-col relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-4 py-0.5 rounded-full text-xs font-bold">POPULAR</span>
            <h2 className="text-lg font-semibold mb-1">Pro</h2>
            <p className="text-4xl font-bold mb-1">$5</p>
            <p className="text-sm text-gray-500 mb-6">per month</p>
            <ul className="space-y-3 mb-8 flex-1 text-sm">
              <li className="flex items-center gap-2"><Check /> Unlimited contracts</li>
              <li className="flex items-center gap-2"><Check /> All 13 templates</li>
              <li className="flex items-center gap-2"><Check /> Email signing links</li>
              <li className="flex items-center gap-2"><Check /> Full PDF with legal clauses</li>
              <li className="flex items-center gap-2"><Check /> Pro templates (SOW, Contractor, etc.)</li>
              <li className="flex items-center gap-2"><Check /> Cancel anytime</li>
            </ul>
            <Link
              href={user ? '/api/checkout' : '/signup'}
              className="block text-center bg-yellow-500 text-black py-2.5 rounded-lg text-sm font-bold hover:bg-yellow-400 transition"
            >
              {user ? 'Upgrade to Pro' : 'Get Started'}
            </Link>
          </div>
        </div>

        <div className="text-center mt-12 text-sm text-gray-400">
          <p>All plans include encrypted storage and secure e-signatures.</p>
          <p className="mt-1">
            <Link href="/legal/privacy" className="underline hover:text-gray-600">Privacy</Link>
            {' · '}
            <Link href="/legal/terms" className="underline hover:text-gray-600">Terms</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
