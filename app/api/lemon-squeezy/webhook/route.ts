import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

async function updateSubscription(email: string, status: string) {
  const { error } = await supabaseAdmin
    .from('profiles')
    .update({ subscription_status: status })
    .eq('email', email)

  if (error) {
    console.error(`Failed to update subscription for ${email}:`, error)
    return false
  }
  return true
}

export async function POST(request: Request) {
  const body = await request.json()
  const eventName = body.meta?.event_name
  const email = body.data?.attributes?.user_email

  if (!email) {
    return NextResponse.json({ received: true })
  }

  switch (eventName) {
    case 'order_created':
    case 'subscription_created':
    case 'subscription_updated':
      await updateSubscription(email, 'paid')
      break

    case 'subscription_cancelled':
    case 'subscription_expired':
      await updateSubscription(email, 'free')
      break
  }

  return NextResponse.json({ received: true })
}
