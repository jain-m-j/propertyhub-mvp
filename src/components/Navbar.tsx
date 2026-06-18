"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Rent", href: "/home" },
  { label: "How it works", href: "/welcome" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // On the home page the header floats over the photo hero (transparent,
  // white text). Everywhere else it's a solid light sticky bar.
  const overlay = pathname === "/home";

  const navStyle = overlay
    ? { position: "absolute" as const, top: 0, left: 0, right: 0, zIndex: 40, background: "transparent" }
    : { position: "sticky" as const, top: 0, zIndex: 40, background: "var(--bg-2)", borderBottom: "1px solid var(--line)" };

  const linkColor = overlay ? "var(--on-dark-soft)" : "var(--muted)";
  const brandColor = overlay ? "var(--on-dark)" : "var(--text)";

  return (
    <nav style={navStyle}>
      <div className="max-w-[1220px] mx-auto px-6 md:px-7">
        <div className="flex items-center justify-between" style={{ height: "74px" }}>
          {/* Brand */}
          <Link href="/home" className="flex items-center gap-2.5">
            <span className="w-[26px] h-[26px]" style={{ background: "var(--brand)", borderRadius: "7px" }} />
            <span className="text-display" style={{ fontSize: "1.5rem", fontWeight: 700, color: brandColor }}>GharJi</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href}
                className="transition-colors hover:opacity-100"
                style={{ fontSize: "0.92rem", color: linkColor, opacity: 0.92 }}>
                {link.label}
              </Link>
            ))}
            <Link href="/post-property" className="btn-gold px-5 py-2.5" style={{ borderRadius: "999px" }}>
              List your property
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden w-9 h-9 flex items-center justify-center"
            style={{ color: brandColor }} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-1"
          style={{ background: "var(--card)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
              className="block py-3" style={{ fontSize: "0.95rem", color: "var(--text)", borderBottom: "1px solid var(--line)" }}>
              {link.label}
            </Link>
          ))}
          <Link href="/post-property" onClick={() => setMenuOpen(false)} className="btn-gold w-full py-3 text-center block mt-3" style={{ borderRadius: "999px" }}>
            List your property
          </Link>
        </div>
      )}
    </nav>
  );
}
