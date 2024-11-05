import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'AI Model Finder',
  description: 'Find the perfect AI model for your needs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        {children}
      </body>
    </html>
  );
}