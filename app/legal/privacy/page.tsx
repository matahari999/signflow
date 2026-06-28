import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b px-8 py-4">
        <Link href="/" className="font-bold text-xl">SignFlow</Link>
      </nav>
      <main className="max-w-3xl mx-auto px-8 py-16 prose prose-sm">
        <h1>Privacy Policy</h1>
        <p className="text-gray-500">Last updated: June 18, 2026</p>

        <h2>1. Information We Collect</h2>
        <p>When you create an account, we collect your email address and authentication credentials. When you create or sign contracts, we store the contract data, signature images, and party information you provide.</p>

        <h2>2. How We Use Your Information</h2>
        <p>We use your information to provide and improve the SignFlow service, send contract signing links to parties you designate, process payments via Creem, and communicate with you about your account.</p>

        <h2>3. Data Storage & Security</h2>
        <p>All data is stored in encrypted Supabase databases hosted in the US (East). We implement industry-standard security measures including encryption in transit (TLS) and at rest.</p>

        <h2>4. Third-Party Services</h2>
        <p>We use the following third-party services: Supabase (database and authentication), Creem (payment processing), Resend (email delivery), and Vercel (hosting). Each service has its own privacy policy governing data handling.</p>

        <h2>5. Data Retention</h2>
        <p>We retain your account data for as long as your account is active. Contract data is retained per your requirements. You may request deletion of your data at any time by contacting us.</p>

        <h2>6. Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal data. You may export your data or request account deletion by emailing <a href="mailto:sinab7500@gmail.com" className="text-blue-600 underline">sinab7500@gmail.com</a>.</p>

        <h2>7. Contact</h2>
        <p>For privacy-related inquiries: <strong><a href="mailto:sinab7500@gmail.com" className="text-blue-600 underline">sinab7500@gmail.com</a></strong></p>
      </main>
    </div>
  )
}
