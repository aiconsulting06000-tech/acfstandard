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
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center">
            <span style={{ color: 'var(--acf-accent)', fontWeight: 800, fontSize: 18 }}>ACF</span>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide" style={{ color: 'var(--acf-accent)' }}>Agentic Commerce Framework</div>
            <div className="text-xs muted">by Vincent DORANGE</div>
          </div>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
              style={{ color: pathname === item.href ? 'var(--acf-accent)' : undefined }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Contact + Hamburger */}
        <div className="flex items-center gap-4">
          <Link href="/contact" className="btn hidden md:inline-block">Contact</Link>
          
          {/* Hamburger button */}
          <button
            className="md:hidden flex flex
