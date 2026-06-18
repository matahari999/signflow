import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(request: Request) {
  const body = await request.json()

  const eventName = body.meta?.event_name

  if (eventName === 'order_created') {
    const customerEmail = body.data?.attributes?.user_email
    const variantName = body.data?.attributes?.variant_name

    if (customerEmail && variantName) {
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({ subscription_status: 'paid' })
        .eq('email', customerEmail)

      if (error) {
        console.error('Failed to update subscription:', error)
        return NextResponse.json({ error: 'Update failed' }, { status: 500 })
      }
    }
  }

  return NextResponse.json({ received: true })
}
