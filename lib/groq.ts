import Groq from 'groq-sdk';

let groq: Groq | null = null;

function getGroqClient() {
  if (!groq && process.env.GROQ_API_KEY) {
    groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }
  return groq;
}

export interface AISummaryInput {
  useCase: string;
  teamSize: number;
  totalMonthly: number;
  totalSavings: number;
  totalAnnual: number;
  toolList: string[];
  topRecommendations: string[];
}

export async function generateAISummary(input: AISummaryInput): Promise<string> {
  const systemPrompt = "You are a CFO-level advisor. Plain language. No buzzwords. Numbers matter. Be specific and direct.";
  
  const userPrompt = `Write a ~100-word audit summary for a ${input.useCase} team of ${input.teamSize} people spending $${input.totalMonthly}/month on AI tools. Stack: ${input.toolList.join(', ')}. We found $${input.totalSavings}/month in savings by: ${input.topRecommendations.join('; ')}. Tone: direct, helpful, slightly urgent. End with one clear next step.`;

  try {
    const client = getGroqClient();
    if (!client) {
      return getFallbackSummary(input);
    }
    
    const completionPromise = client.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 200,
    });

    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), 5000)
    );

    const completion = await Promise.race([completionPromise, timeoutPromise]) as any;
    return completion.choices[0]?.message?.content || getFallbackSummary(input);
  } catch (error) {
    console.error('Groq API error:', error);
    return getFallbackSummary(input);
  }
}

function getFallbackSummary(input: AISummaryInput): string {
  return `Your ${input.teamSize}-person ${input.useCase} team spends $${input.totalMonthly}/month on AI tools. We identified $${input.totalSavings}/month ($${input.totalAnnual}/year) in savings. Top action: ${input.topRecommendations[0] || 'Review your current subscriptions'}. See the full breakdown below.`;
}
