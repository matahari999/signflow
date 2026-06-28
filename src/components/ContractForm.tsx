// components/ContractForm.tsx
'use client';

import { useState } from 'react';
import SignatureCanvas from './SignatureCanvas';

export default function ContractForm({ template }: { template: any }) {
  const schema = JSON.parse(template.content);
  const [formData, setFormData] = useState<any>({});
  const [signature, setSignature] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signature) {
        alert('Please sign the contract first.');
        return;
    }
    
    const response = await fetch('/api/contracts', {
      method: 'POST',
      body: JSON.stringify({
        templateId: template.id,
        fields: formData,
        signature: signature
      }),
    });

    if (response.ok) {
      alert('Contract created successfully!');
    } else {
      alert('Failed to create contract.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {schema.fields.map((field: any) => (
        <div key={field.name}>
          <label className="block text-sm font-medium">{field.label}</label>
          <input
            type={field.type}
            className="w-full border p-2 rounded"
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            required={field.required}
          />
        </div>
      ))}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">Signature</label>
        <SignatureCanvas onSave={(data) => setSignature(data)} />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Create & Sign Contract
      </button>
    </form>
  );
}
