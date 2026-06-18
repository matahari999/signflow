import Link from 'next/link'
import AuthForm from '@/components/AuthForm'
import { signIn } from '@/actions/auth'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border w-full max-w-md p-8">
        <div className="mb-8">
          <Link href="/" className="text-xl font-bold block mb-6">
            SignFlow
          </Link>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-gray-600 text-sm mt-1">Sign in to your account</p>
        </div>
        <AuthForm action={signIn} type="login" />
      </div>
    </div>
  )
}
