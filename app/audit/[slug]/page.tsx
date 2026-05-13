import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TOOL_PRICING } from "@/lib/pricingData";

interface PageProps {
  params: { slug: string };
}

async function getAudit(id: string) {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const audit = await getAudit(params.slug);

  if (!audit) {
    return {
      title: "Audit Not Found",
    };
  }

  const savingsText = audit.total_monthly_savings > 0
    ? `$${audit.total_monthly_savings.toFixed(0)}/mo in AI spend savings`
    : "AI spend analysis";

  return {
    title: `${savingsText} - SpendLens`,
    description: `Free AI tool spend audit showing ${savingsText} for a ${audit.team_size}-person team`,
    openGraph: {
      title: `I found ${savingsText} with SpendLens`,
      description: `Free AI tool spend audit - see where your team might be overspending`,
      type: "website",
      url: `https://credex-ai-spend-audit-seven.vercel.app/audit/${params.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `I found ${savingsText} with SpendLens`,
      description: `Free AI tool spend audit - see where your team might be overspending`,
    },
  };
}

export default async function AuditPage({ params }: PageProps) {
  const audit = await getAudit(params.slug);

  if (!audit) {
    notFound();
  }

  const auditResult = audit.audit_result;
  const recommendations = auditResult.recommendations || [];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500";
      case "significant":
        return "bg-orange-500";
      case "minor":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Spend Audit Report
          </h1>
          <p className="text-xl text-muted-foreground">
            {audit.team_size}-person team • {audit.use_case} use case
          </p>
        </div>

        {/* AI Summary */}
        {audit.ai_summary && (
          <Card className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-blue-500/30 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{audit.ai_summary}</p>
            </CardContent>
          </Card>
        )}

        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Monthly Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-emerald-500">
                ${audit.total_monthly_savings.toFixed(0)}
              </div>
              <p className="text-sm text-muted-foreground mt-2">per month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Annual Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-500">
                ${audit.total_annual_savings.toFixed(0)}
              </div>
              <p className="text-sm text-muted-foreground mt-2">per year</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tools Analyzed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-purple-500">
                {recommendations.length}
              </div>
              <p className="text-sm text-muted-foreground mt-2">in your stack</p>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-bold">Savings Opportunities</h2>
          {recommendations.map((rec: any, idx: number) => (
            <Card
              key={idx}
              className="border-l-4"
              style={{
                borderLeftColor: rec.monthlySavings > 0 ? "#10b981" : "#6b7280",
              }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {TOOL_PRICING[rec.tool]?.name || rec.tool}
                      <span
                        className={`px-2 py-1 rounded text-xs ${getSeverityColor(
                          rec.severity
                        )}`}
                      >
                        {rec.severity}
                      </span>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Current: {rec.currentPlan} • ${rec.currentMonthlySpend}/mo
                    </CardDescription>
                  </div>
                  {rec.monthlySavings > 0 && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-emerald-500">
                        -${rec.monthlySavings.toFixed(0)}
                      </div>
                      <div className="text-xs text-muted-foreground">per month</div>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{rec.reason}</p>
                {rec.recommendedAction !== "keep" && (
                  <div className="bg-secondary p-3 rounded-lg">
                    <div className="text-sm font-medium mb-1">Recommendation:</div>
                    <div className="text-sm">
                      {rec.recommendedAction === "downgrade" &&
                        rec.recommendedPlan && (
                          <>
                            Downgrade to <strong>{rec.recommendedPlan}</strong>
                          </>
                        )}
                      {rec.recommendedAction === "switch" &&
                        rec.recommendedTool && (
                          <>
                            Switch to <strong>{rec.recommendedTool}</strong>
                          </>
                        )}
                      {rec.recommendedAction === "eliminate_overlap" && (
                        <>Consider eliminating tool overlap</>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Get Your Own Audit</CardTitle>
            <CardDescription>
              Free AI tool spend audit for your team in under 2 minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 py-2"
            >
              Audit My Stack
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
