'use server'

import { createAdminClient } from '@/utils/supabase/server'

export async function saveSignature(contractId: string, signatureData: string) {
  const admin = createAdminClient()

  const { data: contract } = await admin
    .from('contracts')
    .select('status')
    .eq('id', contractId)
    .single()

  if (!contract || contract.status !== 'sent') {
    return { success: false, error: 'Contract is not available for signing' }
  }

  const { error } = await admin
    .from('signatures')
    .insert([{ contract_id: contractId, signature_data: signatureData }])

  if (error) {
    console.error('Signature save failed:', error)
    return { success: false }
  }

  await admin
    .from('contracts')
    .update({ status: 'signed' })
    .eq('id', contractId)

  return { success: true }
}
