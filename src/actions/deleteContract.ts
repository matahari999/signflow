'use server'

import { supabaseAdmin } from '../lib/supabaseAdmin'
import { createSupabaseServerClient } from '../lib/supabaseServer'

export async function deleteContract(contractId: string) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  const { error } = await supabaseAdmin
    .from('contracts')
    .delete()
    .eq('id', contractId)
    .eq('user_id', user.id)

  if (error) {
    console.error('Delete failed:', error)
    return { success: false, error: error.message }
  }
  return { success: true }
}
