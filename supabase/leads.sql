-- Run once in the Supabase SQL editor.
-- RLS is on with NO policies: the anon key can't read or write this table.
-- Inserts come only from the server, using the service role key.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  gym_name text not null,
  contact_name text not null,
  phone text not null,               -- normalised to +234XXXXXXXXXX
  email text,
  city text,
  member_band text,
  source text,                       -- utm or referrer
  created_at timestamptz default now()
);

-- Founding gym commitment: a commitment is a lead with money attached.
alter table public.leads add column if not exists commitment_amount integer;  -- kobo
alter table public.leads add column if not exists commitment_months integer;
alter table public.leads add column if not exists commitment_status text      -- interested | paid | refunded | redeemed
  check (commitment_status in ('interested', 'paid', 'refunded', 'redeemed'));

alter table public.leads enable row level security;

create index if not exists leads_created_at_idx on public.leads (created_at desc);
