// components/SignatureCanvas.tsx
'use client';

import { useRef, useState } from 'react';
import ReactSignatureCanvas from 'react-signature-canvas';

export default function SignatureCanvas({ onSave }: { onSave: (data: string) => void }) {
  const sigCanvas = useRef<any>(null);

  const clear = () => sigCanvas.current?.clear();
  const save = () => onSave(sigCanvas.current?.toDataURL());

  return (
    <div className="border p-2 rounded">
      <ReactSignatureCanvas
        ref={sigCanvas}
        penColor='black'
        canvasProps={{ width: 500, height: 200, className: 'border' }}
      />
      <div className="mt-2 flex gap-2">
        <button onClick={clear} className="bg-gray-200 px-4 py-1 rounded">Clear</button>
        <button onClick={save} className="bg-green-600 text-white px-4 py-1 rounded">Save</button>
      </div>
    </div>
  );
}
