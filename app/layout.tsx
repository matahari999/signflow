import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'SignFlow — Freelance E-Signing',
  description: 'Create, send, and collect e-signatures for your freelance contracts.',
  openGraph: {
    title: 'SignFlow — Freelance E-Signing',
    description: 'Create, send, and collect e-signatures for your freelance contracts.',
    type: 'website',
    siteName: 'SignFlow',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SignFlow — Freelance E-Signing',
    description: 'Create, send, and collect e-signatures for your freelance contracts.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
