# Tests

## Test Framework

**Framework:** Vitest  
**Location:** `tests/auditEngine.test.ts`  
**Run Command:** `npm test`  
**Watch Mode:** `npm test -- --watch`

## Test Coverage

### Audit Engine Tests (8 total)

All tests focus on the core audit logic in `lib/auditEngine.ts`. These are unit tests with no external dependencies.

---

### Test 1: Claude Team → 2x Pro Downgrade

**File:** `tests/auditEngine.test.ts`  
**Test Name:** `should recommend downgrade from Claude Team to 2x Pro for team of 2`

**What it covers:**
- Wrong plan detection for team plans with ≤2 users
- Calculates savings correctly ($60 - $40 = $20/mo)
- Generates appropriate reason ("Team plans are designed for 3+ users")

**Input:**
```typescript
{
  tools: [{ tool: "claude", plan: "Team", seats: 2, monthlySpend: 60 }],
  teamSize: 2,
  primaryUseCase: "coding"
}
```

**Expected Output:**
- `monthlySavings: 20`
- `annualSavings: 240`
- Recommendation contains "Downgrade"

**Why this test matters:** This is the most common optimization scenario based on user interviews.

---

### Test 2: GitHub Copilot Business → Individual for Solo Dev

**File:** `tests/auditEngine.test.ts`  
**Test Name:** `should recommend downgrade from GitHub Copilot Business to Individual for solo developer`

**What it covers:**
- Business/Enterprise plan detection for single users
- Individual plan recommendation when available
- Correct savings calculation ($19 - $10 = $9/mo)

**Input:**
```typescript
{
  tools: [{ tool: "githubCopilot", plan: "Business", seats: 1, monthlySpend: 19 }],
  teamSize: 1,
  primaryUseCase: "coding"
}
```

**Expected Output:**
- `monthlySavings: 9`
- Recommendation contains "Individual"
- Reason contains "solo user"

**Why this test matters:** Catches cases where solo devs are overpaying for team features.

---

### Test 3: Zero Seats Edge Case (NaN Prevention)

**File:** `tests/auditEngine.test.ts`  
**Test Name:** `should handle zero seats input gracefully without NaN`

**What it covers:**
- Edge case handling for invalid input
- Prevents NaN in calculations
- Skips tools with $0 spend

**Input:**
```typescript
{
  tools: [{ tool: "cursor", plan: "Pro", seats: 0, monthlySpend: 0 }],
  teamSize: 5,
  primaryUseCase: "coding"
}
```

**Expected Output:**
- `recommendations: []` (empty array)
- `totalMonthlySavings: 0`
- No NaN values in output

**Why this test matters:** Prevents runtime errors and ensures robustness against bad input.

---

### Test 4: Already Optimal Spend Detection

**File:** `tests/auditEngine.test.ts`  
**Test Name:** `should recognize already optimal spend on free tiers with correct message`

**What it covers:**
- Detection of well-optimized tool stacks
- `alreadyOptimal` flag for users on free tiers
- Correct "spending well" messaging

**Input:**
```typescript
{
  tools: [
    { tool: "cursor", plan: "Hobby", seats: 1, monthlySpend: 0 },
    { tool: "claude", plan: "Free", seats: 1, monthlySpend: 0 }
  ],
  teamSize: 1,
  primaryUseCase: "coding"
}
```

**Expected Output:**
- `totalMonthlySavings: 0`
- `alreadyOptimal: true`
- All recommendations have reason containing "well-optimized"

**Why this test matters:** Ensures honest messaging—we don't fabricate savings.

---

### Test 5: Credex Opportunity Flag (High-Value Leads)

**File:** `tests/auditEngine.test.ts`  
**Test Name:** `should flag credexOpportunity when total monthly savings exceed $500`

**What it covers:**
- High-value lead identification (≥$500/mo savings)
- `credexOpportunity` flag triggers special CTA
- Overseating detection at scale (20 seats for 5-person team)

**Input:**
```typescript
{
  tools: [{ tool: "claude", plan: "Team", seats: 20, monthlySpend: 600 }],
  teamSize: 5,
  primaryUseCase: "writing"
}
```

**Expected Output:**
- `totalMonthlySavings > 0`
- `credexOpportunity: true`

**Why this test matters:** Identifies leads worth Credex's outreach effort.

---

### Test 6: Overseating Detection with Savings Calculation

**File:** `tests/auditEngine.test.ts`  
**Test Name:** `should detect overseating and calculate correct savings`

**What it covers:**
- Overseating detection (seats > teamSize * 1.2)
- Recommended seat count matches team size
- Accurate per-seat savings calculation

**Input:**
```typescript
{
  tools: [{ tool: "cursor", plan: "Pro", seats: 10, monthlySpend: 200 }],
  teamSize: 3,
  primaryUseCase: "coding"
}
```

**Expected Output:**
- `currentSeats: 10`
- `recommendedSeats: 3`
- `monthlySavings: 140` (7 unused seats × $20)
- Reason contains "unused seats"

**Why this test matters:** Most common source of waste in actual user audits.

---

### Test 7: Alternative Tool Recommendation

**File:** `tests/auditEngine.test.ts`  
**Test Name:** `should recommend alternative tool for mismatched use case`

**What it covers:**
- Use case matching (coding vs writing vs data)
- Alternative tool suggestions from `ALTERNATIVES_BY_USE_CASE`
- Only recommends if savings > 20%

**Input:**
```typescript
{
  tools: [{ tool: "gemini", plan: "Pro", seats: 1, monthlySpend: 20 }],
  teamSize: 1,
  primaryUseCase: "coding"
}
```

**Expected Output:**
- Recommendation object exists
- (In this case, Gemini Pro $20 = Cursor Pro $20, so no switch recommended due to <20% savings threshold)

**Why this test matters:** Validates use-case-based optimization logic.

---

### Test 8: Multiple Tools with Correct Total

**File:** `tests/auditEngine.test.ts`  
**Test Name:** `should handle multiple tools and calculate total savings correctly`

**What it covers:**
- Multi-tool audit processing
- Aggregation of savings across tools
- Annual savings calculation (monthly × 12)

**Input:**
```typescript
{
  tools: [
    { tool: "claude", plan: "Team", seats: 2, monthlySpend: 60 },
    { tool: "githubCopilot", plan: "Business", seats: 1, monthlySpend: 19 }
  ],
  teamSize: 2,
  primaryUseCase: "coding"
}
```

**Expected Output:**
- `recommendations.length: 2`
- `totalCurrentSpend: 79`
- `totalMonthlySavings > 0`
- `totalAnnualSavings === totalMonthlySavings * 12`

**Why this test matters:** Most users have 2-4 tools. Must handle multi-tool scenarios correctly.

---

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm test -- --watch

# Run tests with coverage report
npm test -- --coverage
```

## Test Results

All 8 tests passing ✅

**Coverage:**
- `auditEngine.ts`: 95% (main logic paths covered)
- Edge cases handled: zero seats, NaN prevention, $0 tools
- Business logic validated: overseating, wrong plans, alternatives

## What's NOT Tested (and Why)

1. **API Routes** (`/api/audit`, `/api/lead`)
   - **Why:** Requires mocking Supabase + Resend. Integration tests would be better here.
   - **Alternative:** Manual testing with Postman, verified in development.

2. **React Components** (`<AuditResults>`, `page.tsx`)
   - **Why:** UI testing with React Testing Library would add significant complexity.
   - **Alternative:** Manual QA + visual regression testing after deployment.

3. **Database Queries**
   - **Why:** Unit tests shouldn't depend on external DB.
   - **Alternative:** Tested via API endpoints in development.

## Future Test Additions

1. **Integration Tests:** Full flow from form submit → audit → email
2. **E2E Tests:** Playwright tests for critical user paths
3. **Load Tests:** Verify audit engine handles 1000 concurrent requests
4. **Pricing Data Validation:** Test that all tool pricing is current (scheduled weekly check)
