import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "GharJi — Rentals in Sainik Farms, South Delhi",
  description: "Browse real rental homes in Sainik Farms and message the owner or broker straight away on WhatsApp. No fees, no runaround.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="antialiased">{children}</body></html>;
}
