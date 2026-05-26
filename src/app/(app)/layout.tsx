import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navbar />
      <main className="pb-24 md:pb-0">{children}</main>
      <MobileNav />
    </div>
  );
}
