"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6" style={{ background: "var(--bg)" }}>
      <div className="w-full max-w-md text-center">
        <Link href="/welcome" className="inline-flex items-center gap-2 mb-10 transition-colors hover:text-[var(--brand)]"
          style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
          <ArrowLeft size={15} /> Back
        </Link>

        <div className="card-luxury" style={{ padding: "36px 28px" }}>
          <span className="inline-block w-[34px] h-[34px] mb-5" style={{ background: "var(--brand)", borderRadius: "9px" }} />
          <h1 className="text-display" style={{ fontSize: "1.9rem", color: "var(--text)", marginBottom: "10px" }}>
            No account needed
          </h1>
          <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "24px" }}>
            GharJi is open to everyone — just browse listings and message the owner or broker directly.
            There&apos;s nothing to sign up for.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/home" className="btn-gold px-7 py-3">Browse rentals</Link>
            <Link href="/post-property" className="btn-ghost px-7 py-3">List your property</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
