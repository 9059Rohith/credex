# Metrics

## North Star Metric

**Qualified Leads Generated**

**Definition:** A qualified lead is someone who:
1. Completed an audit
2. Entered their email
3. Has ≥$200/mo total AI spend
4. Shows ≥$100/mo potential savings OR is already optimized (validation seekers convert too)

**Why This Metric:**
- **Not "Audits Completed":** Vanity metric. 1000 audits from solo devs with $20/mo spend = zero Credex customers.
- **Not "Email Captures":** Raw emails include low-quality leads (<$200/mo spend) that won't convert.
- **Not "Revenue":** This is a lead-gen tool for Credex. We measure lead quality, not direct revenue.

**Target:** 100 qualified leads/month by Month 3

**How We Track It:**
```sql
SELECT COUNT(*)
FROM leads
WHERE total_monthly_savings >= 100
  OR (total_monthly_savings < 100 AND total_monthly_savings > 0)
  AND created_at >= DATE_TRUNC('month', CURRENT_DATE)
```

---

## Input Metrics (What Drives North Star)

### 1. Audit Completion Rate

**Definition:** (Audits Completed / Audits Started) × 100

**Current Target:** 80%

**Why It Matters:** 
Low completion rate = friction in the form. High drop-off points:
- Tool selection is confusing
- "Monthly spend" field requires too much work (looking up Stripe)
- Form is too long (mobile users drop off)

**How to Improve:**
- Pre-fill common values ("Cursor Pro: $20/seat")
- Add progress indicator ("Step 2 of 3")
- localStorage prevents restarting from scratch

**Tracking:**
```javascript
// Google Analytics event
gtag('event', 'audit_started', { tool_count: selectedTools.length });
gtag('event', 'audit_completed', { total_spend: currentSpend });
```

**Acceptable Range:** 75-85%  
**Red Flag:** <70% (form is too complex)  
**Green Flag:** >85% (extremely good)

---

### 2. Email Capture Rate

**Definition:** (Emails Captured / Audits Completed) × 100

**Current Target:** 40%

**Why It Matters:**
This converts anonymous traffic into leads. Higher = more lead-gen value.

**Factors That Affect This:**
- **Savings amount:** ≥$500/mo = 60% capture, <$100/mo = 20% capture
- **Value prop:** "Get detailed report" > "Enter email for spam"
- **Timing:** Show value first, then ask for email (not before)

**Segmented Targets:**
- High savings (≥$500/mo): 60%
- Medium savings ($100-499/mo): 45%
- Low/optimal (<$100/mo): 25%

**How to Improve:**
- A/B test CTA copy ("Save this audit" vs "Email me the report")
- Add benefit ("We'll include a PDF you can show your CFO")
- Reduce friction (remove optional fields like "company name")

**Tracking:**
```javascript
gtag('event', 'email_captured', {
  savings: totalSavings,
  audit_slug: slug
});
```

---

### 3. High-Value Lead %

**Definition:** (High-Value Leads / Total Email Captures) × 100

**High-Value Lead:** ≥$500/mo savings (these get Credex consultation CTA)

**Current Target:** 30%

**Why It Matters:**
These are the leads Credex actually wants. 100 emails with 5% high-value = 5 good leads. 50 emails with 50% high-value = 25 good leads. Quality > quantity.

**This Metric is FIXED by Targeting:**
- Can't improve it after they're in the funnel
- Must target high-spend users in GTM (HN, r/SaaS, not r/webdev)

**Segmented by Channel:**
- Hacker News: 35% (technical founders, higher budgets)
- r/SaaS: 40% (SaaS founders pay for tools)
- r/webdev: 15% (employees, low budgets)
- Cursor Discord: 45% (already spending on premium tools)

**Tracking:**
```sql
SELECT 
  acquisition_channel,
  COUNT(*) FILTER (WHERE total_monthly_savings >= 500) * 100.0 / COUNT(*) as high_value_pct
FROM leads
GROUP BY acquisition_channel
```

---

### 4. Share Rate

**Definition:** (Shares / Audits Completed) × 100

**Current Target:** 15%

**Why It Matters:**
Shares = free distribution. Every share is a potential new user at $0 CAC.

**What Counts as a Share:**
- Clicked "Copy Link" button
- Shared to Twitter via pre-filled tweet
- Shared to LinkedIn

**Why People Share:**
1. **Bragging rights:** "I'm only overpaying by $20, I'm so optimized!"
2. **Helping friends:** "Dude, you need to run this"
3. **Dunking on themselves:** "LOL I'm wasting $500/mo on unused Cursor seats"

**How to Improve:**
- Make share button prominent
- Pre-fill tweet with specific savings number
- Make audit results page screenshot-worthy (beautiful design)

**Tracking:**
```javascript
gtag('event', 'share_clicked', {
  platform: 'twitter', // or 'copy_link'
  savings: totalSavings
});
```

---

## Secondary Metrics (Health Indicators)

### Audit Depth (Tools Per Audit)

**Definition:** Average number of tools per audit

**Target:** 2.5 tools

**Why Track:** 
- 1 tool = incomplete audit, probably testing
- 2-3 tools = realistic use case
- 5+ tools = either enterprise or someone goofing around

**Action Triggers:**
- <2 avg: Users aren't adding all their tools. Add prompt: "Most teams use 2-4 tools. Add yours for a complete audit."
- >4 avg: Might indicate data quality issues. Check if bots are spamming.

---

### Time to Complete Audit

**Definition:** Median time from start to completion

**Target:** 90 seconds

**Why Track:**
- <60s: Users rushing through, data quality suffers
- >3 min: Form too complex, risk of abandonment

**Action Triggers:**
- >3 min: Simplify form, pre-fill more values
- <60s: Add friction (confirmation step) to ensure data quality

---

### Return Visitor %

**Definition:** (Return Visitors / Total Visitors) × 100

**Target:** 10% in Month 3+

**Why Track:**
Indicates:
1. Tool stickiness (people bookmark and return)
2. Word-of-mouth (friend told them, they came back)
3. Re-audit behavior (team grew, checking again)

**How to Improve:**
- Add "Bookmark this audit" CTA
- Send email after 3 months: "Has your team changed? Run a new audit"
- Build "audit history" feature (requires login)

---

## Funnel Conversion Metrics

```
1000 Visitors
  → 500 Audit Starts (50% start rate)
    → 400 Audit Completions (80% completion rate)
      → 160 Email Captures (40% capture rate)
        → 48 High-Value Leads (30% of emails)
          → 12 Consultation Bookings (25% of high-value)
            → 4 Credex Customers (33% close rate)
```

**Key Ratios:**
- **Visitor → Qualified Lead:** 4.8% (48/1000)
- **Visitor → Customer:** 0.4% (4/1000)
- **Cost per 1000 visitors:** ~$300 (blended across channels)
- **CAC per customer:** $300 / 0.4% = $750

---

## What Triggers a Pivot Decision

### Red Flag 1: <50 Audits in Week 1
**Meaning:** Problem isn't urgent enough or GTM isn't working

**Action:** 
- Interview 10 non-completers: "Why didn't you finish?"
- A/B test headline (savings-focused vs validation-focused)
- Try different channels (if HN failed, try Reddit)

**Pivot if:** Week 4 still <200 audits/week

---

### Red Flag 2: Email Capture Rate <20%
**Meaning:** Not enough perceived value

**Action:**
- Show more value before asking for email
- Test removing optional fields (company, role)
- Add benefit: "We'll email you a PDF to show your CFO"

**Pivot if:** Month 2 still <25% capture rate

---

### Red Flag 3: High-Value Lead % <15%
**Meaning:** Targeting wrong audience (broke founders, employees, tire-kickers)

**Action:**
- Refocus GTM on Series A+ founders
- Add pre-qualification: "This tool is for teams spending $500+/month"
- Exit low-value channels (r/webdev, generic startup forums)

**Pivot if:** Month 2 still <20% high-value

---

### Red Flag 4: Zero Credex Conversions by Month 2
**Meaning:** Lead quality is bad OR Credex sales process is broken

**Action:**
- Ride-along on 3 sales calls: Are leads qualified?
- Check lead data: Are we passing full audit context?
- Interview lost leads: "Why didn't you move forward with Credex?"

**Pivot if:** Month 3 still zero conversions

---

## Instrumentation Plan

### What to Instrument First

**Week 1 (MVP):**
1. Audits started (GA event)
2. Audits completed (GA event + Supabase row)
3. Email captures (Supabase row)

**Week 2:**
4. Share clicks (GA event)
5. Consultation bookings (Supabase row)
6. Channel attribution (UTM params → Supabase)

**Week 3:**
7. Drop-off points (GA funnel: form_start → tool_add → team_info → submit)
8. Time to complete (GA timing)
9. Error rates (Sentry)

### What NOT to Track (Yet)

- **Heatmaps:** Overkill for MVP. Use after 1000 users.
- **Session replays:** Privacy concerns. Use sparingly for debugging only.
- **Scroll depth:** Not actionable. Results page is long by design.

---

## Dashboard View (What Credex Team Sees)

### Daily View

```
Today's Metrics:
- Audits Completed: 47 (+12 vs yesterday)
- Email Captures: 19 (40% capture rate ✓)
- High-Value Leads: 6 (32% of emails ✓)
- Consultations Booked: 1

Week-to-Date:
- Audits: 312
- Qualified Leads: 125
- On track for: 540 audits/month (target: 500)
```

### Channel Performance

```
| Channel      | Audits | Emails | HV Leads | CAC  |
|--------------|--------|--------|----------|------|
| Hacker News  | 180    | 72     | 25       | $278 |
| r/SaaS       | 72     | 29     | 12       | $556 |
| Discord      | 45     | 38     | 17       | $1172|
| Twitter DMs  | 15     | 8      | 2        | $29k |
```

**Action:** Kill Twitter DMs (unprofitable), double down on HN.

---

## Success Criteria by Month

### Month 1 (MVP Validation)
- ✅ 500 audits completed
- ✅ 200 email captures (40% rate)
- ✅ 5 Credex consultations booked
- ✅ 1-2 Credex customers closed

**If not met:** Re-evaluate problem-solution fit

### Month 3 (Product-Market Fit)
- ✅ 2,000 audits/month
- ✅ 800 email captures
- ✅ 15 consultations booked/month
- ✅ 5 Credex customers/month
- ✅ 10% traffic from referrals (word-of-mouth)

**If not met:** Reassess GTM strategy

### Month 6 (Scaling)
- ✅ 5,000 audits/month
- ✅ 100 qualified leads/month
- ✅ 30 consultations/month
- ✅ 10 Credex customers/month ($2k MRR added)
- ✅ 30% traffic from organic/referral

**If met:** Continue scaling GTM budget

---

## The One Metric That Matters Most

**If you only track one thing, track:** 

**Qualified Leads per Week**

Why:
- Captures both volume AND quality
- Directly maps to Credex revenue
- Easy to explain to stakeholders
- Actionable (can be improved via GTM or funnel optimization)

**Goal:** 
- Week 4: 25/week
- Month 3: 100/week  
- Month 6: 200/week

If this number is growing week-over-week, everything else will follow.
