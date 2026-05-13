"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import { Check, Copy, TrendingDown, AlertCircle } from "lucide-react";
import type { AuditResult, ToolRecommendation } from "@/lib/auditEngine";

interface AuditResultsProps {
  slug: string;
  tools: any[];
  results: AuditResult;
  aiSummary?: string;
  teamSize: number;
  primaryUseCase: string;
}

export default function AuditResults({
  slug,
  tools,
  results,
  aiSummary,
  teamSize,
  primaryUseCase,
}: AuditResultsProps) {
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/audit/${slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLeadSubmit = async () => {
    if (!email) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          companyName,
          role,
          teamSize,
          auditSlug: slug,
          totalMonthlySavings: results.totalMonthlySavings,
        }),
      });

      if (response.ok) {
        setLeadCaptured(true);
      }
    } catch (error) {
      console.error("Lead capture error:", error);
      alert("Failed to save. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Your AI Spend Audit</h1>
          <p className="text-muted-foreground">
            {teamSize} {teamSize === 1 ? "person" : "people"} · {primaryUseCase} focused
          </p>
        </div>

        {/* Hero Savings Card */}
        <Card className="mb-8 border-2 border-primary/50 bg-gradient-to-br from-primary/10 to-purple-500/10">
          <CardContent className="pt-8 pb-8 text-center">
            {results.alreadyOptimal ? (
              <>
                <div className="inline-block p-4 bg-green-500/20 rounded-full mb-4">
                  <Check className="w-12 h-12 text-green-400" />
                </div>
                <h2 className="text-3xl font-bold mb-2">You're spending wisely!</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Your current AI tool stack is already well-optimized for your needs.
                </p>
                <p className="text-sm text-muted-foreground">
                  We'll notify you when new optimization opportunities arise.
                </p>
              </>
            ) : (
              <>
                <TrendingDown className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h2 className="text-5xl font-bold mb-2 text-primary">
                  {formatCurrency(results.totalMonthlySavings)}<span className="text-2xl">/mo</span>
                </h2>
                <p className="text-2xl mb-4">
                  {formatCurrency(results.totalAnnualSavings)} per year
                </p>
                <p className="text-lg text-muted-foreground">
                  You could save this much by optimizing your AI tool subscriptions.
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* AI Summary */}
        {aiSummary && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Executive Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {aiSummary}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recommendations */}
        <div className="space-y-4 mb-8">
          <h3 className="text-2xl font-bold">Detailed Breakdown</h3>
          {results.recommendations.map((rec: ToolRecommendation, idx: number) => (
            <Card key={idx} className={rec.monthlySavings > 0 ? "border-yellow-500/50" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {rec.toolName}
                      {rec.monthlySavings > 0 && (
                        <span className="text-sm font-normal text-yellow-400">
                          💡 Optimization Available
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription>
                      Current: {rec.currentPlan} · {rec.currentSeats} {rec.currentSeats === 1 ? "seat" : "seats"} · {formatCurrency(rec.currentMonthlySpend)}/mo
                    </CardDescription>
                  </div>
                  {rec.monthlySavings > 0 && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">
                        -{formatCurrency(rec.monthlySavings)}
                      </div>
                      <div className="text-sm text-muted-foreground">per month</div>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="font-semibold">{rec.recommendation}</div>
                  <p className="text-sm text-muted-foreground">{rec.reason}</p>
                  {rec.recommendedMonthlySpend < rec.currentMonthlySpend && (
                    <div className="mt-4 p-3 bg-secondary rounded-md">
                      <div className="text-sm">
                        Recommended: {rec.recommendedPlan || rec.recommendation} · {formatCurrency(rec.recommendedMonthlySpend)}/mo
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Annual savings: {formatCurrency(rec.annualSavings)}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Credex CTA */}
        {results.credexOpportunity && !results.alreadyOptimal && (
          <Card className="mb-8 border-2 border-primary bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-primary shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Unlock Even More Savings with Credex</h3>
                  <p className="text-muted-foreground mb-4">
                    {results.totalMonthlySavings >= 500
                      ? "With savings this large, you're a perfect fit for Credex's discounted AI infrastructure credits. We can help you capture even more of these savings."
                      : "Credex sells discounted AI infrastructure credits for Cursor, Claude, ChatGPT Enterprise, and more. Get the same tools for less."}
                  </p>
                  <Button size="lg" onClick={() => setShowLeadCapture(true)}>
                    Book Free Consultation →
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lead Capture */}
        {(showLeadCapture || (!results.alreadyOptimal && results.totalMonthlySavings >= 100)) && !leadCaptured && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Get Your Detailed Report</CardTitle>
              <CardDescription>
                Receive the full audit via email{results.credexOpportunity ? " and we'll reach out about Credex savings" : ""}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      placeholder="Acme Inc"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      placeholder="Engineering Manager"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  onClick={handleLeadSubmit}
                  disabled={!email || isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Sending..." : "Send Me the Report"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {leadCaptured && (
          <Card className="mb-8 border-green-500/50 bg-green-500/10">
            <CardContent className="pt-6 text-center">
              <Check className="w-12 h-12 mx-auto mb-2 text-green-400" />
              <p className="font-semibold">Report sent to {email}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {results.credexOpportunity
                  ? "We'll reach out within 24 hours about your savings opportunity."
                  : "Check your inbox for the full audit details."}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Share */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Share This Audit</CardTitle>
            <CardDescription>
              Help other founders save money on AI tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input value={shareUrl} readOnly className="flex-1" />
              <Button onClick={handleCopyLink} variant="outline">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer CTA */}
        <div className="text-center">
          <Button size="lg" asChild variant="outline">
            <a href="/">Run Another Audit</a>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Built by <a href="https://credex.rocks" className="text-primary hover:underline">Credex</a> · Helping startups save on AI infrastructure
          </p>
        </div>
      </div>
    </div>
  );
}
