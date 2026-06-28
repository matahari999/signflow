'use server'

import { createClient, createAdminClient } from '@/utils/supabase/server'

export async function getTemplates() {
  let user = null
  try {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch {}

  let isPro = false
  if (user) {
    const { data: profile } = await createAdminClient()
      .from('profiles')
      .select('subscription_status')
      .eq('id', user.id)
      .single()
    isPro = profile?.subscription_status === 'paid'
  }

  const { data, error } = await createAdminClient().from('templates').select('*')

  if (error) {
    console.error('Error fetching templates:', error)
    return []
  }

  type TemplateRow = { id: string; name: string; description: string | null; content: string | Record<string, unknown> }
  return (data as TemplateRow[]).map((t) => {
    const content = typeof t.content === 'string' ? JSON.parse(t.content) as Record<string, unknown> : t.content
    const isProTemplate = content?.pro === true
    return { ...t, content, pro: isProTemplate, locked: isProTemplate && !isPro }
  })
}
