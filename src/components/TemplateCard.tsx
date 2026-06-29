'use client'

import { useState } from 'react'
import Link from 'next/link'
import ProUpgradeModal from './ProUpgradeModal'

interface Template {
  id: string
  name: string
  description: string | null
  pro: boolean
  locked: boolean
}

interface Props {
  template: Template
  userEmail?: string
}

export default function TemplateCard({ template, userEmail }: Props) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div
        className={`bg-white border rounded-xl p-6 hover:shadow-md transition flex flex-col relative ${
          template.pro ? 'border-yellow-200' : ''
        }`}
      >
        {template.pro && (
          <span className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded">
            PRO
          </span>
        )}

        <h2 className="font-semibold text-lg mb-2 pr-12">{template.name}</h2>
        <p className="text-sm text-gray-600 flex-1">{template.description}</p>

        {template.locked ? (
          <button
            onClick={() => setShowModal(true)}
            className="mt-5 w-full bg-yellow-500 text-black px-4 py-2.5 rounded-lg text-sm font-bold text-center hover:bg-yellow-400 transition flex items-center justify-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Unlock with Pro
          </button>
        ) : (
          <Link
            href={`/templates/${template.id}`}
            className="mt-5 block bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium text-center hover:bg-blue-700 transition"
          >
            Use Template
          </Link>
        )}
      </div>

      {showModal && (
        <ProUpgradeModal
          templateName={template.name}
          userEmail={userEmail}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
