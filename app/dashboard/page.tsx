import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getContracts } from '@/actions/getContracts'
import { createSupabaseServerClient } from '@/lib/supabaseServer'
import UpgradeButton from '@/components/UpgradeButton'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  let user = null
  try {
    const supabase = await createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch {
    redirect('/login')
  }

  if (!user) redirect('/login')

  let contracts: Awaited<ReturnType<typeof getContracts>> = []
  try {
    contracts = await getContracts(user.id)
  } catch {
    contracts = []
  }

  const total = contracts.length
  const drafts = contracts.filter((c) => c.status === 'draft').length
  const sent = contracts.filter((c) => c.status === 'sent').length
  const signed = contracts.filter((c) => c.status === 'signed').length

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">{user.email}</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/templates"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            + New Contract
          </Link>
          <UpgradeButton />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total</p>
          <p className="text-3xl font-bold">{total}</p>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Draft</p>
          <p className="text-3xl font-bold text-yellow-600">{drafts}</p>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Sent</p>
          <p className="text-3xl font-bold text-blue-600">{sent}</p>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Signed</p>
          <p className="text-3xl font-bold text-green-600">{signed}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border">
        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold">Recent Contracts</h2>
        </div>
        {contracts.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="mb-4">No contracts yet.</p>
            <Link
              href="/templates"
              className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg text-sm"
            >
              Create your first contract
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Client Email
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Created
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{contract.client_email || '—'}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        contract.status === 'signed'
                          ? 'bg-green-100 text-green-700'
                          : contract.status === 'sent'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {contract.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(contract.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/sign/${contract.id}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View / Sign
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
