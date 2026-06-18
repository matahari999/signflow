'use server'

import { supabaseAdmin } from '../lib/supabaseAdmin'

export async function getTemplateById(id: string) {
  const { data, error } = await supabaseAdmin
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
