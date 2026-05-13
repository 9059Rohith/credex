# Unit Economics

## What's a Converted Lead Worth to Credex?

**Lead Definition:** A founder/EM who completed an audit, entered their email, and showed ≥$200/mo AI spend.

**Conversion Funnel:**

```
100 Audits Completed
  → 40 Email Captures (40% conversion)
    → 12 High-Value Leads (≥$500/mo savings, 30% of emails)
      → 3 Consultation Calls Booked (25% of high-value)
        → 1 Credex Customer (33% close rate)
```

**Customer Value Calculation:**

**Scenario 1: Mid-Market Customer ($500/mo in savings)**
- Current AI spend: ~$1,500/mo retail
- Credex discount: 15-25% off retail
- Credex revenue: $225-$375/mo (assuming 15% margin on discounted credits)
- Customer LTV (24-month average): $5,400-$9,000
- **Conservative LTV estimate: $6,000**

**Scenario 2: Enterprise Customer ($2,000/mo in savings)**
- Current AI spend: ~$6,000/mo retail
- Credex revenue: $900-$1,500/mo
- Customer LTV (36-month average): $32,400-$54,000
- **Conservative LTV estimate: $40,000**

**Weighted Average (assuming 80% mid-market, 20% enterprise):**
- LTV = (0.8 × $6,000) + (0.2 × $40,000) = $4,800 + $8,000 = **$12,800 per customer**

**Per-Lead Value:**
- 100 audits → 1 customer
- **Value per audit completion: $128**
- **Value per email capture: $320**
- **Value per high-value lead: $1,067**
- **Value per consultation: $4,267**

---

## CAC at Each Channel

### Channel 1: Hacker News (Show HN)

**Costs:**
- Time to write post + first comment: 2 hours
- Ongoing comment engagement: 3 hours
- **Total cost: 5 hours @ $100/hr = $500**

**Expected Results (based on similar Show HN posts):**
- 75 upvotes (median for "Show HN" tools)
- 1,500 unique visitors
- 15% audit start rate = 225 audits started
- 80% completion rate = 180 audits completed

**CAC Calculation:**
- 180 audits → 1.8 customers (at 100:1 conversion)
- $500 / 1.8 = **$278 CAC**

**Channel ROI:** $12,800 LTV / $278 CAC = **46x return**

---

### Channel 2: Reddit (r/SaaS, r/startups)

**Costs:**
- Post creation + engagement: 1 hour per post
- 4 posts across 4 subreddits = 4 hours
- **Total cost: 4 hours @ $100/hr = $400**

**Expected Results:**
- 50-100 upvotes per post (combined)
- 800 unique visitors
- 12% audit start rate (Reddit has lower intent) = 96 audits started
- 75% completion rate (drop-off due to mobile) = 72 audits completed

**CAC Calculation:**
- 72 audits → 0.72 customers
- $400 / 0.72 = **$556 CAC**

**Channel ROI:** $12,800 LTV / $556 CAC = **23x return**

---

### Channel 3: Community Engagement (Discord/Slack)

**Costs:**
- Daily engagement (answer questions, share audit): 30 min/day × 30 days = 15 hours
- **Total cost: 15 hours @ $100/hr = $1,500/month**

**Expected Results:**
- 5 audits/day × 30 days = 150 audits/month
- 85% completion (high-intent, direct referrals)  = 128 audits completed

**CAC Calculation:**
- 128 audits → 1.28 customers
- $1,500 / 1.28 = **$1,172 CAC**

**Channel ROI:** $12,800 LTV / $1,172 CAC = **11x return**

**Note:** This CAC decreases over time as reputation builds. Month 3 CAC likely ~$500.

---

### Channel 4: Cold Twitter DMs

**Costs:**
- Identify targets (founders tweeting about AI tools): 5 hours/week
- Write personalized DMs: 10 DMs/day × 5 min each = 50 min/day = 6 hours/week
- **Total cost: 11 hours/week × 4 weeks = 44 hours = $4,400/month**

**Expected Results:**
- 300 DMs sent
- 10% response rate = 30 responses
- 50% audit completion = 15 audits completed

**CAC Calculation:**
- 15 audits → 0.15 customers
- $4,400 / 0.15 = **$29,333 CAC** 😱

**Channel ROI:** $12,800 LTV / $29,333 CAC = **0.44x return (UNPROFITABLE)**

**Verdict:** Cold DMs don't work. Shut down this channel.

---

## Conversion Funnel Economics

### Audit Completed → Email Capture

**Current:** 40% conversion rate

**What affects this:**
- Savings amount (≥$500/mo = 60% capture, <$100/mo = 20% capture)
- Page design (prominent CTA vs hidden form)
- Value prop (email = "detailed report" vs "spam me")

**Optimization Opportunity:**
- A/B test email gate position (before results vs after results)
- If moved to BEFORE results: Capture rate → 70%, but audit start drops 30%
- Net effect: (70% × 70% existing starts) = 49% total = **+9% lift**

---

### Email Capture → High-Value Lead

**Current:** 30% of emails are high-value (≥$500/mo savings)

**This is fixed by targeting** (can't optimize once they're in the funnel)

**GTM Implication:** Target channels where high-spend founders hang out:
- ✅ HN (technical founders, higher budgets)
- ✅ r/SaaS (SaaS founders, pay for tools)
- ❌ r/webdev (employees, don't control budget)

---

### High-Value Lead → Consultation Booked

**Current:** 25% book a call

**What affects this:**
- Email copy ("Credex can save you more" vs "Book a call")
- Timing (email sent immediately vs 24h delay)
- Friction (Calendly link vs "reply to book")

**Optimization Opportunity:**
- Add SMS to high-value leads (with permission): 25% → 40% = **+60% lift**
- Follow-up sequence (3 emails instead of 1): 25% → 35% = **+40% lift**

---

### Consultation → Customer

**Current:** 33% close rate

**This is Credex sales team's domain** (outside our control)

**What we can influence:**
- Lead quality (better targeting = higher close rate)
- Pre-qualification (share audit results in consultation booking)
- Timing (faster follow-up = higher close rate)

---

## Path to $1M ARR in 18 Months

**Assumptions:**
- Average customer: $200/mo (Credex revenue, not retail)
- LTV: $12,800 (64-month payback, conservative)
- Target: $1M ARR = 417 customers paying $200/mo

**Working Backwards:**

**Month 18 Target:**
- 417 active customers
- Churn: 5%/month (typical for infrastructure credits)
- Need to add: 417 / (1 - 0.05)^18 = **~600 total customers acquired over 18 months**

**Customer Acquisition Schedule:**

```
Month 1-3: Proof of Concept (10 customers)
- Launch SpendLens
- Validate 100:1 audit:customer ratio
- Refine GTM based on early results

Month 4-6: Scale Primary Channels (40 customers)
- 2,000 audits/month × 3 months = 6,000 audits → 60 customers
- Channels: HN (2x/month), Reddit (8x/month), Community (ongoing)
- CAC: ~$500 blended

Month 7-12: Add Distribution Partnerships (200 customers)
- Partner with Cursor for co-marketing
- Launch Credex referral program
- 5,000 audits/month × 6 months = 30,000 audits → 300 customers
- CAC: ~$300 (partnerships lower CAC)

Month 13-18: Compound Growth (350 customers)
- Word of mouth kicks in (referrals = 30% of new customers)
- SEO traffic starts flowing
- 8,000 audits/month × 6 months = 48,000 audits → 480 customers
- CAC: ~$200 (referrals = $0 CAC, bringing down average)
```

**Total Customers:** 10 + 40 + 200 + 350 = 600 ✅

---

## What Needs to Be True

### Assumption 1: 100:1 Audit-to-Customer Ratio Holds

**Risk:** Maybe it's 200:1 (worse) or 50:1 (better)

**Mitigation:**
- Test in Month 1 with 500+ audits
- If 200:1: Need 2x traffic → increase GTM spend or improve funnel
- If 50:1: Ahead of plan → expand to adjacent markets (agencies, consultants)

---

### Assumption 2: High-Value Leads (≥$500/mo) Are 30% of Emails

**Risk:** Targeting brings in low-spend users (<$200/mo total spend)

**Mitigation:**
- Pre-qualify in GTM copy ("for teams spending $1k+/month on AI")
- Add "minimum spend" filter to lead scoring
- Focus outreach on Series A+ startups (higher budgets)

---

### Assumption 3: Credex Close Rate Stays at 33%

**Risk:** Lead quality deteriorates as we scale

**Mitigation:**
- Share full audit data with sales team (not just email)
- Pre-qualification: "Are you open to switching vendors?"
- Nurture sequence: 3 educational emails before sales handoff

---

### Assumption 4: CAC Stays Below $500 Blended

**Risk:** Channels saturate, CAC increases to $1,000+

**Mitigation:**
- Diversify channels (don't rely on HN alone)
- Build SEO foundation (long-term $0 CAC channel)
- Invest in referral mechanics (lowest CAC channel)

---

### Assumption 5: Partnerships Materialize (Month 7+)

**Risk:** Cursor/Claude say no to co-marketing

**Mitigation:**
- Have backup: content partnerships, SaaS newsletters, founder communities
- Credex's existing relationships de-risk this
- If partnerships fail: Increase organic GTM budget by 2x

---

## Financial Model (18 Months)

| Metric | Month 6 | Month 12 | Month 18 |
|--------|---------|----------|----------|
| **Customers** | 50 | 250 | 417 |
| **MRR** | $10k | $50k | $83k |
| **ARR** | $120k | $600k | $1M ✅ |
| **Audits/Month** | 2,000 | 5,000 | 8,000 |
| **CAC (Blended)** | $500 | $350 | $250 |
| **GTM Spend** | $25k | $87k | $104k |
| **LTV:CAC** | 25.6x | 36.6x | 51.2x |

**Burn to $1M ARR:** ~$400k in GTM spend over 18 months

**This is profitable** even with 5% monthly churn and conservative LTV estimates.

---

## The Spreadsheet

**Key Formula:**

```
Customers Needed = Target ARR / (Avg Customer Value × 12)
Audits Needed = Customers Needed × 100 (audit:customer ratio)
GTM Budget = Audits Needed × (CAC / 100)
```

**Example (Month 12):**
- Target ARR: $600k
- Avg Customer: $200/mo
- Customers needed: $600k / ($200 × 12) = 250 customers
- Audits needed (cumulative): 250 × 100 = 25,000 audits
- CAC (blended): $350
- GTM budget (cumulative): 25,000 × ($350 / 100) = $87,500

**ROI Check:**
- Revenue: $600k/year
- GTM Cost: $87.5k
- **7x return on GTM spend** ✅

---

## Reality Check

**This model assumes:**
- ✅ Product-market fit exists (validated in Month 1-3)
- ✅ Credex can close 33% of qualified leads (reasonable for infrastructure sales)
- ✅ Churn stays at 5%/month (typical for usage-based billing)
- ⚠️ Partnerships happen (mitigated by Credex's existing relationships)
- ⚠️ Channels don't saturate (mitigated by diversification)

**Biggest Risk:** If audit:customer ratio is 200:1 instead of 100:1, we need 2x traffic = 2x GTM budget = $800k burn. Still profitable at $1M ARR, but tighter margins.

**Biggest Opportunity:** Referrals. If 30% of customers come from referrals (at $0 CAC), blended CAC drops to ~$175, improving unit economics significantly.
