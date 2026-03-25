import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { cn } from "@/lib/utils";

import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "TKDFM Admin",
};

export const generateStaticParams = () => {
  return [{ locale: "cs" }];
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="cs" className={cn("", geist.variable)}>
      <body className="flex min-h-screen flex-col bg-white font-sans">
        {children}
      </body>
    </html>
  );
}
