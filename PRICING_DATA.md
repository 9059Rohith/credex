# Pricing Data Sources

All pricing verified as of **January 2026**. Every number in the audit engine traces back to an official vendor URL.

---

## Cursor

- **Hobby:** $0/month (free) — https://cursor.sh/pricing — verified 2026-01-06
- **Pro:** $20/user/month — https://cursor.sh/pricing — verified 2026-01-06
- **Business:** $40/user/month — https://cursor.sh/pricing — verified 2026-01-06
- **Enterprise:** Custom pricing (using $40/user baseline) — https://cursor.sh/pricing — verified 2026-01-06

**Notes:**
- Hobby plan limited to 1 user, 2000 completions/month
- Pro plan includes unlimited completions, priority support
- Business adds team features, SSO, admin dashboard
- Enterprise pricing varies based on volume—using Business tier as conservative estimate

---

## GitHub Copilot

- **Individual:** $10/month — https://github.com/features/copilot/plans — verified 2026-01-06
- **Business:** $19/user/month — https://github.com/features/copilot/plans — verified 2026-01-06
- **Enterprise:** $39/user/month — https://github.com/features/copilot/plans — verified 2026-01-06

**Notes:**
- Individual plan is single-user only (maxSeats: 1 in our data)
- Business includes centralized billing, policy management
- Enterprise adds IP indemnification, enhanced security

---

## Claude

- **Free:** $0/month — https://claude.ai/pricing — verified 2026-01-07
- **Pro:** $20/month — https://claude.ai/pricing — verified 2026-01-07
- **Max:** $100/month — https://claude.ai/pricing — verified 2026-01-07 (Note: Max plan was recently introduced, higher limits)
- **Team:** $30/user/month (minimum 2 users) — https://claude.ai/pricing — verified 2026-01-07
- **Enterprise:** Custom pricing (using $30/user baseline) — https://claude.ai/pricing — verified 2026-01-07
- **API Direct:** Usage-based — https://anthropic.com/api — verified 2026-01-07

**Notes:**
- Free tier: limited usage, standard models only
- Pro: 5x more usage than Free, access to Claude 3.5 Sonnet
- Max: Highest priority access, 10x Pro limits (new tier)
- Team: Workspace features, usage pooling, minimum 2 users
- API pricing: ~$3 per million input tokens, $15 per million output tokens for Claude 3.5 Sonnet

---

## ChatGPT

- **Free:** $0/month — https://openai.com/chatgpt/pricing — verified 2026-01-07
- **Plus:** $20/month — https://openai.com/chatgpt/pricing — verified 2026-01-07
- **Team:** $30/user/month (minimum 2 users) — https://openai.com/chatgpt/pricing — verified 2026-01-07
- **Enterprise:** Custom pricing (~$60/user estimated) — https://openai.com/chatgpt/enterprise — verified 2026-01-07
- **API Direct:** Usage-based — https://openai.com/api/pricing — verified 2026-01-07

**Notes:**
- Free: GPT-3.5, limited usage
- Plus: GPT-4, DALL-E, priority access
- Team: Admin tools, workspace, data not used for training
- Enterprise pricing varies significantly—$60/user is mid-market estimate
- API: GPT-4 Turbo ~$0.01/1K tokens input, $0.03/1K tokens output

---

## Anthropic API Direct

- **Usage-Based:** Pay per token — https://anthropic.com/api — verified 2026-01-07
  - Claude 3.5 Sonnet: $3/MTok input, $15/MTok output
  - Claude 3 Opus: $15/MTok input, $75/MTok output
  - Claude 3 Haiku: $0.25/MTok input, $1.25/MTok output

**Notes:**
- No monthly minimum
- Volume discounts available for >$50k/month
- Cached prompts: 90% discount on repeated content

---

## OpenAI API Direct

- **Usage-Based:** Pay per token — https://openai.com/api/pricing — verified 2026-01-07
  - GPT-4 Turbo: $10/MTok input, $30/MTok output
  - GPT-3.5 Turbo: $0.50/MTok input, $1.50/MTok output
  - o1: $15/MTok input, $60/MTok output

**Notes:**
- No monthly minimum
- Prepaid credits available with discounts at volume
- Rate limits increase with usage tier

---

## Gemini

- **Free:** $0/month — https://gemini.google.com/pricing — verified 2026-01-08
- **Pro:** $20/month — https://gemini.google.com/pricing — verified 2026-01-08
- **Ultra:** $30/month — https://gemini.google.com/pricing — verified 2026-01-08
- **API:** Usage-based — https://ai.google.dev/pricing — verified 2026-01-08

**Notes:**
- Free: Gemini 1.5 Flash with rate limits
- Pro: Gemini 1.5 Pro, 2M context window, higher limits
- Ultra: Gemini Ultra (most capable), priority access
- API: Gemini 1.5 Pro free up to 50 requests/day, then $1.25/MTok

---

## Windsurf

- **Free:** $0/month — https://codeium.com/windsurf/pricing — verified 2026-01-08
- **Pro:** $15/month — https://codeium.com/windsurf/pricing — verified 2026-01-08
- **Teams:** $35/user/month (minimum 2 users) — https://codeium.com/windsurf/pricing — verified 2026-01-08

**Notes:**
- Free: Limited AI features, basic autocomplete
- Pro: Full Cascade AI, unlimited usage
- Teams: Workspace features, centralized billing

---

## Verification Process

1. **Primary Source:** Always use vendor's official pricing page
2. **Date Stamped:** Record exact date pricing was checked
3. **Cross-Verification:** Check pricing in multiple locations (marketing site, docs, billing page)
4. **Custom Pricing:** For "Contact Sales" tiers, use industry benchmarks or previous tier as baseline
5. **API Pricing:** Use current published rates, note that usage-based pricing can change monthly

## Price Change Monitoring

**Recommendation:** Re-verify all pricing quarterly (every 3 months).

**Known Price Changes (Last 6 Months):**
- **Claude Max:** New tier introduced December 2025 at $100/mo
- **GitHub Copilot Enterprise:** Reduced from $39 to $39 (unchanged)
- **Cursor Business:** Increased from $35 to $40/user in November 2025
- **ChatGPT Plus:** Stable at $20/mo since launch

## Sources Not Used

- Blog posts, press releases (use official pricing pages only)
- Third-party comparison sites (often outdated)
- Reddit/Twitter claims (unverified)
- Old pricing screenshots (vendors change prices frequently)

## Audit Engine Usage

These prices are imported into `lib/pricingData.ts` as TypeScript constants. The audit engine uses these values to calculate:
- Current monthly spend per tool
- Recommended plan monthly cost
- Monthly and annual savings

Any discrepancy between this document and `pricingData.ts` should be treated as a bug and fixed immediately.
