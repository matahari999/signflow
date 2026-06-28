import { NextRequest, NextResponse } from 'next/server'

const CREEM_API = 'https://api.creem.io/v1/checkouts'

async function createCreemCheckout(email?: string) {
  const apiKey = process.env.CREEM_API_KEY
  const productId = process.env.CREEM_PRODUCT_ID

  if (!apiKey || !productId) {
    throw new Error('CREEM_API_KEY or CREEM_PRODUCT_ID not configured')
  }

  const body: Record<string, unknown> = {
    product_id: productId,
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?upgraded=true`,
  }
  if (email) body.customer = { email }

  const res = await fetch(CREEM_API, {
    method: 'POST',
    headers: { 'x-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) throw new Error(await res.text())
  return (await res.json()) as { checkout_url: string }
}

export async function GET() {
  try {
    const { checkout_url } = await createCreemCheckout()
    return NextResponse.redirect(checkout_url)
  } catch (err) {
    console.error('Creem checkout error:', err)
    return NextResponse.json({ error: 'checkout failed' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    let email: string | undefined
    try {
      const body = await req.json()
      email = body.email
    } catch {}
    const { checkout_url } = await createCreemCheckout(email)
    return NextResponse.json({ url: checkout_url })
  } catch (err) {
    console.error('Creem checkout error:', err)
    return NextResponse.json({ error: 'checkout failed' }, { status: 500 })
  }
}
