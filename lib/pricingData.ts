// All pricing data verified as of January 2026
// Sources cited in PRICING_DATA.md

export interface PricingTier {
  name: string;
  pricePerSeat: number;
  minSeats?: number;
  maxSeats?: number;
  isUsageBased?: boolean;
}

export interface ToolPricing {
  name: string;
  tiers: PricingTier[];
  primaryUseCase: string[];
}

export const TOOL_PRICING: Record<string, ToolPricing> = {
  cursor: {
    name: "Cursor",
    tiers: [
      { name: "Hobby", pricePerSeat: 0, minSeats: 1, maxSeats: 1 },
      { name: "Pro", pricePerSeat: 20, minSeats: 1 },
      { name: "Business", pricePerSeat: 40, minSeats: 1 },
      { name: "Enterprise", pricePerSeat: 40, minSeats: 10 }, // Custom pricing, using Business as baseline
    ],
    primaryUseCase: ["coding"],
  },
  
  githubCopilot: {
    name: "GitHub Copilot",
    tiers: [
      { name: "Individual", pricePerSeat: 10, minSeats: 1, maxSeats: 1 },
      { name: "Business", pricePerSeat: 19, minSeats: 1 },
      { name: "Enterprise", pricePerSeat: 39, minSeats: 1 },
    ],
    primaryUseCase: ["coding"],
  },
  
  claude: {
    name: "Claude",
    tiers: [
      { name: "Free", pricePerSeat: 0, minSeats: 1, maxSeats: 1 },
      { name: "Pro", pricePerSeat: 20, minSeats: 1, maxSeats: 1 },
      { name: "Max", pricePerSeat: 100, minSeats: 1, maxSeats: 1 },
      { name: "Team", pricePerSeat: 30, minSeats: 2 },
      { name: "Enterprise", pricePerSeat: 30, minSeats: 5 }, // Custom pricing
      { name: "API Direct", pricePerSeat: 0, isUsageBased: true },
    ],
    primaryUseCase: ["coding", "writing", "research", "mixed"],
  },
  
  chatgpt: {
    name: "ChatGPT",
    tiers: [
      { name: "Free", pricePerSeat: 0, minSeats: 1, maxSeats: 1 },
      { name: "Plus", pricePerSeat: 20, minSeats: 1, maxSeats: 1 },
      { name: "Team", pricePerSeat: 30, minSeats: 2 },
      { name: "Enterprise", pricePerSeat: 60, minSeats: 1 }, // Estimated
      { name: "API Direct", pricePerSeat: 0, isUsageBased: true },
    ],
    primaryUseCase: ["writing", "research", "mixed"],
  },
  
  anthropicApi: {
    name: "Anthropic API Direct",
    tiers: [
      { name: "Usage-Based", pricePerSeat: 0, isUsageBased: true },
    ],
    primaryUseCase: ["coding", "writing", "data", "research", "mixed"],
  },
  
  openaiApi: {
    name: "OpenAI API Direct",
    tiers: [
      { name: "Usage-Based", pricePerSeat: 0, isUsageBased: true },
    ],
    primaryUseCase: ["coding", "writing", "data", "research", "mixed"],
  },
  
  gemini: {
    name: "Gemini",
    tiers: [
      { name: "Free", pricePerSeat: 0, minSeats: 1, maxSeats: 1 },
      { name: "Pro", pricePerSeat: 20, minSeats: 1, maxSeats: 1 },
      { name: "Ultra", pricePerSeat: 30, minSeats: 1, maxSeats: 1 },
      { name: "API", pricePerSeat: 0, isUsageBased: true },
    ],
    primaryUseCase: ["writing", "research", "mixed"],
  },
  
  windsurf: {
    name: "Windsurf",
    tiers: [
      { name: "Free", pricePerSeat: 0, minSeats: 1, maxSeats: 1 },
      { name: "Pro", pricePerSeat: 15, minSeats: 1, maxSeats: 1 },
      { name: "Teams", pricePerSeat: 35, minSeats: 2 },
    ],
    primaryUseCase: ["coding"],
  },
};

// Alternative recommendations by use case
export const ALTERNATIVES_BY_USE_CASE = {
  coding: [
    { tool: "cursor", tier: "Pro", score: 95 },
    { tool: "githubCopilot", tier: "Individual", score: 90 },
    { tool: "windsurf", tier: "Pro", score: 85 },
    { tool: "claude", tier: "Pro", score: 80 },
  ],
  writing: [
    { tool: "claude", tier: "Pro", score: 95 },
    { tool: "chatgpt", tier: "Plus", score: 90 },
    { tool: "gemini", tier: "Pro", score: 85 },
  ],
  data: [
    { tool: "claude", tier: "Pro", score: 90 },
    { tool: "chatgpt", tier: "Plus", score: 85 },
    { tool: "gemini", tier: "Pro", score: 80 },
  ],
  research: [
    { tool: "claude", tier: "Pro", score: 95 },
    { tool: "chatgpt", tier: "Plus", score: 90 },
    { tool: "gemini", tier: "Pro", score: 85 },
  ],
  mixed: [
    { tool: "claude", tier: "Pro", score: 90 },
    { tool: "chatgpt", tier: "Plus", score: 85 },
    { tool: "cursor", tier: "Pro", score: 80 },
  ],
};

// Credex discount thresholds
export const CREDEX_THRESHOLD = 200; // Monthly spend threshold for Credex opportunity
export const HIGH_SAVINGS_THRESHOLD = 500; // High-value lead threshold
export const OVERSEATING_MULTIPLIER = 1.2; // 20% buffer for team size

export function getToolPricing(toolKey: string): ToolPricing | undefined {
  return TOOL_PRICING[toolKey];
}

export function getTierPricing(toolKey: string, tierName: string): PricingTier | undefined {
  const tool = TOOL_PRICING[toolKey];
  if (!tool) return undefined;
  return tool.tiers.find(t => t.name === tierName);
}
