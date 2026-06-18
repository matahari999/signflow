'use client'

import { useState } from 'react'
import { generatePDF } from '../actions/generatePDF'
import { createContract } from '../actions/createContract'

interface Props {
  fields: string[]
  templateId: string
  templateName: string
}

export default function ContractForm({ fields, templateId, templateName }: Props) {
  const [loading, setLoading] = useState(false)
  const [contractId, setContractId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const clientEmail = formData.get('client_email') as string

    const fieldsData: Record<string, string> = {}
    fields.forEach((field) => {
      fieldsData[field] = formData.get(field) as string
    })

    const result = await createContract(templateId, clientEmail, fieldsData)
    if (result.success && result.contractId) {
      setContractId(result.contractId)
    } else {
      setError(result.error ?? 'Failed to save contract.')
    }

    const base64 = await generatePDF(formData)
    const link = document.createElement('a')
    link.href = `data:application/pdf;base64,${base64}`
    link.download = `${templateName.replace(/\s+/g, '-').toLowerCase()}.pdf`
    link.click()

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Client Email</label>
        <input
          name="client_email"
          type="email"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="client@example.com"
        />
      </div>

      {fields.map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
            {field.replace(/_/g, ' ')}
          </label>
          <input
            name={field}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      ))}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {contractId && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800 font-medium mb-1">Contract saved!</p>
          <p className="text-xs text-green-700">
            Share this signing link with your client:
          </p>
          <code className="block mt-1 text-xs bg-green-100 px-2 py-1 rounded text-green-900 break-all">
            {typeof window !== 'undefined' ? window.location.origin : ''}/sign/{contractId}
          </code>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? 'Processing...' : 'Generate PDF & Save'}
        </button>
        {contractId && (
          <a
            href="/dashboard"
            className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
          >
            Go to Dashboard
          </a>
        )}
      </div>
    </form>
  )
}
