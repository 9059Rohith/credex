# Reflection

## 1. The Hardest Bug and How I Debugged It

**The Bug:** On Day 3, after implementing the audit results page, I noticed that audits with multiple tools were showing wildly incorrect savings. A user with Cursor Pro (5 seats, $100) and Claude Team (2 seats, $60) was showing $220/mo savings instead of the expected ~$20.

**Initial Hypothesis:** I thought the issue was in the `runAudit()` function's sum logic. Maybe I was double-counting tools or not filtering recommendations correctly.

**What I Tried:**
1. Added `console.log()` statements in `runAudit()` to trace `totalCurrentSpend` and `totalRecommendedSpend`
2. The logs showed: `totalCurrentSpend: 160`, `totalRecommendedSpend: -60` ← **negative number!**
3. Traced back to `auditTool()` and found that tools with `monthlySpend: 0` (like a Free tier tool added but not actually used) were still being processed
4. These $0 tools were creating recommendations with `currentMonthlySpend: 0`, `recommendedMonthlySpend: 0`, but the subtraction logic was breaking when I tried to recommend switching FROM a $0 tool

**The Actual Problem:** I wasn't filtering out tools with `monthlySpend === 0` before processing them. The audit engine was trying to audit free-tier tools, generating nonsense recommendations.

**The Fix:**
```typescript
// In runAudit(), added:
for (const toolInput of input.tools) {
  if (toolInput.monthlySpend === 0 && toolInput.plan !== "Free") {
    continue; // Skip tools user isn't actually paying for
  }
  // ... rest of logic
}
```

**Why This Worked:** By skipping $0 tools (unless explicitly on "Free" plan), I ensured only actual subscriptions were audited. This fixed the negative numbers and made savings calculations accurate.

**Key Lesson:** Always validate input data early. I should have added a `validateToolInput()` function at the API boundary to catch this before it hit the audit engine.

---

## 2. A Decision I Reversed Mid-Week

**Original Decision (Day 2):** I initially decided to use a single `<select>` dropdown for plan selection in the landing form, with all plans for all tools in one massive list (e.g., "Cursor Pro", "Cursor Business", "Claude Team", "Claude Pro", etc.).

**Why I Made It:** Seemed simple—one component, one data structure. I thought it would make the form easier to implement.

**What Made Me Reverse It (Day 3):** When I actually built it and tested with real data, the dropdown had 40+ options. It was unusable. Users had to scroll forever to find "Claude Team" after "Cursor Enterprise". The cognitive load was insane—you couldn't just pick a tool, you had to remember the exact "Tool + Plan" combination.

**New Decision:** Switched to a two-step selection:
1. First, select which tool (Cursor, Claude, etc.)
2. Then, dynamically show a plan dropdown filtered to just that tool's tiers

**Implementation:** Created a `selectedTools` array and `toolsData` object mapping. When a user adds "Cursor", I populate `toolsData.cursor` with default values, then show a card with tool-specific dropdowns.

**Why This Was Better:**
- Cognitive load: Pick tool first, then configure it (matches mental model)
- Scalability: Adding a 9th tool doesn't bloat the UI
- Flexibility: Can show tool-specific fields (e.g., API tools might need usage estimates)

**Lesson:** Don't optimize for code simplicity at the expense of UX. The "one dropdown" felt easier to code, but using it was miserable. Always prototype with real data.

---

## 3. What I Would Build in Week 2

**Feature 1: Benchmark Comparison**

Show users how their spend compares to similar companies:
- "Your AI spend per developer: $120/mo"
- "Companies your size average: $85/mo"
- "You're in the 73rd percentile"

**Why:** Everyone wants to know "is this normal?" Benchmark data creates urgency and validates the audit.

**Implementation:** Store anonymized aggregate data in Supabase. Calculate percentiles with SQL:
```sql
SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY total_monthly_savings / team_size)
FROM audits WHERE team_size BETWEEN 3 AND 10;
```

**Feature 2: PDF Export**

Generate a professional PDF report with company logo, audit data, and Credex branding.

**Why:** Founders want to share audits with their CFO or board. Email is ephemeral; PDF is archivable.

**Implementation:** Use Puppeteer to screenshot the audit page, or react-pdf to generate from components. Store PDFs in S3, link from DB.

**Feature 3: Multi-Currency Support**

Right now, everything is USD. Add EUR, GBP support.

**Why:** Credex serves international startups. A European founder sees "$100" and has to mentally convert to €92.

**Implementation:** Store prices in USD, convert at display time using exchange rate API. Let users select currency in form.

**Feature 4: Slack/Email Notifications**

"Your AI spend increased by 30% this month—run a new audit?"

**Why:** Audits are point-in-time. Proactive notifications bring users back.

**Implementation:** Cron job (Vercel Cron) that checks leads table for users who audited >30 days ago, sends Resend email with CTA.

**Feature 5: Team Collaboration**

Share audit with teammates, comment on recommendations, assign action items.

**Why:** Decisions like "should we downgrade Cursor?" need team buy-in.

**Implementation:** Add `audit_collaborators` table with email invites, implement commenting system.

---

## 4. How I Used AI Tools

**Tools Used:**
- **Claude (via Cursor):** 90% of code generation, debugging, refactoring
- **ChatGPT:** 10% for brainstorming marketing copy, FAQ ideas

**What I Used AI For:**

1. **Boilerplate Code (Trusted 95%):**
   - shadcn/ui component imports: "Add Button, Card, Input components"
   - API route skeletons: "Create Next.js API route that accepts POST request"
   - TypeScript interfaces: "Create interface for AuditInput with tools array"
   
   **Why I Trusted It:** Boilerplate is well-established patterns. Errors are obvious (TypeScript catches them).

2. **Bug Fixes (Trusted 70%):**
   - "Why is totalMonthlySavings returning NaN?" → AI suggested checking for zero division
   - "localStorage not persisting across reloads" → AI reminded me about JSON.parse
   
   **Why Caution:** AI sometimes suggests overcomplicated fixes. I always understood the root cause before applying.

3. **Documentation (Trusted 50%):**
   - "Write GTM strategy for a lead-gen tool" → Got generic advice, had to rewrite with specifics
   - "Explain Mermaid diagram syntax" → Helpful for learning, but I drew my own diagram
   
   **Why Low Trust:** AI docs are generic. I needed specific, authentic voice for this assignment.

4. **What I DIDN'T Trust AI With:**

   - **Audit Engine Logic:** Too critical. I wrote every line of `auditEngine.ts` manually, reasoning through each rule. AI suggested using `.reduce()` for summing, but I used explicit loops for debuggability.
   
   - **Pricing Data:** AI has outdated pricing. I manually verified every price on vendor websites.
   
   - **Test Assertions:** AI suggested `expect(result).toBeTruthy()`. Too vague. I wrote specific assertions like `expect(rec.monthlySavings).toBe(20)`.

**One Time AI Was Wrong (and I Caught It):**

**Context:** I asked Claude: "How do I generate unique slugs for audit URLs?"

**AI's Answer:** "Use `Math.random().toString(36).substring(7)` for a unique ID."

**Why It Was Wrong:** `Math.random()` isn't cryptographically secure and has collision risk at scale. At 10k audits/day, you'd hit collisions within weeks.

**How I Caught It:** I knew from previous projects that `nanoid` is the standard. Checked nanoid's docs, saw it uses cryptographic RNG with 60-bit entropy per character. Switched to `nanoid(10)` for 10^21 combinations.

**Lesson:** AI gives "good enough" answers. For production code, verify claims with docs.

---

## 5. Self-Ratings (1-10)

### Discipline: 8/10

**Reasoning:** I worked consistently across all 7 days (6-8 hours/day, no day off), started early (Day 1), and spread commits across the week. However, I front-loaded coding (Days 1-4) and back-loaded docs (Days 5-7), which created time pressure. A 9 or 10 would have interleaved docs with features.

### Code Quality: 7/10

**Reasoning:** The code is type-safe, readable, and well-organized. I used clear function names (`auditTool`, `checkWrongPlan`), avoided premature abstraction, and added comments for non-obvious logic. However, I have some `any` types in places (ALTERNATIVES_BY_USE_CASE indexing), and I didn't refactor localStorage logic into a custom hook. An 8+ would have zero `any` types and better separation of concerns.

### Design Sense: 6/10

**Reasoning:** The UI is functional and uses good dark-mode aesthetics, but it's not "wow" level. The landing form is clear, the results page is readable, but there's no micro-interactions (smooth transitions, loading skeletons, celebration animations). I prioritized shipping over polish. A 7+ would have animations, better spacing, and a custom illustration or two.

### Problem-Solving: 8/10

**Reasoning:** I debugged the savings calculation bug systematically (hypothesis → logs → root cause → fix), made good architectural decisions (pure TS for audit logic, JSONB for flexibility), and handled edge cases (zero seats, $0 tools, API failures). However, I didn't anticipate the user interview recruitment challenge until Day 6. A 9+ would have planned for low response rates upfront.

### Entrepreneurial Thinking: 7/10

**Reasoning:** I conducted real user interviews (3 founders, specific quotes, surprising insights), wrote realistic GTM plans (specific communities, not generic "SEO"), and built a tool that genuinely solves a problem (founders don't track AI spend). However, my ECONOMICS.md makes educated guesses about CAC and LTV rather than using real data from interviews. A 9+ would have asked interviewees "would you pay for this?" and sized the market bottom-up.

**Overall Assessment:** Strong on execution (discipline, problem-solving), solid on code, weaker on design polish and entrepreneurial validation. I shipped a working MVP that hits all requirements, but it's not yet ready for a Product Hunt launch without design iteration.
