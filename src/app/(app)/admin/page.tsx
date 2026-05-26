"use client";
import { useState } from "react";
import { MOCK_PROPERTIES, MOCK_USERS } from "@/lib/utils";
import { Eye, TrendingUp, Home, Users, CheckCircle2, Clock, XCircle, MoreHorizontal } from "lucide-react";

const TABS = ["Overview", "Properties", "Users"];

const MONTHLY = [
  { m: "Nov", listings: 4, views: 2100 },
  { m: "Dec", listings: 7, views: 3400 },
  { m: "Jan", listings: 5, views: 2800 },
  { m: "Feb", listings: 9, views: 4600 },
  { m: "Mar", listings: 12, views: 6200 },
  { m: "Apr", listings: 8, views: 5100 },
  { m: "May", listings: 6, views: 4300 },
];
const maxViews = Math.max(...MONTHLY.map((d) => d.views));
const maxListings = Math.max(...MONTHLY.map((d) => d.listings));

export default function AdminPage() {
  const [tab, setTab] = useState("Overview");

  const totalViews = MOCK_PROPERTIES.reduce((s, p) => s + p.views, 0);
  const activeCount = MOCK_PROPERTIES.filter((p) => p.status === "active").length;

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
      {/* Header */}
      <div className="mb-10">
        <p className="section-label mb-3">Administration</p>
        <h1 className="text-display" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--text-primary)" }}>
          Dashboard
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-8" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className="px-6 py-3 text-xs transition-colors relative"
            style={{ letterSpacing: "0.12em", textTransform: "uppercase",
              color: tab === t ? "var(--gold-primary)" : "var(--text-muted)" }}>
            {t}
            {tab === t && <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "var(--gold-primary)" }} />}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <div className="space-y-8">
          {/* KPI cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Home, label: "Total Listings", value: MOCK_PROPERTIES.length, sub: `${activeCount} active` },
              { icon: Eye, label: "Total Views", value: totalViews.toLocaleString(), sub: "All time" },
              { icon: Users, label: "Registered Users", value: MOCK_USERS.length, sub: "Platform users" },
              { icon: TrendingUp, label: "Featured", value: MOCK_PROPERTIES.filter((p) => p.isFeatured).length, sub: "Premium listings" },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <div className="flex items-center justify-between mb-4">
                  <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)" }}>{label}</span>
                  <Icon size={14} style={{ color: "var(--gold-dim)" }} />
                </div>
                <p className="text-display" style={{ fontSize: "2rem", color: "var(--text-primary)", lineHeight: 1 }}>{value}</p>
                <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: "6px" }}>{sub}</p>
              </div>
            ))}
          </div>

          {/* Bar chart — Views */}
          <div className="p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <p className="section-label mb-6">Monthly Views</p>
            <div className="flex items-end gap-3 h-36">
              {MONTHLY.map((d) => (
                <div key={d.m} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full transition-all duration-500 relative group"
                    style={{ height: `${(d.views / maxViews) * 100}%`, background: "linear-gradient(to top,rgba(201,168,76,0.5),rgba(201,168,76,0.15))", minHeight: "4px" }}>
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap px-2 py-1"
                      style={{ background: "var(--bg-elevated)", border: "1px solid var(--gold-border)", color: "var(--gold-primary)", fontSize: "0.65rem" }}>
                      {d.views.toLocaleString()}
                    </div>
                  </div>
                  <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>{d.m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar chart — Listings */}
          <div className="p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
            <p className="section-label mb-6">New Listings Per Month</p>
            <div className="flex items-end gap-3 h-24">
              {MONTHLY.map((d) => (
                <div key={d.m} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full"
                    style={{ height: `${(d.listings / maxListings) * 100}%`, background: "rgba(201,168,76,0.2)", border: "1px solid var(--gold-border)", minHeight: "4px" }} />
                  <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>{d.m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "Properties" && (
        <div className="space-y-3">
          {/* Column header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 pb-2"
            style={{ borderBottom: "1px solid var(--border-subtle)" }}>
            {["Property", "Type", "Price", "Status", "Views", ""].map((h, i) => (
              <div key={i} className={`${i === 0 ? "col-span-4" : i === 5 ? "col-span-1" : "col-span-2"}`}
                style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)" }}>{h}</div>
            ))}
          </div>

          {MOCK_PROPERTIES.map((p) => {
            const statusIcon = p.status === "active" ? <CheckCircle2 size={12} style={{ color: "#6ee7a0" }} />
              : p.status === "pending" ? <Clock size={12} style={{ color: "var(--gold-primary)" }} />
              : <XCircle size={12} style={{ color: "var(--text-muted)" }} />;
            return (
              <div key={p.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center transition-all"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold-border)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}>
                <div className="md:col-span-4">
                  <p style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>{p.title}</p>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "2px" }}>{p.location}</p>
                </div>
                <div className="md:col-span-2">
                  <span className="tag-luxury text-xs">{p.category}</span>
                </div>
                <div className="md:col-span-2">
                  <p style={{ fontSize: "0.85rem", color: "var(--gold-primary)", fontFamily: "var(--font-display)" }}>{p.price}</p>
                </div>
                <div className="md:col-span-2 flex items-center gap-2">
                  {statusIcon}
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "capitalize" }}>{p.status}</span>
                </div>
                <div className="md:col-span-1">
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{p.views.toLocaleString()}</span>
                </div>
                <div className="md:col-span-1 flex justify-end">
                  <button style={{ color: "var(--text-muted)" }}><MoreHorizontal size={15} /></button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "Users" && (
        <div className="space-y-3">
          {MOCK_USERS.map((u) => (
            <div key={u.id} className="flex items-center justify-between p-5 transition-all"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold-border)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}>
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 flex items-center justify-center text-display"
                  style={{ border: "1px solid var(--gold-border)", color: "var(--gold-primary)", fontSize: "1.1rem", background: "rgba(201,168,76,0.05)" }}>
                  {u.name[0]}
                </div>
                <div>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>{u.name}</p>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{u.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                  <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Listings</p>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>{u.totalListings}</p>
                </div>
                <span className="tag-luxury" style={{
                  borderColor: u.role === "admin" ? "var(--gold-primary)" : "var(--border-default)",
                  color: u.role === "admin" ? "var(--gold-primary)" : "var(--text-muted)",
                  background: u.role === "admin" ? "rgba(201,168,76,0.08)" : "transparent" }}>
                  {u.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
