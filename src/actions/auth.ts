'use server'

import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '../lib/supabaseServer'
import { supabaseAdmin } from '../lib/supabaseAdmin'

type AuthState = { error?: string } | undefined

export async function signUp(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) return { error: 'Email and password are required.' }
  if (password.length < 6) return { error: 'Password must be at least 6 characters.' }

  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) return { error: error.message }

  if (data.user) {
    await supabaseAdmin.from('profiles').upsert({
      id: data.user.id,
      email: data.user.email,
      subscription_status: 'free',
    })
  }

  redirect('/dashboard')
}

export async function signIn(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) return { error: 'Email and password are required.' }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) return { error: error.message }

  redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect('/login')
}
