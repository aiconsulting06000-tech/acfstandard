'use client'
import React from 'react'

type Props = { open: boolean; onClose: ()=>void }

export default function RegionSelector({open,onClose}:Props){
  return (
    <>
      <div className={open? 'rmo open':'rmo'} id="rmo" onClick={onClose}></div>
      <div className={open? 'rpanel open':'rpanel'} id="rpanel" role="dialog" aria-hidden={!open}>
        <div className="rphdr">
          <div className="rptitle">Select your region and language</div>
          <button className="rpclose" onClick={onClose}>✕ Close</button>
        </div>
        <div className="rpcols">
          <div>
            <div className="rpcol-title">Global</div>
            <a className="rpglobal" href="#" onClick={(e)=>{e.preventDefault();onClose()}}><span>🌐</span><span>Global (English)</span></a>
          </div>
          <div>
            <div className="rpcol-title">Europe, Middle East &amp; Africa</div>
            <ul className="rplinks">
              <li><a href="#" onClick={(e)=>{e.preventDefault();onClose()}}><span className="rpflag">🇫🇷</span>France <span className="rplang">(Français)</span></a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();onClose()}}><span className="rpflag">🇩🇪</span>DACH Region <span className="rplang">(Deutsch)</span></a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();onClose()}}><span className="rpflag">🇬🇧</span>United Kingdom <span className="rplang">(English)</span></a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();onClose()}}><span className="rpflag">🇪🇸</span>Spain <span className="rplang">(Español)</span></a></li>
            </ul>
          </div>
          <div>
            <div className="rpcol-title">North &amp; Latin America</div>
            <ul className="rplinks">
              <li><a href="#" onClick={(e)=>{e.preventDefault();onClose()}}><span className="rpflag">🇺🇸</span>United States <span className="rplang">(English)</span></a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();onClose()}}><span className="rpflag">🇨🇦</span>Canada <span className="rplang">(English/Français)</span></a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();onClose()}}><span className="rpflag">🇧🇷</span>Brazil <span className="rplang">(Português)</span></a></li>
            </ul>
          </div>
          <div>
            <div className="rpcol-title">Asia &amp; Pacific</div>
            <ul className="rplinks">
              <li><a href="#" onClick={(e)=>{e.preventDefault();onClose()}}><span className="rpflag">🇸🇬</span>Singapore <span className="rplang">(English)</span></a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();onClose()}}><span className="rpflag">🇯🇵</span>Japan <span className="rplang">(日本語)</span></a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();onClose()}}><span className="rpflag">🇦🇺</span>Australia <span className="rplang">(English)</span></a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
