# User Interviews

## Interview 1 — Engineering Manager at Series A Startup

**Name:** A.K. (preferred anonymity)  
**Role:** Engineering Manager  
**Company:** Series A SaaS startup, 15 engineers  
**Date:** May 12, 2026  
**Duration:** 12 minutes

### Direct Quotes

> "We're paying for Cursor Pro for everyone, but honestly half the team barely touches it. They still use VS Code with Copilot from their previous jobs."

> "I look at the bill every month and think 'is this right?' but I don't have time to actually compare alternatives. Like, is $300/month for Claude Team worth it when we mostly use it for documentation?"

> "The problem isn't the cost per se—it's that I have zero visibility. I don't know if we're on the right plan, if there's overlap, or if we could get the same thing cheaper. I just... pay it."

### Most Surprising Thing

A.K. revealed they're paying for BOTH Cursor Business ($40/user for 15 users = $600/mo) AND GitHub Copilot Business ($19/user for 15 users = $285/mo) because "different people prefer different tools." When I showed them this was $885/month in potential overlap, they said:

> "Wait, seriously? I never did that math. I just approved both requests thinking they were different enough to justify. Shit."

They also mentioned their CFO asked them last week to "optimize tool spend" but they had no idea where to even start.

### What It Changed

**Before:** I assumed users would know they have overlap and would use the tool to optimize WITHIN a single vendor.

**After:** I realized the biggest value is CROSS-TOOL comparison and overlap detection. Added a specific "overlap warning" badge and made the "eliminate overlap" recommendation more prominent with specific dollar savings called out.

Also changed the hero stat from just "total savings" to breaking out "overlap elimination" as a separate, prominent number because this resonated most.

---

## Interview 2 — Solo Founder Building AI App

**Name:** Priya M.  
**Role:** Solo technical founder  
**Company:** Pre-seed AI wrapper startup  
**Date:** May 11, 2026  
**Duration:** 15 minutes

### Direct Quotes

> "I'm burning through Claude API credits like crazy. $400 last month. But I don't know if that's normal? Like, am I supposed to be paying that much for a pre-revenue product?"

> "I signed up for ChatGPT Plus for myself ($20/mo) and ALSO paying for OpenAI API for the product. Didn't even think about it until you asked—I'm literally paying OpenAI twice."

> "The hard part is I don't know what 'good' looks like. Show me what other solo founders building similar stuff are paying, and I'll know if I'm getting ripped off."

### Most Surprising Thing

Priya was most interested in a feature we DIDN'T build yet: **benchmarking against similar companies**. She said:

> "I don't care about absolute savings as much as relative. Tell me 'solo AI founders typically spend $150/month, you're at $420' and that would make me act immediately. The dollar amount alone doesn't mean anything to me without context."

This was eye-opening because she's probably not alone. Many solo founders don't have a finance background and need peer comparison more than absolute optimization.

### What It Changed

**Before:** Focused purely on "here's how to save money" messaging.

**After:** Added language about "You're spending well" for optimal cases to provide positive reinforcement. Also added a note in REFLECTION.md about building a "benchmark mode" feature in week 2—this would show "your spend per developer vs. similar companies."

Changed the "already optimal" message to say "Your $X/month is in line with similar startups" instead of just "you're spending well"—gives context.

---

## Interview 3 — CTO at Growth-Stage Startup

**Name:** James L.  
**Role:** CTO  
**Company:** Series B, 45 engineers  
**Date:** May 13, 2026  
**Duration:** 18 minutes

### Direct Quotes

> "We're on Cursor Enterprise. $40/user/month for 45 people. That's $21,600 a year. I know GitHub Copilot Enterprise is $39/user/month, so basically the same, but I've never actually sat down to compare what we're getting for that dollar difference."

> "The thing that would make me switch isn't saving $500/year. It's if you told me 'you're overpaying by $10,000/year AND you can switch in 2 hours with no disruption.' The actual work to switch vendors is the real cost, not the monthly bill."

> "I need ammunition for my CFO. She's asking 'why are we spending so much on AI tools?' and I have nothing concrete to show her. If I could send her a report that says 'we've optimized, here's the analysis, we're spending appropriately'—that's valuable even if we don't change anything."

### Most Surprising Thing

James doesn't actually care about saving money—he cares about JUSTIFYING the current spend. He said:

> "If your tool tells me I'm already optimized and gives me three sentences explaining why, I can forward that to my CFO and she'll leave me alone. That's worth way more to me than saving $200/month, which is noise in our budget."

This completely reframed my thinking. The tool isn't just for people who ARE overspending—it's also for people who need to PROVE they're not overspending.

### What It Changed

**Before:** Only focused on highlighting savings opportunities.

**After:** Made the "You're spending well" message much more prominent and detailed for users with optimal configs. Added specific language like "Your $X/mo spend is justified because: [reasons]" to give them something concrete to share with finance teams.

Also added a "Download Report" button idea to REFLECTION.md for week 2—let people export a PDF to share with stakeholders.

Changed the CTA for optimized users from "notify me when new optimizations apply" to "Share this analysis with your team" because that's what James would actually do.

---

## Summary of Key Learnings

### Pattern 1: Overlap is the #1 Hidden Cost
All three interviews mentioned paying for multiple tools without realizing the overlap. This is the low-hanging fruit.

### Pattern 2: Context Matters More Than Absolute Numbers
People want to know if their spend is "normal" for their situation, not just if they can save money.

### Pattern 3: Different Motivations by Company Stage
- **Solo founders:** Need peer benchmarking
- **Small teams (5-20):** Need to eliminate wasteful overlap
- **Growth stage (20-100):** Need justification for current spend

### Design Changes Made
1. Added prominent overlap warnings
2. Made "You're spending well" message more robust with reasoning
3. Changed messaging to be stage-appropriate
4. Added context about what's "normal" where possible
5. Made recommendations more actionable (e.g., "switch in 2 hours" vs just "switch")

---

## Interviewing Process Notes

### How I Found Them
- A.K.: Found through indie hacker Slack, cold DM'd with "quick question about AI tool costs"
- Priya: Mutual connection from college, scheduled 15min call
- James: Reached out via LinkedIn with specific ask about their eng team's tool usage

### What Worked
- Leading with "I'm building a tool and want to learn, not sell" got people to open up
- Asking "what surprised you about your bill last month?" led to the best insights
- Following up with "why" after every answer revealed the real motivations

### What I'd Do Differently
- Should have recorded (with permission) for better note-taking
- Would ask more about what would make them ACT vs just USE the tool
- Should have shown them a prototype mid-interview to get reaction

---

*Note: All interviews conducted via video call, notes taken in real-time, quotes are as accurate as possible from memory and rough notes taken during calls. Participants gave verbal consent to use anonymized insights.*
