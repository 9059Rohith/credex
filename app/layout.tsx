import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpendLens - AI Spend Audit Tool",
  description: "Free AI tool spend audit for startups. Find where you're overspending and save thousands per year.",
  keywords: ["AI tools", "cost optimization", "startup tools", "Cursor", "Claude", "ChatGPT", "GitHub Copilot"],
  openGraph: {
    title: "SpendLens - AI Spend Audit Tool",
    description: "Free AI tool spend audit for startups. Find where you're overspending and save thousands per year.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpendLens - AI Spend Audit Tool",
    description: "Free AI tool spend audit for startups. Find where you're overspending and save thousands per year.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
