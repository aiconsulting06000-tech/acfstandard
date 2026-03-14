'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

type Props = { open: boolean; onClose: ()=>void; activePanel: string; setActivePanel: (p:string)=>void }

export default function MegaMenu({open,onClose,activePanel,setActivePanel}:Props){
  const t = useTranslations()

  return (
    <>
      <div className={open? 'mo open':'mo'} onClick={onClose}></div>
      <div className={open? 'md open':'md'} id="megadrawer" role="dialog" aria-hidden={!open}>
        <button className="mclose" onClick={onClose}>×</button>
        <div className="ms">
          <div className={activePanel==='framework'?'mni active':'mni'} onClick={()=>setActivePanel('framework')}><span>{t('megaMenu.framework.title')}</span><span className="marr">›</span></div>
          <div className={activePanel==='products'?'mni active':'mni'} onClick={()=>setActivePanel('products')}><span>{t('megaMenu.products.title')}</span><span className="marr">›</span></div>
          <div className={activePanel==='resources'?'mni active':'mni'} onClick={()=>setActivePanel('resources')}><span>{t('megaMenu.resources.title')}</span><span className="marr">›</span></div>
          <div className={activePanel==='about'?'mni active':'mni'} onClick={()=>setActivePanel('about')}><span>{t('megaMenu.about.title')}</span><span className="marr">›</span></div>
          <div className={activePanel==='partners'?'mni active':'mni'} onClick={()=>setActivePanel('partners')}><span>{t('megaMenu.partners.title')}</span><span className="marr">›</span></div>
          <div className="muser">
            <div className="muname">{t('megaMenu.user.partnerAccess')}</div>
            <div className="mulinks">
              <Link href="/en/partners/login">{t('megaMenu.user.partnerLogin')}</Link>
              <Link href="/en/partners/apply">{t('megaMenu.user.applyPartner')}</Link>
              <Link href="/en/contact">{t('megaMenu.user.contact')}</Link>
            </div>
          </div>
        </div>

        <div className="mc">
          <div className={activePanel==='framework'?'mp active':'mp'} id="panel-framework">
            <div className="mpt"><Link href="/en/standard">{t('megaMenu.framework.link')}</Link></div>
            <div className="mpd">{t('megaMenu.framework.subtitle')}</div>
            <div className="mgroup"><div className="mgtitle">{t('megaMenu.framework.architecture.title')}</div><ul className="mlinks"><li><Link href="/en/standard#principles">{t('megaMenu.framework.architecture.principles')}</Link></li><li><Link href="/en/standard#layers">{t('megaMenu.framework.architecture.layers')}</Link></li><li><Link href="/en/standard#maturity">{t('megaMenu.framework.architecture.maturity')}</Link></li></ul></div>
            <div className="mgroup"><div className="mgtitle">{t('megaMenu.framework.methodology.title')}</div><ul className="mlinks"><li><Link href="/en/method">{t('megaMenu.framework.methodology.modules')}</Link></li><li><Link href="/en/method#constitution">{t('megaMenu.framework.methodology.constitution')}</Link></li><li><Link href="/en/method#dda">{t('megaMenu.framework.methodology.dda')}</Link></li><li><Link href="/en/method#killswitch">{t('megaMenu.framework.methodology.killSwitch')}</Link></li></ul></div>
            <div className="mfeat"><div className="mflbl">{t('megaMenu.framework.featured.label')}</div><div className="mfitem"><div className="mftitle">{t('megaMenu.framework.featured.whitepaper.title')}</div><div className="mfdesc">{t('megaMenu.framework.featured.whitepaper.description')}</div></div><div className="mfitem"><div className="mftitle">{t('megaMenu.framework.featured.release.title')}</div><div className="mfdesc">{t('megaMenu.framework.featured.release.description')}</div></div></div>
          </div>

          <div className={activePanel==='products'?'mp active':'mp'} id="panel-products">
            <div className="mpt"><Link href="/en/control">{t('megaMenu.products.link')}</Link></div>
            <div className="mpd">{t('megaMenu.products.subtitle')}</div>
            <div className="mgroup"><div className="mgtitle">{t('megaMenu.products.diagnostic.title')}</div><ul className="mlinks"><li><Link href="/en/control#dashboard">{t('megaMenu.products.diagnostic.score')}</Link></li><li><Link href="/en/control#monitoring">{t('megaMenu.products.saas.kpis')}</Link></li><li><Link href="/en/control#escalation">{t('megaMenu.products.saas.gating')}</Link></li><li><Link href="/en/control#killswitch">{t('megaMenu.framework.methodology.killSwitch')}</Link></li></ul></div>
            <div className="mgroup"><div className="mgtitle">{t('megaMenu.products.saas.title')}</div><ul className="mlinks"><li><Link href="/en/control#enterprise">{t('megaMenu.products.saas.control')}</Link></li><li><Link href="/en/control#compliance">{t('megaMenu.products.certification.program')}</Link></li><li><Link href="/en/control#audit">{t('megaMenu.products.certification.audit')}</Link></li></ul></div>
            <div className="mfeat"><div className="mflbl">{t('megaMenu.framework.featured.label')}</div><div className="mfitem"><div className="mftitle">{t('megaMenu.products.saas.control')}</div><div className="mfdesc">{t('megaMenu.products.subtitle')}</div></div></div>
          </div>

          <div className={activePanel==='resources'?'mp active':'mp'} id="panel-resources">
            <div className="mpt"><Link href="/en/academy">{t('megaMenu.resources.link')}</Link></div>
            <div className="mpd">{t('megaMenu.resources.subtitle')}</div>
            <div className="mgroup"><div className="mgtitle">{t('megaMenu.resources.documentation.title')}</div><ul className="mlinks"><li><Link href="/en/academy#courses">{t('megaMenu.resources.documentation.specs')}</Link></li><li><Link href="/en/academy#webinars">{t('megaMenu.resources.insights.title')}</Link></li><li><Link href="/en/academy#documentation">{t('megaMenu.resources.documentation.research')}</Link></li><li><Link href="/en/academy#guides">{t('megaMenu.resources.documentation.academy')}</Link></li></ul></div>
            <div className="mgroup"><div className="mgtitle">{t('megaMenu.resources.insights.title')}</div><ul className="mlinks"><li><Link href="/en/blog">{t('megaMenu.resources.insights.aiAct')}</Link></li><li><Link href="/en/academy#events">{t('megaMenu.resources.insights.dda')}</Link></li><li><Link href="/en/contact">{t('megaMenu.resources.insights.killSwitch')}</Link></li></ul></div>
            <div className="mfeat"><div className="mflbl">{t('megaMenu.framework.featured.label')}</div><div className="mfitem"><div className="mftitle">{t('megaMenu.resources.documentation.specs')}</div><div className="mfdesc">{t('megaMenu.resources.subtitle')}</div></div></div>
          </div>

          <div className={activePanel==='about'?'mp active':'mp'} id="panel-about">
            <div className="mpt"><Link href="/en/about">{t('megaMenu.about.link')}</Link></div>
            <div className="mpd">{t('megaMenu.about.subtitle')}</div>
            <div className="mgroup"><div className="mgtitle">{t('megaMenu.about.whoWeAre.title')}</div><ul className="mlinks"><li><Link href="/en/about#mission">{t('megaMenu.about.whoWeAre.mission')}</Link></li><li><Link href="/en/about#principles">{t('megaMenu.about.whoWeAre.vincent')}</Link></li><li><Link href="/en/about#team">{t('megaMenu.about.whoWeAre.legal')}</Link></li></ul></div>
            <div className="mgroup"><div className="mgtitle">{t('megaMenu.about.howWeWork.title')}</div><ul className="mlinks"><li><Link href="/en/about#standards">{t('megaMenu.about.howWeWork.network')}</Link></li><li><Link href="/en/about#research">{t('megaMenu.about.howWeWork.audit')}</Link></li><li><Link href="/en/contact">{t('megaMenu.about.howWeWork.contact')}</Link></li></ul></div>
            <div className="mfeat"><div className="mflbl">{t('megaMenu.about.registered.label')}</div><div className="mfitem"><div className="mftitle">{t('megaMenu.about.registered.title')}</div><div className="mfdesc">{t('megaMenu.about.registered.description')}</div></div></div>
          </div>

          <div className={activePanel==='partners'?'mp active':'mp'} id="panel-partners">
            <div className="mpt"><Link href="/en/partners">{t('megaMenu.partners.link')}</Link></div>
            <div className="mpd">{t('megaMenu.partners.subtitle')}</div>
            <div className="mgroup"><div className="mgtitle">{t('megaMenu.partners.portal.title')}</div><ul className="mlinks"><li><Link href="/en/partners#technology">{t('megaMenu.partners.portal.login')}</Link></li><li><Link href="/en/partners#implementers">{t('megaMenu.partners.portal.dashboard')}</Link></li><li><Link href="/en/partners#auditors">{t('megaMenu.partners.portal.training')}</Link></li><li><Link href="/en/partners#resellers">{t('megaMenu.partners.portal.toolkit')}</Link></li></ul></div>
            <div className="mgroup"><div className="mgtitle">{t('megaMenu.partners.become.title')}</div><ul className="mlinks"><li><Link href="/en/partners#portal">{t('megaMenu.partners.become.apply')}</Link></li><li><Link href="/en/partners#benefits">{t('megaMenu.partners.become.tiers')}</Link></li><li><Link href="/en/partners/apply">{t('megaMenu.partners.become.certified')}</Link></li></ul></div>
            <div className="mfeat"><div className="mflbl">{t('megaMenu.framework.featured.label')}</div><div className="mfitem"><div className="mftitle">{t('megaMenu.partners.portal.title')}</div><div className="mfdesc">{t('megaMenu.partners.subtitle')}</div></div></div>
          </div>
        </div>
      </div>
    </>
  )
}
