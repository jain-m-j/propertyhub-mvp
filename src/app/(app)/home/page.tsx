"use client";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
import { MOCK_PROPERTIES } from "@/lib/utils";

// PLACEHOLDER: swap for a real Sainik Farms / leafy-lane neighbourhood shot.
const HERO_PHOTO = "https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=1900&h=1200&fit=crop";

const CATEGORIES = ["All", "Builder Floor", "Apartment", "House", "Villa", "Studio"];

function HomeContent() {
  const params = useSearchParams();
  const [search, setSearch] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    let list = [...MOCK_PROPERTIES];
    if (search) {
      const term = search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(term) || p.location.toLowerCase().includes(term));
    }
    if (category !== "All") list = list.filter((p) => p.category === category);
    list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    return list;
  }, [search, category]);

  return (
    <>
      {/* Photo hero — header overlays it (see Navbar) */}
      <section className="hero hero-overlay" style={{ backgroundImage: `linear-gradient(180deg,rgba(18,19,21,.45),rgba(18,19,21,.32) 45%,rgba(18,19,21,.60)),url('${HERO_PHOTO}')` }}>
        <div className="max-w-[1220px] mx-auto px-6 md:px-7 w-full">
          <h1 style={{ fontSize: "clamp(3rem,7vw,5.6rem)", maxWidth: "14ch", color: "var(--on-dark)" }}>
            Your next place is{" "}
            <span style={{ color: "#ff6258", textShadow: "0 2px 30px var(--glow)" }}>around the corner.</span>
          </h1>
          <p style={{ color: "var(--on-dark-soft)", fontSize: "1.1rem", marginTop: "22px", maxWidth: "42ch" }}>
            Browse real Sainik Farms rentals and message the owner straight away. No fees, no runaround.
          </p>
          <div className="flex gap-3" style={{ marginTop: "34px", maxWidth: "560px" }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search a locality, e.g. Western Avenue"
              className="flex-1"
              style={{ background: "rgba(255,255,255,0.95)", border: "1px solid transparent", borderRadius: "14px", padding: "17px 20px", color: "var(--text)", fontSize: "1rem", outline: "none", boxShadow: "0 10px 40px rgba(0,0,0,0.25)" }} />
            {search && (
              <button onClick={() => setSearch("")} className="btn-ghost" style={{ borderRadius: "14px", padding: "0 24px" }}>Clear</button>
            )}
          </div>
        </div>
      </section>

      {/* Light body */}
      <div className="max-w-[1220px] mx-auto px-6 md:px-7">
        {/* Category pills */}
        <div className="flex gap-2.5 flex-wrap" style={{ padding: "30px 0 4px" }}>
          {CATEGORIES.map((c) => {
            const on = category === c;
            return (
              <button key={c} onClick={() => setCategory(c)}
                style={{
                  borderRadius: "999px", padding: "9px 18px", fontSize: "0.9rem",
                  background: on ? "var(--brand)" : "var(--bg-2)",
                  color: on ? "#fff" : "var(--muted)",
                  border: `1px solid ${on ? "var(--brand)" : "var(--line)"}`,
                  fontWeight: on ? 600 : 400,
                }}>
                {c}
              </button>
            );
          })}
        </div>

        {/* Section heading */}
        <div className="flex items-baseline justify-between" style={{ padding: "34px 0 16px" }}>
          <h2 style={{ fontSize: "1.7rem", color: "var(--text)" }}>Available now</h2>
          <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
            {filtered.length} {filtered.length === 1 ? "home" : "homes"} in Sainik Farms
          </span>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center" style={{ padding: "80px 0 100px" }}>
            <h3 style={{ fontSize: "1.6rem", color: "var(--text)", marginBottom: "8px" }}>No homes match that</h3>
            <p style={{ color: "var(--muted)", marginBottom: "20px" }}>Try a different locality or category.</p>
            <button onClick={() => { setSearch(""); setCategory("All"); }} className="btn-ghost px-7 py-3">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]" style={{ paddingBottom: "60px" }}>
            {filtered.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        )}
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
