"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronRight } from "lucide-react";

const STEPS = ["Basic Info", "Location & Price", "Details", "Review"];

const CATEGORIES = ["Apartment", "Villa", "House", "Studio", "Penthouse"];

type FormData = {
  title: string; type: string; category: string; description: string;
  location: string; city: string; price: string; period: string;
  bedrooms: string; bathrooms: string; area: string; amenities: string[];
};

const DEFAULT: FormData = {
  title: "", type: "Buy", category: "Apartment", description: "",
  location: "", city: "", price: "", period: "/month",
  bedrooms: "2", bathrooms: "2", area: "", amenities: [],
};

const ALL_AMENITIES = ["Swimming Pool", "Gym", "Parking", "Garden", "Concierge", "Security", "Lift", "Club House", "Terrace", "Smart Home", "Furnished", "Pet Friendly"];

export default function PostPropertyPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(DEFAULT);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormData, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const toggleAmenity = (a: string) =>
    setForm((f) => ({ ...f, amenities: f.amenities.includes(a) ? f.amenities.filter((x) => x !== a) : [...f.amenities, a] }));

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1500);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center"
          style={{ border: "1px solid var(--gold-border)", background: "rgba(201,168,76,0.08)" }}>
          <Check size={28} style={{ color: "var(--gold-primary)" }} />
        </div>
        <h2 className="text-display mb-3" style={{ fontSize: "2.2rem", color: "var(--text-primary)" }}>
          Listing Submitted
        </h2>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "2rem" }}>
          Your property has been submitted for review. Our team will publish it within 24 hours.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => router.push("/my-listings")} className="btn-gold px-8 py-3">View My Listings</button>
          <button onClick={() => { setSubmitted(false); setForm(DEFAULT); setStep(0); }} className="btn-ghost px-8 py-3">
            Add Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-10">
      <div className="mb-10">
        <p className="section-label mb-3">New Listing</p>
        <h1 className="text-display" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--text-primary)" }}>
          List Your Property
        </h1>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center gap-0 mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-8 h-8 flex items-center justify-center text-xs font-medium transition-all"
                style={{
                  border: `1px solid ${i <= step ? "var(--gold-primary)" : "var(--border-default)"}`,
                  background: i < step ? "var(--gold-primary)" : i === step ? "rgba(201,168,76,0.1)" : "transparent",
                  color: i < step ? "#07070f" : i === step ? "var(--gold-primary)" : "var(--text-muted)",
                }}>
                {i < step ? <Check size={13} /> : i + 1}
              </div>
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase",
                color: i === step ? "var(--gold-primary)" : "var(--text-muted)", whiteSpace: "nowrap" }}>{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-px mx-2 mt-[-10px]"
                style={{ background: i < step ? "var(--gold-primary)" : "var(--border-subtle)" }} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="p-6 space-y-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
        {step === 0 && (
          <>
            <div>
              <label className="section-label block mb-3">Property Title</label>
              <input value={form.title} onChange={(e) => set("title", e.target.value)}
                placeholder="e.g. Skyview Penthouse at Marine Drive"
                className="w-full input-luxury px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="section-label block mb-3">Transaction Type</label>
              <div className="flex gap-3">
                {["Buy", "Rent"].map((t) => (
                  <button key={t} onClick={() => set("type", t)}
                    className="flex-1 py-3 text-sm transition-all" style={{
                      border: `1px solid ${form.type === t ? "var(--gold-primary)" : "var(--border-default)"}`,
                      color: form.type === t ? "var(--gold-primary)" : "var(--text-secondary)",
                      background: form.type === t ? "rgba(201,168,76,0.08)" : "transparent",
                      letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.75rem" }}>{t}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="section-label block mb-3">Property Type</label>
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map((c) => (
                  <button key={c} onClick={() => set("category", c)}
                    className="px-4 py-2 text-xs transition-all" style={{ letterSpacing: "0.08em", textTransform: "uppercase",
                      border: `1px solid ${form.category === c ? "var(--gold-primary)" : "var(--border-default)"}`,
                      color: form.category === c ? "var(--gold-primary)" : "var(--text-secondary)",
                      background: form.category === c ? "rgba(201,168,76,0.08)" : "transparent" }}>{c}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="section-label block mb-3">Description</label>
              <textarea value={form.description} onChange={(e) => set("description", e.target.value)}
                placeholder="Describe your property in detail — unique features, views, recent renovations…"
                rows={4} className="w-full input-luxury px-4 py-3 text-sm resize-none" />
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div>
              <label className="section-label block mb-3">Full Address</label>
              <input value={form.location} onChange={(e) => set("location", e.target.value)}
                placeholder="e.g. 14, Cuffe Parade, Colaba" className="w-full input-luxury px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="section-label block mb-3">City</label>
              <input value={form.city} onChange={(e) => set("city", e.target.value)}
                placeholder="e.g. Mumbai" className="w-full input-luxury px-4 py-3 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="section-label block mb-3">Price (₹)</label>
                <input type="number" value={form.price} onChange={(e) => set("price", e.target.value)}
                  placeholder="0" className="w-full input-luxury px-4 py-3 text-sm" />
              </div>
              {form.type === "Rent" && (
                <div>
                  <label className="section-label block mb-3">Period</label>
                  <select value={form.period} onChange={(e) => set("period", e.target.value)}
                    className="w-full input-luxury px-4 py-3 text-sm appearance-none">
                    <option value="/month">/month</option>
                    <option value="/year">/year</option>
                  </select>
                </div>
              )}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="grid grid-cols-3 gap-4">
              {(["bedrooms", "bathrooms"] as const).map((f) => (
                <div key={f}>
                  <label className="section-label block mb-3 capitalize">{f}</label>
                  <div className="flex gap-1">
                    {["1","2","3","4","5+"].map((n) => (
                      <button key={n} onClick={() => set(f, n)}
                        className="flex-1 py-2 text-xs transition-all" style={{
                          border: `1px solid ${form[f] === n ? "var(--gold-primary)" : "var(--border-default)"}`,
                          color: form[f] === n ? "var(--gold-primary)" : "var(--text-secondary)",
                          background: form[f] === n ? "rgba(201,168,76,0.08)" : "transparent" }}>{n}</button>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <label className="section-label block mb-3">Area</label>
                <input value={form.area} onChange={(e) => set("area", e.target.value)}
                  placeholder="e.g. 2,400 sq ft" className="w-full input-luxury px-4 py-3 text-sm" />
              </div>
            </div>
            <div>
              <label className="section-label block mb-3">Amenities</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ALL_AMENITIES.map((a) => (
                  <button key={a} onClick={() => toggleAmenity(a)}
                    className="flex items-center gap-2 p-3 text-left transition-all text-xs" style={{
                      border: `1px solid ${form.amenities.includes(a) ? "var(--gold-primary)" : "var(--border-default)"}`,
                      color: form.amenities.includes(a) ? "var(--gold-primary)" : "var(--text-secondary)",
                      background: form.amenities.includes(a) ? "rgba(201,168,76,0.06)" : "transparent" }}>
                    <div className="w-3.5 h-3.5 flex-shrink-0 flex items-center justify-center"
                      style={{ border: `1px solid ${form.amenities.includes(a) ? "var(--gold-primary)" : "var(--border-default)"}`,
                        background: form.amenities.includes(a) ? "var(--gold-primary)" : "transparent" }}>
                      {form.amenities.includes(a) && <Check size={9} color="#07070f" />}
                    </div>
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className="section-label mb-2">Review Your Listing</p>
            {[
              { label: "Title", value: form.title || "—" },
              { label: "Type", value: `${form.category} · ${form.type}` },
              { label: "Location", value: form.location ? `${form.location}, ${form.city}` : "—" },
              { label: "Price", value: form.price ? `₹${parseInt(form.price).toLocaleString("en-IN")}${form.type === "Rent" ? form.period : ""}` : "—" },
              { label: "Bedrooms", value: form.bedrooms },
              { label: "Bathrooms", value: form.bathrooms },
              { label: "Area", value: form.area || "—" },
              { label: "Amenities", value: form.amenities.join(", ") || "None selected" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between py-3" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", maxWidth: "60%", textAlign: "right" }}>{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        {step > 0 && (
          <button onClick={() => setStep((s) => s - 1)} className="btn-ghost px-8 py-3">Back</button>
        )}
        <div className="flex-1" />
        {step < STEPS.length - 1 ? (
          <button onClick={() => setStep((s) => s + 1)} className="btn-gold px-8 py-3 gap-2">
            Continue <ChevronRight size={13} className="inline" />
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={submitting} className="btn-gold px-10 py-3 disabled:opacity-60">
            {submitting ? <span className="inline-block w-4 h-4 border border-current border-t-transparent rounded-full animate-spin" /> : "Submit Listing"}
          </button>
        )}
      </div>
    </div>
  );
}
