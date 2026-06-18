'use client'

import { createBrowserClient } from '@supabase/ssr'

export default function GoogleSignInButton() {
  const handleGoogleSignIn = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
    >
      <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M47.532 24.552c0-1.636-.145-3.2-.415-4.695H24.48v8.874h12.985c-.56 3.02-2.26 5.578-4.815 7.293v6.063h7.79c4.556-4.197 7.092-10.381 7.092-17.535z" fill="#4285F4"/>
        <path d="M24.48 48c6.513 0 11.977-2.159 15.97-5.853l-7.79-6.063c-2.158 1.449-4.916 2.304-8.18 2.304-6.294 0-11.627-4.252-13.532-9.965H2.88v6.255C6.857 42.932 15.056 48 24.48 48z" fill="#34A853"/>
        <path d="M10.948 28.423A14.487 14.487 0 0 1 10.2 24c0-1.535.263-3.026.748-4.423v-6.255H2.88A23.973 23.973 0 0 0 .48 24c0 3.868.927 7.523 2.4 10.678l8.068-6.255z" fill="#FBBC05"/>
        <path d="M24.48 9.612c3.547 0 6.727 1.22 9.23 3.614l6.923-6.923C36.452 2.414 30.988 0 24.48 0 15.056 0 6.857 5.068 2.88 13.322l8.068 6.255c1.905-5.713 7.238-9.965 13.532-9.965z" fill="#EA4335"/>
      </svg>
      Continue with Google
    </button>
  )
}
