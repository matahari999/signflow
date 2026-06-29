'use client'

import { useState, useRef, useEffect } from 'react'
import DatePicker from './DatePicker'

type Field = {
  name: string
  label: string
  type: string
  placeholder?: string
  defaultValue?: string
  required?: boolean
  advanced?: boolean
}

// Per-field hint shown inside the panel (above the input)
const HINTS: Record<string, string> = {
  // ── Common / Legal ──────────────────────────────────────────────────────
  currency:             'Defaults to USD. Change only if billing in another currency.',
  ip_ownership:         'Ownership transfers to the client once full payment is received.',
  late_fee_percent:     'Monthly % charged on overdue invoices — e.g. 1.5%/month.',
  governing_law:        'State or country whose laws govern this contract (e.g. California, USA).',
  dispute_resolution:   'How disagreements are resolved before going to court (e.g. Mediation / Arbitration).',
  kill_fee_percent:     'Cancellation fee owed if the client kills the project after work begins. Industry standard: 25–50%.',
  notice_period_days:   "Days' notice either party must give before terminating the agreement.",
  expenses_billed:      'Whether pre-approved out-of-pocket expenses are reimbursed by the client.',
  jurisdiction:         'County or district where any legal proceedings would take place.',
  start_date:           'When work officially begins under this agreement.',
  contract_term_months: 'Total duration of the contract in months.',

  // ── Design ──────────────────────────────────────────────────────────────
  revision_count:       'Number of revision rounds included in the fee. Extra rounds are billed separately.',
  revision_policy:      'Defines what counts as one revision round. Industry standard: all feedback submitted at once in a single batch — not drip-fed.',
  file_formats:         'File formats handed off upon completion (e.g. AI source, PDF, PNG, SVG). Clients often expect exports only unless source files are agreed.',
  software_tools:       'Tools used for this project (e.g. Figma, Adobe Illustrator). Sets expectations on source file compatibility.',

  // ── Development ─────────────────────────────────────────────────────────
  hosting_responsibility: 'Who manages hosting after delivery (e.g. Client, Developer until launch).',
  repo_access:          'Repository or codebase access granted to the client — specify platform, org name, and permission level (read/write). Transfer happens upon final payment.',
  acceptance_criteria:  'How the client formally approves delivered work. A defined window (e.g. 7 days) prevents open-ended review cycles.',
  license_type:         'Software license the client receives (e.g. MIT, Proprietary, GPL). Proprietary keeps the IP with you until sold.',
  source_code_escrow:   'Whether source code is held by a third party and released to the client upon specific conditions (e.g. bankruptcy, end of support).',

  // ── Writing ─────────────────────────────────────────────────────────────
  payment_per_word:     'Per-word rate if billing by word count instead of (or alongside) a flat fee.',
  seo_requirements:     'SEO structural requirements: meta description, H1/H2 usage, internal linking expectations.',
  target_keywords:      'Specific keywords the content must include. List primary and secondary keywords separated by commas.',
  plagiarism_guarantee: 'Originality guarantee for the delivered content. Copyscape is the industry standard tool — offering a report builds client trust.',

  // ── Photography ─────────────────────────────────────────────────────────
  editing_included:     'Editing deliverables included in the fee (e.g. 200 color-corrected JPEGs).',
  usage_rights:         'How the client may use the final photos (e.g. personal use, commercial, social media). Unlimited license typically costs more.',
  raw_files_included:   'Whether unedited RAW files are delivered. Most photographers exclude RAW files by default — note any extra fee if offered.',
  delivery_timeline:    'How long after the event the client can expect the edited photos. Sets clear expectations and prevents disputes.',
  rescheduling_policy:  'Terms for rescheduling or cancellation. Requiring advance notice and making the deposit non-refundable protects your time.',

  // ── Marketing ───────────────────────────────────────────────────────────
  reporting_frequency:  'How often and in what format performance reports are delivered. Monthly is standard; include the specific metrics covered.',
  ad_account_ownership: "Critical clause: who owns the ad accounts, pixel, and historical data. Clients should always own their accounts — agency holds manager access only.",

  // ── Consulting ──────────────────────────────────────────────────────────
  billing_type:         'How fees are structured. Hourly = flexible scope; retainer = reserved capacity; fixed = defined deliverable.',
  rate_increase_notice: 'Advance notice required before raising your rate. 30 days is standard — protects both parties from surprise changes.',

  // ── Retainer ────────────────────────────────────────────────────────────
  unused_hours_policy:  'What happens to hours not used in a billing cycle. Forfeiture is standard; rollover (capped) is a premium offering.',

  // ── SOW ─────────────────────────────────────────────────────────────────
  deliverables:         'Specific outputs the client will receive (files, reports, features). The more precise, the fewer scope disputes.',
  milestones:           'Key checkpoints with target dates (e.g. Week 2: Wireframes; Week 6: Launch). Ties payments to progress.',
  change_order_process: 'How out-of-scope requests are handled. Requiring a signed change order before starting prevents "scope creep for free."',

  // ── ICA ─────────────────────────────────────────────────────────────────
  classification_state: 'State used to determine worker classification rules (especially important in CA, NY, MA with strict contractor laws).',
  work_location:        'Whether work is performed remotely or on-site. Important for tax, classification, and expense reimbursement rules.',

  // ── NDA ─────────────────────────────────────────────────────────────────
  permitted_disclosures: 'Carve-outs where disclosure is legally required (e.g. court order). Without this, the NDA may be unenforceable.',
  return_of_materials:   'Obligation to return or certify destruction of confidential materials after the agreement ends.',

  // ── General ─────────────────────────────────────────────────────────────
  subcontractor_clause: 'Whether you may bring in subcontractors. Requiring written approval gives the client visibility into who handles their project.',
}

type AccordionItemProps = {
  index: number
  field: Field
  value: string
  onChange: (name: string, val: string) => void
}

function AccordionItem({ index, field, value, onChange }: AccordionItemProps) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const [panelHeight, setPanelHeight] = useState(0)

  // Remeasure height whenever content might change (open toggle)
  useEffect(() => {
    if (panelRef.current) {
      setPanelHeight(panelRef.current.scrollHeight)
    }
  }, [open])

  const hint = HINTS[field.name]
  const hasValue = value !== '' && value !== undefined

  const inputClass =
    'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'

  return (
    <div
      className={`rounded-xl border transition-colors duration-200 overflow-hidden ${
        open
          ? 'border-blue-500 shadow-sm'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left bg-white"
      >
        <span className="flex items-center gap-3 min-w-0">
          {/* Numbered icon */}
          <span
            className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-sm font-semibold transition-colors duration-200 ${
              open
                ? 'bg-blue-600 text-white'
                : 'bg-blue-50 text-blue-600'
            }`}
          >
            {index}
          </span>
          <span className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-medium text-gray-800 truncate">
              {field.label}
            </span>
            {/* Show current value as a badge when collapsed */}
            {!open && hasValue && (
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full truncate max-w-[120px]">
                {value}
              </span>
            )}
          </span>
        </span>
        {/* Chevron */}
        <svg
          className={`w-4 h-4 shrink-0 transition-transform duration-250 ${
            open ? 'rotate-180 text-blue-500' : 'text-gray-400'
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Panel — max-height animation */}
      <div
        style={{
          maxHeight: open ? `${panelHeight}px` : '0px',
          transition: 'max-height 0.28s ease',
          overflow: 'hidden',
        }}
      >
        <div ref={panelRef} className="px-4 pb-4 pt-0 pl-[3.75rem] bg-white">
          {hint && (
            <p className="text-xs text-gray-400 mb-3 leading-relaxed">{hint}</p>
          )}

          {field.type === 'date' ? (
            <DatePicker
              value={value}
              onChange={(iso) => onChange(field.name, iso)}
              placeholder={field.placeholder}
              required={field.required}
            />
          ) : field.type === 'textarea' ? (
            <textarea
              className={inputClass}
              placeholder={field.placeholder ?? ''}
              rows={3}
              value={value}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
          ) : (
            <input
              type={field.type}
              className={inputClass}
              placeholder={field.placeholder ?? ''}
              value={value}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

type Props = {
  fields: Field[]
  formData: Record<string, string>
  onChange: (name: string, value: string) => void
}

export default function AdvancedAccordion({ fields, formData, onChange }: Props) {
  if (fields.length === 0) return null

  return (
    <div className="mt-2">
      <p className="text-sm font-semibold text-gray-700 mb-1 ml-0.5">Advanced options</p>
      <p className="text-xs text-gray-400 mb-3 ml-0.5">
        Optional terms — defaults are sensible if you skip these.
      </p>
      <div className="flex flex-col gap-2.5">
        {fields.map((field, i) => (
          <AccordionItem
            key={field.name}
            index={i + 1}
            field={field}
            value={formData[field.name] ?? ''}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  )
}
