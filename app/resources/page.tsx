import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Resources</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to optimize your AI tool spend
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Free Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Link href="/" className="text-primary hover:underline font-semibold">
                  TokenAudit - AI Spend Audit Tool
                </Link>
                <p className="text-sm text-muted-foreground">Analyze your AI tool stack and find savings in under 2 minutes</p>
              </div>
              <div>
                <Link href="/tools" className="text-primary hover:underline font-semibold">
                  AI Tools Comparison
                </Link>
                <p className="text-sm text-muted-foreground">Compare pricing and features across 8 major AI platforms</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Guides & Articles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Link href="/blog" className="text-primary hover:underline font-semibold">
                  5 Ways Startups Overspend on AI Tools
                </Link>
                <p className="text-sm text-muted-foreground">Learn the most common AI spending mistakes and how to avoid them</p>
              </div>
              <div>
                <Link href="/how-it-works" className="text-primary hover:underline font-semibold">
                  How AI Spend Audits Work
                </Link>
                <p className="text-sm text-muted-foreground">Understand our methodology and audit engine logic</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Official Pricing Pages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-muted-foreground mb-3">We pull our data from these official sources (updated weekly):</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Cursor</span>
                  <a href="https://cursor.com/pricing" target="_blank" rel="noopener" className="text-primary hover:underline">cursor.com/pricing</a>
                </div>
                <div className="flex justify-between">
                  <span>GitHub Copilot</span>
                  <a href="https://github.com/features/copilot" target="_blank" rel="noopener" className="text-primary hover:underline">github.com/features/copilot</a>
                </div>
                <div className="flex justify-between">
                  <span>Claude</span>
                  <a href="https://www.anthropic.com/pricing" target="_blank" rel="noopener" className="text-primary hover:underline">anthropic.com/pricing</a>
                </div>
                <div className="flex justify-between">
                  <span>ChatGPT</span>
                  <a href="https://openai.com/chatgpt/pricing" target="_blank" rel="noopener" className="text-primary hover:underline">openai.com/chatgpt/pricing</a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="font-semibold">Share Your Audit</span>
                <p className="text-sm text-muted-foreground">Every audit gets a shareable URL. Help other founders save money too.</p>
              </div>
              <div>
                <span className="font-semibold">Request New Features</span>
                <p className="text-sm text-muted-foreground">Email hello@credex.rocks with suggestions for new tools or features</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="pt-6 text-center">
              <h2 className="text-2xl font-bold mb-2">Ready to optimize your spend?</h2>
              <p className="text-muted-foreground mb-4">
                Start with a free audit - no signup required
              </p>
              <Button size="lg" asChild>
                <Link href="/">Run Free Audit →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
