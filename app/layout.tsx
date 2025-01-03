import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { QueryProvider } from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevFlow",
  description: "A project management and issue-tracking tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen antialiased")}>
        <QueryProvider>
          <NuqsAdapter>
            {children}
            <Toaster />
          </NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
}
