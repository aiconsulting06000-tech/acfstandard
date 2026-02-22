'use client'
import React from 'react'
import Link from 'next/link'

type Props = { open: boolean; onClose: ()=>void; activePanel: string; setActivePanel: (p:string)=>void }

export default function MegaMenu({open,onClose,activePanel,setActivePanel}:Props){

  return (
    <>
      <div className={open? 'mo open':'mo'} onClick={onClose}></div>
      <div className={open? 'md open':'md'} id="megadrawer" role="dialog" aria-hidden={!open}>
        <button className="mclose" onClick={onClose}>×</button>
        <div className="ms">
          <div className={activePanel==='framework'?'mni active':'mni'} onClick={()=>setActivePanel('framework')}><span>Framework</span><span className="marr">›</span></div>
          <div className={activePanel==='products'?'mni active':'mni'} onClick={()=>setActivePanel('products')}><span>Products</span><span className="marr">›</span></div>
          <div className={activePanel==='resources'?'mni active':'mni'} onClick={()=>setActivePanel('resources')}><span>Resources</span><span className="marr">›</span></div>
          <div className={activePanel==='about'?'mni active':'mni'} onClick={()=>setActivePanel('about')}><span>About ACF</span><span className="marr">›</span></div>
          <div className={activePanel==='partners'?'mni active':'mni'} onClick={()=>setActivePanel('partners')}><span>Partners</span><span className="marr">›</span></div>
          <div className="muser">
            <div className="muname">Partner Access</div>
            <div className="mulinks">
              <Link href="/en/partners/login">🔐 Partner Login</Link>
              <Link href="/en/partners/apply">Apply to become Partner</Link>
              <Link href="/en/contact">Contact</Link>
            </div>
          </div>
        </div>

        <div className="mc">
          <div className={activePanel==='framework'?'mp active':'mp'} id="panel-framework">
            <div className="mpt"><Link href="/en/standard">ACF Standard →</Link></div>
            <div className="mpd">The definitive governance methodology for agentic systems in commercial environments.</div>
            <div className="mgroup"><div className="mgtitle">Architecture</div><ul className="mlinks"><li><Link href="/en/standard#principles">4 Founding Principles</Link></li><li><Link href="/en/standard#layers">4 Operational Layers</Link></li><li><Link href="/en/standard#maturity">4 Maturity Levels</Link></li></ul></div>
            <div className="mgroup"><div className="mgtitle">Methodology</div><ul className="mlinks"><li><Link href="/en/method">8 Implementation Modules</Link></li><li><Link href="/en/method#constitution">Agentic Constitution</Link></li><li><Link href="/en/method#dda">DDA Role Framework</Link></li><li><Link href="/en/method#killswitch">Kill Switch Protocol</Link></li></ul></div>
            <div className="mfeat"><div className="mflbl">FEATURED</div><div className="mfitem"><div className="mftitle">Download the ACF White Paper</div><div className="mfdesc">Full specification — free for registered users.</div></div><div className="mfitem"><div className="mftitle">ACF v1.0 — February 2026</div><div className="mfdesc">Official release. What's new in the framework.</div></div></div>
          </div>

          <div className={activePanel==='products'?'mp active':'mp'} id="panel-products">
            <div className="mpt"><Link href="/en/control">ACF Control →</Link></div>
            <div className="mpd">Real-time governance monitoring platform for autonomous agent operations.</div>
            <div className="mgroup"><div className="mgtitle">Features</div><ul className="mlinks"><li><Link href="/en/control#dashboard">Governance Dashboard</Link></li><li><Link href="/en/control#monitoring">18 KPI Monitoring</Link></li><li><Link href="/en/control#escalation">Adaptive Escalation</Link></li><li><Link href="/en/control#killswitch">Kill Switch Protocol</Link></li></ul></div>
            <div className="mgroup"><div className="mgtitle">Solutions</div><ul className="mlinks"><li><Link href="/en/control#enterprise">Enterprise Governance</Link></li><li><Link href="/en/control#compliance">Compliance Management</Link></li><li><Link href="/en/control#audit">Audit & Reporting</Link></li></ul></div>
            <div className="mfeat"><div className="mflbl">FEATURED</div><div className="mfitem"><div className="mftitle">ACF Control Demo</div><div className="mfdesc">See real-time governance in action.</div></div></div>
          </div>

          <div className={activePanel==='resources'?'mp active':'mp'} id="panel-resources">
            <div className="mpt"><Link href="/en/academy">ACF Academy →</Link></div>
            <div className="mpd">Training, certification, and knowledge resources for governance implementation.</div>
            <div className="mgroup"><div className="mgtitle">Learning</div><ul className="mlinks"><li><Link href="/en/academy#courses">Certification Courses</Link></li><li><Link href="/en/academy#webinars">Live Webinars</Link></li><li><Link href="/en/academy#documentation">Documentation</Link></li><li><Link href="/en/academy#guides">Implementation Guides</Link></li></ul></div>
            <div className="mgroup"><div className="mgtitle">Community</div><ul className="mlinks"><li><Link href="/en/blog">Blog & Insights</Link></li><li><Link href="/en/academy#events">Events & Workshops</Link></li><li><Link href="/en/contact">Support</Link></li></ul></div>
            <div className="mfeat"><div className="mflbl">FEATURED</div><div className="mfitem"><div className="mftitle">Get Certified</div><div className="mfdesc">Become an ACF governance expert.</div></div></div>
          </div>

          <div className={activePanel==='about'?'mp active':'mp'} id="panel-about">
            <div className="mpt"><Link href="/en/about">About ACF →</Link></div>
            <div className="mpd">The story, mission, and vision behind the Agentic Commerce Framework standard.</div>
            <div className="mgroup"><div className="mgtitle">Organization</div><ul className="mlinks"><li><Link href="/en/about#mission">Our Mission</Link></li><li><Link href="/en/about#principles">Core Principles</Link></li><li><Link href="/en/about#team">Leadership Team</Link></li><li><Link href="/en/about#advisory">Advisory Board</Link></li></ul></div>
            <div className="mgroup"><div className="mgtitle">Governance</div><ul className="mlinks"><li><Link href="/en/about#standards">Standards Development</Link></li><li><Link href="/en/about#research">Research & Innovation</Link></li><li><Link href="/en/contact">Get Involved</Link></li></ul></div>
            <div className="mfeat"><div className="mflbl">FEATURED</div><div className="mfitem"><div className="mftitle">White Paper</div><div className="mfdesc">Full specification and research foundations.</div></div></div>
          </div>

          <div className={activePanel==='partners'?'mp active':'mp'} id="panel-partners">
            <div className="mpt"><Link href="/en/partners">Partner Program →</Link></div>
            <div className="mpd">Join the ACF ecosystem as a technology partner, implementer, or auditor.</div>
            <div className="mgroup"><div className="mgtitle">Partnership Tiers</div><ul className="mlinks"><li><Link href="/en/partners#technology">Technology Partners</Link></li><li><Link href="/en/partners#implementers">Implementation Partners</Link></li><li><Link href="/en/partners#auditors">Certified Auditors</Link></li><li><Link href="/en/partners#resellers">Resellers</Link></li></ul></div>
            <div className="mgroup"><div className="mgtitle">Resources</div><ul className="mlinks"><li><Link href="/en/partners#portal">Partner Portal</Link></li><li><Link href="/en/partners#benefits">Program Benefits</Link></li><li><Link href="/en/partners/apply">Apply Now</Link></li></ul></div>
            <div className="mfeat"><div className="mflbl">FEATURED</div><div className="mfitem"><div className="mftitle">Partner Directory</div><div className="mfdesc">Find certified partners in your region.</div></div></div>
          </div>
        </div>
      </div>
    </>
  )
}
