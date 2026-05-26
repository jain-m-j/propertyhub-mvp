import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "PropertyHub — Luxury Real Estate",
  description: "Discover exceptional properties across India's most prestigious addresses.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className="dark"><body className="antialiased">{children}</body></html>;
}
