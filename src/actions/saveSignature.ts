'use server'

import { supabaseAdmin } from '../lib/supabaseAdmin'

export async function saveSignature(contractId: string, signatureData: string) {
  const { error } = await supabaseAdmin
    .from('signatures')
    .insert([{ contract_id: contractId, signature_data: signatureData }])

  if (error) {
    console.error('Signature save failed:', error)
    return { success: false }
  }

  await supabaseAdmin
    .from('contracts')
    .update({ status: 'signed' })
    .eq('id', contractId)

  return { success: true }
}
