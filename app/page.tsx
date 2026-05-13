"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TOOL_PRICING } from "@/lib/pricingData";
import { runAudit, type AuditInput } from "@/lib/auditEngine";

interface ToolFormData {
  tool: string;
  plan: string;
  seats: number;
  monthlySpend: number;
}

const STORAGE_KEY = "spendlens_form_data";

export default function Home() {
  const [teamSize, setTeamSize] = useState(5);
  const [primaryUseCase, setPrimaryUseCase] = useState("coding");
  const [selectedTools, setSelectedTools] = useState<string[]>(["cursor"]);
  const [toolsData, setToolsData] = useState<Record<string, ToolFormData>>({
    cursor: { tool: "cursor", plan: "Pro", seats: 5, monthlySpend: 100 },
  });
  const [auditResult, setAuditResult] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  const [aiSummary, setAiSummary] = useState<string>("");
  const [loadingAI, setLoadingAI] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setTeamSize(data.teamSize || 5);
        setPrimaryUseCase(data.primaryUseCase || "coding");
        setSelectedTools(data.selectedTools || ["cursor"]);
        setToolsData(data.toolsData || {});
      } catch (e) {
        console.error("Failed to load saved data", e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    const data = { teamSize, primaryUseCase, selectedTools, toolsData };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [teamSize, primaryUseCase, selectedTools, toolsData]);

  const addTool = (toolKey: string) => {
    if (selectedTools.includes(toolKey)) return;
    const pricing = TOOL_PRICING[toolKey];
    const defaultTier = pricing.tiers[1] || pricing.tiers[0];
    setSelectedTools([...selectedTools, toolKey]);
    setToolsData({
      ...toolsData,
      [toolKey]: {
        tool: toolKey,
        plan: defaultTier.name,
        seats: teamSize,
        monthlySpend: defaultTier.pricePerSeat * teamSize,
      },
    });
  };

  const removeTool = (toolKey: string) => {
    setSelectedTools(selectedTools.filter((t) => t !== toolKey));
    const newData = { ...toolsData };
    delete newData[toolKey];
    setToolsData(newData);
  };

  const updateToolData = (toolKey: string, field: string, value: any) => {
    const updated = { ...toolsData[toolKey], [field]: value };
    
    // Recalculate monthly spend if plan or seats changed
    if (field === "plan" || field === "seats") {
      const pricing = TOOL_PRICING[toolKey];
      const tier = pricing.tiers.find((t) => t.name === updated.plan);
      if (tier && !tier.isUsageBased) {
        updated.monthlySpend = tier.pricePerSeat * (updated.seats || 1);
      }
    }
    
    setToolsData({ ...toolsData, [toolKey]: updated });
  };

  const handleSubmit = async () => {
    const tools = selectedTools.map((key) => toolsData[key]).filter(Boolean);
    const input: AuditInput = { tools, teamSize, primaryUseCase };
    const result = runAudit(input);
    setAuditResult(result);
    setShowResults(true);
    setLoadingAI(true);
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    // Call Groq API for AI summary
    try {
      const response = await fetch('/api/groq-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamSize,
          useCase: primaryUseCase,
          totalMonthlySavings: result.totalMonthlySavings,
          totalAnnualSavings: result.totalAnnualSavings,
          tools: tools.map(t => ({ tool: t.tool, plan: t.plan })),
          recommendations: result.recommendations,
        }),
      });
      const data = await response.json();
      setAiSummary(data.summary);
    } catch (error) {
      console.error('Failed to get AI summary:', error);
      setAiSummary(`Your ${teamSize}-person ${primaryUseCase} team analyzed. Review recommendations below.`);
    } finally {
      setLoadingAI(false);
    }
  };

  const resetAudit = () => {
    setShowResults(false);
    setAuditResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const availableTools = Object.keys(TOOL_PRICING).filter((k) => !selectedTools.includes(k));

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'significant': return 'bg-orange-500';
      case 'minor': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            SpendLens
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Free AI Tool Spend Audit for Startups
          </p>
          <p className="text-sm text-muted-foreground">
            Find out where you're overspending in under 2 minutes. No signup required.
          </p>
        </div>

        {/* Form */}
        <Card className="border-2 border-primary/20 mb-8">
          <CardHeader>
            <CardTitle>Your Current AI Tool Stack</CardTitle>
            <CardDescription>
              Tell us what you're using. We'll analyze your spend and find savings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Team Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="teamSize">Team Size</Label>
                <Input
                  id="teamSize"
                  type="number"
                  min="1"
                  value={teamSize}
                  onChange={(e) => setTeamSize(parseInt(e.target.value) || 1)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="useCase">Primary Use Case</Label>
                <Select value={primaryUseCase} onValueChange={setPrimaryUseCase}>
                  <SelectTrigger id="useCase">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coding">Coding</SelectItem>
                    <SelectItem value="writing">Writing</SelectItem>
                    <SelectItem value="data">Data Analysis</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Selected Tools */}
            <div className="space-y-4">
              <Label>Your AI Tools</Label>
              {selectedTools.map((toolKey) => {
                const tool = toolsData[toolKey];
                const pricing = TOOL_PRICING[toolKey];
                if (!tool) return null;

                return (
                  <Card key={toolKey} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs">Tool</Label>
                        <div className="font-semibold">{pricing.name}</div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${toolKey}-plan`} className="text-xs">Plan</Label>
                        <Select
                          value={tool.plan}
                          onValueChange={(v) => updateToolData(toolKey, "plan", v)}
                        >
                          <SelectTrigger id={`${toolKey}-plan`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {pricing.tiers.map((tier) => (
                              <SelectItem key={tier.name} value={tier.name}>
                                {tier.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${toolKey}-seats`} className="text-xs">Seats</Label>
                        <Input
                          id={`${toolKey}-seats`}
                          type="number"
                          min="0"
                          value={tool.seats}
                          onChange={(e) => updateToolData(toolKey, "seats", parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${toolKey}-spend`} className="text-xs">Monthly $</Label>
                        <div className="flex gap-2">
                          <Input
                            id={`${toolKey}-spend`}
                            type="number"
                            min="0"
                            value={tool.monthlySpend}
                            onChange={(e) => updateToolData(toolKey, "monthlySpend", parseFloat(e.target.value) || 0)}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTool(toolKey)}
                            className="shrink-0"
                          >
                            ✕
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Add Tool */}
            {availableTools.length > 0 && (
              <div className="space-y-2">
                <Label>Add Another Tool</Label>
                <Select onValueChange={addTool}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tool to add..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTools.map((key) => (
                      <SelectItem key={key} value={key}>
                        {TOOL_PRICING[key].name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              disabled={selectedTools.length === 0}
              className="w-full"
              size="lg"
            >
              Get My Free Audit →
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {showResults && auditResult && (
          <div id="results" className="space-y-6">
            {/* AI Summary Card */}
            {(aiSummary || loadingAI) && (
              <Card className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-blue-500/30 mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">🤖</span>
                    AI-Powered Executive Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingAI ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                      Generating personalized insights...
                    </div>
                  ) : (
                    <p className="text-lg leading-relaxed">{aiSummary}</p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-emerald-500">
                    ${auditResult.totalMonthlySavings.toFixed(0)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">per month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Annual Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-blue-500">
                    ${auditResult.totalAnnualSavings.toFixed(0)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">per year</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">Tools Analyzed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-purple-500">
                    {auditResult.recommendations.length}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">in your stack</p>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Your Savings Opportunities</h2>
              {auditResult.recommendations.map((rec: any, idx: number) => (
                <Card key={idx} className="border-l-4" style={{ borderLeftColor: rec.monthlySavings > 0 ? '#10b981' : '#6b7280' }}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {TOOL_PRICING[rec.tool]?.name || rec.tool}
                          <span className={`px-2 py-1 rounded text-xs ${getSeverityColor(rec.severity)}`}>
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
                    {rec.recommendedAction !== 'keep' && (
                      <div className="bg-secondary p-3 rounded-lg">
                        <div className="text-sm font-medium mb-1">Recommendation:</div>
                        <div className="text-sm">
                          {rec.recommendedAction === 'downgrade' && rec.recommendedPlan && (
                            <>Downgrade to <strong>{rec.recommendedPlan}</strong></>
                          )}
                          {rec.recommendedAction === 'switch' && rec.recommendedTool && (
                            <>Switch to <strong>{rec.recommendedTool}</strong></>
                          )}
                          {rec.recommendedAction === 'eliminate_overlap' && (
                            <>Consider eliminating tool overlap</>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Summary Card */}
            {auditResult.totalMonthlySavings > 500 && (
              <Card className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border-emerald-500/20">
                <CardHeader>
                  <CardTitle>🎉 High-Value Opportunity!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>
                    With <strong>${auditResult.totalMonthlySavings.toFixed(0)}/month</strong> in potential savings,
                    you're an ideal candidate for Credex's discounted AI infrastructure credits.
                  </p>
                  <p>
                    We can help you capture even more savings beyond these recommendations.
                  </p>
                  <Button className="w-full md:w-auto" size="lg">
                    Book a Credex Consultation →
                  </Button>
                </CardContent>
              </Card>
            )}

            {auditResult.totalMonthlySavings < 100 && (
              <Card>
                <CardHeader>
                  <CardTitle>✅ You're Spending Well!</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your AI tool stack is already well-optimized. We'll notify you when new optimization
                    opportunities become available for your configuration.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button onClick={resetAudit} variant="outline" size="lg">
                ← Modify My Stack
              </Button>
              <Button variant="outline" size="lg">
                Share Results
              </Button>
            </div>
          </div>
        )}

        {/* Footer */}
        {!showResults && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>No signup required. Results in 30 seconds. Always free.</p>
            <p className="mt-2">Built by Credex · <a href="https://credex.rocks" className="text-primary hover:underline">credex.rocks</a></p>
          </div>
        )}
      </div>
    </div>
  );
}
