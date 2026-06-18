import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SignFlow — Freelance E-Signing',
  description: 'Create, send, and collect e-signatures for your freelance contracts.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
