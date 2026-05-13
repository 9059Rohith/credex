# 5-Minute Supabase Setup

This will activate Features 5 & 6 (Lead Capture + Shareable URLs)

## Step 1: Create Supabase Account (2 minutes)

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign in with GitHub
4. Click "New project"
5. Choose a name: `credex-ai-audit`
6. Generate a strong database password (save it!)
7. Choose region closest to you
8. Click "Create new project"
9. Wait ~2 minutes for setup

## Step 2: Run SQL Setup (1 minute)

1. In your Supabase dashboard, click "SQL Editor" in left sidebar
2. Click "New query"
3. Copy-paste this ENTIRE SQL block:

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

-- Create indexes
CREATE INDEX idx_audits_created_at ON audits(created_at DESC);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_audit_id ON leads(audit_id);

-- Enable RLS
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Public can read audits
CREATE POLICY "Anyone can view audits by ID"
  ON audits FOR SELECT
  USING (true);

-- Service role can write
CREATE POLICY "Service role can insert audits"
  ON audits FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can insert leads"
  ON leads FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can read leads"
  ON leads FOR SELECT
  USING (auth.role() = 'service_role');
```

4. Click "Run" (bottom right)
5. Should see "Success. No rows returned"

## Step 3: Get API Keys (1 minute)

1. Click "Project Settings" (gear icon in left sidebar)
2. Click "API" in settings menu
3. You'll see 3 things you need:

### Copy These Values:
- **Project URL** (looks like: `https://xxxxx.supabase.co`)
- **anon public** key (long string starting with `eyJ...`)
- **service_role** key (different long string, keep secret!)

## Step 4: Add to Vercel (1 minute)

Run these commands in your terminal:

```bash
cd credex-ai-spend-audit

# Add Project URL
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste your Project URL when prompted
# Choose: Production, Preview, Development (select all)

# Add anon key
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Paste your anon public key
# Choose: Production, Preview, Development (select all)

# Add service role key
vercel env add SUPABASE_SERVICE_ROLE_KEY
# Paste your service_role key
# Choose: Production, Preview, Development (select all)
```

## Step 5: Redeploy (30 seconds)

```bash
vercel --prod --yes
```

Wait ~30 seconds for build to complete.

## Step 6: Test It! (30 seconds)

1. Go to your deployed URL
2. Fill out the audit form
3. Submit
4. Click "📧 Get Full Report"
5. Enter an email
6. Check your Supabase dashboard → Table Editor → leads
7. You should see your entry!

## Verification Checklist

- [ ] Tables visible in Supabase Table Editor
- [ ] RLS policies active (green checkmarks in Table Editor)
- [ ] Lead saved when you test the form
- [ ] Share URL works (format: `/audit/[id]`)

## Troubleshooting

**"supabaseUrl is required" error:**
- Make sure you chose "Production" when adding env vars
- Redeploy with `vercel --prod --yes`

**404 on share URLs:**
- Check that audit was saved (go to Supabase → Table Editor → audits)
- Make sure RLS policy "Anyone can view audits" is active

**Can't save leads:**
- Check service_role key is correct
- Check RLS policy "Service role can insert leads" is active

---

**That's it!** Features 5 & 6 are now fully active. Total time: ~5 minutes.
