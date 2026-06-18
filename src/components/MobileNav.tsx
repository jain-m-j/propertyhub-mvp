"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, Plus } from "lucide-react";

const items = [
  { icon: Search, label: "Search", href: "/home" },
  { icon: Heart, label: "Saved", href: "/home?saved=1" },
  { icon: Plus, label: "List", href: "/post-property" },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{ background: "var(--card)", borderTop: "1px solid var(--line)" }}>
      <div className="flex items-center justify-around px-2 py-2.5">
        {items.map(({ icon: Icon, label, href }) => {
          const active = pathname === href.split("?")[0];
          return (
            <Link key={label} href={href} className="flex flex-col items-center gap-1 py-1 px-4 transition-colors"
              style={{ color: active ? "var(--brand)" : "var(--muted)" }}>
              <Icon size={20} strokeWidth={active ? 2 : 1.6} />
              <span style={{ fontSize: "0.62rem", letterSpacing: "0.04em" }}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
