import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The audit tool is 100% free. Forever.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Free Tier */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Free Audit</CardTitle>
              <CardDescription>For everyone</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/forever</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Unlimited audits</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>8 AI tools covered</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Instant results</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Email report</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Shareable URLs</span>
                </li>
              </ul>
              <Button className="w-full mt-6" asChild>
                <Link href="/">Get Started Free</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Credex Partner */}
          <Card className="border-2 border-primary relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>
            <CardHeader>
              <CardTitle>Credex Partner</CardTitle>
              <CardDescription>Capture your savings</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">Custom</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Everything in Free</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Discounted AI credits</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>20-40% off retail pricing</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Quarterly spend reviews</span>
                </li>
              </ul>
              <Button className="w-full mt-6" variant="default" asChild>
                <Link href="https://credex.rocks">Learn More</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>For large teams</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">Custom</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Everything in Partner</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>White-label audits</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>API access</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>SLA guarantees</span>
                </li>
              </ul>
              <Button className="w-full mt-6" variant="outline" asChild>
                <Link href="mailto:hello@credex.rocks">Contact Sales</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Is the audit tool really free?</h3>
              <p className="text-muted-foreground">
                Yes, completely free. No credit card required, no hidden fees, no trial period. Use it as many times as you want.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How does Credex make money?</h3>
              <p className="text-muted-foreground">
                When our audits reveal significant savings opportunities (typically $500+/month), we offer discounted AI infrastructure credits that capture even more savings. This is optional - the audit is valuable on its own.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What are discounted AI credits?</h3>
              <p className="text-muted-foreground">
                We source AI infrastructure credits (Cursor, Claude, ChatGPT Enterprise, etc.) from companies that overforecasted or pivoted. We resell them at 20-40% below retail.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
