import React from 'react'
import Link from 'next/link'

export default function Footer(){
  return (
    <footer>
      <div className="ctn px-4 md:px-16">
        <div className="fgrid">
          <div>
            <Link href="/en/" className="logo"><div className="lb">ACF</div><div><div className="ln">Agentic Commerce Framework®</div><div className="ls">by Vincent DORANGE</div></div></Link>
            <p className="fdesc">The definitive governance standard for organizations deploying autonomous agentic systems. Protected — Loi n° 2018-670.</p>
          </div>
          <div>
            <div className="ftitle">Framework</div>
            <ul className="flinks">
              <li><Link href="/en/standard">The Standard</Link></li>
              <li><Link href="/en/method">Methodology</Link></li>
              <li><Link href="/en/research">Research</Link></li>
              <li><Link href="/en/blog">Blog</Link></li>
            </ul>
          </div>
          <div>
            <div className="ftitle">Products</div>
            <ul className="flinks">
              <li><a href="https://acf-score.com">ACF Score</a></li>
              <li><Link href="/en/control">ACF Control</Link></li>
              <li><Link href="/en/certification">Certification</Link></li>
              <li><Link href="/en/academy">Academy</Link></li>
            </ul>
          </div>
          <div>
            <div className="ftitle">Organization</div>
            <ul className="flinks">
              <li><Link href="/en/partners/login">Partner Portal</Link></li>
              <li><Link href="/en/about">About</Link></li>
              <li><Link href="/en/contact">Contact</Link></li>
              <li><Link href="/en/legal">Legal</Link></li>
            </ul>
          </div>
        </div>
        <div className="fbot">
          <div className="fcopy">© 2026 Agentic Commerce Framework® — Vincent DORANGE. All rights reserved. Registered INPI.</div>
          <div className="flegal"><Link href="/en/privacy">Privacy</Link><Link href="/en/terms">Terms</Link><Link href="/en/cookies">Cookies</Link></div>
        </div>
      </div>
    </footer>
  )
}
