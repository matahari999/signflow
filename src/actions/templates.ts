'use server'

import { supabaseAdmin } from '../lib/supabaseAdmin'

export async function getTemplates() {
  const { data, error } = await supabaseAdmin.from('templates').select('*')
  
  if (error) {
    console.error('Error fetching templates:', error)
    return []
  }
  return data
}
