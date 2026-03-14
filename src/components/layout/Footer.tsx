import React from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function Footer(){
  const t = useTranslations()
  return (
    <footer>
      <div className="ctn px-4 md:px-16">
        <div className="fgrid">
          <div>
            <Link href="/en/" className="logo"><div className="lb">ACF</div><div><div className="ln">{t('footer.logoText')}</div><div className="ls">{t('footer.logoSubtext')}</div></div></Link>
            <p className="fdesc">{t('footer.description')}</p>
          </div>
          <div>
            <div className="ftitle">{t('footer.framework.title')}</div>
            <ul className="flinks">
              <li><Link href="/en/standard">{t('footer.framework.theStandard')}</Link></li>
              <li><Link href="/en/method">{t('footer.framework.methodology')}</Link></li>
              <li><Link href="/en/research">{t('footer.framework.research')}</Link></li>
              <li><Link href="/en/blog">{t('blog.title')}</Link></li>
            </ul>
          </div>
          <div>
            <div className="ftitle">{t('footer.products.title')}</div>
            <ul className="flinks">
              <li><a href="https://acf-score.com">{t('footer.products.score')}</a></li>
              <li><Link href="/en/control">{t('footer.products.control')}</Link></li>
              <li><Link href="/en/certification">{t('footer.products.certification')}</Link></li>
              <li><Link href="/en/academy">{t('footer.products.academy')}</Link></li>
            </ul>
          </div>
          <div>
            <div className="ftitle">{t('footer.organization.title')}</div>
            <ul className="flinks">
              <li><Link href="/en/partners/login">{t('footer.organization.partnerPortal')}</Link></li>
              <li><Link href="/en/about">{t('footer.organization.about')}</Link></li>
              <li><Link href="/en/contact">{t('footer.organization.contact')}</Link></li>
              <li><Link href="/en/legal">{t('footer.organization.legal')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="fbot">
          <div className="fcopy">{t('footer.copyright')}</div>
          <div className="flegal"><Link href="/en/privacy">{t('footer.legal.privacy')}</Link><Link href="/en/terms">{t('footer.legal.terms')}</Link><Link href="/en/cookies">{t('footer.legal.cookies')}</Link></div>
        </div>
      </div>
    </footer>
  )
}
