'use server'

import { createAdminClient } from '@/utils/supabase/server'

export async function getTemplateById(id: string) {
  const { data, error } = await createAdminClient()
    .from('templates')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching template:', error)
    return null
  }
  return data
}
