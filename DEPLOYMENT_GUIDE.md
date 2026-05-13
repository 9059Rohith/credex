# 🚀 Deployment Guide - TokenAudit

## Quick Deploy to Vercel (5 minutes)

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `credex-ai-spend-audit` (or any name you prefer)
3. Make it **Public** (required for submission)
4. **Do NOT** initialize with README
5. Click "Create repository"

### Step 2: Push Code to GitHub

Run these commands in your terminal:

```bash
cd credex-ai-spend-audit
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/credex-ai-spend-audit.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3: Deploy to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your `credex-ai-spend-audit` repository
4. Vercel will auto-detect Next.js settings
5. **IMPORTANT: Add Environment Variables** before deploying:
   - Click "Environment Variables"
   - Add these variables:
     ```
     GROQ_API_KEY=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
     NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder_anon_key
     SUPABASE_SERVICE_ROLE_KEY=placeholder_service_role_key
     RESEND_API_KEY=re_placeholder
     UPSTASH_REDIS_REST_URL=https://placeholder.upstash.io
     UPSTASH_REDIS_REST_TOKEN=placeholder_token
     ```
6. Click "Deploy"

### Step 4: Wait for Deployment (2-3 minutes)

Vercel will:
- Install dependencies
- Build the Next.js app
- Deploy to their CDN
- Give you a live URL like: `credex-ai-spend-audit-xxx.vercel.app`

### Step 5: Your Submission URLs

Once deployed, you'll have:
- **Live App:** `https://your-project.vercel.app`
- **GitHub Repo:** `https://github.com/YOUR_USERNAME/credex-ai-spend-audit`

## ⚠️ Important Notes

### Supabase Setup (Optional but Recommended)

The app is configured to work without a real database (will show errors in console but won't crash). To make it fully functional:

1. Go to https://supabase.com/dashboard
2. Create a new project
3. Go to Settings > API to get your keys
4. Run this SQL in the SQL Editor:

```sql
create table audits (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  created_at timestamptz default now(),
  tools_json jsonb not null,
  results_json jsonb not null,
  ai_summary text,
  team_size int,
  primary_use_case text,
  total_monthly_savings numeric
);

create table leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  audit_slug text,
  email text not null,
  company_name text,
  role text,
  team_size int,
  total_monthly_savings numeric
);

-- Enable row level security but allow all operations for now
alter table audits enable row level security;
alter table leads enable row level security;

create policy "Allow all operations on audits" on audits for all using (true);
create policy "Allow all operations on leads" on leads for all using (true);
```

5. Update the environment variables in Vercel with your real Supabase keys

### Resend Setup (Optional)

For email functionality:
1. Sign up at https://resend.com
2. Get your API key
3. Update `RESEND_API_KEY` in Vercel environment variables

## 📋 Submission Checklist

Before submitting to Credex:

- [ ] GitHub repo is public
- [ ] Vercel app is live and accessible
- [ ] All 10 markdown docs are in the repo root
- [ ] Git history shows commits across multiple days
- [ ] README.md has screenshots or demo video
- [ ] Build is successful (green checkmark in Vercel)

## 🎯 What Works Right Now

Even with placeholder environment variables:
- ✅ Landing page loads
- ✅ Audit form works
- ✅ Audit engine calculates savings
- ✅ Results page displays
- ✅ All UI components render
- ⚠️ Database saves will fail (but won't crash the app)
- ⚠️ Email sending will fail silently
- ⚠️ AI summary will use fallback text

The core functionality (audit calculation) works perfectly without any external services!

## 🔥 Quick Test After Deployment

Visit your Vercel URL and:
1. Click "Audit My Stack"
2. Select "Cursor" and "GitHub Copilot"
3. Fill in some dummy data
4. Submit
5. You should see savings results!

## Need Help?

If deployment fails, check:
- Build logs in Vercel dashboard
- Make sure all files are committed to git
- Verify environment variables are set correctly
