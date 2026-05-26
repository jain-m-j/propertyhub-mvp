"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("otp"); }, 1000);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); router.push("/home"); }, 1000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)" }} />

      <div className="relative z-10 w-full max-w-sm">
        <Link href="/welcome" className="inline-flex items-center gap-2 mb-10 transition-colors"
          style={{ color: "var(--text-muted)", fontSize: "0.75rem", letterSpacing: "0.12em" }}>
          <ArrowLeft size={13} /> BACK
        </Link>

        <div className="mb-10">
          <div className="w-10 h-10 flex items-center justify-center mb-6"
            style={{ border: "1px solid var(--gold-border)" }}>
            <MapPin size={16} style={{ color: "var(--gold-primary)" }} />
          </div>
          <h1 className="text-display mb-2" style={{ fontSize: "2.4rem", color: "var(--text-primary)" }}>
            {step === "phone" ? "Welcome Back" : "Verify Identity"}
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
            {step === "phone"
              ? "Sign in to access your curated portfolio"
              : `Code sent to +91 ${phone}`}
          </p>
        </div>

        {step === "phone" ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-5">
            <div>
              <label className="section-label block mb-3" htmlFor="phone">Mobile Number</label>
              <div className="flex gap-3">
                <div className="flex items-center justify-center px-4 input-luxury" style={{ minWidth: "60px" }}>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>+91</span>
                </div>
                <input id="phone" type="tel" value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="10-digit number" className="flex-1 input-luxury px-4 py-3.5 text-sm"
                  maxLength={10} autoFocus />
              </div>
            </div>
            <button type="submit" disabled={phone.length !== 10 || loading}
              className="btn-gold w-full py-4 disabled:opacity-40 disabled:cursor-not-allowed">
              {loading ? <span className="inline-block w-4 h-4 border border-current border-t-transparent rounded-full animate-spin" /> : "Send OTP"}
            </button>
            <p className="text-center" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
              By continuing you agree to our <Link href="#" style={{ color: "var(--gold-dim)" }}>Terms & Privacy</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="section-label" htmlFor="otp">Enter OTP</label>
                <button type="button" onClick={() => { setStep("phone"); setOtp(""); }}
                  style={{ fontSize: "0.7rem", color: "var(--gold-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Change Number
                </button>
              </div>
              <input id="otp" type="text" value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000" className="w-full input-luxury py-5 text-center text-3xl"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "0.5em" }}
                maxLength={6} autoFocus />
            </div>
            <button type="submit" disabled={otp.length !== 6 || loading}
              className="btn-gold w-full py-4 disabled:opacity-40 disabled:cursor-not-allowed">
              {loading ? <span className="inline-block w-4 h-4 border border-current border-t-transparent rounded-full animate-spin" /> : "Verify & Continue"}
            </button>
            <button type="button" style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.1em", width: "100%", textTransform: "uppercase", paddingTop: "8px" }}>
              Resend OTP
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
