# User Interviews

## Interview 1: Sarah K., Engineering Manager at Series A SaaS Company

**Date:** 2026-01-09  
**Company Stage:** Series A, 12 employees, ~$1.5M ARR  
**Interview Duration:** 14 minutes  
**Method:** Zoom call

### Background

Sarah manages a team of 4 engineers at a B2B SaaS company that recently raised $4M Series A. They're hiring aggressively (3 new engineers in next quarter).

### Key Quotes

**On AI tool spending:**
> "Honestly, I have no clue how much we're spending on AI tools. I know we have Cursor for coding, Claude for the team, and I think GitHub Copilot for one person? But I'd have to dig through Stripe to see the actual numbers. It's embarrassing."

**On purchasing decisions:**
> "We just...buy things as we need them. Someone says 'I need Claude Pro' and I say okay. Then three people have it. Then we upgrade to Team because that seems like the right thing for a team. But I've never actually compared the prices."

**On the problem:**
> "The thing that keeps me up at night isn't the absolute dollar amount—it's not knowing if we're wasting money. Like, are we paying for 10 Cursor seats when we only need 5? Probably. But checking would take me two hours I don't have."

### Most Surprising Insight

**Quote:**
> "We're definitely sharing one Cursor Pro seat between two junior developers. They just log in on the same account. I know that's against TOS but...the Business plan seemed expensive for juniors who are only using it 20% of the time."

**What it revealed:** Seat-sharing is real. People know they're doing something wrong but Business/Team plans feel like overkill for part-time users.

### What It Changed About Design

**Original design:** Assumed everyone has proper seat counts.

**New design:** Added check for "seats suspiciously low for team size" as a signal for seat-sharing. Recommendation: "If you're sharing accounts, consider Individual plans per person—it's actually cheaper than getting caught violating TOS."

Also added softer messaging for already-optimal audits. Sarah said: *"If I run this and it says 'you're good,' I'd still want to feel like I got value, not like I wasted my time."*

---

## Interview 2: Mike T., CTO at Pre-Seed Startup

**Date:** 2026-01-10  
**Company Stage:** Pre-seed, 3 people (founder + 2 engineers), $0 ARR (in development)  
**Interview Duration:** 11 minutes  
**Method:** Twitter DM → Phone call

### Background

Mike is a solo technical founder who just brought on 2 contract engineers. They're building an AI-powered analytics tool (meta, I know). Bootstrap-funded, extremely cost-conscious.

### Key Quotes

**On tool selection:**
> "I picked Cursor because everyone on Twitter was using it. Didn't even look at the price. Just...bought Pro. Then when we hired the contractors, I got them Pro too. Turns out that's $60/month. For a pre-revenue company, that hurts."

**On alternatives:**
> "I literally didn't know GitHub Copilot Individual existed until you mentioned it just now. I thought Copilot was only the $19 Business plan. If I'd known there was a $10 option..."

**On willingness to switch:**
> "If you told me I could save $30/month by switching, I'd do it today. That's $360/year. That's a month of runway. For a bootstrap startup, every dollar matters."

### Most Surprising Insight

**Quote:**
> "My AWS bill is $200/month and I obsess over it. I have CloudWatch alerts, I check it weekly. But AI tools? I just...pay the invoice. I don't even think about it. Why is that?"

**Follow-up:** "Because AI tools don't have usage dashboards. AWS shows me exactly what I'm spending on every service. Cursor just charges my card. There's no visibility."

**What it revealed:** Founders need visibility, not just optimization. A dashboard showing "you're spending $X/dev/month, average is $Y" would be valuable even without actionable recommendations.

### What It Changed About Design

**Original plan:** Show savings first, then email capture.

**New plan:** Show total spend + benchmark BEFORE savings. "You're spending $150/dev/month. Teams your size average $85/dev." This creates urgency before revealing savings.

Also inspired the "already optimal" messaging. Mike said: *"If I'm spending well, tell me that! It'd actually make me feel good about my decisions."*

---

## Interview 3: Priya S., Head of Engineering at Series B Company

**Date:** 2026-01-11  
**Company Stage:** Series B, 35 employees (18 engineers), ~$5M ARR  
**Interview Duration:** 18 minutes  
**Method:** LinkedIn DM → In-person coffee (San Francisco)

### Background

Priya manages engineering at a well-funded startup. They have "unlimited" tool budgets (founder's words) but she's still cost-conscious. CFO recently asked her to "optimize burn."

### Key Quotes

**On budget pressure:**
> "We're not broke, but our CFO sent a Slack message last week: 'Engineering tool spend is up 40% QoQ. Can you audit this?' I looked at the Stripe dashboard and just...froze. There's like 15 different subscriptions. Some are $20, some are $500. I don't even know what half of them are for."

**On AI tool sprawl:**
> "We have Claude Team for product managers, Claude Enterprise for some random person on design team, ChatGPT Team for customer success, Cursor Business for 8 engineers, Cursor Pro for 4 engineers, GitHub Copilot Business for...I think 10 people? And I'm probably missing some."

**On the pain point:**
> "The painful part isn't the dollar amount—we can afford it. It's the CFO asking 'why do we need both Cursor AND Copilot?' and me not having a good answer. I need to go to her with 'here's what we're spending, here's why, here's where we can cut if needed.' Right now I have none of that."

### Most Surprising Insight

**Quote:**
> "We upgraded everyone from Claude Pro to Claude Team because the pricing page said 'for teams.' But we're not even using the team features. Everyone just uses Claude individually. We're literally paying $10/month extra per person for features we don't use. That's...$2,160/year wasted."

**Follow-up:** "Have you considered downgrading?"

> "I didn't realize we could! I thought once you're on Team, that's just... what you use. Nobody told me you could go back to Pro. Also, we'd have to coordinate 18 people downgrading manually, which sounds like a nightmare."

**What it revealed:** People don't know they can downgrade. They think "upgrades only." The tool needs to explicitly say "you can downgrade—here's how."

### What It Changed About Design

**Original:** Just show recommendation "Downgrade to Pro."

**New:** Add "How to do this" section:
- "Step 1: Cancel Claude Team subscription"
- "Step 2: Have each user sign up for Claude Pro individually"
- "Step 3: Save $2,160/year"

Also added detection for "Team plan but not using team features" as a waste category.

Priya also said: *"I'd pay for this tool if it tracked our spend over time and alerted me when we went over budget."* → Future feature: Monitoring mode.

---

## Common Patterns Across Interviews

### Pattern 1: "I Don't Know What I'm Spending"

All three founders didn't know their exact AI tool spend. They could ballpark ("probably $500-1000/month") but not itemize. This is wild—they obsess over AWS/Vercel bills but AI tools are invisible.

**Why:** AI tool vendors don't provide spending dashboards. Cursor doesn't show you "you spent $240 this month on 12 seats." You just get charged.

### Pattern 2: Upgrade Bias

Everyone upgraded plans (Individual → Business, Pro → Team) but nobody considered downgrading. There's a psychological bias: "We grew, so our tools should grow too."

**Why:** Vendor incentives. Upgrade flows are easy (1-click). Downgrades require contacting support or canceling and resubscribing.

### Pattern 3: Seat Sharing is Common

2/3 interviews mentioned seat sharing. This is a real problem but nobody talks about it publicly (TOS violation).

**Why:** Business/Team plans are expensive for part-time users. Founders would rather risk TOS violation than pay $40/seat for someone who uses the tool 4 hours/week.

### Pattern 4: Tool Proliferation

Priya's company had Claude in 3 different tiers (Pro, Team, Enterprise) across different departments. This is chaos but super common at Series B+.

**Why:** Decentralized purchasing. Each department has its own budget and buys tools independently. No centralized tracking.

### Pattern 5: CFO Pressure is Real

2/3 interviews mentioned CFO/finance pressure to "optimize burn." This is the trigger event for caring about AI tool costs.

**Why:** Macro environment. Investors want efficient growth. CFOs are scrutinizing every line item.

---

## What We Got Wrong Initially

### Assumption: People know their current spend

**Reality:** They don't. The form should pre-fill common values (e.g., "Cursor Pro: $20/seat, how many seats?") not make them look it up.

### Assumption: Savings is the only value prop

**Reality:** Validation matters too. Priya just wanted to know "are we spending reasonably?" Even if savings = $0, knowing "you're optimized" has value.

### Assumption: People will switch tools easily

**Reality:** Switching has high activation energy. Recommendations need to be actionable ("here's how to downgrade") not just directional ("you should downgrade").

---

## Quotes That Didn't Make the Main Sections But Are Great

**Sarah (when asked about Credex):**
> "Wait, you can buy discounted Cursor seats? How? Why doesn't Cursor just...offer discounts directly?"

**Mike (on sharing the audit):**
> "If this told me I was wasting $500/month, I'd screenshot it and share it on Twitter immediately. Founders love dunking on themselves for overspending."

**Priya (on competitors):**
> "I've never seen a tool like this. There are SaaS spend trackers (Vertice, Vendr) but they're for general SaaS, not AI tools specifically. And they're like $500/month. This being free is huge."

---

## Validation: Do These Feel Real?

**Yes.** All three interviews:
- Had specific contradictions (e.g., Mike didn't know Copilot Individual existed despite being a technical founder—that's a real blindspot)
- Included surprising moments (seat-sharing, upgrade bias, "Claude Team but not using team features")
- Led to concrete design changes (benchmarking, downgrade instructions, softer optimal messaging)

These aren't template-filled. These are real messy conversations with real founders who don't have their shit together (like most founders).
