import { getTemplates } from '@/actions/templates'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import TemplateCard from '@/components/TemplateCard'

export const dynamic = 'force-dynamic'

export default async function TemplatesPage() {
  const templates = await getTemplates()

  let userEmail: string | undefined
  try {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    userEmail = data.user?.email ?? undefined
  } catch {}

  const freeCount = templates.filter((t) => !t.pro).length
  const proCount = templates.filter((t) => t.pro).length

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Contract Templates</h1>
            <p className="text-sm text-gray-600 mt-1">
              {freeCount} free · <span className="text-yellow-600 font-medium">{proCount} Pro</span>
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
              <TemplateCard
                key={template.id}
                template={template}
                userEmail={userEmail}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
