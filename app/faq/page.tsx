import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FAQPage() {
  const faqs = [
    {
      question: "Is TokenAudit really free?",
      answer: "Yes, 100% free. No credit card, no signup, no trial period. You can run unlimited audits whenever you want."
    },
    {
      question: "How accurate are the savings calculations?",
      answer: "Very accurate. We pull pricing data directly from official vendor sources and update it weekly. Every recommendation includes the source URL and date verified. Our audit logic is deterministic and defensible - a finance person should agree with every line of reasoning."
    },
    {
      question: "Which AI tools do you support?",
      answer: "Currently: Cursor, GitHub Copilot, Claude (Pro/Max/Team/Enterprise), ChatGPT (Plus/Team/Enterprise), Anthropic API, OpenAI API, Gemini, and Windsurf. We add new tools based on user requests."
    },
    {
      question: "Do I need to connect my accounts?",
      answer: "No. You manually enter your current setup (which tools, plans, seats, monthly spend). We don't need access to your accounts or billing data."
    },
    {
      question: "How long does an audit take?",
      answer: "Under 2 minutes. The form takes 60-90 seconds to fill out, and results appear instantly."
    },
    {
      question: "Can I share my audit results?",
      answer: "Yes. Every audit gets a unique shareable URL with Open Graph preview tags. Perfect for sending to your CFO, finance team, or cofounder."
    },
    {
      question: "What if I disagree with a recommendation?",
      answer: "Every recommendation includes a clear explanation of why we're suggesting it. If your situation is unique (e.g., you need Enterprise for compliance reasons), you can ignore that specific recommendation."
    },
    {
      question: "How does Credex make money from this?",
      answer: "When audits reveal significant savings ($500+/month), we offer discounted AI infrastructure credits. We source credits from companies that overforecast, and resell them at 20-40% below retail. This is optional - the audit itself is valuable standalone."
    },
    {
      question: "Can I run audits for multiple teams?",
      answer: "Yes. Each audit is independent. Run one for your engineering team, another for your content team, etc."
    },
    {
      question: "Do you store my data?",
      answer: "Audit results are stored so you can access the shareable URL later. If you provide your email, we store that too. We never sell your data. See our Privacy Policy for details."
    },
    {
      question: "What if my company uses custom enterprise pricing?",
      answer: "Our audit uses list prices. If you have custom pricing, the recommendations may not apply directly - but you can still use the audit to identify waste (e.g., overseating, tool overlap)."
    },
    {
      question: "Can I white-label this for my company?",
      answer: "Yes, with an Enterprise plan. Contact sales@credex.rocks for custom integrations and white-labeling options."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about TokenAudit
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
            <p className="text-muted-foreground mb-4">
              Email us at hello@credex.rocks or run your free audit now.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link href="/">Run Free Audit</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="mailto:hello@credex.rocks">Contact Us</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
