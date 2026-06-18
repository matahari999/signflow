const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('SUPABASE_SERVICE_ROLE_KEY is required in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const templates = [
  {
    name: 'Freelance Design Contract',
    description: 'Standard contract for freelance graphic/UI/UX designers. Covers scope, deliverables, revisions, and IP transfer.',
    content: JSON.stringify({
      pro: false,
      fields: ['client_name', 'project_fee', 'currency', 'start_date', 'deliverables', 'software_tools', 'revision_count', 'kill_fee_percent', 'ip_ownership', 'late_fee_percent', 'governing_law', 'dispute_resolution']
    })
  },
  {
    name: 'Web Development Contract',
    description: 'Standard contract for freelance web developers. Covers tech stack, timeline, hosting, and handover.',
    content: JSON.stringify({
      pro: false,
      fields: ['client_name', 'project_fee', 'currency', 'deadline', 'tech_stack', 'hosting_responsibility', 'revision_count', 'kill_fee_percent', 'ip_ownership', 'late_fee_percent', 'governing_law', 'dispute_resolution']
    })
  },
  {
    name: 'Content Writing Contract',
    description: 'Standard contract for freelance writers. Covers word count, SEO requirements, and payment.',
    content: JSON.stringify({
      pro: false,
      fields: ['client_name', 'word_count', 'payment_per_word', 'flat_fee', 'currency', 'topic', 'seo_requirements', 'revision_count', 'ip_ownership', 'late_fee_percent', 'governing_law', 'dispute_resolution']
    })
  },
  {
    name: 'Photography Contract',
    description: 'Standard contract for photographers. Covers event date, shot list, editing, and usage rights.',
    content: JSON.stringify({
      pro: false,
      fields: ['client_name', 'event_date', 'fee', 'currency', 'shot_list', 'editing_included', 'usage_rights', 'kill_fee_percent', 'late_fee_percent', 'governing_law', 'dispute_resolution']
    })
  },
  {
    name: 'General Service Contract',
    description: 'Generic service contract for various freelancers. Includes independent contractor status and payment terms.',
    content: JSON.stringify({
      pro: false,
      fields: ['client_name', 'service_description', 'fee', 'currency', 'payment_terms', 'start_date', 'kill_fee_percent', 'ip_ownership', 'late_fee_percent', 'governing_law', 'dispute_resolution']
    })
  },
  {
    name: 'Freelance Service Agreement',
    description: 'Comprehensive freelance agreement for project-based work. Covers scope, expenses, and termination.',
    content: JSON.stringify({
      pro: false,
      fields: ['client_name', 'scope', 'fee', 'currency', 'timeline', 'expenses_billed', 'kill_fee_percent', 'ip_ownership', 'late_fee_percent', 'governing_law', 'dispute_resolution']
    })
  },
  {
    name: 'Non-Disclosure Agreement (NDA)',
    description: 'Mutual NDA to protect confidential information shared between two parties.',
    content: JSON.stringify({
      pro: false,
      fields: ['party_a_name', 'party_b_name', 'confidential_info_description', 'term_years', 'jurisdiction', 'governing_law', 'dispute_resolution']
    })
  },
  {
    name: 'Service Retainer Agreement',
    description: 'Monthly retainer agreement for ongoing services. Includes hours, fees, and termination notice.',
    content: JSON.stringify({
      pro: true,
      fields: ['client_name', 'monthly_fee', 'currency', 'hours_per_month', 'term_months', 'notice_period_days', 'ip_ownership', 'late_fee_percent', 'governing_law', 'dispute_resolution']
    })
  },
  {
    name: 'Independent Contractor Agreement',
    description: 'Standard independent contractor agreement with classification safeguards, IP assignment, and dispute resolution.',
    content: JSON.stringify({
      pro: true,
      fields: ['client_name', 'services', 'fee', 'currency', 'payment_schedule', 'expenses', 'classification_state', 'ip_ownership', 'late_fee_percent', 'kill_fee_percent', 'governing_law', 'dispute_resolution']
    })
  },
  {
    name: 'Statement of Work (SOW)',
    description: 'Detailed project SOW covering objectives, deliverables, milestones, and budget for large engagements.',
    content: JSON.stringify({
      pro: true,
      fields: ['client_name', 'project_name', 'objectives', 'deliverables', 'milestones', 'budget', 'currency', 'start_date', 'completion_date', 'late_fee_percent', 'governing_law', 'dispute_resolution']
    })
  },
  {
    name: 'Consulting Agreement',
    description: 'Consulting services contract covering expertise area, hours, expenses, and confidentiality.',
    content: JSON.stringify({
      pro: true,
      fields: ['client_name', 'expertise_area', 'consulting_fee', 'currency', 'hours_estimated', 'expenses_billed', 'ip_ownership', 'late_fee_percent', 'governing_law', 'dispute_resolution']
    })
  },
  {
    name: 'Software Development Agreement',
    description: 'Software development contract with source code ownership, license terms, and acceptance testing.',
    content: JSON.stringify({
      pro: true,
      fields: ['client_name', 'project_fee', 'currency', 'tech_stack', 'deadline', 'hosting_responsibility', 'license_type', 'source_code_escrow', 'revision_count', 'ip_ownership', 'late_fee_percent', 'governing_law', 'dispute_resolution']
    })
  },
  {
    name: 'Marketing & SEO Contract',
    description: 'Digital marketing and SEO retainer with channel strategy, KPIs, and monthly reporting.',
    content: JSON.stringify({
      pro: true,
      fields: ['client_name', 'monthly_fee', 'currency', 'channels', 'kpis', 'contract_term_months', 'notice_period_days', 'ip_ownership', 'late_fee_percent', 'governing_law', 'dispute_resolution']
    })
  }
];

async function insertTemplates() {
  console.log('Clearing existing templates...');
  await supabase.from('templates').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  console.log('Inserting 13 templates...');
  const { data, error } = await supabase.from('templates').insert(templates);

  if (error) {
    console.error('Insert Failed:', error.message);
  } else {
    console.log(`Insert Successful! ${data?.length || templates.length} templates loaded.`);
  }
}

insertTemplates();
