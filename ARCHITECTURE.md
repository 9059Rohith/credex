# Architecture

## System Diagram

```mermaid
graph TB
    User[User Browser] -->|1. Fill Form| Landing[Landing Page]
    Landing -->|2. Submit| AuditAPI[/api/audit]
    
    AuditAPI -->|3. Run Audit| Engine[Audit Engine]
    Engine -->|Pure TS Logic| Engine
    
    AuditAPI -->|4. Save| Supabase[(Supabase DB)]
    Supabase -->|5. Return slug| AuditAPI
    
    AuditAPI -->|6. Redirect| Results[/audit/[slug]]
    
    Results -->|7. Fetch Audit| Supabase
    Results -->|8. Render| User
    
    User -->|9. Enter Email| LeadAPI[/api/lead]
    LeadAPI -->|10. Save Lead| Supabase
    LeadAPI -->|11. Send Email| Resend[Resend API]
    
    Results -->|12. Request Summary| SummaryAPI[/api/summary]
    SummaryAPI -->|13. Generate| Anthropic[Anthropic API]
    SummaryAPI -->|14. Return Text| Results
    
    User -->|15. Share URL| Social[Social Media]
    Social -->|16. Fetch OG Tags| Results
    
    style Engine fill:#4ade80
    style Supabase fill:#3b82f6
    style Resend fill:#f59e0b
    style Anthropic fill:#8b5cf6
```

## Data Flow

### 1. User Submits Audit Request

**Client → Server:**
```typescript
POST /api/audit
{
  tools: [
    { tool: "cursor", plan: "Pro", seats: 5, monthlySpend: 100 },
    { tool: "claude", plan: "Team", seats: 2, monthlySpend: 60 }
  ],
  teamSize: 5,
  primaryUseCase: "coding"
}
```

**Server Processing:**
1. Parse request body
2. Call `runAudit(input)` from audit engine
3. Generate unique slug with `nanoid(10)`
4. Insert audit + results into Supabase `audits` table
5. Return `{ slug, audit: auditResult }`

**Client Response:**
- Redirect to `/audit/{slug}`

### 2. Audit Results Page Load

**Server-side (RSC):**
1. Extract `slug` from URL params
2. Query Supabase: `SELECT * FROM audits WHERE slug = $1`
3. Parse `tools_json` and `results_json`
4. Generate Open Graph metadata dynamically
5. Pass data to `<AuditResults>` client component

**Client-side:**
1. Render hero savings card
2. Lazy-load AI summary (if not already cached)
3. Render per-tool recommendation cards
4. Show lead capture form if savings ≥ $100/mo

### 3. Lead Capture

**Client → Server:**
```typescript
POST /api/lead
{
  email: "founder@startup.com",
  companyName: "Acme Inc",
  role: "CTO",
  teamSize: 5,
  auditSlug: "abc123",
  totalMonthlySavings: 140
}
```

**Server Processing:**
1. Validate email + auditSlug
2. Insert into Supabase `leads` table
3. Call Resend API to send transactional email
4. Return `{ success: true }`

**Email Content:**
- Hero: "$140/mo savings" with link to audit
- If savings ≥ $500: Add Credex consultation CTA
- Plain HTML, mobile-optimized

## Stack Decisions

### Why Next.js 14 App Router?

**Chosen:** Next.js 14 (App Router) with TypeScript

**Alternatives Considered:**
- Next.js Pages Router: Familiar but lacks RSC, async components
- Remix: Great DX but smaller ecosystem, harder deployment
- SvelteKit: Loved the compiler, but React ecosystem is critical for shadcn/ui

**Rationale:**
1. **Server Components:** Audit results page needs SSR for Open Graph tags. RSC makes this trivial.
2. **Built-in API Routes:** `/api/*` routes are perfect for our 3 endpoints.
3. **Vercel Deployment:** Zero-config deployment with automatic previews.
4. **TypeScript:** Strict typing catches bugs early. Critical for audit math.

### Why Supabase?

**Chosen:** Supabase (Postgres + REST API)

**Alternatives Considered:**
- Firebase: Great but vendor lock-in, less SQL flexibility
- PlanetScale: Excellent MySQL but Supabase's Postgres + realtime is better
- Custom Postgres on Railway: More control but adds devops burden

**Rationale:**
1. **Zero Backend Code:** REST API auto-generated from schema
2. **SQL Power:** JSONB columns for flexible audit data storage
3. **Free Tier:** 500MB DB, 2GB bandwidth—plenty for MVP
4. **Row-Level Security:** Built-in if we need multi-tenancy later

**Schema Design:**

```sql
audits {
  slug: text (unique, indexed)
  tools_json: jsonb
  results_json: jsonb
  team_size: int
  primary_use_case: text
  total_monthly_savings: decimal
  created_at: timestamptz
}

leads {
  email: text
  company_name: text
  role: text
  audit_slug: text (foreign key)
  total_monthly_savings: decimal
  created_at: timestamptz
}
```

**Why JSONB for tools/results?**
- Variable tool configurations (different plans, seat counts)
- No need to query inside JSON—we always fetch full audit
- Keeps schema flexible as we add new tools

### Why Pure TypeScript for Audit Logic?

**Chosen:** Hard-coded rules in `auditEngine.ts`

**Alternative Considered:**
- Use Claude/GPT-4 to analyze spend

**Rationale:**
1. **Determinism:** Same input = same output. Critical for trust.
2. **Explainability:** Every recommendation has a clear reason.
3. **Speed:** ~1ms vs. ~2s for LLM inference.
4. **Cost:** $0 vs. $0.01/audit at scale.
5. **No Hallucinations:** AI could recommend fake plans or wrong prices.

**Where AI IS Used:**
- Personalized summary paragraph only
- Fallback to template if API fails
- User never sees hallucinated recommendations

### Why Anthropic API (not OpenAI)?

**Chosen:** Anthropic Claude Sonnet

**Rationale:**
1. **Context Window:** 200k tokens (we might send full audit data)
2. **Quality:** Better at concise, business-focused summaries
3. **API Design:** Cleaner SDK, better streaming support
4. **Alignment:** Less likely to refuse business-focused requests

## Scaling to 10k Audits/Day

### Current Bottlenecks

1. **Supabase Free Tier:** 500MB storage, 2GB bandwidth/mo
2. **API Route Cold Starts:** Vercel Serverless ~200ms cold start
3. **No Caching:** Every audit slug fetch hits Supabase

### Scaling Strategy

**Phase 1: Optimize Current Stack (0 → 1k/day)**

1. **Add Vercel Edge Caching:**
   ```typescript
   export const revalidate = 3600; // 1 hour
   ```
   Cache audit pages. Most shares are within first hour.

2. **Redis for Rate Limiting:**
   - Use Upstash Redis (serverless)
   - Rate limit: 10 audits/IP/hour to prevent abuse
   - Cost: $0 (free tier handles 10k commands/day)

3. **Database Indexes:**
   ```sql
   CREATE INDEX audits_created_at_idx ON audits(created_at DESC);
   CREATE INDEX leads_total_savings_idx ON leads(total_monthly_savings DESC);
   ```

**Phase 2: Move to Supabase Pro (1k → 10k/day)**

- Cost: $25/mo
- 8GB storage, 250GB bandwidth
- Connection pooling (5000 connections)

**Phase 3: Add CDN + Worker (10k → 100k/day)**

1. **Cloudflare Workers for audit API:**
   - Move audit generation to Workers
   - 100ms global cold start → 10ms warm
   - Cost: $5/mo (10M requests)

2. **Separate Read/Write DBs:**
   - Supabase read replica for audit fetching
   - Primary DB for writes (leads, new audits)

3. **Object Storage for Audit JSON:**
   - Store large audit JSONs in R2/S3
   - Link from DB via slug
   - Saves DB space, enables CDN caching

**Expected Performance at 10k/day:**

| Metric | Current | Optimized |
|--------|---------|-----------|
| Cold start | 200ms | 10ms |
| Audit generation | 50ms | 10ms (Worker) |
| DB query | 100ms | 20ms (indexed) |
| Total TTFB | ~350ms | ~40ms |
| Cost/month | ~$0 | ~$50 |

## Security Considerations

1. **Rate Limiting:** Prevent spam audits (Upstash Redis)
2. **Email Validation:** Regex + DNS check before Resend
3. **Honeypot Field:** Hidden `website` field to catch bots
4. **CORS:** Restrict API routes to same-origin
5. **Env Vars:** Never commit secrets, use Vercel env

## Accessibility

- Semantic HTML (`<form>`, `<button>`, `<label>`)
- ARIA labels for icon-only buttons
- Keyboard navigation (Tab order)
- Focus indicators (Tailwind focus rings)
- Color contrast: WCAG AA (dark mode helps)

**Lighthouse Score Targets:**
- Performance: ≥85 (App Router SSR helps)
- Accessibility: ≥90 (shadcn/ui components are accessible)
- Best Practices: ≥90 (TypeScript, ESLint)
- SEO: 100 (Next.js metadata API)

## Future Improvements

1. **PDF Export:** Use Puppeteer to screenshot audit page
2. **Benchmark Data:** "Your spend/dev is $150, avg is $80"
3. **Referral Codes:** Share link, both get $10 Credex credit
4. **Embeddable Widget:** `<script>` tag for blogs
5. **Slack Bot:** Run audit from Slack command
