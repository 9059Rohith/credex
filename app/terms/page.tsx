import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: May 13, 2026</p>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p>By accessing and using TokenAudit, you accept and agree to be bound by these Terms of Service. If you do not agree, do not use this service.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Description of Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>TokenAudit is a free web tool that analyzes AI tool spending and provides optimization recommendations. The service includes:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>AI spend audit calculations</li>
                <li>Savings recommendations</li>
                <li>Shareable audit URLs</li>
                <li>Optional email reports</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. No Warranties</CardTitle>
            </CardHeader>
            <CardContent>
              <p>TokenAudit is provided &quot;as is&quot; without warranties of any kind. We make reasonable efforts to ensure pricing data accuracy, but do not guarantee it. All recommendations are suggestions - actual savings may vary based on your specific contract terms.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Credex and TokenAudit shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use this service.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>You agree to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Provide accurate information</li>
                <li>Not abuse or attempt to hack the service</li>
                <li>Not use the service for illegal purposes</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <p>All content, code, and algorithms used in TokenAudit are proprietary to Credex. You may not copy, reproduce, or redistribute without permission.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p>We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of new terms.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p>For questions about these terms, contact: <a href="mailto:legal@credex.rocks" className="text-primary hover:underline">legal@credex.rocks</a></p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
