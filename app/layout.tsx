import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { WhatLLMBanner } from "@/components/whatllm-banner";

export const metadata: Metadata = {
  title: 'LLM Selector',
  description: 'Find the perfect Open Source AI model and LLM for your needs. A fun experiment to help you navigate the world of open-source AI models (v1).',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <WhatLLMBanner />
        {children}
        <Analytics />
      </body>
    </html>
  );
}