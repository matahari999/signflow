import Link from 'next/link'
import { redirect } from 'next/navigation'
import ContractForm from '@/components/ContractForm'
import { getTemplateById } from '@/actions/getTemplateById'
import { createSupabaseServerClient } from '@/lib/supabaseServer'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

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

  const content = typeof template.content === 'string' ? JSON.parse(template.content) : template.content
  const fields: string[] = content.fields
  const isPro = content.pro === true

  // Check user plan for pro templates
  if (isPro) {
    let user = null
    try {
      const supabase = await createSupabaseServerClient()
      const { data } = await supabase.auth.getUser()
      user = data.user
    } catch {}

    if (user) {
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('subscription_status')
        .eq('id', user.id)
        .single()

      if (profile?.subscription_status !== 'paid') {
        redirect('/pricing')
      }
    } else {
      redirect('/login')
    }
  }

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
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{template.name}</h1>
            {isPro && (
              <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded">PRO</span>
            )}
          </div>
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
