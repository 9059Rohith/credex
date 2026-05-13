import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { supabaseAdmin } from "@/lib/supabase";
import { runAudit } from "@/lib/auditEngine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tools, teamSize, primaryUseCase } = body;

    // Run audit engine
    const auditResult = runAudit({ tools, teamSize, primaryUseCase });

    // Generate unique ID
    const auditId = nanoid(10);

    // Save to Supabase (if configured)
    if (supabaseAdmin) {
      try {
        const { error } = await supabaseAdmin
          .from("audits")
          .insert({
            id: auditId,
            tools_input: tools,
            audit_result: auditResult,
            total_monthly_savings: auditResult.totalMonthlySavings,
            total_annual_savings: auditResult.totalAnnualSavings,
            use_case: primaryUseCase,
            team_size: teamSize,
          });

        if (error) {
          console.error("Supabase error:", error);
        }
      } catch (supabaseError) {
        console.error("Failed to save to Supabase:", supabaseError);
        // Continue anyway - audit still works without DB
      }
    }

    return NextResponse.json({
      auditId,
      auditResult,
    });
  } catch (error) {
    console.error("Audit error:", error);
    return NextResponse.json(
      { error: "Failed to process audit" },
      { status: 500 }
    );
  }
}
