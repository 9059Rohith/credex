# Supabase Database Setup

## Required Tables

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Create audits table
CREATE TABLE audits (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  tools_input JSONB NOT NULL,
  audit_result JSONB NOT NULL,
  ai_summary TEXT,
  total_monthly_savings NUMERIC,
  total_annual_savings NUMERIC,
  use_case TEXT,
  team_size INTEGER
);

-- Create leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  audit_id TEXT REFERENCES audits(id),
  email TEXT NOT NULL,
  company_name TEXT,
  role TEXT,
  team_size INTEGER,
  monthly_savings NUMERIC
);

-- Create indexes for better query performance
CREATE INDEX idx_audits_created_at ON audits(created_at DESC);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_audit_id ON leads(audit_id);

-- Enable Row Level Security (RLS)
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to read audits by ID (for shareable URLs)
CREATE POLICY "Anyone can view audits by ID"
  ON audits FOR SELECT
  USING (true);

-- Policy: Allow service role to insert audits
CREATE POLICY "Service role can insert audits"
  ON audits FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- Policy: Service role can insert leads
CREATE POLICY "Service role can insert leads"
  ON leads FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- Policy: Service role can read leads
CREATE POLICY "Service role can read leads"
  ON leads FOR SELECT
  USING (auth.role() = 'service_role');
```

## Environment Variables Needed

Add these to your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Get these values from your Supabase project settings:
- URL: Project Settings → API → Project URL
- Anon Key: Project Settings → API → anon public
- Service Role Key: Project Settings → API → service_role (keep this secret!)

## Vercel Environment Variables

Add the same variables to your Vercel project:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

## Verification

After running the SQL commands:
1. Check that both tables appear in your Supabase Table Editor
2. Check that RLS policies are active
3. Test an audit to confirm data is being saved
