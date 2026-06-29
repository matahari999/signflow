import { notFound } from 'next/navigation'
import { getContractById } from '@/actions/getContractById'
import SigningPanel from './SigningPanel'

export default async function SignPage({
  params,
}: {
  params: Promise<{ contractId: string }>
}) {
  const { contractId } = await params
  const contract = await getContractById(contractId)

  if (!contract) notFound()

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-8">
      <div className="bg-white rounded-xl border p-8 max-w-2xl w-full space-y-6">
        <h1 className="text-2xl font-bold">{contract.templates.name}</h1>

        <div className="text-sm text-gray-500 space-y-1">
          <p>From: {contract.profiles.email}</p>
          <p>To: {contract.client_email}</p>
          <p>Created: {new Date(contract.created_at).toLocaleDateString()}</p>
          <p>Status: <span className="capitalize">{contract.status}</span></p>
        </div>

        {contract.templates.description && (
          <p className="text-sm text-gray-600 italic">{contract.templates.description}</p>
        )}

        <div className="border rounded-lg p-4 bg-gray-50 space-y-2">
          <h2 className="font-semibold text-sm text-gray-700">Terms</h2>
          {contract.fields && Object.entries(contract.fields as Record<string, string>).map(([key, value]) => (
            <div key={key} className="text-sm">
              <span className="font-medium text-gray-600">
                {key.replace(/_/g, ' ').replace(/^./, s => s.toUpperCase())}:{' '}
              </span>
              <span className="text-gray-800">{String(value)}</span>
            </div>
          ))}
        </div>

        <SigningPanel contractId={contractId} status={contract.status} />
      </div>
    </div>
  )
}
