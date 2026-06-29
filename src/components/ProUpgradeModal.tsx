'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Props {
  templateName: string
  userEmail?: string
  onClose: () => void
}

export default function ProUpgradeModal({ templateName, userEmail, onClose }: Props) {
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    setLoading(true)
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail }),
    })
    const data = await res.json()
    window.location.href = data.url
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded">PRO</span>
          <h2 className="text-lg font-bold">Pro Template</h2>
        </div>

        <p className="text-gray-700 text-sm mb-1 mt-3">
          <span className="font-semibold">{templateName}</span> is available on the Pro plan.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          Upgrade for $5/mo to unlock 6 Pro templates and unlimited contracts.
        </p>

        {userEmail ? (
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full bg-yellow-500 text-black py-2.5 rounded-lg font-bold hover:bg-yellow-400 transition text-sm disabled:opacity-60"
          >
            {loading ? 'Redirecting…' : 'Upgrade to Pro · $5/mo'}
          </button>
        ) : (
          <Link
            href="/login"
            className="block w-full text-center bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 transition"
          >
            Sign in to upgrade
          </Link>
        )}

        <button
          onClick={onClose}
          className="mt-3 w-full text-center text-sm text-gray-400 hover:text-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
