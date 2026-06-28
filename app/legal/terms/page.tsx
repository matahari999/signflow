import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b px-8 py-4">
        <Link href="/" className="font-bold text-xl">SignFlow</Link>
      </nav>
      <main className="max-w-3xl mx-auto px-8 py-16 prose prose-sm">
        <h1>Terms of Service</h1>
        <p className="text-gray-500">Last updated: June 18, 2026</p>

        <h2>1. Acceptance</h2>
        <p>By creating an account or using SignFlow, you agree to these Terms of Service. If you do not agree, do not use the service.</p>

        <h2>2. Description of Service</h2>
        <p>SignFlow provides a digital contract creation, sending, and e-signature platform for freelancers and small businesses.</p>

        <h2>3. Account Registration</h2>
        <p>You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.</p>

        <h2>4. Subscription & Payments</h2>
        <p>SignFlow offers a Free tier and a Pro subscription at $5/month. All payments are processed securely by Creem. You may cancel your subscription at any time; access to Pro features continues until the end of the billing period. Refunds are handled per Creem&apos;s refund policy.</p>

        <h2>5. Acceptable Use</h2>
        <p>You agree not to use SignFlow for any unlawful purpose, to impersonate others, to distribute malware, or to interfere with the service&apos;s operation. Contracts created through SignFlow are your sole responsibility.</p>

        <h2>6. Limitation of Liability</h2>
        <p>SignFlow is provided &quot;as is&quot; without warranty of any kind. We are not liable for any damages arising from your use of the service, including but not limited to contract disputes, data loss, or service interruptions. Our total liability shall not exceed the fees paid by you in the 12 months preceding the claim.</p>

        <h2>7. Governing Law</h2>
        <p>These terms are governed by the laws of the State of Delaware, USA. Any disputes shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.</p>

        <h2>8. Changes</h2>
        <p>We may update these terms at any time. Material changes will be notified via email. Continued use after changes constitutes acceptance.</p>

        <h2>9. Contact</h2>
        <p>For questions: <a href="mailto:sinab7500@gmail.com" className="text-blue-600 underline">sinab7500@gmail.com</a></p>
      </main>
    </div>
  )
}
