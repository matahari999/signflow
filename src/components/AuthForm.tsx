'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import GoogleSignInButton from './GoogleSignInButton'

type AuthState = { error?: string } | undefined
type AuthAction = (prevState: AuthState, formData: FormData) => Promise<AuthState>

interface Props {
  action: AuthAction
  type: 'login' | 'signup'
}

export default function AuthForm({ action, type }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined)

  return (
    <div className="space-y-5">
      <GoogleSignInButton />

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">또는 이메일로 계속</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

    <form action={formAction} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          name="password"
          type="password"
          required
          autoComplete={type === 'login' ? 'current-password' : 'new-password'}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {pending ? 'Loading...' : type === 'login' ? 'Sign In' : 'Create Account'}
      </button>

      <p className="text-center text-sm text-gray-600">
        {type === 'login' ? (
          <>
            Don&apos;t have an account?{' '}
            <Link href="/signup"