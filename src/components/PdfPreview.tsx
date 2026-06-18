'use client';
import { generateContractPdf } from '@/lib/pdf-generator';

export default function PdfPreview({ data, templateName }: { data: Record<string, string>, templateName: string }) {
  const handleDownload = async () => {
    const pdfBytes = await generateContractPdf(data, templateName);
    const blob = new Blob([pdfBytes as unknown as ArrayBuffer], { type: 'application/pdf' });
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
