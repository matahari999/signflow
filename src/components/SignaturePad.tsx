'use client'

import { useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'

export default function SignaturePad({ onSave }: { onSave: (data: string) => void }) {
  const sigCanvas = useRef<any>(null)

  const handleSave = () => {
    const data = sigCanvas.current.toDataURL()
    onSave(data)
  }

  return (
    <div className="border p-4 rounded-lg">
      <SignatureCanvas 
        ref={sigCanvas}
        canvasProps={{ width: 500, height: 200, className: 'border border-gray-300 rounded' }} 
      />
      <div className="mt-4 flex gap-2">
        <button onClick={() => sigCanvas.current.clear()} className="bg-gray-200 px-4 py-2 rounded">Clear</button>
        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save Signature</button>
      </div>
    </div>
  )
}
