export const CONTRACT_TEMPLATES = [
  {
    id: 'design',
    name: 'Freelance Design Contract',
    fields: ['client_name', 'project_fee', 'currency', 'start_date', 'deliverables', 'software_tools', 'revision_count', 'kill_fee_percent', 'ip_ownership', 'late_fee_percent', 'governing_law', 'dispute_resolution']
  },
  {
    id: 'web',
    name: 'Web Development Contract',
    fields: ['client_name', 'project_fee', 'currency', 'deadline', 'tech_stack', 'hosting_responsibility', 'revision_count', 'kill_fee_percent', 'ip_ownership', 'late_fee_percent', 'governing_law', 'dispute_resolution']
  },
  {
    id: 'content',
    name: 'Content Writing Contract',
    fields: ['client_name', 'word_count', 'payment_per_word', 'flat_fee', 'currency', 'topic', 'seo_requirements', 'revision_count', 'ip_ownership', 'late_fee_percent', 'governing_law', 'dispute_resolution']
  },
  {
    id: 'photo',
    name: 'Photography Contract',
    fields: ['client_name', 'event_date', 'fee', 'currency', 'shot_list', 'editing_included', 'usage_rights', 'kill_fee_percent', 'late_fee_percent', 'governing_law', 'dispute_resolution']
  },
  {
    id: 'general',
    name: 'General Service Contract',
    fields: ['client_name', 'service_description', 'fee', 'currency', 'payment_terms', 'start_date', 'kill_fee_percent', 'ip_ownership', 'late_fee_percent', 'governing_law', 'dispute_resolution']
  },
  {
    id: 'service-agreement',
    name: 'Freelance Service Agreement',
    fields: ['client_name', 'scope', 'fee', 'currency', 'timeline', 'expenses_billed', 'kill_fee_percent', 'ip_ownership', 'late_fee_percent', 'governing_law', 'dispute_resolution']
  },
  {
    id: 'nda',
    name: 'Non-Disclosure Agreement (NDA)',
    fields: ['party_a_name', 'party_b_name', 'confidential_info_description', 'term_years', 'jurisdiction', 'governing_law', 'dispute_resolution']
  },
  {
    id: 'retainer',
    name: 'Service Retainer Agreement',
    fields: ['client_name', 'monthly_fee', 'currency', 'hours_per_month', 'term_months', 'notice_period_days', 'ip_ownership', 'late_fee_percent', 'governing_law', 'dispute_resolution']
  },
  {
    id: 'contractor',
    name: 'Independent Contractor Agreement',
    fields: ['client_name', 'services', 'fee', 'currency', 'payment_schedule', 'expenses', 'classification_state', 'ip_ownership', 'late_fee_percent', 'kill_fee_percent', 'governing_law', 'dispute_resolution']
  },
  {
    id: 'sow',
    name: 'Statement of Work (SOW)',
    fields: ['client_name', 'project_name', 'objectives', 'deliverables', 'milestones', 'budget', 'currency', 'start_date', 'completion_date', 'late_fee_percent', 'governing_law', 'dispute_resolution']
  },
  {
    id: 'consulting',
    name: 'Consulting Agreement',
    fields: ['client_name', 'expertise_area', 'consulting_fee', 'currency', 'hours_estimated', 'expenses_billed', 'ip_ownership', 'late_fee_percent', 'governing_law', 'dispute_resolution']
  },
  {
    id: 'software',
    name: 'Software Development Agreement',
    fields: ['client_name', 'project_fee', 'currency', 'tech_stack', 'deadline', 'hosting_responsibility', 'license_type', 'source_code_escrow', 'revision_count', 'ip_ownership', 'late_fee_percent', 'governing_law', 'dispute_resolution']
  },
  {
    id: 'marketing',
    name: 'Marketing & SEO Contract',
    fields: ['client_name', 'monthly_fee', 'currency', 'channels', 'kpis', 'contract_term_months', 'notice_period_days', 'ip_ownership', 'late_fee_percent', 'governing_law', 'dispute_resolution']
  },
];
