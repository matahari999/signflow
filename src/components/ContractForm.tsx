'use client'

import { useState } from 'react'
import SignatureCanvas from './SignatureCanvas'
import DatePicker from './DatePicker'
import AdvancedAccordion from './AdvancedAccordion'

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

export default function ContractForm({ template }: { template: any }) {
  const raw = template.content
  const schema: Schema = typeof raw === 'string' ? JSON.parse(raw) : raw

  // Seed formData with defaultValues from advanced fields
  const defaults = Object.fromEntries(
    schema.fields
      .filter((f) => f.defaultValue !== undefined && f.defaultValue !== '')
      .map((f) => [f.name, f.defaultValue as string])
  )

  const [formData, setFormData] = useState<Record<string, string>>(defaults)
  const [signature, setSignature] = useState<string | null>(null)

  const handleChange = (name: string, value: string) =>
    setFormData((prev) => ({ ...prev, [name]: value }))

  const coreFields = schema.fields.filter((f) => !f.advanced)
  const advancedFields = schema.fields.filter((f) => f.advanced)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!signature) {
      alert('Please sign the contract first.')
      return
    }
    const response = await fetch('/api/contracts', {
      method: 'POST',
      body: JSON.stringify({
        templateId: template.id,
        fields: formData,
        signature,
      }),
    })
    if (response.ok) {
      alert('Contract created successfully!')
    } else {
      alert('Failed to create contract.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Core fields — always visible */}
      {coreFields.map((field) => (
        <FieldInput
          key={field.name}
          field={field}
          value={formData[field.name] ?? ''}
          onChange={handleChange}
        />
      ))}

      {/* Advanced options — accordion */}
      <AdvancedAccordion
        fields={advancedFields}
        formData={formData}
        onChange={handleChange}
      />

      {/* Signature */}
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Signature <span className="text-red-500">*</span>
        </label>
        <SignatureCanvas onSave={(data) => setSignature(data)} />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
      >
        Create &amp; Sign Contract
      </button>
    </form>
  )
}
