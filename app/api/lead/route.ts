import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, companyName, role, auditId, monthlySavings } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Save to Supabase (if configured)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const { error } = await supabaseAdmin
          .from("leads")
          .insert({
            email,
            company_name: companyName || null,
            role: role || null,
            audit_id: auditId,
            monthly_savings: monthlySavings,
          });

        if (error) {
          console.error("Supabase lead save error:", error);
        }
      } catch (supabaseError) {
        console.error("Failed to save lead to Supabase:", supabaseError);
      }
    }

    // Send email via Resend (if configured)
    if (resend) {
      try {
        const isHighValue = monthlySavings > 500;
        
        await resend.emails.send({
          from: "SpendLens <noreply@spendlens.app>",
          to: [email],
          subject: `Your AI Spend Audit Results - $${monthlySavings.toFixed(0)}/mo in Savings`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #10b981;">Your AI Tool Audit Report</h1>
              <p>Hi${companyName ? ` from ${companyName}` : ""}!</p>
              <p>Thanks for using SpendLens. Here's what we found:</p>
              
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="margin: 0; color: #10b981;">$${monthlySavings.toFixed(0)}/month</h2>
                <p style="margin: 5px 0 0 0; color: #6b7280;">Potential savings identified</p>
              </div>
              
              <p>Your full audit is available at: <a href="https://spendlens.app/audit/${auditId}">View Report</a></p>
              
              ${isHighValue ? `
                <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0;">
                  <h3 style="margin: 0 0 10px 0; color: #065f46;">High-Value Opportunity Detected</h3>
                  <p style="margin: 0;">With $${monthlySavings.toFixed(0)}/month in potential savings, Credex can help you save even more through discounted AI infrastructure credits.</p>
                  <p style="margin: 10px 0 0 0;"><strong>Our team will reach out within 48 hours.</strong></p>
                </div>
              ` : ""}
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
              
              <p style="color: #6b7280; font-size: 14px;">
                Built by <a href="https://credex.rocks">Credex</a> · 
                We help startups save on AI infrastructure.
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Continue anyway - lead is saved
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { error: "Failed to capture lead" },
      { status: 500 }
    );
  }
}
