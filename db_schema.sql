-- Supabase DB Schema for SignFlow MVP

-- 1. Profiles (linked to auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique,
  subscription_status text default 'free', -- 'free' or 'paid'
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Templates
create table templates (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  content text not null, -- JSON schema for form fields
  description text
);

-- 3. Contracts
create table contracts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  template_id uuid references templates(id),
  client_email text,
  status text default 'draft', -- 'draft', 'sent', 'signed'
  fields jsonb, -- Custom user input
  signed_pdf_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. Signatures (for audit trail)
create table signatures (
  id uuid default gen_random_uuid() primary key,
  contract_id uuid references contracts(id) on delete cascade,
  signature_data text, -- Base64/SVG path
  signed_at timestamp with time zone default timezone('utc'::text, now())
);
