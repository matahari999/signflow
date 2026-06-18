import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContractEmail(to: string, contractId: string) {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject: 'Action Required: Sign Your Contract',
    html: `<p>Please sign your contract at: <a href="https://signflow.com/sign/${contractId}">Sign Here</a></p>`
  });
}
