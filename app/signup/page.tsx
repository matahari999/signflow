import Link from 'next/link'
import AuthForm from '@/components/AuthForm'
import { signUp } from '@/actions/auth'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border w-full max-w-md p-8">
        <div className="mb-8">
          <Link href="/" className="text-xl font-bold block mb-6">
            SignFlow
          </Link>
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-gray-600 text-sm mt-1">
            Start sending contracts for free
          </p>
        </div>
        <AuthForm action={signUp} type="signup" />
      </div>
    </div>
  )
}
