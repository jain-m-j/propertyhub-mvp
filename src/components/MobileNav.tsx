"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Plus, List, User } from "lucide-react";

const items = [
  { icon: Home, label: "Home", href: "/home" },
  { icon: Plus, label: "List", href: "/post-property" },
  { icon: List, label: "Listings", href: "/my-listings" },
  { icon: User, label: "Profile", href: "/admin" },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{ background: "rgba(10,10,18,0.97)", backdropFilter: "blur(20px)", borderTop: "1px solid var(--border-subtle)" }}>
      <div className="flex items-center justify-around px-2 py-2.5">
        {items.map(({ icon: Icon, label, href }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} className="flex flex-col items-center gap-1 py-1 px-4 transition-colors"
              style={{ color: active ? "var(--gold-primary)" : "var(--text-muted)" }}>
              <Icon size={20} strokeWidth={active ? 1.5 : 1.2} />
              <span style={{ fontSize: "0.58rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
