import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { runAudit, type AuditInput } from "@/lib/auditEngine";
import { createClient } from "@supabase/supabase-js";
import { generateAISummary } from "@/lib/groq";

function getSupabaseClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tools, teamSize, primaryUseCase } = body;

    // Run the audit
    const auditInput: AuditInput = {
      tools,
      teamSize,
      primaryUseCase,
    };
    const auditResult = runAudit(auditInput);

    // Generate AI summary
    const toolList = tools.map((t: any) => t.tool);
    const topRecommendations = auditResult.recommendations
      .filter((a: any) => a.monthlySavings > 0)
      .slice(0, 3)
      .map((a: any) => a.reason);
    
    const aiSummary = await generateAISummary({
      useCase: primaryUseCase,
      teamSize,
      totalMonthly: tools.reduce((sum: number, t: any) => sum + (t.monthlySpend || 0), 0),
      totalSavings: auditResult.totalMonthlySavings,
      totalAnnual: auditResult.totalAnnualSavings,
      toolList,
      topRecommendations,
    });

    // Generate unique slug
    const slug = nanoid(10);

    // Save to Supabase (if configured)
    const supabase = getSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from("audits").insert({
      slug,
      tools_json: JSON.stringify(tools),
      results_json: JSON.stringify(auditResult),
      ai_summary: aiSummary,
      team_size: teamSize,
      primary_use_case: primaryUseCase,
      total_monthly_savings: auditResult.totalMonthlySavings,
      created_at: new Date().toISOString(),
    });

      if (error) {
        console.error("Supabase insert error:", error);
      }
    }

    return NextResponse.json({ slug, audit: auditResult, aiSummary });
  } catch (error) {
    console.error("Audit API error:", error);
    return NextResponse.json(
      { error: "Failed to generate audit" },
      { status: 500 }
    );
  }
}
