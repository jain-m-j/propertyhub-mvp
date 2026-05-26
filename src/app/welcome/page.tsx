"use client";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

const stats = [
  { value: "10,000+", label: "Properties" },
  { value: "50+", label: "Cities" },
  { value: "₹500Cr+", label: "Transacted" },
];

export default function WelcomePage() {
  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.3) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.5) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(7,7,15,0.9) 100%)" }} />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-7 md:px-16">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center" style={{ border: "1px solid var(--gold-border)" }}>
            <MapPin size={14} style={{ color: "var(--gold-primary)" }} />
          </div>
          <span className="text-display tracking-widest" style={{ fontSize: "0.9rem", letterSpacing: "0.25em", color: "var(--text-primary)" }}>
            PROPERTYHUB
          </span>
        </div>
        <Link href="/login" className="btn-ghost px-6 py-2.5 hidden md:inline-flex">Sign In</Link>
      </header>

      {/* Hero */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <p className="section-label mb-8 animate-on-mount">Discover Curated Luxury Homes in India</p>
        <h1 className="text-display animate-on-mount delay-100"
          style={{ fontSize: "clamp(3.5rem,11vw,9rem)", lineHeight: 0.9, color: "var(--text-primary)", marginBottom: "1.5rem" }}>
          Your Finest<br />
          <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>Address</em><br />
          Awaits
        </h1>
        <p className="animate-on-mount delay-200 max-w-md mx-auto"
          style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "3rem" }}>
          Extraordinary properties in Delhi, and beyond —
          curated for those who demand the finest.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-on-mount delay-300">
          <Link href="/home" className="btn-gold px-10 py-4 gap-3 group">
            Explore Properties
            <ArrowRight size={14} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/login" className="btn-ghost px-10 py-4">Sign In</Link>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-12 mt-20 animate-on-mount delay-400 pt-8"
          style={{ borderTop: "1px solid var(--border-subtle)" }}>
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-display" style={{ fontSize: "1.6rem", color: "var(--gold-primary)" }}>{s.value}</p>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginTop: "4px" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer strip */}
      <div className="relative z-10 flex items-center justify-between px-8 py-5 md:px-16"
        style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>© 2026 PROPERTYHUB</p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((item) => (
            <Link key={item} href="#" style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}
              className="hover:text-yellow-400 transition-colors">{item}</Link>
          ))}
        </div>
      </div>
    </main>
  );
}
