import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: May 13, 2026</p>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>When you use TokenAudit, we collect:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Tool configuration data you enter (which tools, plans, seats, monthly spend)</li>
                <li>Team size and primary use case</li>
                <li>Email address (only if you choose to provide it)</li>
                <li>Company name and role (optional)</li>
                <li>Audit results and AI-generated summaries</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We use collected data to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Generate your AI spend audit</li>
                <li>Provide shareable audit URLs</li>
                <li>Send email reports (if requested)</li>
                <li>Contact you about Credex services (if you opt in)</li>
                <li>Improve our audit algorithms</li>
                <li>Aggregate anonymized usage statistics</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Storage</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Audit results are stored in Supabase (PostgreSQL) and retained indefinitely to maintain shareable URLs. Email addresses are stored securely and never sold to third parties.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We use:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Groq:</strong> AI summary generation</li>
                <li><strong>Supabase:</strong> Data storage</li>
                <li><strong>Resend:</strong> Transactional emails</li>
                <li><strong>Vercel:</strong> Hosting and analytics</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Access your data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Export your audit history</li>
              </ul>
              <p className="mt-4">Contact hello@credex.rocks to exercise these rights.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p>For privacy concerns, email: <a href="mailto:privacy@credex.rocks" className="text-primary hover:underline">privacy@credex.rocks</a></p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
