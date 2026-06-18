import Link from 'next/link'
import ContractForm from '@/components/ContractForm'
import { getTemplateById } from '@/actions/getTemplateById'

export default async function CustomizePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const template = await getTemplateById(id)

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Template not found.</p>
      </div>
    )
  }

  const fields: string[] = JSON.parse(template.content).fields

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border p-8">
        <div className="mb-6">
          <Link
            href="/templates"
            className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block"
          >
            ← Back to Templates
          </Link>
          <h1 className="text-2xl font-bold">{template.name}</h1>
          <p className="text-gray-600 mt-1 text-sm">{template.description}</p>
        </div>
        <ContractForm
          fields={fields}
          templateId={template.id}
          templateName={template.name}
        />
      </div>
    </div>
  )
}
