import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TKDFM Admin",
};

export const generateStaticParams = () => {
  return [{ locale: "cs" }];
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="cs" className={cn("", poppins.variable)}>
      <body className="flex h-screen max-h-screen flex-col bg-white font-sans">
        {children}
      </body>
    </html>
  );
}
