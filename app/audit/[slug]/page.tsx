import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import AuditResults from "@/components/AuditResults";
import { formatCurrency } from "@/lib/utils";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function getSupabaseClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

async function getAudit(slug: string) {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  
  const { data, error } = await supabase
    .from("audits")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;

  return {
    slug: data.slug,
    toolsJson: data.tools_json,
    resultsJson: data.results_json,
    aiSummary: data.ai_summary,
    teamSize: data.team_size,
    primaryUseCase: data.primary_use_case,
    totalMonthlySavings: data.total_monthly_savings,
    createdAt: data.created_at,
  };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const audit = await getAudit(params.slug);

  if (!audit) {
    return {
      title: "Audit Not Found",
    };
  }

  const savings = formatCurrency(audit.totalMonthlySavings);
  const annualSavings = formatCurrency(audit.totalMonthlySavings * 12);

  return {
    title: `AI Spend Audit: Save ${savings}/mo · SpendLens`,
    description: `This team could save ${savings} per month (${annualSavings}/year) on AI tools. Get your free audit in 2 minutes.`,
    openGraph: {
      title: `This team could save ${savings}/month on AI tools`,
      description: `Free AI spend audit — see yours in 2 minutes at SpendLens`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Save ${savings}/month on AI tools`,
      description: "Free AI spend audit for startups",
    },
  };
}

export default async function AuditPage({
  params,
}: {
  params: { slug: string };
}) {
  const audit = await getAudit(params.slug);

  if (!audit) {
    notFound();
  }

  const tools = JSON.parse(audit.toolsJson);
  const results = JSON.parse(audit.resultsJson);

  return (
    <AuditResults
      slug={audit.slug}
      tools={tools}
      results={results}
      aiSummary={audit.aiSummary}
      teamSize={audit.teamSize}
      primaryUseCase={audit.primaryUseCase}
    />
  );
}
