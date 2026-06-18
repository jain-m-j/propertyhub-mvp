"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useState } from "react";
import type { Property } from "@/types";
import { whatsappLink } from "@/lib/utils";

export default function PropertyCard({ property }: { property: Property }) {
  const [liked, setLiked] = useState(false);
  const href = `/property/${property.id}`;

  return (
    <article className="card-luxury overflow-hidden flex flex-col">
      {/* Photo */}
      <Link href={href} className="block relative" style={{ aspectRatio: "4/3" }}>
        <Image src={property.images[0]} alt={property.title} fill
          className="object-cover"
          sizes="(max-width:600px) 100vw,(max-width:900px) 50vw,33vw" />
        <span className="tag-luxury absolute" style={{ top: "14px", left: "14px" }}>
          {property.type === "Rent" ? "For Rent" : "For Sale"}
        </span>
        <button onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          className="absolute flex items-center justify-center"
          style={{ top: "12px", right: "12px", width: "34px", height: "34px", borderRadius: "50%", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(4px)" }}
          aria-label="Save">
          <Heart size={16} fill={liked ? "var(--brand)" : "none"} style={{ color: liked ? "var(--brand)" : "var(--text)" }} />
        </button>
      </Link>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-display" style={{ fontSize: "1.8rem", fontWeight: 700, lineHeight: 1 }}>
          {property.price}
          {property.period && <span style={{ fontSize: "0.85rem", color: "var(--muted)", fontFamily: "var(--font-body)", fontWeight: 400 }}> {property.period}</span>}
        </p>
        <Link href={href}>
          <h3 className="line-clamp-1" style={{ fontSize: "1.1rem", fontWeight: 500, margin: "6px 0 2px", color: "var(--text)" }}>{property.title}</h3>
        </Link>
        <p style={{ color: "var(--muted)", fontSize: "0.88rem" }}>{property.location}</p>

        {/* Meta line */}
        <div className="flex gap-4" style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid var(--line)", color: "var(--muted)", fontSize: "0.85rem" }}>
          <span><b style={{ color: "var(--text)" }}>{property.bedrooms}</b> {property.bedrooms === 1 ? "bed" : "beds"}</span>
          <span><b style={{ color: "var(--text)" }}>{property.bathrooms}</b> {property.bathrooms === 1 ? "bath" : "baths"}</span>
          <span><b style={{ color: "var(--text)" }}>{property.area.replace(/\s*sqft$/i, "")}</b> sqft</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5" style={{ marginTop: "16px" }}>
          <a href={whatsappLink(property.ownerWhatsapp, property.title)} target="_blank" rel="noopener noreferrer"
            className="btn-gold flex-1 text-center" style={{ padding: "11px", fontSize: "0.88rem" }}>
            WhatsApp
          </a>
          <a href={`tel:${property.ownerPhone}`}
            className="btn-ghost flex-1 text-center" style={{ padding: "11px", fontSize: "0.88rem" }}>
            Call
          </a>
        </div>
      </div>
    </article>
  );
}
