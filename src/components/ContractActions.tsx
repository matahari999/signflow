'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteContract } from '@/actions/deleteContract'
import { resendContract } from '@/actions/resendContract'

export default function ContractActions({ contractId, status }: { contractId: string; status: string }) {
  const router = useRouter()
  const [message, setMessage] = useState<string | null>(null)

  const flash = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(null), 3000)
  }

  const handleDelete = async () => {
    if (!confirm('Delete this contract?')) return
    const result = await deleteContract(contractId)
    if (result.success) {
      router.refresh()
    } else {
      flash(result.error || 'Failed to delete')
    }
  }

  const handleResend = async () => {
    const result = await resendContract(contractId)
    if (result.success) {
      flash('Email resent')
      router.refresh()
    } else {
      flash('Failed to resend — check RESEND_API_KEY')
    }
  }

  const copyLink = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}/sign/${contractId}`)
    flash('Link copied')
  }

  return (
    <div className="flex items-center gap-2">
      {message && (
        <span className="text-xs text-gray-500 italic">{message}</span>
      )}
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
