'use server'

import { createAdminClient } from '@/utils/supabase/server'
import { sendContractEmail } from './sendEmail'

export async function resendContract(contractId: string) {
  const { data, error } = await createAdminClient()
    .from('contracts')
    .select('client_email, templates(name)')
    .eq('id', contractId)
    .single()

  if (error || !data) return { success: false, error: 'Contract not found' }

  const templateName = (Array.isArray(data.templates) ? data.templates[0] : data.templates)?.name || 'Contract'
  const emailResult = await sendContractEmail(data.client_email, contractId, templateName)

  if (emailResult.success) {
    await createAdminClient()
      .from('contracts')
      .update({ status: 'sent' })
      .eq('id', contractId)
  }

  return emailResult
}
