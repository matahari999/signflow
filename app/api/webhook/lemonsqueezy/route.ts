import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

async function createSignature(body: string, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false, ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(body))
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function updateSubscription(email: string, status: string) {
  const { error } = await supabaseAdmin
    .from('profiles')
    .update({ subscription_status: status })
    .eq('email', email)
  if (error) console.error('webhook update failed:', email, status, error.message)
  return !error
}

const ACTIVE = 'paid'
const INACTIVE = 'free'

export async function POST(request: Request) {
  const rawBody = await request.text()
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || process.env.LEMON_SQUEEZY_WEBHOOK_SECRET

  if (secret) {
    const signature = request.headers.get('x-signature') || ''
    const expected = await createSignature(rawBody, secret)
    if (signature !== expected) {
      console.error('webhook: invalid signature')
      return NextResponse.json({ error: 'invalid signature' }, { status: 401 })
    }
  }

  let body: any
  try { body = JSON.parse(rawBody) } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  const eventName = body.meta?.event_name
  const email = body.data?.attributes?.user_email
  if (!email) return NextResponse.json({ received: true })

  switch (eventName) {
    case 'subscription_created':
    case 'subscription_payment_success':
    case 'subscription_resumed':
      await updateSubscription(email, ACTIVE)
      break

    case 'subscription_cancelled':
    case 'subscription_expired':
    case 'subscription_payment_failed':
      await updateSubscription(email, INACTIVE)
      break

    case 'subscription_updated':
      const status = body.data?.attributes?.status
      if (status === 'active' || status === 'on_trial') {
        await updateSubscription(email, ACTIVE)
      } else {
        await updateSubscription(email, INACTIVE)
      }
      break

    case 'order_created':
      const variant = body.data?.attributes?.variant_name || ''
      if (variant.toLowerCase().includes('pro')) {
        await updateSubscription(email, ACTIVE)
      }
      break
  }

  return NextResponse.json({ received: true })
}
