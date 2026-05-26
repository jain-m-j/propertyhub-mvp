"use client";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import { MOCK_PROPERTIES } from "@/lib/utils";
import type { FilterState } from "@/types";

const TYPES = ["All", "Buy", "Rent"];
const CATEGORIES = ["All", "Apartment", "Villa", "House", "Studio", "Penthouse"];
const SORT_OPTIONS = [
  { label: "Featured First", value: "featured" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Most Viewed", value: "views" },
  { label: "Newest", value: "newest" },
];
const DEFAULT_FILTERS: FilterState = { type: "All", category: [], priceMin: "", priceMax: "", bedrooms: "", location: "", sortBy: "featured" };

export default function HomePage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...MOCK_PROPERTIES];
    if (search) { const q = search.toLowerCase(); list = list.filter((p) => p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)); }
    if (filters.type !== "All") list = list.filter((p) => p.type === filters.type);
    if (filters.category.length > 0) list = list.filter((p) => filters.category.includes(p.category));
    if (filters.bedrooms) list = list.filter((p) => p.bedrooms >= parseInt(filters.bedrooms));
    if (filters.priceMin) list = list.filter((p) => p.priceRaw >= parseInt(filters.priceMin));
    if (filters.priceMax) list = list.filter((p) => p.priceRaw <= parseInt(filters.priceMax));
    switch (filters.sortBy) {
      case "price-desc": list.sort((a, b) => b.priceRaw - a.priceRaw); break;
      case "price-asc": list.sort((a, b) => a.priceRaw - b.priceRaw); break;
      case "views": list.sort((a, b) => b.views - a.views); break;
      case "newest": list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      default: list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
    return list;
  }, [filters, search]);

  const toggleCategory = (cat: string) => {
    if (cat === "All") { setFilters((f) => ({ ...f, category: [] })); return; }
    setFilters((f) => ({ ...f, category: f.category.includes(cat) ? f.category.filter((c) => c !== cat) : [...f.category, cat] }));
  };

  const hasActive = filters.type !== "All" || filters.category.length > 0 || filters.bedrooms !== "" || filters.priceMin !== "" || filters.priceMax !== "";

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
      {/* Header */}
      <div className="mb-10">
        <p className="section-label mb-3">Curated Listings</p>
        <h1 className="text-display mb-2" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: "var(--text-primary)" }}>
          Exceptional Properties
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          {filtered.length} properties found
        </p>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row mb-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
        <div className="flex-1 flex items-center gap-3 px-4">
          <Search size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
          <input type="text" placeholder="Search by city, address, or type…" value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 py-3.5 bg-transparent text-sm" style={{ color: "var(--text-primary)", outline: "none" }} />
          {search && <button onClick={() => setSearch("")}><X size={13} style={{ color: "var(--text-muted)" }} /></button>}
        </div>
        <div className="flex items-center px-4 py-1 gap-1 sm:border-l" style={{ borderColor: "var(--border-subtle)" }}>
          <select value={filters.sortBy} onChange={(e) => setFilters((f) => ({ ...f, sortBy: e.target.value }))}
            className="bg-transparent py-3 text-xs appearance-none cursor-pointer pr-2"
            style={{ color: "var(--text-secondary)", letterSpacing: "0.07em", outline: "none" }}>
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value} style={{ background: "var(--bg-card)" }}>{o.label}</option>)}
          </select>
          <ChevronDown size={11} style={{ color: "var(--text-muted)" }} />
        </div>
        <button onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-5 py-3.5 transition-colors sm:border-l text-left"
          style={{ borderColor: "var(--border-subtle)", background: hasActive ? "rgba(201,168,76,0.08)" : "transparent",
            color: hasActive ? "var(--gold-primary)" : "var(--text-secondary)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          <SlidersHorizontal size={13} />
          Filters {hasActive && "·"}
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="mb-6 p-6 space-y-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
          <div>
            <p className="section-label mb-3">Transaction Type</p>
            <div className="flex gap-2 flex-wrap">
              {TYPES.map((t) => (
                <button key={t} onClick={() => setFilters((f) => ({ ...f, type: t }))}
                  className="px-5 py-2 text-xs transition-all" style={{ letterSpacing: "0.1em", textTransform: "uppercase",
                    border: `1px solid ${filters.type === t ? "var(--gold-primary)" : "var(--border-default)"}`,
                    color: filters.type === t ? "var(--gold-primary)" : "var(--text-secondary)",
                    background: filters.type === t ? "rgba(201,168,76,0.08)" : "transparent" }}>{t}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="section-label mb-3">Property Type</p>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((c) => {
                const active = c === "All" ? filters.category.length === 0 : filters.category.includes(c);
                return (
                  <button key={c} onClick={() => toggleCategory(c)}
                    className="px-5 py-2 text-xs transition-all" style={{ letterSpacing: "0.1em", textTransform: "uppercase",
                      border: `1px solid ${active ? "var(--gold-primary)" : "var(--border-default)"}`,
                      color: active ? "var(--gold-primary)" : "var(--text-secondary)",
                      background: active ? "rgba(201,168,76,0.08)" : "transparent" }}>{c}</button>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="section-label mb-3">Min Bedrooms</p>
              <div className="flex gap-2">
                {["", "1", "2", "3", "4"].map((b) => (
                  <button key={b} onClick={() => setFilters((f) => ({ ...f, bedrooms: b }))}
                    className="w-10 h-10 text-xs transition-all" style={{
                      border: `1px solid ${filters.bedrooms === b ? "var(--gold-primary)" : "var(--border-default)"}`,
                      color: filters.bedrooms === b ? "var(--gold-primary)" : "var(--text-secondary)",
                      background: filters.bedrooms === b ? "rgba(201,168,76,0.08)" : "transparent" }}>
                    {b === "" ? "Any" : b === "4" ? "4+" : b}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="section-label mb-3">Min Price (₹)</p>
              <input type="number" value={filters.priceMin}
                onChange={(e) => setFilters((f) => ({ ...f, priceMin: e.target.value }))}
                placeholder="No minimum" className="input-luxury px-4 py-2.5 w-full text-sm" />
            </div>
            <div>
              <p className="section-label mb-3">Max Price (₹)</p>
              <input type="number" value={filters.priceMax}
                onChange={(e) => setFilters((f) => ({ ...f, priceMax: e.target.value }))}
                placeholder="No maximum" className="input-luxury px-4 py-2.5 w-full text-sm" />
            </div>
          </div>
          <button onClick={() => setFilters(DEFAULT_FILTERS)}
            style={{ fontSize: "0.7rem", letterSpacing: "0.12em", color: "var(--text-muted)", textTransform: "uppercase" }}>
            Reset Filters
          </button>
        </div>
      )}

      {/* Property Grid */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-display mb-3" style={{ fontSize: "2rem", color: "var(--text-primary)" }}>No Properties Found</p>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>Try adjusting your search or filters</p>
          <button onClick={() => { setFilters(DEFAULT_FILTERS); setSearch(""); }} className="btn-ghost px-8 py-3">Clear All</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      )}
    </div>
  );
}
