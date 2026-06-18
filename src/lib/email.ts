import { Resend } from 'resend'

export async function sendContractEmail(to: string, contractId: string) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from: 'SignFlow <onboarding@resend.dev>',
    to,
    subject: 'Action Required: Sign Your Contract',
    html: `<p>Please sign your contract at: <a href="${process.env.NEXT_PUBLIC_SITE_URL}/sign/${contractId}">Sign Here</a></p>`,
  })
}
