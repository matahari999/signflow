'use client'

import { use } from 'react'
import SignaturePad from '@/components/SignaturePad'
import { saveSignature } from '@/actions/saveSignature'
import { useRouter } from 'next/navigation'

export default function SignPage({
  params,
}: {
  params: Promise<{ contractId: string }>
}) {
  const { contractId } = use(params)
  const router = useRouter()

  const handleSign = async (data: string) => {
    const result = await saveSignature(contractId, data)
    if (result.success) {
      alert('Contract signed successfully!')
      router.push('/dashboard')
    } else {
      alert('Failed to save signature. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-1">Sign Your Contract</h1>
        <p className="text-sm text-gray-600 mb-6">
          Draw your signature in the box below, then click Save Signature.
        </p>
        <SignaturePad onSave={handleSign} />
        <p className="text-xs text-gray-400 mt-4">
          By signing, you agree to the terms of the contract.
        </p>
      </div>
    </div>
  )
}
