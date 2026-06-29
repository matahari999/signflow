'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SignaturePad from '@/components/SignaturePad'
import { saveSignature } from '@/actions/saveSignature'

export default function SigningPanel({
  contractId,
  status,
}: {
  contractId: string
  status: string
}) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  if (status === 'signed' || done) {
    return (
      <div className="border-t pt-6 text-center text-green-700 font-medium">
        Contract signed successfully.
      </div>
    )
  }

  if (status !== 'sent') {
    return (
      <div className="border-t pt-6 text-center text-gray-500 text-sm">
        This contract is not available for signing.
      </div>
    )
  }

  const handleSign = async (data: string) => {
    setError(null)
    const result = await saveSignature(contractId, data)
    if (result.success) {
      setDone(true)
      setTimeout(() => router.push('/dashboard'), 1500)
    } else {
      setError('Failed to save signature. Please try again.')
    }
  }

  return (
    <div className="border-t pt-6 space-y-4">
      <div>
        <h2 className="text-lg font-semibold mb-1">Sign Your Contract</h2>
        <p className="text-sm text-gray-600">
          Draw your signature below, then click Save Signature.
        </p>
      </div>
      <SignaturePad onSave={handleSign} />
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      <p className="text-xs text-gray-400">
        By signing, you agree to the terms of the contract.
      </p>
    </div>
  )
}
