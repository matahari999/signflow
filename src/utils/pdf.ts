// src/utils/pdf.ts
import { PDFDocument } from 'pdf-lib';

export async function generateContractPDF(fields: any, signatureData: string) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  
  // 간단한 텍스트 추가 (상세 디자인은 추후 고도화 가능)
  page.drawText('Service Contract', { x: 50, y: 750, size: 20 });
  
  let y = 700;
  for (const [key, value] of Object.entries(fields)) {
    page.drawText(`${key}: ${value}`, { x: 50, y });
    y -= 30;
  }

  // 서명 이미지 삽입 로직
  const pngImageBytes = Buffer.from(signatureData.split(',')[1], 'base64');
  const pngImage = await pdfDoc.embedPng(pngImageBytes);
  page.drawImage(pngImage, { x: 50, y: y - 100, width: 200, height: 100 });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
