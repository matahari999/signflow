'use client'

import { useRouter } from 'next/navigation'
import { deleteContract } from '@/actions/deleteContract'
import { resendContract } from '@/actions/resendContract'

export default function ContractActions({ contractId, status }: { contractId: string; status: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Delete this contract?')) return
    const result = await deleteContract(contractId)
    if (result.success) {
      router.refresh()
    } else {
      alert(result.error || 'Failed to delete')
    }
  }

  const handleResend = async () => {
    const result = await resendContract(contractId)
    if (result.success) {
      alert('Email resent!')
      router.refresh()
    } else {
      alert('Failed to resend. Check RESEND_API_KEY.')
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/sign/${contractId}`)
    alert('Signing link copied!')
  }

  return (
    <div className="flex items-center gap-2">
      {status !== 'signed' && (
        <button onClick={handleResend} className="text-xs text-blue-600 hover:underline">
          Resend
        </button>
      )}
      <button onClick={copyLink} className="text-xs text-gray-500 hover:underline">
        Copy Link
      </button>
      <button onClick={handleDelete} className="text-xs text-red-500 hover:underline">
        Delete
      </button>
    </div>
  )
}
