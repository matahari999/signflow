'use server'

import { createAdminClient } from '@/utils/supabase/server'

export async function getContracts(userId: string) {
  const { data, error } = await createAdminClient()
    .from('contracts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching contracts:', error)
    return []
  }
  return data
}
