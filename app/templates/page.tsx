import { getTemplates } from '@/actions/templates'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function TemplatesPage() {
  const templates = await getTemplates()

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Contract Templates</h1>
            <p className="text-sm text-gray-600 mt-1">
              Select a template to create your contract.
            </p>
          </div>
          <Link href="/dashboard" className="text-sm text-gray-600 hover:text-black">
            ← Dashboard
          </Link>
        </div>

        {templates.length === 0 ? (
          <div className="bg-white rounded-xl border p-12 text-center text-gray-500">
            <p>No templates found. Check your Supabase connection and run the seed script.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white border rounded-xl p-6 hover:shadow-md transition flex flex-col"
              >
                <h2 className="font-semibold text-lg mb-2">{template.name}</h2>
                <p className="text-sm text-gray-600 flex-1">{template.description}</p>
                <Link
                  href={`/templates/${template.id}`}
                  className="mt-5 block bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium text-center hover:bg-blue-700 transition"
                >
                  Use Template
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
