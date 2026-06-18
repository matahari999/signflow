const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // 관리자 권한 사용

if (!supabaseServiceKey) {
  console.error('SUPABASE_SERVICE_ROLE_KEY is required in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const templates = [
  {
    name: 'Freelance Design Contract',
    description: 'Standard contract for freelance graphic/UI designers.',
    content: JSON.stringify({ fields: ['client_name', 'project_fee', 'start_date', 'deliverables'] })
  },
  {
    name: 'Web Development Contract',
    description: 'Standard contract for freelance web developers.',
    content: JSON.stringify({ fields: ['client_name', 'project_fee', 'deadline', 'tech_stack'] })
  },
  {
    name: 'Content Writing Contract',
    description: 'Standard contract for freelance writers.',
    content: JSON.stringify({ fields: ['client_name', 'word_count', 'payment_per_word', 'topic'] })
  },
  {
    name: 'Photography Contract',
    description: 'Standard contract for photographers.',
    content: JSON.stringify({ fields: ['client_name', 'event_date', 'fee', 'shot_list'] })
  },
  {
    name: 'General Service Contract',
    description: 'A generic service contract for various freelancers.',
    content: JSON.stringify({ fields: ['client_name', 'service_description', 'fee', 'payment_terms'] })
  }
];

async function insertTemplates() {
  console.log('Inserting templates...');
  const { data, error } = await supabase.from('templates').insert(templates);
  
  if (error) {
    console.error('Insert Failed:', error.message);
  } else {
    console.log('Insert Successful!');
  }
}

insertTemplates();
