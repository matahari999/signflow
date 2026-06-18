'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContractEmail(clientEmail: string, contractId: string) {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev', // 실제 도메인 연결 전 테스트용
      to: clientEmail,
      subject: 'You have a contract to sign',
      html: `<p>Please sign your contract here: <a href="${process.env.NEXT_PUBLIC_SITE_URL}/sign/${contractId}">Click to sign</a></p>`
    })
    return { success: true }
  } catch (error) {
    console.error('Email failed:', error)
    return { success: false }
  }
}
