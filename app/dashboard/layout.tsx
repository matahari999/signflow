import Link from 'next/link'
import { signOut } from '@/actions/auth'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r p-6 flex flex-col">
        <Link href="/" className="text-xl font-bold mb-8 block">
          SignFlow
        </Link>
        <nav className="space-y-1 flex-1">
          <Link
            href="/dashboard"
            className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-black"
          >
            Dashboard
          </Link>
          <Link
            href="/templates"
            className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-black"
          >
            + New Contract
          </Link>
        </nav>
        <div className="pt-4 border-t">
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm text-gray-500 hover:text-red-600 transition w-full text-left px-3 py-2 rounded-lg hover:bg-red-50"
            >
              Sign Out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}
