'use server'

import { createAdminClient } from '@/utils/supabase/server'

export async function getContractById(contractId: string) {
  const { data, error } = await createAdminClient()
    .from('contracts')
    .select(`
      *,
      templates (name, description),
      profiles!contracts_user_id_fkey (email)
    `)
    .eq('id', contractId)
    .single()

  if (error) return null
  return data
}
