import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppProviders from "@/src/app/providers/AppProviders";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DocuPilot",
  description: "Secure AI document workspace",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.className} min-h-full`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
