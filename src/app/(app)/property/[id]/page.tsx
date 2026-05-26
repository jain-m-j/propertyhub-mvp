"use client";
import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bed, Bath, Maximize2, MapPin, Eye, Phone, Mail, Heart, Share2, CheckCircle2 } from "lucide-react";
import { MOCK_PROPERTIES } from "@/lib/utils";
import { notFound } from "next/navigation";

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = MOCK_PROPERTIES.find((p) => p.id === id);
  if (!property) notFound();

  const [activeImg, setActiveImg] = useState(0);
  const [liked, setLiked] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
      {/* Back */}
      <Link href="/home" className="inline-flex items-center gap-2 mb-8 transition-colors"
        style={{ color: "var(--text-muted)", fontSize: "0.75rem", letterSpacing: "0.12em" }}>
        <ArrowLeft size={13} /> ALL PROPERTIES
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left — Images + Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main image */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/9", borderRadius: "2px" }}>
            <Image src={property.images[activeImg]} alt={property.title} fill
              className="object-cover transition-all duration-500" priority sizes="(max-width:1024px) 100vw,66vw" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(7,7,15,0.6) 0%,transparent 50%)" }} />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="tag-luxury">{property.type}</span>
              {property.isFeatured && <span className="tag-luxury" style={{ borderColor: "var(--gold-primary)", background: "rgba(201,168,76,0.15)" }}>Featured</span>}
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <button onClick={() => setLiked(!liked)}
                className="w-9 h-9 flex items-center justify-center transition-all"
                style={{ background: "rgba(7,7,15,0.75)", border: `1px solid ${liked ? "var(--gold-border)" : "var(--border-subtle)"}`, backdropFilter: "blur(6px)" }}>
                <Heart size={14} fill={liked ? "var(--gold-primary)" : "none"} style={{ color: liked ? "var(--gold-primary)" : "var(--text-secondary)" }} />
              </button>
              <button className="w-9 h-9 flex items-center justify-center"
                style={{ background: "rgba(7,7,15,0.75)", border: "1px solid var(--border-subtle)", backdropFilter: "blur(6px)", color: "var(--text-secondary)" }}>
                <Share2 size={14} />
              </button>
            </div>
            <div className="absolute bottom-4 left-5 flex items-center gap-2">
              <Eye size={12} style={{ color: "var(--text-muted)" }} />
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{property.views.toLocaleString()} views</span>
            </div>
          </div>

          {/* Thumbnails */}
          {property.images.length > 1 && (
            <div className="flex gap-3">
              {property.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className="relative overflow-hidden flex-shrink-0 transition-all"
                  style={{ width: "80px", height: "56px", border: `1px solid ${activeImg === i ? "var(--gold-primary)" : "var(--border-subtle)"}`, borderRadius: "2px" }}>
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}

          {/* Title + Price */}
          <div className="pb-6" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-display mb-2" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--text-primary)" }}>
                  {property.title}
                </h1>
                <div className="flex items-center gap-2">
                  <MapPin size={13} style={{ color: "var(--gold-primary)" }} />
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{property.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-display" style={{ fontSize: "2rem", color: "var(--text-primary)", lineHeight: 1 }}>
                  {property.price}
                </p>
                {property.period && <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{property.period}</p>}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Bed, label: "Bedrooms", value: property.bedrooms },
              { icon: Bath, label: "Bathrooms", value: property.bathrooms },
              { icon: Maximize2, label: "Area", value: property.area },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="p-4 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <Icon size={18} className="mx-auto mb-2" style={{ color: "var(--gold-primary)" }} />
                <p className="text-display" style={{ fontSize: "1.2rem", color: "var(--text-primary)" }}>{value}</p>
                <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "2px" }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <p className="section-label mb-4">About This Property</p>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem" }}>{property.description}</p>
          </div>

          {/* Amenities */}
          <div>
            <p className="section-label mb-4">Amenities & Features</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map((a) => (
                <div key={a} className="flex items-center gap-3 p-3"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                  <CheckCircle2 size={13} style={{ color: "var(--gold-primary)", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Contact card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <div className="p-6 space-y-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
              <p className="section-label">Listed By</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center text-sm text-display"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--gold-border)", color: "var(--gold-primary)", fontSize: "1.1rem" }}>
                  {property.ownerName[0]}
                </div>
                <div>
                  <p style={{ color: "var(--text-primary)", fontSize: "0.95rem" }}>{property.ownerName}</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.72rem", letterSpacing: "0.08em" }}>Property Owner</p>
                </div>
              </div>
              <hr className="divider-gold" />
              <button onClick={() => setContactOpen(!contactOpen)} className="btn-gold w-full py-3.5">
                {contactOpen ? "Hide Contact" : "Show Contact"}
              </button>
              {contactOpen && (
                <div className="space-y-3 pt-1">
                  <a href={`tel:${property.ownerPhone}`}
                    className="flex items-center gap-3 p-3 transition-colors"
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", borderRadius: "2px" }}>
                    <Phone size={13} style={{ color: "var(--gold-primary)" }} />
                    <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{property.ownerPhone}</span>
                  </a>
                  <a href={`mailto:${property.ownerEmail}`}
                    className="flex items-center gap-3 p-3 transition-colors"
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", borderRadius: "2px" }}>
                    <Mail size={13} style={{ color: "var(--gold-primary)" }} />
                    <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{property.ownerEmail}</span>
                  </a>
                </div>
              )}
              <button className="btn-ghost w-full py-3">Schedule Viewing</button>
            </div>

            {/* Quick facts */}
            <div className="p-5 space-y-3" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
              <p className="section-label mb-3">Quick Facts</p>
              {[
                { label: "Type", value: property.category },
                { label: "Transaction", value: property.type },
                { label: "Status", value: property.status },
                { label: "Listed", value: new Date(property.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-2"
                  style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)", textTransform: "capitalize" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
