'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DatePicker from './DatePicker'
import AdvancedAccordion from './AdvancedAccordion'
import { createContract } from '@/actions/createContract'

type Field = {
  name: string
  label: string
  type: string
  placeholder?: string
  defaultValue?: string
  required?: boolean
  advanced?: boolean
}

type Schema = {
  fields: Field[]
  pro?: boolean
}

type Template = {
  id: string
  name: string
  content: string | Record<string, unknown>
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field
  value: string
  onChange: (name: string, value: string) => void
}) {
  const shared =
    'w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {field.type === 'date' ? (
        <DatePicker
          value={value ?? ''}
          onChange={(iso) => onChange(field.name, iso)}
          placeholder={field.placeholder || 'Select a date…'}
          required={field.required}
        />
      ) : field.type === 'textarea' ? (
        <textarea
          className={shared}
          placeholder={field.placeholder ?? ''}
          rows={3}
          required={field.required}
          value={value ?? ''}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      ) : (
        <input
          type={field.type}
          className={shared}
          placeholder={field.placeholder ?? ''}
          required={field.required}
          value={value ?? ''}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      )}
    </div>
  )
}

export default function ContractForm({ template }: { template: Template }) {
  const router = useRouter()
  const raw = template.content
  const schema: Schema = typeof raw === 'string' ? JSON.parse(raw) : raw as Schema

  const defaults = Object.fromEntries(
    schema.fields
      .filter((f) => f.defaultValue !== undefined && f.defaultValue !== '')
      .map((f) => [f.name, f.defaultValue as string])
  )

  const [formData, setFormData] = useState<Record<string, string>>(defaults)
  const [clientEmail, setClientEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const handleChange = (name: string, value: string) =>
    setFormData((prev) => ({ ...prev, [name]: value }))

  const coreFields = schema.fields.filter((f) => !f.advanced)
  const advancedFields = schema.fields.filter((f) => f.advanced)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!clientEmail) {
      setError('Client email is required.')
      return
    }
    setPending(true)
    const result = await createContract(template.id, clientEmail, formData, template.name)
    setPending(false)
    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error ?? 'Failed to create contract. Please try again.')
    }
  }

  const inputClass = 'w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Client Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          required
          className={inputClass}
          placeholder="client@example.com"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
        />
      </div>

      {coreFields.map((field) => (
        <FieldInput
          key={field.name}
          field={field}
          value={formData[field.name] ?? ''}
          onChange={handleChange}
        />
      ))}

      <AdvancedAccordion
        fields={advancedFields}
        formData={formData}
        onChange={handleChange}
      />

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
      >
        {pending ? 'Creating…' : 'Create & Send Contract'}
      </button>
    </form>
  )
}
