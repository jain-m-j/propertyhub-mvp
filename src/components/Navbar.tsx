"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Heart, Bell, Plus, User, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Properties", href: "/home" },
  { label: "Buy", href: "/home?type=Buy" },
  { label: "Rent", href: "/home?type=Rent" },
  { label: "My Listings", href: "/my-listings" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50"
      style={{ background: "rgba(7,7,15,0.88)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid var(--border-subtle)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/home" className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center" style={{ border: "1px solid var(--gold-border)" }}>
              <MapPin size={12} style={{ color: "var(--gold-primary)" }} />
            </div>
            <span className="text-display hidden sm:block" style={{ fontSize: "0.85rem", letterSpacing: "0.25em", color: "var(--text-primary)" }}>
              PROPERTYHUB
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href.split("?")[0];
              return (
                <Link key={link.href} href={link.href}
                  style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase",
                    color: active ? "var(--gold-primary)" : "var(--text-secondary)" }}
                  className="transition-colors hover:text-yellow-400 relative">
                  {link.label}
                  {active && <div className="absolute -bottom-1 left-0 right-0 h-px" style={{ background: "var(--gold-primary)" }} />}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex w-8 h-8 items-center justify-center transition-colors" style={{ color: "var(--text-secondary)" }} aria-label="Saved">
              <Heart size={15} />
            </button>
            <button className="hidden sm:flex w-8 h-8 items-center justify-center transition-colors" style={{ color: "var(--text-secondary)" }} aria-label="Notifications">
              <Bell size={15} />
            </button>
            <Link href="/post-property" className="btn-gold hidden sm:inline-flex items-center gap-2 px-4 py-2 ml-1">
              <Plus size={11} /> List
            </Link>
            <Link href="/admin" className="w-8 h-8 flex items-center justify-center transition-colors"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)", borderRadius: "2px" }}
              aria-label="Profile"><User size={13} /></Link>
            <button className="md:hidden w-8 h-8 flex items-center justify-center" style={{ color: "var(--text-secondary)" }}
              onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-1" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className="block py-3 transition-colors" style={{ fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase",
                color: pathname === link.href.split("?")[0] ? "var(--gold-primary)" : "var(--text-secondary)",
                borderBottom: "1px solid var(--border-subtle)" }}>
              {link.label}
            </Link>
          ))}
          <Link href="/post-property" onClick={() => setMenuOpen(false)} className="btn-gold w-full py-3 text-center block mt-3">
            List Property
          </Link>
        </div>
      )}
    </nav>
  );
}
