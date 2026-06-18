'use server'

import { PDFDocument, StandardFonts } from 'pdf-lib'

export async function generatePDF(formData: FormData) {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([600, 800])
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  page.drawText('Contract Agreement', { x: 50, y: 750, size: 20, font })
  
  let y = 700
  // 직접 반복문 대신 forEach 사용
  formData.forEach((value, key) => {
    page.drawText(`${key.replace('_', ' ').toUpperCase()}: ${value}`, { x: 50, y, size: 12, font })
    y -= 30
  })

  const pdfBytes = await pdfDoc.save()
  return Buffer.from(pdfBytes).toString('base64')
}
