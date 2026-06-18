import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabaseServer'
import UpgradeButton from '@/components/UpgradeButton'

export default async function HomePage() {
  let user = null
  try {
    const supabase = await createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch {
    // Supabase not configured — show logged-out state
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b px-8 py-4 flex justify-between items-center">
        <span className="font-bold text-xl">SignFlow</span>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm text-gray-600 hover:text-black">
                Dashboard
              </Link>
              <UpgradeButton />
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-gray-600 hover:text-black">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-8 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
          Professional contracts.
          <br />
          <span className="text-blue-600">Done in minutes.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Create, send, and collect e-signatures for your freelance contracts. No more chasing
          clients for signatures.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href={user ? '/templates' : '/signup'}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
          >
            {user ? 'Browse Templates' : 'Start for Free'}
          </Link>
          {user && (
            <Link
              href="/dashboard"
              className="border border-gray-300 px-8 py-3 rounded-xl text-lg font-medium hover:bg-gray-50 transition"
            >
              View Dashboard
            </Link>
          )}
        </div>
      </main>

      <section className="max-w-4xl mx-auto px-8 pb-24">
        <div className="grid grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl bg-gray-50">
            <div className="text-4xl mb-3">📝</div>
            <h3 className="font-semibold mb-2">Pick a Template</h3>
            <p className="text-sm text-gray-600">
              Choose from design, web dev, writing, photography, and more.
            </p>
          </div>
          <div className="text-center p-6 rounded-xl bg-gray-50">
            <div className="text-4xl mb-3">✉️</div>
            <h3 className="font-semibold mb-2">Send to Client</h3>
            <p className="text-sm text-gray-600">
              Fill in the details and share a signing link with your client instantly.
            </p>
          </div>
          <div className="text-center p-6 rounded-xl bg-gray-50">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="font-semibold mb-2">Get Signed</h3>
            <p className="text-sm text-gray-600">
              Clients draw their digital signature. Contract status updates automatically.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
