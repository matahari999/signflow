'use server'

import { supabaseAdmin } from '../lib/supabaseAdmin'
import { createSupabaseServerClient } from '../lib/supabaseServer'

export async function createContract(
  templateId: string,
  clientEmail: string,
  fields: Record<string, string>
) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { success: false, error: 'Not authenticated', contractId: null }

  const { data, error } = await supabaseAdmin
    .from('contracts')
    .insert([{
      user_id: user.id,
      template_id: templateId,
      client_email: clientEmail,
      fields,
      status: 'draft',
    }])
    .select()
    .single()

  if (error) {
    console.error('Contract creation failed:', error)
    return { success: false, error: error.message, contractId: null }
  }
  return { success: true, contractId: data.id as string, error: null }
}
