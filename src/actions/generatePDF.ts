'use server'

import { generateContractPdf } from '../lib/pdf-generator'

export async function generatePDF(data: Record<string, string>, templateName: string) {
  const pdfBytes = await generateContractPdf(data, templateName)
  return Buffer.from(pdfBytes).toString('base64')
}
