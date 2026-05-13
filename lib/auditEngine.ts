import {
  TOOL_PRICING,
  getTierPricing,
  ALTERNATIVES_BY_USE_CASE,
  CREDEX_THRESHOLD,
  HIGH_SAVINGS_THRESHOLD,
  OVERSEATING_MULTIPLIER,
} from "./pricingData";

export interface ToolInput {
  tool: string;
  plan: string;
  seats: number;
  monthlySpend: number;
}

export interface AuditInput {
  tools: ToolInput[];
  teamSize: number;
  primaryUseCase: "coding" | "writing" | "data" | "research" | "mixed";
}

export interface ToolRecommendation {
  tool: string;
  toolName: string;
  currentPlan: string;
  currentSeats: number;
  currentMonthlySpend: number;
  recommendation: string;
  recommendedPlan?: string;
  recommendedSeats?: number;
  recommendedMonthlySpend: number;
  monthlySavings: number;
  annualSavings: number;
  reason: string;
}

export interface AuditResult {
  recommendations: ToolRecommendation[];
  totalCurrentSpend: number;
  totalRecommendedSpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  credexOpportunity: boolean;
  alreadyOptimal: boolean;
}

export function runAudit(input: AuditInput): AuditResult {
  const recommendations: ToolRecommendation[] = [];
  let totalCurrentSpend = 0;
  let totalRecommendedSpend = 0;

  for (const toolInput of input.tools) {
    // Skip tools with $0 spend
    if (toolInput.monthlySpend === 0 && toolInput.plan !== "Free") {
      continue;
    }

    const recommendation = auditTool(toolInput, input.teamSize, input.primaryUseCase);
    recommendations.push(recommendation);
    totalCurrentSpend += recommendation.currentMonthlySpend;
    totalRecommendedSpend += recommendation.recommendedMonthlySpend;
  }

  const totalMonthlySavings = Math.max(0, totalCurrentSpend - totalRecommendedSpend);
  const totalAnnualSavings = totalMonthlySavings * 12;
  const credexOpportunity = totalCurrentSpend >= CREDEX_THRESHOLD || totalMonthlySavings >= HIGH_SAVINGS_THRESHOLD;
  const alreadyOptimal = totalMonthlySavings < 100;

  return {
    recommendations,
    totalCurrentSpend,
    totalRecommendedSpend,
    totalMonthlySavings,
    totalAnnualSavings,
    credexOpportunity,
    alreadyOptimal,
  };
}

function auditTool(
  toolInput: ToolInput,
  teamSize: number,
  primaryUseCase: string
): ToolRecommendation {
  const toolPricing = TOOL_PRICING[toolInput.tool];
  const currentTier = getTierPricing(toolInput.tool, toolInput.plan);

  if (!toolPricing || !currentTier) {
    // Unknown tool/plan - no recommendation
    return {
      tool: toolInput.tool,
      toolName: toolInput.tool,
      currentPlan: toolInput.plan,
      currentSeats: toolInput.seats,
      currentMonthlySpend: toolInput.monthlySpend,
      recommendation: "Keep current plan",
      recommendedMonthlySpend: toolInput.monthlySpend,
      monthlySavings: 0,
      annualSavings: 0,
      reason: "Unable to analyze this configuration.",
    };
  }

  // Check for overseating
  const maxReasonableSeats = Math.ceil(teamSize * OVERSEATING_MULTIPLIER);
  if (toolInput.seats > maxReasonableSeats && !currentTier.isUsageBased) {
    const recommendedSeats = Math.max(teamSize, currentTier.minSeats || 1);
    const currentSpend = currentTier.pricePerSeat * toolInput.seats;
    const recommendedSpend = currentTier.pricePerSeat * recommendedSeats;
    const savings = currentSpend - recommendedSpend;

    return {
      tool: toolInput.tool,
      toolName: toolPricing.name,
      currentPlan: toolInput.plan,
      currentSeats: toolInput.seats,
      currentMonthlySpend: currentSpend,
      recommendation: `Reduce seats from ${toolInput.seats} to ${recommendedSeats}`,
      recommendedPlan: toolInput.plan,
      recommendedSeats,
      recommendedMonthlySpend: recommendedSpend,
      monthlySavings: savings,
      annualSavings: savings * 12,
      reason: `You're paying for ${toolInput.seats - teamSize} unused seats with a team of ${teamSize}.`,
    };
  }

  // Check for wrong plan within same tool
  const wrongPlanCheck = checkWrongPlan(toolInput, toolPricing, teamSize);
  if (wrongPlanCheck) {
    return wrongPlanCheck;
  }

  // Check for cheaper alternatives based on use case
  const alternativeCheck = checkAlternatives(toolInput, toolPricing, primaryUseCase, teamSize);
  if (alternativeCheck) {
    return alternativeCheck;
  }

  // Already optimal
  return {
    tool: toolInput.tool,
    toolName: toolPricing.name,
    currentPlan: toolInput.plan,
    currentSeats: toolInput.seats,
    currentMonthlySpend: toolInput.monthlySpend,
    recommendation: "Keep current plan",
    recommendedMonthlySpend: toolInput.monthlySpend,
    monthlySavings: 0,
    annualSavings: 0,
    reason: "This is already well-optimized for your needs.",
  };
}

function checkWrongPlan(
  toolInput: ToolInput,
  toolPricing: any,
  teamSize: number
): ToolRecommendation | null {
  const currentTier = getTierPricing(toolInput.tool, toolInput.plan);
  if (!currentTier || currentTier.isUsageBased) return null;

  // Check if team plan for 1-2 users
  if (toolInput.plan.toLowerCase().includes("team") && teamSize <= 2) {
    // Find individual/pro plan
    const betterTier = toolPricing.tiers.find(
      (t: any) =>
        (t.name.toLowerCase().includes("pro") || t.name.toLowerCase().includes("plus")) &&
        t.pricePerSeat < currentTier.pricePerSeat
    );

    if (betterTier) {
      const currentSpend = currentTier.pricePerSeat * toolInput.seats;
      const recommendedSpend = betterTier.pricePerSeat * teamSize;
      const savings = currentSpend - recommendedSpend;

      if (savings > 0) {
        return {
          tool: toolInput.tool,
          toolName: toolPricing.name,
          currentPlan: toolInput.plan,
          currentSeats: toolInput.seats,
          currentMonthlySpend: currentSpend,
          recommendation: `Downgrade to ${teamSize}x ${betterTier.name}`,
          recommendedPlan: betterTier.name,
          recommendedSeats: teamSize,
          recommendedMonthlySpend: recommendedSpend,
          monthlySavings: savings,
          annualSavings: savings * 12,
          reason: `Team plans are designed for 3+ users. Individual plans are more cost-effective for ${teamSize} ${teamSize === 1 ? "person" : "people"}.`,
        };
      }
    }
  }

  // Check if Business/Enterprise for single user when Individual exists
  if (
    (toolInput.plan.toLowerCase().includes("business") ||
      toolInput.plan.toLowerCase().includes("enterprise")) &&
    teamSize === 1
  ) {
    const individualTier = toolPricing.tiers.find(
      (t: any) => t.name.toLowerCase().includes("individual") && t.maxSeats === 1
    );

    if (individualTier) {
      const currentSpend = currentTier.pricePerSeat * toolInput.seats;
      const recommendedSpend = individualTier.pricePerSeat;
      const savings = currentSpend - recommendedSpend;

      if (savings > 0) {
        return {
          tool: toolInput.tool,
          toolName: toolPricing.name,
          currentPlan: toolInput.plan,
          currentSeats: toolInput.seats,
          currentMonthlySpend: currentSpend,
          recommendation: `Downgrade to ${individualTier.name}`,
          recommendedPlan: individualTier.name,
          recommendedSeats: 1,
          recommendedMonthlySpend: recommendedSpend,
          monthlySavings: savings,
          annualSavings: savings * 12,
          reason: `Business/Enterprise plans add team features you don't need as a solo user.`,
        };
      }
    }
  }

  return null;
}

function checkAlternatives(
  toolInput: ToolInput,
  toolPricing: any,
  primaryUseCase: string,
  teamSize: number
): ToolRecommendation | null {
  const currentTier = getTierPricing(toolInput.tool, toolInput.plan);
  if (!currentTier || currentTier.isUsageBased) return null;

  // Skip if tool is already good for this use case
  if (toolPricing.primaryUseCase.includes(primaryUseCase)) {
    return null;
  }

  // Get alternatives for this use case
  const alternatives = (ALTERNATIVES_BY_USE_CASE as any)[primaryUseCase] || [];
  
  for (const alt of alternatives) {
    if (alt.tool === toolInput.tool) continue; // Skip same tool

    const altPricing = TOOL_PRICING[alt.tool];
    const altTier = getTierPricing(alt.tool, alt.tier);

    if (!altTier || altTier.isUsageBased) continue;

    const currentSpend = currentTier.pricePerSeat * toolInput.seats;
    const altSpend = altTier.pricePerSeat * teamSize;
    const savings = currentSpend - altSpend;

    // Only recommend if savings are significant (>20%)
    if (savings > currentSpend * 0.2) {
      return {
        tool: toolInput.tool,
        toolName: toolPricing.name,
        currentPlan: toolInput.plan,
        currentSeats: toolInput.seats,
        currentMonthlySpend: currentSpend,
        recommendation: `Switch to ${altPricing.name} ${altTier.name}`,
        recommendedPlan: `${altPricing.name} ${altTier.name}`,
        recommendedSeats: teamSize,
        recommendedMonthlySpend: altSpend,
        monthlySavings: savings,
        annualSavings: savings * 12,
        reason: `${altPricing.name} is better optimized for ${primaryUseCase} workloads and costs ${Math.round((savings / currentSpend) * 100)}% less.`,
      };
    }
  }

  return null;
}
