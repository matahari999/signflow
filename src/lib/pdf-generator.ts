import { PDFDocument, StandardFonts, rgb, type RGB } from 'pdf-lib';

function formatDate(): string {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

type ClauseInput = { label: string; value: string };

function clause(text: string): ClauseInput {
  return { label: '', value: text };
}

export async function generateContractPdf(data: Record<string, string>, templateName: string) {
  const isNda = templateName.toLowerCase().includes('non-disclosure') || templateName.toLowerCase().includes('nda');

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let page = pdfDoc.addPage([612, 792]);
  const w = page.getWidth();
  let y = 760;
  const margin = 50;
  const lh = 14;

  const drawText = (text: string, size: number, x: number, opts?: { color?: RGB; font?: typeof font }) => {
    page.drawText(text, { x, y, size, font: opts?.font || font, color: opts?.color || rgb(0, 0, 0) });
  };

  const wrapText = (text: string, size: number, maxWidth: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let current = '';
    for (const word of words) {
      const test = current ? `${current} ${word}` : word;
      if (test.length * size * 0.55 > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
    return lines;
  };

  const checkSpace = (needed: number) => {
    if (y - needed < 50) {
      drawText(`Page ${pdfDoc.getPageCount()}`, w - 80, 20, { color: rgb(0.5, 0.5, 0.5), font });
      const newPage = pdfDoc.addPage([612, 792]);
      page = newPage;
      y = 760;
    }
  };

  const drawSection = (title: string, bodyLines: string[], size = 14) => {
    checkSpace(36);
    drawText(title, size, margin, { font: bold, color: rgb(0.15, 0.15, 0.15) });
    y -= 18;
    for (const line of bodyLines) {
      checkSpace(lh);
      drawText(line, 10, margin);
      y -= lh;
    }
    y -= 10;
  };

  // ---------- HEADER ----------
  drawText(templateName, 22, margin, { font: bold });
  y -= 8;
  page.drawLine({ start: { x: margin, y }, end: { x: w - margin, y }, thickness: 1.5, color: rgb(0.2, 0.2, 0.2) });
  y -= 22;
  drawText(`Date: ${formatDate()}`, 10, margin, { color: rgb(0.4, 0.4, 0.4) });
  y -= 20;

  // ---------- PARTIES ----------
  drawText('Parties', 14, margin, { font: bold });
  y -= 18;
  const clientName = data.client_name || data.party_a_name || 'Client';
  const counterParty = data.party_b_name || '';
  drawText(`Between: The Freelancer / Service Provider`, 11, margin);
  y -= 14;
  drawText(`And:    ${clientName}${counterParty ? ` (${counterParty})` : ''}`, 11, margin);
  y -= 26;

  if (counterParty) {
    drawText(`And:    ${counterParty}`, 11, margin);
    y -= 26;
  }

  // ---------- RECITAL ----------
  drawSection('1. Engagement', wrapText(
    `The Freelancer agrees to perform the services described in this Agreement for the Client. ` +
    `The parties agree that the Freelancer is an independent contractor and not an employee. ` +
    `Nothing in this Agreement shall create an employment, partnership, or joint venture relationship.`,
    10, w - margin * 2
  ));

  // ---------- TERMS / FIELDS ----------
  drawText('2. Scope of Work & Payment', 14, margin, { font: bold, color: rgb(0.15, 0.15, 0.15) });
  y -= 18;
  for (const [key, value] of Object.entries(data)) {
    const label = key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/^./, s => s.toUpperCase());
    checkSpace(lh);
    drawText(`${label}:`, 11, margin, { font: bold });
    y -= 13;
    const valLines = wrapText(String(value), 10, w - margin * 2);
    for (const line of valLines) {
      checkSpace(lh);
      drawText(`  ${line}`, 10, margin);
      y -= 13;
    }
    y -= 4;
  }
  y -= 8;

  // ---------- LEGAL CLAUSES ----------
  if (data.kill_fee_percent) {
    drawSection('3. Cancellation / Kill Fee',
      wrapText(`If the Client cancels this Agreement after work has commenced but before completion, ` +
        `the Client shall pay the Freelancer ${data.kill_fee_percent}% of the total fee for work completed up to the date of cancellation.`, 10, w - margin * 2));
  }

  if (data.ip_ownership && !isNda) {
    const ipText = data.ip_ownership.toLowerCase().includes('transfer')
      ? `Upon full payment of all fees, the Freelancer assigns all right, title, and interest in the work product to the Client. ` +
        `The Freelancer retains the right to display the work in their portfolio.`
      : `The Freelancer retains all right, title, and interest in the work product. ` +
        `The Client receives a perpetual, non-exclusive license to use the work product for its intended purpose.`;
    drawSection('4. Intellectual Property', wrapText(ipText, 10, w - margin * 2));
  }

  drawSection(isNda ? '3. Confidentiality' : '5. Confidentiality',
    wrapText(`Both parties agree to treat all confidential information shared under this Agreement as strictly confidential. ` +
      `Confidential information includes business plans, technical data, client lists, and financial information. ` +
      `This obligation survives termination of this Agreement.`, 10, w - margin * 2));

  if (data.late_fee_percent) {
    drawSection('6. Late Payment',
      wrapText(`Any invoice not paid within 14 days of the due date shall accrue interest at the rate of ` +
        `${data.late_fee_percent}% per month (${(parseFloat(data.late_fee_percent || '0') * 12).toFixed(1)}% per annum) ` +
        `until paid in full. The Client shall also be responsible for all reasonable collection costs.`, 10, w - margin * 2));
  }

  drawSection('7. Limitation of Liability',
    wrapText(`In no event shall either party be liable for any indirect, incidental, special, or consequential damages. ` +
      `The total liability of either party under this Agreement shall not exceed the total fees paid or payable under this Agreement.`, 10, w - margin * 2));

  drawSection('8. Force Majeure',
    wrapText(`Neither party shall be liable for any failure or delay in performance due to causes beyond its reasonable control, ` +
      `including but not limited to natural disasters, acts of government, pandemics, or internet outages.`, 10, w - margin * 2));

  const law = data.governing_law || 'the State of Delaware, USA';
  const resolution = data.dispute_resolution || 'binding arbitration in accordance with the rules of the American Arbitration Association';

  drawSection('9. Governing Law',
    wrapText(`This Agreement shall be governed by and construed in accordance with the laws of ${law}, ` +
      `without regard to its conflict of laws principles.`, 10, w - margin * 2));

  drawSection('10. Dispute Resolution',
    wrapText(`Any dispute arising out of or relating to this Agreement shall be resolved through ` +
      `${resolution}. The prevailing party shall be entitled to recover reasonable legal fees and costs.`, 10, w - margin * 2));

  drawSection('11. Entire Agreement',
    wrapText(`This Agreement constitutes the entire agreement between the parties and supersedes all prior agreements, ` +
      `whether written or oral. Any amendments must be in writing and signed by both parties.`, 10, w - margin * 2));

  // ---------- SIGNATURE SECTION ----------
  checkSpace(100);
  y -= 10;
  page.drawLine({ start: { x: margin, y }, end: { x: margin + 200, y }, thickness: 0.5, color: rgb(0.3, 0.3, 0.3) });
  y -= 4;
  drawText('Freelancer / Provider Signature', 9, margin, { color: rgb(0.4, 0.4, 0.4) });
  y -= 36;

  page.drawLine({ start: { x: margin, y }, end: { x: margin + 200, y }, thickness: 0.5, color: rgb(0.3, 0.3, 0.3) });
  y -= 4;
  drawText('Client Signature', 9, margin, { color: rgb(0.4, 0.4, 0.4) });
  y -= 36;

  page.drawLine({ start: { x: margin, y }, end: { x: margin + 200, y }, thickness: 0.5, color: rgb(0.3, 0.3, 0.3) });
  y -= 4;
  drawText('Date', 9, margin, { color: rgb(0.4, 0.4, 0.4) });

  // ---------- FOOTER ----------
  const numPages = pdfDoc.getPageCount();
  for (let i = 0; i < numPages; i++) {
    const p = pdfDoc.getPage(i);
    const pw = p.getWidth();
    p.drawText(`Generated by SignFlow — ${formatDate()}`, { x: margin, y: 20, size: 8, font, color: rgb(0.5, 0.5, 0.5) });
    p.drawText(`Page ${i + 1} of ${numPages}`, { x: pw - 80, y: 20, size: 8, font, color: rgb(0.5, 0.5, 0.5) });
  }

  return pdfDoc.save();
}
