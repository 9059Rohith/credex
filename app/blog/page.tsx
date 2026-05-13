import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BlogPage() {
  const posts = [
    {
      title: "5 Ways Startups Overspend on AI Tools",
      date: "May 10, 2026",
      excerpt: "Most engineering teams waste 30-50% of their AI tool budget. Here's how to fix it.",
      slug: "overspending-on-ai-tools"
    },
    {
      title: "Cursor vs GitHub Copilot: Which is Better for Your Team?",
      date: "May 8, 2026",
      excerpt: "A deep dive into pricing, features, and real-world performance of the two leading AI coding assistants.",
      slug: "cursor-vs-copilot"
    },
    {
      title: "How to Calculate Your True AI Infrastructure Costs",
      date: "May 5, 2026",
      excerpt: "Beyond the monthly bill: understanding seat utilization, API usage, and hidden costs.",
      slug: "calculate-ai-costs"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Insights on AI tool spending and optimization
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {posts.map((post, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-2xl">{post.title}</CardTitle>
                <CardDescription>{post.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <Button variant="outline" size="sm">
                  Read More →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Want to optimize your AI spend?</h2>
            <p className="text-muted-foreground mb-4">
              Run a free audit to find your savings opportunities
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
