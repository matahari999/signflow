import { NextRequest, NextResponse } from 'next/server'

const LEMON_SQUEEZY_CHECKOUT_URL = 'https://signflow-pro.lemonsqueezy.com/checkout/buy/4fdd31bb-aaae-4a81-8393-c1c0bffa35c7'

export async function POST(req: NextRequest) {
  const params = new URLSearchParams()
  params.set('checkout[locale]', 'en')

  try {
    const body = await req.json()
    if (body.email) {
      params.set('checkout[email]', body.email)
    }
  } catch {}

  const url = `${LEMON_SQUEEZY_CHECKOUT_URL}?${params.toString()}`

  return NextResponse.json({ url })
}
