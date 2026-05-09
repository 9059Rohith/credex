# SpendLens - AI Spend Audit Tool

A free web application that audits AI tool subscriptions for startups, identifies overspending, and generates shareable audit reports. Built for Credex as a lead-generation asset.

**Live Demo:** [Will be deployed to Vercel]

## What It Does

SpendLens helps startup founders and engineering managers understand if they're overspending on AI tools like Cursor, Claude, ChatGPT, GitHub Copilot, and more. Users input their current subscriptions, and within 30 seconds, they receive:

- A detailed spend analysis with per-tool recommendations
- Total monthly and annual savings potential
- Actionable recommendations (downgrade plans, reduce seats, switch tools)
- A shareable public URL with Open Graph previews
- Email delivery of the full audit report

## Screenshots

**[SCREENSHOT 1: Landing page with spend input form]**
_Description: Clean, dark-mode form where users input their AI tool stack. Shows Cursor Pro with 5 seats, team size selector, and primary use case dropdown._

**[SCREENSHOT 2: Audit results hero card showing $140/mo savings]**
_Description: Large, prominent savings display with breakdown showing "$140/mo" and "$1,680/year" in gradient text, with detailed per-tool cards below._

**[SCREENSHOT 3: Per-tool recommendation cards]**
_Description: Individual cards for each tool showing "Current: Claude Team · 2 seats · $60/mo" → "Recommended: 2x Pro · $40/mo" with reasoning "Team plans are designed for 3+ users"._

## Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- Supabase account (free tier works)
- Resend account (free tier works)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/credex-ai-spend-audit.git
cd credex-ai-spend-audit

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
RESEND_API_KEY=your_resend_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Supabase Schema

Create these tables in your Supabase project:

```sql
-- Audits table
create table audits (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  tools_json jsonb not null,
  results_json jsonb not null,
  team_size int not null,
  primary_use_case text not null,
  total_monthly_savings decimal not null,
  created_at timestamptz default now()
);

-- Leads table
create table leads (
  id uuid primary key default uuid_generate_v4(),
  email text not null,
  company_name text,
  role text,
  team_size int,
  audit_slug text references audits(slug),
  total_monthly_savings decimal,
  created_at timestamptz default now()
);

-- Indexes
create index audits_slug_idx on audits(slug);
create index leads_email_idx on leads(email);
create index leads_created_at_idx on leads(created_at desc);
```

### Deploy

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel deploy --prod
```

## Decisions

### 1. **Next.js 14 App Router over Pages Router**
   - **Why:** App Router provides better server component support, improved data fetching with async/await, and built-in loading/error states. Since this app needs server-side rendering for Open Graph previews and SEO, App Router's RSC architecture is ideal.
   - **Trade-off:** Steeper learning curve, but worth it for better performance and DX.

### 2. **Pure TypeScript audit logic (no AI)**
   - **Why:** The audit engine uses hard-coded, defensible rules based on seat counts, plan tiers, and use case matching. This ensures consistent, explainable recommendations that a CFO can trust. AI would introduce non-determinism and hallucination risk.
   - **Trade-off:** More manual rule maintenance, but guarantees accuracy.

### 3. **localStorage for form persistence**
   - **Why:** Users often leave mid-form to look up subscription details. Persisting state lets them return without starting over, dramatically improving completion rates.
   - **Trade-off:** Client-side only (doesn't sync across devices), but acceptable for this use case.

### 4. **Supabase over custom backend**
   - **Why:** Supabase provides instant Postgres + REST API with zero devops. For a lead-gen tool, this is perfect—focus on product, not infrastructure.
   - **Trade-off:** Vendor lock-in, but migration path exists via standard Postgres.

### 5. **Dark mode only**
   - **Why:** Screenshots look better in dark mode for social sharing (Twitter, HN). Given the target audience (technical founders), dark mode preference is nearly universal.
   - **Trade-off:** No light mode option, but saves development time and enforces a cohesive brand.

## Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **Database:** Supabase (Postgres)
- **Email:** Resend
- **AI:** Anthropic Claude (for personalized summaries only)
- **Deployment:** Vercel
- **Testing:** Vitest
- **CI:** GitHub Actions

## Project Structure

```
credex-ai-spend-audit/
├── app/
│   ├── page.tsx              # Landing + form
│   ├── audit/[slug]/page.tsx # Results page
│   ├── api/
│   │   ├── audit/route.ts    # Generate audit
│   │   └── lead/route.ts     # Capture email
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── AuditResults.tsx      # Results display
│   └── ui/                   # shadcn components
├── lib/
│   ├── auditEngine.ts        # Core audit logic
│   ├── pricingData.ts        # Tool pricing constants
│   └── utils.ts
├── tests/
│   └── auditEngine.test.ts   # Unit tests
└── [12 markdown docs]
```

## Key Features

✅ **6 MVP Features Implemented:**
1. Multi-tool spend input form with localStorage persistence
2. Audit engine with defensible, rule-based recommendations
3. Beautiful audit results page with per-tool breakdown
4. AI-generated personalized summary (Anthropic API)
5. Lead capture with Resend email delivery
6. Shareable public URLs with Open Graph tags

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run linter
npm run lint
```

## License

MIT

## Built By

[Your Name] for Credex · [credex.rocks](https://credex.rocks)

---

**Deployed URL:** [Coming soon after Vercel deployment]
 
## Security 
See SECURITY.md for security policies. 
