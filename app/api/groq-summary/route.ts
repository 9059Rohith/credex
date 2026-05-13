import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = process.env.GROQ_API_KEY ? new Groq({
  apiKey: process.env.GROQ_API_KEY,
}) : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // If no Groq API key, return fallback immediately
    if (!groq) {
      const { teamSize, useCase, totalMonthlySavings, totalAnnualSavings } = body;
      const fallback = `Your ${teamSize}-person ${useCase} team could save $${totalMonthlySavings}/month ($${totalAnnualSavings}/year) on AI tools. Review the recommendations below to optimize your spending.`;
      return NextResponse.json({ summary: fallback, fallback: true });
    }
    const { teamSize, useCase, totalMonthlySavings, totalAnnualSavings, tools, recommendations } = body;

    // Build context for AI
    const toolsList = tools.map((t: any) => `${t.tool} (${t.plan})`).join(", ");
    const topRecs = recommendations
      .filter((r: any) => r.monthlySavings > 0)
      .slice(0, 3)
      .map((r: any) => r.reason)
      .join("; ");

    const prompt = `You are a CFO-level advisor analyzing AI tool spending. Be direct and specific with numbers.

Team: ${teamSize} people using AI tools for ${useCase}
Current stack: ${toolsList}
Potential savings: $${totalMonthlySavings}/month ($${totalAnnualSavings}/year)
${topRecs ? `Key findings: ${topRecs}` : "Stack is well-optimized"}

Write a concise 2-3 sentence executive summary. Include specific numbers. Be helpful but slightly urgent if there are significant savings. End with one clear next step.`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a CFO-level advisor. Plain language. No buzzwords. Numbers matter. Be specific and direct."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 250,
      top_p: 1,
    });

    const summary = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error("Groq API error:", error);
    
    // Fallback summary
    const { teamSize, useCase, totalMonthlySavings, totalAnnualSavings } = await req.json();
    const fallback = `Your ${teamSize}-person ${useCase} team could save $${totalMonthlySavings}/month ($${totalAnnualSavings}/year) on AI tools. Review the recommendations below to optimize your spending.`;
    
    return NextResponse.json({ summary: fallback, fallback: true });
  }
}
