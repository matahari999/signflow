-- Supabase DB Schema for SignFlow MVP

-- 1. Profiles (linked to auth.users)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique,
  subscription_status text default 'free', -- 'free' or 'paid'
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Templates
create table if not exists templates (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  content text not null, -- JSON schema for form fields
  description text
);

-- 3. Contracts
create table if not exists contracts (
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
create table if not exists signatures (
  id uuid default gen_random_uuid() primary key,
  contract_id uuid references contracts(id) on delete cascade,
  signature_data text, -- Base64/SVG path
  signed_at timestamp with time zone default timezone('utc'::text, now())
);

-- Row Level Security
alter table profiles enable row level security;
alter table contracts enable row level security;
alter table signatures enable row level security;

-- Profiles: users can read/update their own profile
create policy "Users can read own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Contracts: users can CRUD their own contracts
create policy "Users can insert own contracts"
  on contracts for insert
  with check (auth.uid() = user_id);

create policy "Users can read own contracts"
  on contracts for select
  using (auth.uid() = user_id);

create policy "Users can update own contracts"
  on contracts for update
  using (auth.uid() = user_id);

create policy "Users can delete own contracts"
  on contracts for delete
  using (auth.uid() = user_id);

-- Signatures: contractors can read signatures on their contracts
create policy "Users can read signatures on own contracts"
  on signatures for select
  using (
    exists (
      select 1 from contracts
      where contracts.id = signatures.contract_id
      and contracts.user_id = auth.uid()
    )
  );

create policy "Signers can insert signatures"
  on signatures for insert
  with check (true); -- Allow signers (who may not be logged in via client link) to sign
