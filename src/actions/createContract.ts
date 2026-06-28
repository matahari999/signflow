'use server'

import { createClient, createAdminClient } from '@/utils/supabase/server'
import { sendContractEmail } from './sendEmail'

const FREE_TIER_LIMIT = 3

export async function createContract(
  templateId: string,
  clientEmail: string,
  fields: Record<string, string>,
  templateName: string = 'Contract'
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { success: false, error: 'Not authenticated', contractId: null, emailSent: false }

  const admin = createAdminClient()

  const { data: profile } = await admin
    .from('profiles')
    .select('subscription_status')
    .eq('id', user.id)
    .single()

  const isPro = profile?.subscription_status === 'paid'

  if (!isPro) {
    const { count } = await admin
      .from('contracts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    if (count != null && count >= FREE_TIER_LIMIT) {
      return {
        success: false,
        error: `Free plan limited to ${FREE_TIER_LIMIT} contracts. Upgrade to Pro for unlimited contracts.`,
        contractId: null,
        emailSent: false,
      }
    }
  }

  const { data, error } = await admin
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

  const emailResult = await sendContractEmail(clientEmail, contractId, templateName)

  if (emailResult.success) {
    await admin
      .from('contracts')
      .update({ status: 'sent' })
      .eq('id', contractId)
  }

  return { success: true, contractId, error: null, emailSent: emailResult.success }
}
