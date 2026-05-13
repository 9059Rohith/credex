"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TOOL_PRICING } from "@/lib/pricingData";

interface ToolFormData {
  tool: string;
  plan: string;
  seats: number;
  monthlySpend: number;
}

const STORAGE_KEY = "spendlens_form_data";

export default function Home() {
  const router = useRouter();
  const [teamSize, setTeamSize] = useState(5);
  const [primaryUseCase, setPrimaryUseCase] = useState("coding");
  const [selectedTools, setSelectedTools] = useState<string[]>(["cursor"]);
  const [toolsData, setToolsData] = useState<Record<string, ToolFormData>>({
    cursor: { tool: "cursor", plan: "Pro", seats: 5, monthlySpend: 100 },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    try {
      const tools = selectedTools.map((key) => toolsData[key]).filter(Boolean);
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tools, teamSize, primaryUseCase }),
      });

      if (!response.ok) throw new Error("Audit failed");

      const { slug } = await response.json();
      router.push(`/audit/${slug}`);
    } catch (error) {
      console.error("Error submitting audit:", error);
      alert("Failed to generate audit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableTools = Object.keys(TOOL_PRICING).filter((k) => !selectedTools.includes(k));

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-4xl mx-auto px-4 py-12">
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
        <Card className="border-2 border-primary/20">
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
              disabled={isSubmitting || selectedTools.length === 0}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? "Analyzing..." : "Get My Free Audit →"}
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>No signup required. Results in 30 seconds. Always free.</p>
          <p className="mt-2">Built by Credex · <a href="https://credex.rocks" className="text-primary hover:underline">credex.rocks</a></p>
        </div>
      </div>
    </div>
  );
}
