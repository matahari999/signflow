'use server'

import { supabaseAdmin } from '../lib/supabaseAdmin'

export async function getContracts(userId: string) {
  const { data, error } = await supabaseAdmin
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
