import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'LLM Showdown 🏆',
  description: 'Compare different AI language models',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <main className="flex-grow">
          {children}
        </main>
        <footer className="w-full py-4 px-6 bg-gray-100">
          <div className="container mx-auto max-w-4xl text-center text-xs text-gray-500 space-y-2">
            <div>
              Data mainly from <a href="https://artificialanalysis.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">artificialanalysis.ai</a>
            </div>
            <div>
              Updated on October 13th 2024
            </div>
            <div>
              Dev by <a href="https://x.com/demian_ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">dylan</a>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
