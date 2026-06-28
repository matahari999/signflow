import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createAdminClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  const rawBody = await request.text()
  const secret = process.env.CREEM_WEBHOOK_SECRET

  if (!secret) {
    console.error('webhook: CREEM_WEBHOOK_SECRET not configured')
    return NextResponse.json({ error: 'server misconfiguration' }, { status: 500 })
  }

  const signature = request.headers.get('creem-signature')
  if (!signature) {
    return NextResponse.json({ error: 'missing signature' }, { status: 401 })
  }

  const computed = crypto.createHmac('sha256', secret).update(rawBody).digest('hex')
  if (!crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(signature))) {
    return NextResponse.json({ error: 'invalid signature' }, { status: 401 })
  }

  const payload = JSON.parse(rawBody) as {
    eventType: string
    object?: { customer?: { email?: string }; status?: string }
  }
  const { eventType } = payload
  const email = payload.object?.customer?.email

  if (!email) return NextResponse.json({ ok: true })

  let status: 'paid' | 'free' | null = null

  switch (eventType) {
    case 'checkout.completed':
    case 'subscription.active':
    case 'subscription.paid':
    case 'subscription.trialing':
    case 'subscription.scheduled_cancel': {
      status = 'paid'
      break
    }
    case 'subscription.canceled':
    case 'subscription.expired':
    case 'subscription.past_due':
    case 'subscription.paused': {
      status = 'free'
      break
    }
    case 'subscription.update': {
      const s = payload.object?.status ?? ''
      status = ['active', 'paid', 'trialing'].includes(s) ? 'paid' : 'free'
      break
    }
    default:
      return NextResponse.json({ ok: true })
  }

  if (status) {
    const { error } = await createAdminClient()
      .from('profiles')
      .update({ subscription_status: status })
      .eq('email', email)

    if (error) {
      console.error('webhook: profile update failed', error)
      return NextResponse.json({ error: 'db update failed' }, { status: 500 })
    }
  }

  return NextResponse.json({ ok: true })
}
