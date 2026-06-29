'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'signflow_disclaimer_dismissed'

export default function DisclaimerBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true)
    }
  }, [])

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="bg-amber-50 border-b border-amber-200">
      <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-start gap-3">
        <svg
          className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
        <p className="text-xs text-amber-800 leading-relaxed flex-1">
          <span className="font-semibold">Legal Disclaimer:</span>{' '}
          The contract templates provided in this app are for informational purposes only and do not constitute legal advice.
          We strongly recommend reviewing any contract with a qualified legal professional before use.
          SignFlow assumes no liability for the use or reliance on these templates.
        </p>
        <button
          onClick={dismiss}
          aria-label="Dismiss disclaimer"
          className="shrink-0 text-amber-400 hover:text-amber-600 transition mt-0.5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
