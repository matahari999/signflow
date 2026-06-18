import { NextResponse } from 'next/server'

const LEMON_SQUEEZY_CHECKOUT_URL = 'https://signflow.lemonsqueezy.com/checkout/buy/your-product-id'

export async function POST() {
  return NextResponse.json({ url: LEMON_SQUEEZY_CHECKOUT_URL })
}
