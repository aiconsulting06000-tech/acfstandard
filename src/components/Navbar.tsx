"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/standard", label: "Standard" },
  { href: "/framework", label: "Framework" },
  { href: "/method", label: "Method" },
  { href: "/control", label: "Control" },
  { href: "/certification", label: "Certification" },
  { href: "/partners", label: "Partners" },
  { href: "/academy", label: "Academy" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full sticky top-0 z-50" style={{ background: 'var(--acf-surface)' }}>
      <div className="container flex items-center justify-between" style={{ height: 70 }}>
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center">
            <span style={{ color: 'var(--acf-accent)', fontWeight: 800, fontSize: 18 }}>ACF</span>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide" style={{ color: 'var(--acf-accent)' }}>Agentic Commerce Framework</div>
            <div className="text-xs muted">by Vincent DORANGE</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link" style={{ color: pathname === item.href ? 'var(--acf-accent)' : undefined }}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/contact" className="btn hidden md:inline-block">Contact</Link>
          <button className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="var(--acf-accent)" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="var(--acf-accent)" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t" style={{ background: 'var(--acf-surface)', borderColor: 'var(--acf-accent)' }}>
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg font-semibold transition" style={{ color: pathname === item.href ? 'var(--acf-accent)' : 'var(--acf-foreground-muted)', background: pathname === item.href ? 'rgba(201,168,76,0.1)' : undefined }}>
                {item.label}
              </Link>
            ))}
            <div className="pt-2 mt-1 border-t" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="btn block w-full text-center">Contact</Link>
            </div>
          </nav>
        </div>
      )}
      <style jsx>{`
        .nav-link { color: var(--acf-foreground-muted); font-weight: 600; }
        .nav-link:hover { color: var(--acf-accent); }
      `}</style>
    </header>
  );
}
