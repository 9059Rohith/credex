import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">About TokenAudit</h1>
          <p className="text-xl text-muted-foreground">
            Helping startups save thousands on AI infrastructure
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              TokenAudit was built to solve a simple problem: most startups overspend on AI tools without realizing it.
            </p>
            <p>
              With the explosion of AI coding assistants, chatbots, and API services, engineering teams are paying for overlapping subscriptions, overprovisioned seats, and plans that don&apos;t match their actual usage patterns.
            </p>
            <p>
              We analyze your current AI tool stack in under 2 minutes and show you exactly where you&apos;re overspending - with specific, actionable recommendations backed by real pricing data.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Why We Built This</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              TokenAudit is powered by Credex, a company that helps startups save on AI infrastructure through discounted credits.
            </p>
            <p>
              We noticed that before companies even consider buying discounted credits, they need to understand their current spend. Many teams look at their monthly AI bills, sigh, and pay them - without realizing they could be saving 30-50% by simply optimizing their current subscriptions.
            </p>
            <p>
              This tool gives you that clarity - for free, with no signup required.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="list-decimal list-inside space-y-2">
              <li>Tell us what AI tools you&apos;re using (Cursor, Copilot, Claude, etc.)</li>
              <li>Enter your team size and primary use case</li>
              <li>Get an instant audit showing where you&apos;re overspending</li>
              <li>Optionally capture the report via email for your CFO or finance team</li>
            </ol>
            <p className="mt-4">
              All pricing data is pulled from official vendor sources and updated weekly. Every recommendation includes a clear explanation of why we&apos;re suggesting it.
            </p>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <Button size="lg" asChild>
            <Link href="/">Run Your Free Audit</Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            No signup required • Results in 30 seconds
          </p>
        </div>
      </div>
    </div>
  );
}
