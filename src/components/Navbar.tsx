"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full" style={{ background: 'var(--acf-surface)' }}>
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

        <button className="ham md:hidden" aria-label="Menu" />
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/standard" className="nav-link">Standard</Link>
          <Link href="/framework" className="nav-link">Framework</Link>
          <Link href="/method" className="nav-link">Method</Link>
          <Link href="/control" className="nav-link">Control</Link>
          <Link href="/certification" className="nav-link">Certification</Link>
          <Link href="/partners" className="nav-link">Partners</Link>
          <Link href="/academy" className="nav-link">Academy</Link>
          <Link href="/about" className="nav-link">About</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/contact" className="btn w-full md:w-auto">Contact</Link>
        </div>
      </div>

      <style jsx>{`
        .nav-link{ color: var(--acf-foreground-muted); font-weight:600; }
        .nav-link:hover{ color: var(--acf-accent); }
      `}</style>
    </header>
  );
}
