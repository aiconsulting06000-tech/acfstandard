import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full" style={{ background: 'var(--acf-surface)', color: 'var(--acf-text)' }}>
      <div className="section">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div style={{ color: 'var(--acf-accent)', fontWeight: 700 }}>ACF — Agentic Commerce Framework</div>
            <p className="text-sm muted mt-2">Proprietary methodology and certification program by Vincent DORANGE.</p>
          </div>

          <div>
            <div style={{ fontWeight: 700 }}>Resources</div>
            <ul className="mt-3 space-y-2 muted text-sm">
              <li><Link href="/standard">Standard</Link></li>
              <li><Link href="/framework">Framework</Link></li>
              <li><Link href="/certification">Certification</Link></li>
              <li><Link href="/academy">Academy</Link></li>
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 700 }}>Get in touch</div>
            <p className="text-sm muted mt-3">Email: <a className="" style={{ color: 'var(--acf-accent)' }} href="mailto:hello@acfstandard.com">hello@acfstandard.com</a></p>
            <p className="text-sm muted mt-2">© {new Date().getFullYear()} ACF — Agentic Commerce Framework. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
