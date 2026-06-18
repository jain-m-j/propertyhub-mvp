"use client";
import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bed, Bath, Maximize2, MapPin, Phone, Check, PlayCircle } from "lucide-react";
import { MOCK_PROPERTIES, whatsappLink } from "@/lib/utils";
import { notFound } from "next/navigation";

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = MOCK_PROPERTIES.find((p) => p.id === id);
  if (!property) notFound();

  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="max-w-[1220px] mx-auto px-6 md:px-7 py-8">
      {/* Back */}
      <Link href="/home" className="inline-flex items-center gap-2 mb-6 transition-colors hover:text-[var(--brand)]"
        style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
        <ArrowLeft size={15} /> All rentals
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left — images + details */}
        <div className="lg:col-span-2 space-y-5">
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", borderRadius: "20px", border: "1px solid var(--line)" }}>
            <Image src={property.images[activeImg]} alt={property.title} fill priority
              className="object-cover" sizes="(max-width:1024px) 100vw,66vw" />
            <span className="tag-luxury absolute" style={{ top: "16px", left: "16px" }}>
              {property.type === "Rent" ? "For Rent" : "For Sale"}
            </span>
          </div>

          {property.images.length > 1 && (
            <div className="flex gap-3">
              {property.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className="relative overflow-hidden flex-shrink-0"
                  style={{ width: "88px", height: "62px", borderRadius: "10px", border: `2px solid ${activeImg === i ? "var(--brand)" : "var(--line)"}` }}>
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="88px" />
                </button>
              ))}
            </div>
          )}

          {property.videoLink && (
            <a href={property.videoLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2" style={{ color: "var(--brand)", fontSize: "0.9rem", fontWeight: 600 }}>
              <PlayCircle size={18} /> Watch video walkthrough
            </a>
          )}

          {/* Title + price */}
          <div className="pb-5 flex flex-wrap items-start justify-between gap-4" style={{ borderBottom: "1px solid var(--line)" }}>
            <div>
              <h1 className="text-display" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "var(--text)" }}>{property.title}</h1>
              <div className="flex items-center gap-1.5 mt-2">
                <MapPin size={14} style={{ color: "var(--brand)" }} />
                <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>{property.location}</p>
              </div>
            </div>
            <p className="text-display" style={{ fontSize: "2rem", fontWeight: 700, color: "var(--text)", lineHeight: 1 }}>
              {property.price}
              {property.period && <span style={{ fontSize: "0.9rem", color: "var(--muted)", fontWeight: 400, fontFamily: "var(--font-body)" }}> {property.period}</span>}
            </p>
          </div>

          {/* Beds / baths / area */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Bed, label: "Bedrooms", value: property.bedrooms },
              { icon: Bath, label: "Bathrooms", value: property.bathrooms },
              { icon: Maximize2, label: "Area", value: property.area },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center" style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "16px", padding: "18px 8px" }}>
                <Icon size={18} className="mx-auto mb-2" style={{ color: "var(--brand)" }} />
                <p className="text-display" style={{ fontSize: "1.2rem", color: "var(--text)" }}>{value}</p>
                <p style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: "2px" }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h2 style={{ fontSize: "1.2rem", color: "var(--text)", marginBottom: "10px" }}>About this home</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: "0.96rem" }}>{property.description}</p>
          </div>

          {/* Features */}
          {property.amenities.length > 0 && (
            <div>
              <h2 style={{ fontSize: "1.2rem", color: "var(--text)", marginBottom: "12px" }}>Features</h2>
              <div className="flex flex-wrap gap-2.5">
                {property.amenities.map((a) => (
                  <span key={a} className="inline-flex items-center gap-2"
                    style={{ background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: "999px", padding: "8px 14px", fontSize: "0.85rem", color: "var(--text)" }}>
                    <Check size={13} style={{ color: "var(--brand)" }} /> {a}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — contact box */}
        <div className="lg:col-span-1">
          <div className="sticky top-24" style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: "20px", padding: "24px", boxShadow: "var(--shadow-card)" }}>
            <p className="section-label">Listed by {property.ownerType.toLowerCase()}</p>
            <div className="flex items-center gap-3" style={{ margin: "14px 0 18px" }}>
              <div className="flex items-center justify-center text-display"
                style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(224,57,47,0.08)", border: "1px solid var(--line)", color: "var(--brand)", fontSize: "1.2rem", fontWeight: 700 }}>
                {property.ownerName[0]}
              </div>
              <div>
                <p style={{ color: "var(--text)", fontSize: "1rem", fontWeight: 500 }}>{property.ownerName}</p>
                <p style={{ color: "var(--muted)", fontSize: "0.8rem" }}>{property.ownerType}</p>
              </div>
            </div>

            <a href={whatsappLink(property.ownerWhatsapp, property.title)} target="_blank" rel="noopener noreferrer"
              className="btn-gold w-full" style={{ padding: "14px", fontSize: "0.95rem" }}>
              WhatsApp {property.ownerName.split(" ")[0]}
            </a>
            <a href={`tel:${property.ownerPhone}`}
              className="btn-ghost w-full mt-3 gap-2" style={{ padding: "14px", fontSize: "0.95rem" }}>
              <Phone size={15} /> Call {property.ownerPhone}
            </a>

            <p style={{ color: "var(--muted)", fontSize: "0.78rem", lineHeight: 1.6, marginTop: "16px", textAlign: "center" }}>
              You contact the {property.ownerType.toLowerCase()} directly. GharJi charges no fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
