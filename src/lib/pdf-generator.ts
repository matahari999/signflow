import { PDFDocument, StandardFonts } from 'pdf-lib';

export async function generateContractPdf(data: Record<string, string>, templateName: string) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  page.drawText(`${templateName}`, { x: 50, y: 750, size: 20, font });
  
  let y = 700;
  for (const [key, value] of Object.entries(data)) {
    page.drawText(`${key}: ${value}`, { x: 50, y, size: 12, font });
    y -= 30;
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
