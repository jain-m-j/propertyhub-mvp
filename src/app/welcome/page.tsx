"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// PLACEHOLDER: swap for a real Sainik Farms / leafy-lane neighbourhood shot.
const HERO_PHOTO = "https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=1900&h=1200&fit=crop";

export default function WelcomePage() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const goSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(q.trim() ? `/home?q=${encodeURIComponent(q.trim())}` : "/home");
  };

  return (
    <main style={{ background: "var(--bg)" }}>
      {/* Header overlays the photo hero */}
      <header style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 5 }}>
        <div className="max-w-[1220px] mx-auto px-6 md:px-7">
          <div className="flex items-center justify-between" style={{ height: "74px" }}>
            <Link href="/home" className="flex items-center gap-2.5">
              <span className="w-[26px] h-[26px]" style={{ background: "var(--brand)", borderRadius: "7px" }} />
              <span className="text-display" style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--on-dark)" }}>GharJi</span>
            </Link>
            <nav className="flex items-center gap-7" style={{ fontSize: "0.92rem", color: "var(--on-dark-soft)" }}>
              <Link href="/home" className="hidden sm:inline hover:text-white transition-colors">Rent</Link>
              <Link href="/home" className="hidden sm:inline hover:text-white transition-colors">Browse</Link>
              <Link href="/post-property" className="btn-gold px-5 py-2.5" style={{ borderRadius: "999px" }}>List your property</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Photo hero */}
      <section className="hero hero-overlay" style={{ backgroundImage: `linear-gradient(180deg,rgba(18,19,21,.45),rgba(18,19,21,.32) 45%,rgba(18,19,21,.60)),url('${HERO_PHOTO}')` }}>
        <div className="max-w-[1220px] mx-auto px-6 md:px-7 w-full">
          <h1 style={{ fontSize: "clamp(3rem,7vw,5.6rem)", maxWidth: "14ch", color: "var(--on-dark)" }}>
            Your next place is{" "}
            <span style={{ color: "var(--brand-glow,#ff6258)", textShadow: "0 2px 30px var(--glow)" }}>around the corner.</span>
          </h1>
          <p style={{ color: "var(--on-dark-soft)", fontSize: "1.1rem", marginTop: "22px", maxWidth: "42ch" }}>
            Browse real Sainik Farms rentals and message the owner straight away. No fees, no runaround.
          </p>
          <form onSubmit={goSearch} className="flex gap-3" style={{ marginTop: "34px", maxWidth: "560px" }}>
            <input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search a locality, e.g. Western Avenue"
              className="flex-1"
              style={{ background: "rgba(255,255,255,0.95)", border: "1px solid transparent", borderRadius: "14px", padding: "17px 20px", color: "var(--text)", fontSize: "1rem", outline: "none", boxShadow: "0 10px 40px rgba(0,0,0,0.25)" }} />
            <button type="submit" className="btn-gold" style={{ borderRadius: "14px", padding: "0 30px", fontSize: "1rem" }}>Search</button>
          </form>
        </div>
      </section>

      {/* How it works — light body */}
      <section className="max-w-[1220px] mx-auto px-6 md:px-7" style={{ padding: "64px 28px" }}>
        <p className="section-label" style={{ marginBottom: "10px" }}>How GharJi works</p>
        <h2 style={{ fontSize: "1.9rem", marginBottom: "32px", color: "var(--text)" }}>Three steps. No middlemen taking a cut.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { n: "1", t: "Browse listings", d: "Real, hand-checked rentals across Sainik Farms — B Block, Western Avenue, Central Avenue and more." },
            { n: "2", t: "Open a listing", d: "See photos, rent, beds, baths and area, plus who's listing it — owner or broker." },
            { n: "3", t: "Message directly", d: "Tap WhatsApp or Call to reach the owner or broker yourself. No fees to GharJi." },
          ].map((s) => (
            <div key={s.n} className="card-luxury" style={{ padding: "24px" }}>
              <span className="text-display" style={{ display: "inline-flex", width: "38px", height: "38px", alignItems: "center", justifyContent: "center", background: "var(--brand)", color: "#fff", borderRadius: "10px", fontWeight: 700 }}>{s.n}</span>
              <h3 style={{ fontSize: "1.2rem", margin: "16px 0 6px", color: "var(--text)" }}>{s.t}</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>{s.d}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-3" style={{ marginTop: "36px" }}>
          <Link href="/home" className="btn-gold px-8 py-3.5">Browse rentals</Link>
          <Link href="/post-property" className="btn-ghost px-8 py-3.5">List your property</Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--line)" }}>
        <div className="max-w-[1220px] mx-auto px-6 md:px-7 flex items-center justify-between" style={{ padding: "20px 28px" }}>
          <p style={{ fontSize: "0.8rem", color: "var(--muted)" }}>© 2026 GharJi · Sainik Farms, South Delhi</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((i) => (
              <Link key={i} href="#" style={{ fontSize: "0.8rem", color: "var(--muted)" }} className="hover:text-[var(--brand)] transition-colors">{i}</Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
