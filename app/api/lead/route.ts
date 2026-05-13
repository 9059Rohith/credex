import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

function getSupabaseClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, companyName, role, teamSize, auditSlug, totalMonthlySavings } = body;

    // Basic validation
    if (!email || !auditSlug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Store lead in Supabase (if configured)
    const supabase = getSupabaseClient();
    if (supabase) {
      const { error: leadError } = await supabase.from("leads").insert({
      email,
      company_name: companyName || null,
      role: role || null,
      team_size: teamSize,
      audit_slug: auditSlug,
      total_monthly_savings: totalMonthlySavings,
      created_at: new Date().toISOString(),
    });

      if (leadError) {
        console.error("Supabase lead insert error:", leadError);
      }
    }

    // Send email via Resend (if configured)
    const resend = getResendClient();
    if (resend) {
      try {
        await resend.emails.send({
        from: "SpendLens <audit@spendlens.ai>",
        to: email,
        subject: `Your AI Spend Audit - Save $${Math.round(totalMonthlySavings)}/month`,
        html: `
          <h1>Your AI Spend Audit Results</h1>
          <p>Thanks for using SpendLens! Here's a summary of your audit:</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin: 0 0 10px 0;">💰 Potential Savings</h2>
            <p style="font-size: 32px; font-weight: bold; margin: 10px 0; color: #2563eb;">
              $${Math.round(totalMonthlySavings)}/month
            </p>
            <p style="margin: 0;">That's $${Math.round(totalMonthlySavings * 12)}/year!</p>
          </div>

          <p>View your full audit here:<br>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/audit/${auditSlug}" style="color: #2563eb;">
            ${process.env.NEXT_PUBLIC_BASE_URL}/audit/${auditSlug}
          </a></p>

          ${totalMonthlySavings >= 500 ? `
            <div style="border: 2px solid #2563eb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0;">🎯 High-Value Opportunity</h3>
              <p>With savings this large, you're an ideal candidate for Credex's discounted AI infrastructure credits.</p>
              <p>We'll reach out within 24 hours to discuss how we can help you capture even more savings.</p>
            </div>
          ` : ''}

          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Built by Credex · <a href="https://credex.rocks">credex.rocks</a>
          </p>
        `,
      });
      } catch (emailError) {
        console.error("Resend email error:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json(
      { error: "Failed to capture lead" },
      { status: 500 }
    );
  }
}
