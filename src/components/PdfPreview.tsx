'use client';
import { generatePDF } from '@/actions/generatePDF';

export default function PdfPreview({ data, templateName }: { data: Record<string, string>, templateName: string }) {
  const handleDownload = async () => {
    const base64 = await generatePDF(data, templateName);
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'contract.pdf';
    link.click();
  };

  return (
    <button onClick={handleDownload} className="bg-blue-600 text-white px-4 py-2 rounded">
      Download PDF
    </button>
  );
}
