import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TOOL_PRICING } from "@/lib/pricingData";

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">AI Tools We Analyze</h1>
          <p className="text-xl text-muted-foreground">
            Compare pricing and find the best fit for your team
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Object.entries(TOOL_PRICING).map(([key, tool]) => (
            <Card key={key}>
              <CardHeader>
                <CardTitle>{tool.name}</CardTitle>
                <CardDescription>AI Tool</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Available Plans:</p>
                    <div className="space-y-1">
                      {tool.tiers.map((tier, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{tier.name}</span>
                          <span className="font-semibold">
                            {tier.isUsageBased ? 'Usage-based' : `$${tier.pricePerSeat}/mo`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">Best for: {tool.primaryUseCase.join(', ')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Ready to optimize your stack?</h2>
            <p className="text-muted-foreground mb-4">
              Run a free audit to see which tools are best for your team
            </p>
            <Button size="lg" asChild>
              <Link href="/">Run Free Audit →</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
