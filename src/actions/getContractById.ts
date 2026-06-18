'use server'

import { supabaseAdmin } from '../lib/supabaseAdmin'

export async function getContractById(contractId: string) {
  const { data, error } = await supabaseAdmin
    .from('contracts')
    .select(`
      *,
      templates (name, description),
      profiles!contracts_user_id_fkey (email)
    `)
    .eq('id', contractId)
    .single()

  if (error) {
    console.error('Error fetching contract:', error)
    return null
  }
  return data
}
