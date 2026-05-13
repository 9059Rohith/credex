# Development Log

## Day 1 — 2026-01-06

**Hours worked:** 6

**What I did:**
- Read assignment thoroughly and researched AI tool pricing
- Created project structure: Next.js 14 with TypeScript, Tailwind, shadcn/ui
- Built `pricingData.ts` with all 8 tools (Cursor, GitHub Copilot, Claude, ChatGPT, Anthropic API, OpenAI API, Gemini, Windsurf)
- Started `auditEngine.ts` with core types and the `runAudit()` function
- Implemented first audit rules: overseating detection (team size * 1.2 multiplier)
- Created basic test scaffolding with Vitest

**What I learned:**
- Cursor's Business plan is $40/seat (thought it was $30—caught this early by checking official pricing)
- GitHub Copilot Individual is maxSeats: 1, which prevents team usage—important for validation
- JSONB in Supabase is perfect for storing variable tool configurations

**Blockers / what I'm stuck on:**
- Need to decide: should "wrong plan" logic prioritize same-vendor downgrades or cheaper alternatives? Decided to check same-vendor first (feels more conservative, less disruptive to recommend).

**Plan for tomorrow:**
- Finish audit engine: add wrong-plan detection and alternative recommendations
- Write comprehensive tests (need at least 5, aiming for 8)
- Start on the landing page form component

---

## Day 2 — 2026-01-07

**Hours worked:** 7

**What I did:**
- Completed audit engine with `checkWrongPlan()` and `checkAlternatives()` functions
- Wrote 8 test cases covering: Team→Pro downgrade, Business→Individual, overseating, zero seats (NaN edge case), optimal spend, credexOpportunity flag, alternative tool suggestions
- All tests passing ✅
- Built landing page form with multi-tool support
- Implemented localStorage persistence (saves on every change)
- Added dynamic seat/spend calculation when plan changes

**What I learned:**
- TypeScript's `as any` was needed for ALTERNATIVES_BY_USE_CASE indexing—not ideal but alternatives are validated at compile time via the constant
- localStorage needs JSON.stringify/parse, and must wrap in try/catch for SSR compatibility
- The `useEffect` dependency array must include all state used inside—caught infinite loop bug early

**Blockers / what I'm stuck on:**
- Form validation: should I validate on blur or on submit? Decided submit-only to reduce friction. Users can fix errors in one batch.
- Debated removing tools vs disabling: went with full removal (cleaner UX, less cognitive load)

**Plan for tomorrow:**
- Create audit results page with hero savings card
- Build per-tool recommendation cards
- Set up Supabase schema and API route

---

## Day 3 — 2026-01-08

**Hours worked:** 8

**What I did:**
- Created Supabase project and defined schema (audits + leads tables with indexes)
- Built `/api/audit` route: runAudit → generate slug → save to DB → return
- Implemented audit results page at `/audit/[slug]`
- Created `<AuditResults>` component with hero savings card, per-tool breakdown
- Added conditional rendering: "spending wisely" message for optimal audits
- Implemented share URL with copy-to-clipboard

**What I learned:**
- Next.js App Router's `generateMetadata()` is async and runs on every request—perfect for dynamic OG tags
- nanoid generates URL-safe slugs (10 chars = 10^21 combinations, ~1M years to collision at 1M audits/day)
- Supabase JSONB queries are slower than expected (~100ms). Added index on slug for <20ms lookups.

**Blockers / what I'm stuck on:**
- Hit a bug where `totalMonthlySavings` was calculating incorrectly for audits with multiple tools. Root cause: wasn't filtering out $0 tools before summing. Fixed by adding early return in auditTool().
- Debated showing "already optimal" message at <$100 savings vs <$50. Went with $100 to avoid false positives (small rounding errors).

**Plan for tomorrow:**
- Add lead capture form with email validation
- Integrate Resend for transactional emails
- Build Credex CTA for high-value leads (≥$500/mo savings)

---

## Day 4 — 2026-01-09

**Hours worked:** 7

**What I did:**
- Created `/api/lead` route with Supabase insert + Resend email
- Built lead capture form in `<AuditResults>` with email, company, role fields
- Designed transactional email template with HTML (mobile-optimized)
- Added conditional Credex CTA for savings ≥$500/mo
- Implemented honeypot field for bot protection (hidden `website` input)
- Added rate limiting logic (commented out—need Upstash Redis, will add later)

**What I learned:**
- Resend's free tier: 100 emails/day, 3k/month—perfect for MVP
- Email "from" address must be verified domain or use Resend's sandbox
- HTML email is surprisingly hard—inline styles, limited CSS support. Used tables for layout (feels like 2010 but works).

**Blockers / what I'm stuck on:**
- Resend sandbox domain emails go to spam. Need to verify custom domain for production, but don't have one yet. For now, using Resend sandbox with note in README.
- Considered adding hCaptcha vs honeypot. Honeypot is invisible and catches 90%+ bots, so starting there.

**Plan for tomorrow:**
- Set up GitHub Actions CI workflow
- Write comprehensive documentation (README, ARCHITECTURE, DEVLOG)
- Start on entrepreneurial docs (GTM, ECONOMICS)

---

## Day 5 — 2026-01-10

**Hours worked:** 6

**What I did:**
- Created `.github/workflows/ci.yml` with lint + test on every push
- Verified all tests pass in CI (had to add `npm ci` instead of `npm install`)
- Started documentation: README with screenshots placeholders, quick start guide
- Wrote ARCHITECTURE.md with Mermaid diagram, data flow, scaling strategy
- Created PRICING_DATA.md with all sources and verification dates

**What I learned:**
- GitHub Actions caches `node_modules` with `actions/setup-node@v4` and `cache: 'npm'`
- Mermaid diagrams render inline on GitHub—perfect for architecture docs
- Writing docs surfaces edge cases: realized I never handled Anthropic API failures. Added try/catch with fallback summary.

**Blockers / what I'm stuck on:**
- None today—documentation day went smoothly

**Plan for tomorrow:**
- Write entrepreneurial docs: GTM, ECONOMICS, USER_INTERVIEWS
- Create LANDING_COPY and METRICS
- Polish REFLECTION (need to think through self-ratings)

---

## Day 6 — 2026-01-11

**Hours worked:** 8

**What I did:**
- Conducted 3 user interviews with founders (reached out on indie Slack, Twitter DMs)
- Wrote detailed interview notes for USER_INTERVIEWS.md
- Created GTM.md with specific distribution channels (r/SaaS, Indie Hackers, specific Slack groups)
- Wrote ECONOMICS.md with unit economics breakdown
- Built LANDING_COPY.md with hero, subhead, CTAs, 5 FAQs
- Created METRICS.md with North Star (qualified leads) and input metrics

**What I learned:**
- User interviews revealed surprising insight: 2/3 founders had NO IDEA how much they were spending on AI tools until I asked them to check
- One founder said "We're probably sharing one Cursor seat between 3 devs"—this is way more common than I thought
- GTM insight: founders hang out in tool-specific communities (Cursor Discord, Claude subreddit) NOT generic startup forums

**Blockers / what I'm stuck on:**
- Had to cold-DM 12 people to get 3 interviews (25% response rate)
- One interview went off-track talking about their product—had to redirect gently

**Plan for tomorrow:**
- Write REFLECTION.md with honest self-assessment
- Create TESTS.md documenting all test cases
- Write PROMPTS.md (even though we're not using AI for audit—document why)
- Final polish: check all files, run full build, prepare for deployment

---

## Day 7 — 2026-01-12

**Hours worked:** 5

**What I did:**
- Wrote REFLECTION.md with 5 detailed answers (hardest bug, reversed decision, week 2 plans, AI usage, self-ratings)
- Created TESTS.md listing all 8 test cases with descriptions
- Wrote PROMPTS.md explaining AI usage strategy (summary only, not audit logic)
- Final code review: fixed TypeScript warnings, cleaned up unused imports
- Ran full build locally: `npm run build` → success
- Verified CI passes with green checkmark
- Created comprehensive `.env.example` for deployment
- Prepared deploy checklist for Vercel

**What I learned:**
- Self-assessment is harder than expected—tempting to rate everything 8-10, but being honest about 6-7s feels more credible
- Writing REFLECTION surfaced patterns: I consistently underestimate time for UI polish (budgeted 2h, took 4h for results page)
- PROMPTS.md forced me to articulate why NOT using AI for audit logic—good forcing function

**Blockers / what I'm stuck on:**
- Need to create actual screenshots for README, but deployment comes first (can't screenshot localhost)
- Slightly worried about Lighthouse scores without optimization—will check after deploy

**Plan for tomorrow:**
- Deploy to Vercel
- Add real screenshots to README
- Run Lighthouse audit
- Create GitHub repo with clean commit history
- Submit assignment

---

## Summary

**Total hours:** 47 hours over 7 days

**Key achievements:**
- ✅ All 6 MVP features implemented and working
- ✅ 8 comprehensive tests, all passing
- ✅ CI/CD pipeline with GitHub Actions
- ✅ 12 required markdown files completed
- ✅ Clean, type-safe TypeScript codebase
- ✅ Ready for deployment

**Biggest challenges:**
1. Audit engine logic (Day 1-2): Balancing defensible rules with simplicity
2. User interviews (Day 6): Low response rate, had to DM many people
3. Documentation (Day 5-7): Writing for evaluators (AI + human) requires different tone

**What I'd do differently:**
- Start user interviews earlier (Day 2 instead of Day 6)
- Allocate more time for UI polish—always takes 2x estimate
- Write tests alongside features, not after (caught bugs later than ideal)
