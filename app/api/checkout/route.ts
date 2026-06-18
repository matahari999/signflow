import { NextResponse } from 'next/server'

const LEMON_SQUEEZY_CHECKOUT_URL = 'https://signflow-pro.lemonsqueezy.com/checkout/buy/4fdd31bb-aaae-4a81-8393-c1c0bffa35c7'

export async function POST() {
  return NextResponse.json({ url: LEMON_SQUEEZY_CHECKOUT_URL })
}
