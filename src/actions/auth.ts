'use server'

import { redirect } from 'next/navigation'
import { createClient, createAdminClient } from '@/utils/supabase/server'

type AuthState = { error?: string } | undefined

export async function signUp(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) return { error: 'Email and password are required.' }
  if (password.length < 6) return { error: 'Password must be at least 6 characters.' }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) return { error: error.message }

  if (data.user) {
    try {
      await createAdminClient().from('profiles').upsert({
        id: data.user.id,
        email: data.user.email,
        subscription_status: 'free',
      })
    } catch {
      // Profile creation failed — non-fatal, user can still proceed
    }
  }

  redirect('/dashboard')
}

export async function signIn(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) return { error: 'Email and password are required.' }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) return { error: error.message }

  redirect('/dashboard')
}

export async function signOut() {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
  } catch {
    // ignore
  }
  redirect('/login')
}
