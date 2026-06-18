'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContractEmail(clientEmail: string, contractId: string, templateName: string) {
  const signingUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/sign/${contractId}`

  try {
    await resend.emails.send({
      from: 'SignFlow <onboarding@resend.dev>',
      to: clientEmail,
      subject: `Please sign your contract — ${templateName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 8px;">You have a contract to sign</h2>
          <p style="color: #555; margin-bottom: 24px;">
            A contract has been sent to you for your digital signature.
            Please review and sign it at your earliest convenience.
          </p>
          <a href="${signingUrl}"
             style="display: inline-block; background: #2563eb; color: white;
                    padding: 12px 24px; border-radius: 8px; text-decoration: none;
                    font-weight: bold;">
            Sign Contract
          </a>
          <p style="color: #999; font-size: 12px; margin-top: 24px;">
            Or copy this link: ${signingUrl}
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #aaa; font-size: 11px;">Powered by SignFlow</p>
        </div>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Email failed:', error)
    return { success: false }
  }
}
