import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">How TokenAudit Works</h1>
          <p className="text-xl text-muted-foreground">
            Get a complete AI spend audit in under 2 minutes
          </p>
        </div>

        <div className="space-y-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">1</span>
                Enter Your Current Setup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Select which AI tools your team uses from our list of 8 supported platforms:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Cursor (Hobby, Pro, Business, Enterprise)</li>
                <li>GitHub Copilot (Individual, Business, Enterprise)</li>
                <li>Claude (Free, Pro, Max, Team, Enterprise)</li>
                <li>ChatGPT (Plus, Team, Enterprise)</li>
                <li>Anthropic API Direct</li>
                <li>OpenAI API Direct</li>
                <li>Gemini (Pro, Ultra)</li>
                <li>Windsurf</li>
              </ul>
              <p className="mt-4">For each tool, tell us:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
                <li>Which plan you&apos;re on</li>
                <li>Number of seats</li>
                <li>Current monthly spend</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">2</span>
                Tell Us About Your Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">We need two pieces of context:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Team size:</strong> How many people actually use these tools</li>
                <li><strong>Primary use case:</strong> Coding, writing, data analysis, research, or mixed</li>
              </ul>
              <p className="mt-4">This helps us identify overseating and recommend alternatives that better fit your workflow.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">3</span>
                Get Instant Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Our audit engine analyzes your setup in real-time and shows you:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Per-tool breakdown:</strong> Where each tool is or isn&apos;t optimized</li>
                <li><strong>Specific recommendations:</strong> Downgrade, switch, or eliminate overlap</li>
                <li><strong>Savings calculations:</strong> Monthly and annual, with clear math</li>
                <li><strong>AI-generated summary:</strong> A personalized overview in plain English</li>
              </ul>
              <p className="mt-4">Every recommendation includes a one-sentence reason explaining the logic.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">4</span>
                Share & Act On It
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">After you get your results:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Get a shareable URL to send to your CFO or finance team</li>
                <li>Optionally capture the report via email</li>
                <li>If savings are significant ($500+/month), we&apos;ll show you how Credex can help capture even more</li>
              </ul>
              <p className="mt-4">The whole process takes under 2 minutes. No signup required.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Ready to find your savings?</h2>
            <p className="text-muted-foreground mb-4">
              Start your free audit now. No credit card required.
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
