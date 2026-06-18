'use server'

import { supabaseAdmin } from '../lib/supabaseAdmin'
import { createSupabaseServerClient } from '../lib/supabaseServer'

export async function getTemplates() {
  let user = null
  try {
    const supabase = await createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch {}

  let isPro = false
  if (user) {
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('subscription_status')
      .eq('id', user.id)
      .single()
    isPro = profile?.subscription_status === 'paid'
  }

  const { data, error } = await supabaseAdmin.from('templates').select('*')

  if (error) {
    console.error('Error fetching templates:', error)
    return []
  }

  return data.map((t: any) => {
    const content = typeof t.content === 'string' ? JSON.parse(t.content) : t.content
    return {
      ...t,
      content,
      pro: content?.pro === true,
      locked: content?.pro === true && !isPro,
    }
  })
}
