"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, Bed, Bath, Maximize2, MapPin } from "lucide-react";
import { useState } from "react";
import type { Property } from "@/types";

export default function PropertyCard({ property }: { property: Property }) {
  const [liked, setLiked] = useState(false);
  return (
    <Link href={`/property/${property.id}`} className="block group">
      <article className="card-luxury overflow-hidden">
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
          <Image src={property.images[0]} alt={property.title} fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(7,7,15,0.85) 0%,transparent 55%)" }} />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="tag-luxury">{property.type}</span>
            {property.isFeatured && <span className="tag-luxury" style={{ borderColor: "var(--gold-primary)", background: "rgba(201,168,76,0.12)" }}>Featured</span>}
          </div>

          {/* Heart */}
          <button onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all"
            style={{ background: "rgba(7,7,15,0.75)", border: `1px solid ${liked ? "var(--gold-border)" : "var(--border-subtle)"}`, backdropFilter: "blur(6px)", borderRadius: "2px" }}>
            <Heart size={13} fill={liked ? "var(--gold-primary)" : "none"} style={{ color: liked ? "var(--gold-primary)" : "var(--text-secondary)" }} />
          </button>

          {/* Price overlay */}
          <div className="absolute bottom-3 left-4">
            <p className="text-display" style={{ fontSize: "1.45rem", color: "var(--text-primary)", lineHeight: 1 }}>
              {property.price}
              {property.period && <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginLeft: "3px" }}>{property.period}</span>}
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-display mb-1 group-hover:text-yellow-400 transition-colors line-clamp-1"
            style={{ fontSize: "1.05rem", color: "var(--text-primary)" }}>{property.title}</h3>
          <div className="flex items-center gap-1.5 mb-3">
            <MapPin size={10} style={{ color: "var(--text-muted)" }} />
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{property.location}</p>
          </div>
          <hr className="divider-gold mb-3" />
          <div className="flex items-center gap-5">
            {[{ icon: Bed, v: `${property.bedrooms} Bed` }, { icon: Bath, v: `${property.bathrooms} Bath` }, { icon: Maximize2, v: property.area }].map(({ icon: I, v }) => (
              <div key={v} className="flex items-center gap-1.5">
                <I size={10} style={{ color: "var(--text-muted)" }} />
                <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
