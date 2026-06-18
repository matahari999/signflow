'use server'

import { supabaseAdmin } from '../lib/supabaseAdmin'
import { createSupabaseServerClient } from '../lib/supabaseServer'
import { sendContractEmail } from './sendEmail'

export async function createContract(
  templateId: string,
  clientEmail: string,
  fields: Record<string, string>,
  templateName: string = 'Contract'
) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { success: false, error: 'Not authenticated', contractId: null, emailSent: false }

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
    return { success: false, error: error.message, contractId: null, emailSent: false }
  }

  const contractId = data.id as string

  // Send signing link to client
  const emailResult = await sendContractEmail(clientEmail, contractId, templateName)

  // Update status to 'sent' if email succeeded
  if (emailResult.success) {
    await supabaseAdmin
      .from('contracts')
      .update({ status: 'sent' })
      .eq('id', contractId)
  }

  return { success: true, contractId, error: null, emailSent: emailResult.success }
}
