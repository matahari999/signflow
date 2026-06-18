'use client'

import { use, useEffect, useState } from 'react'
import SignaturePad from '@/components/SignaturePad'
import { saveSignature } from '@/actions/saveSignature'
import { getContractById } from '@/actions/getContractById'
import { useRouter } from 'next/navigation'

type ContractData = {
  id: string
  client_email: string
  status: string
  fields: Record<string, string>
  created_at: string
  templates: { name: string; description: string | null }
  profiles: { email: string }
}

export default function SignPage({
  params,
}: {
  params: Promise<{ contractId: string }>
}) {
  const { contractId } = use(params)
  const router = useRouter()
  const [contract, setContract] = useState<ContractData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getContractById(contractId).then((data) => {
      setContract(data as ContractData | null)
      setLoading(false)
    })
  }, [contractId])

  const handleSign = async (data: string) => {
    const result = await saveSignature(contractId, data)
    if (result.success) {
      alert('Contract signed successfully!')
      router.push('/dashboard')
    } else {
      alert('Failed to save signature. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading contract...</p>
      </div>
    )
  }

  if (!contract) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">Contract not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-8">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl w-full space-y-6">
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
          {contract.fields && Object.entries(contract.fields).map(([key, value]) => (
            <div key={key} className="text-sm">
              <span className="font-medium text-gray-600">
                {key.replace(/([A-Z])/g, ' $1').replace(/(^.)/, s => s.toUpperCase())}:{' '}
              </span>
              <span className="text-gray-800">{String(value)}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-1">Sign Your Contract</h2>
          <p className="text-sm text-gray-600 mb-4">
            Draw your signature in the box below, then click Save Signature.
          </p>
          <SignaturePad onSave={handleSign} />
          <p className="text-xs text-gray-400 mt-4">
            By signing, you agree to the terms of the contract.
          </p>
        </div>
      </div>
    </div>
  )
}
