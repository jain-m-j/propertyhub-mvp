"use client";
import { MessageCircle, FileText, Check } from "lucide-react";

// PLACEHOLDERS — fill these in before launch.
const GHARJI_WHATSAPP = "919999999999"; // GharJi intake WhatsApp number (digits only)
const GOOGLE_FORM_URL = "https://forms.gle/your-form-id"; // GharJi listing intake Google Form

const INTAKE_MESSAGE =
  "Hi GharJi, I'd like to list a property in Sainik Farms. Here are the details:\n" +
  "• Name:\n• Phone:\n• Owner or Broker:\n• Property type (Builder Floor / Apartment / House / Villa / Studio):\n" +
  "• Rent or Sale:\n• Price:\n• Location / Block:\n• Bedrooms:\n• Photos (I'll attach):\n• Video link (optional):";

const NEED_LIST = [
  "Your name & phone number",
  "Whether you're the owner or a broker",
  "Property type — builder floor, apartment, house, villa or studio",
  "Rent or sale, and the price",
  "Location / block within Sainik Farms",
  "Bedrooms, bathrooms & approximate area",
  "A few clear photos (and a video link if you have one)",
];

export default function PostPropertyPage() {
  const waLink = `https://wa.me/${GHARJI_WHATSAPP}?text=${encodeURIComponent(INTAKE_MESSAGE)}`;

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-7 py-12">
      <p className="section-label" style={{ marginBottom: "10px" }}>List with GharJi</p>
      <h1 className="text-display" style={{ fontSize: "clamp(1.9rem,4vw,2.8rem)", color: "var(--text)" }}>
        Put your property in front of Sainik Farms renters
      </h1>
      <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.7, marginTop: "14px" }}>
        Send us the details over WhatsApp or fill the quick form. We review and publish listings manually,
        and renters then contact you directly. It&apos;s free for owners and brokers.
      </p>

      {/* What to send */}
      <div className="card-luxury" style={{ padding: "24px", marginTop: "32px" }}>
        <h2 style={{ fontSize: "1.15rem", color: "var(--text)", marginBottom: "14px" }}>What to send</h2>
        <ul className="space-y-2.5">
          {NEED_LIST.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check size={16} style={{ color: "var(--brand)", flexShrink: 0, marginTop: "3px" }} />
              <span style={{ color: "var(--text)", fontSize: "0.95rem" }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginTop: "24px" }}>
        <a href={waLink} target="_blank" rel="noopener noreferrer"
          className="btn-gold gap-2" style={{ padding: "18px", fontSize: "1rem" }}>
          <MessageCircle size={18} /> Send on WhatsApp
        </a>
        <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer"
          className="btn-ghost gap-2" style={{ padding: "18px", fontSize: "1rem" }}>
          <FileText size={18} /> Fill the Google Form
        </a>
      </div>

      <p style={{ color: "var(--muted)", fontSize: "0.8rem", marginTop: "16px", textAlign: "center" }}>
        Placeholder links — the WhatsApp number and form URL are set in{" "}
        <code style={{ color: "var(--text)" }}>post-property/page.tsx</code> and need to be filled before launch.
      </p>
    </div>
  );
}
