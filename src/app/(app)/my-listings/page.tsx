"use client";
import Image from "next/image";
import Link from "next/link";
import { Plus, Eye, Pencil, Trash2, MapPin, Bed, Bath } from "lucide-react";
import { MOCK_PROPERTIES, CURRENT_USER } from "@/lib/utils";

const STATUS_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  active: { color: "#6ee7a0", bg: "rgba(110,231,160,0.06)", border: "rgba(110,231,160,0.2)" },
  pending: { color: "var(--gold-primary)", bg: "rgba(201,168,76,0.06)", border: "var(--gold-border)" },
  expired: { color: "var(--text-muted)", bg: "transparent", border: "var(--border-default)" },
};

export default function MyListingsPage() {
  const myProperties = MOCK_PROPERTIES.filter((p) => p.ownerId === CURRENT_USER.id);

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="section-label mb-3">Dashboard</p>
          <h1 className="text-display" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--text-primary)" }}>
            My Listings
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "6px" }}>
            {myProperties.length} {myProperties.length === 1 ? "property" : "properties"} listed
          </p>
        </div>
        <Link href="/post-property" className="btn-gold px-6 py-3 gap-2 hidden sm:inline-flex">
          <Plus size={13} /> Add Listing
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Total Listings", value: myProperties.length },
          { label: "Active", value: myProperties.filter((p) => p.status === "active").length },
          { label: "Total Views", value: myProperties.reduce((s, p) => s + p.views, 0).toLocaleString() },
          { label: "Featured", value: myProperties.filter((p) => p.isFeatured).length },
        ].map(({ label, value }) => (
          <div key={label} className="p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <p className="text-display" style={{ fontSize: "2rem", color: "var(--gold-primary)", lineHeight: 1 }}>{value}</p>
            <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "6px" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Listings */}
      {myProperties.length === 0 ? (
        <div className="py-24 text-center" style={{ border: "1px solid var(--border-subtle)" }}>
          <p className="text-display mb-3" style={{ fontSize: "2rem", color: "var(--text-primary)" }}>No Listings Yet</p>
          <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>Start by listing your first property.</p>
          <Link href="/post-property" className="btn-gold px-8 py-3 gap-2">
            <Plus size={13} /> List a Property
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {myProperties.map((p) => {
            const s = STATUS_STYLES[p.status] ?? STATUS_STYLES.expired;
            return (
              <div key={p.id} className="flex gap-4 p-4 transition-all"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold-border)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}>
                {/* Thumbnail */}
                <div className="relative flex-shrink-0 overflow-hidden" style={{ width: "120px", height: "80px" }}>
                  <Image src={p.images[0]} alt={p.title} fill className="object-cover" sizes="120px" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <Link href={`/property/${p.id}`} className="hover:text-yellow-400 transition-colors">
                      <h3 className="text-display line-clamp-1" style={{ fontSize: "1.1rem", color: "var(--text-primary)" }}>{p.title}</h3>
                    </Link>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs px-3 py-1" style={{ border: `1px solid ${s.border}`, color: s.color, background: s.bg, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        {p.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mb-2">
                    <MapPin size={10} style={{ color: "var(--text-muted)" }} />
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{p.location}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <p className="text-display" style={{ fontSize: "1.1rem", color: "var(--gold-primary)" }}>
                      {p.price}{p.period}
                    </p>
                    <div className="flex items-center gap-3">
                      {[{ icon: Bed, v: `${p.bedrooms} Bed` }, { icon: Bath, v: `${p.bathrooms} Bath` }].map(({ icon: I, v }) => (
                        <div key={v} className="flex items-center gap-1">
                          <I size={10} style={{ color: "var(--text-muted)" }} />
                          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{v}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 ml-auto">
                      <Eye size={11} style={{ color: "var(--text-muted)" }} />
                      <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{p.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button className="w-8 h-8 flex items-center justify-center transition-colors"
                    style={{ border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
                    aria-label="Edit" title="Edit">
                    <Pencil size={12} />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center transition-colors"
                    style={{ border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
                    aria-label="Delete" title="Delete">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mobile FAB */}
      <Link href="/post-property"
        className="sm:hidden fixed bottom-24 right-6 w-12 h-12 btn-gold flex items-center justify-center rounded-sm shadow-lg z-40">
        <Plus size={20} />
      </Link>
    </div>
  );
}
