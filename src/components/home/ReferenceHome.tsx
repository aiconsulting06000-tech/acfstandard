// @ts-nocheck
"use client"
import React, { useEffect } from 'react'

const ACF_CSS = `*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --navy:#050c1a;--navy2:#071122;--navy3:#0d1f3c;
  --gold:#c9a84c;--gold2:#e8c96a;--gold-dim:rgba(201,168,76,.14);--gold-glow:rgba(201,168,76,.35);
  --w:#fff;--gr:#6b7fa0;--gr2:#9db0c8;
  --bd:rgba(201,168,76,.2);--bd2:rgba(255,255,255,.07);
  --green:#22c55e;--green-glow:rgba(34,197,94,.4);
}
html{scroll-behavior:smooth}
body{background:var(--navy);color:var(--w);font-family:'Inter',sans-serif;line-height:1.6;overflow-x:hidden}
#neural{position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.5}

/* ═══ NAV ═══ */
nav{position:fixed;top:0;left:0;right:0;z-index:800;background:rgba(5,12,26,.92);backdrop-filter:blur(24px);border-bottom:1px solid var(--bd);height:72px;display:flex;align-items:center;transition:.3s}
nav.scrolled{background:rgba(5,12,26,.99);box-shadow:0 4px 40px rgba(0,0,0,.5)}
.nw{max-width:1400px;margin:0 auto;padding:0 32px;width:100%;display:flex;align-items:center;gap:20px}
.ham{display:flex;flex-direction:column;gap:5px;background:transparent;border:1px solid rgba(255,255,255,.15);padding:10px 12px;cursor:pointer;border-radius:6px;transition:.2s;flex-shrink:0}
.ham:hover{border-color:var(--gold)}
.ham span{display:block;width:20px;height:1.5px;background:var(--w);border-radius:1px}
.logo{display:flex;align-items:center;gap:12px;text-decoration:none}
.lb{width:38px;height:38px;background:var(--gold);border-radius:7px;display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:13px;color:var(--navy);flex-shrink:0}
.ln{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:14px;color:var(--w);line-height:1.2}
.ls{font-size:9.5px;color:var(--gold);letter-spacing:.1em;text-transform:uppercase}
.nr{display:flex;align-items:center;gap:12px;margin-left:auto}
.nlm{display:flex;align-items:center;gap:16px}
.nlm a{color:var(--gr2);text-decoration:none;font-size:13px;font-weight:500;transition:.2s}
.nlm a:hover{color:var(--gold)}
/* Region selector button */
.regionbtn{display:flex;align-items:center;gap:6px;background:transparent;border:1px solid var(--bd2);color:var(--gr2);padding:7px 12px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;font-family:'Inter',sans-serif;transition:.2s}
.regionbtn:hover{border-color:var(--bd);color:var(--gold)}
.regionbtn svg{opacity:.7}
.npart{background:transparent;border:1px solid var(--bd);color:var(--gold);padding:8px 14px;border-radius:6px;font-weight:600;font-size:12.5px;text-decoration:none;display:flex;align-items:center;gap:6px;transition:.2s;white-space:nowrap}
.npart:hover{background:var(--gold-dim)}
.ncta{background:var(--gold);color:var(--navy);padding:9px 18px;border-radius:6px;font-weight:700;font-size:12.5px;text-decoration:none;transition:.2s;white-space:nowrap}
.ncta:hover{background:var(--gold2);box-shadow:0 4px 20px var(--gold-glow)}

/* ═══ REGION SELECTOR PANEL ═══ */
.rmo{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:900;opacity:0;pointer-events:none;transition:.3s}
.rmo.open{opacity:1;pointer-events:all}
.rpanel{position:fixed;top:0;left:0;right:0;background:var(--w);color:#1a1a2e;z-index:901;padding:32px 60px 40px;transform:translateY(-100%);transition:transform .35s cubic-bezier(.16,1,.3,1);border-bottom:3px solid var(--gold)}
.rpanel.open{transform:translateY(0)}
.rphdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:28px;padding-bottom:16px;border-bottom:1px solid #e5e5e5}
.rptitle{font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:700;color:#1a1a2e}
.rpclose{background:transparent;border:none;font-size:22px;cursor:pointer;color:#666;line-height:1;transition:.2s}
.rpclose:hover{color:#1a1a2e}
.rpcols{display:grid;grid-template-columns:repeat(4,1fr);gap:40px}
.rpcol-title{font-family:'Space Grotesk',sans-serif;font-size:13px;font-weight:700;color:#1a1a2e;margin-bottom:14px;padding-bottom:8px;border-bottom:1px solid #eee}
.rplinks{list-style:none;display:flex;flex-direction:column;gap:9px}
.rplinks li{display:flex;align-items:center;gap:8px}
.rplinks a{color:#444;font-size:14px;text-decoration:none;transition:.2s;display:flex;align-items:center;gap:8px}
.rplinks a:hover{color:var(--gold)}
.rpflag{font-size:18px;line-height:1}
.rplang{font-size:12px;color:#888;margin-left:2px}
.rpglobal{display:flex;align-items:center;gap:8px;padding:10px 14px;background:#f5f5f0;border-radius:8px;margin-bottom:8px;cursor:pointer;text-decoration:none;transition:.2s}
.rpglobal:hover{background:#ede8d0}
.rpglobal span{font-weight:600;font-size:14px;color:#1a1a2e}

/* ═══ MEGA MENU ═══ */
.mo{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:850;opacity:0;pointer-events:none;transition:opacity .3s;backdrop-filter:blur(4px)}
.mo.open{opacity:1;pointer-events:all}
.md{position:fixed;top:0;left:0;height:100%;width:680px;max-width:95vw;background:var(--navy2);border-right:1px solid var(--bd);z-index:860;transform:translateX(-100%);transition:transform .35s cubic-bezier(.16,1,.3,1);display:flex}
.md.open{transform:translateX(0)}
.ms{width:220px;flex-shrink:0;background:var(--navy3);border-right:1px solid var(--bd);display:flex;flex-direction:column;padding-top:72px;overflow-y:auto}
.mclose{position:absolute;top:18px;left:18px;background:transparent;border:1px solid var(--bd2);color:var(--w);width:36px;height:36px;border-radius:6px;cursor:pointer;font-size:20px;display:flex;align-items:center;justify-content:center;z-index:10;transition:.2s;line-height:1}
.mclose:hover{border-color:var(--gold);color:var(--gold)}
.mni{display:flex;align-items:center;justify-content:space-between;padding:15px 22px;cursor:pointer;transition:.2s;border-left:3px solid transparent}
.mni:hover,.mni.active{background:var(--gold-dim);border-left-color:var(--gold)}
.mni span{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;color:var(--w)}
.mni.active span{color:var(--gold)}
.marr{color:var(--gr);font-size:11px}
.muser{margin-top:auto;padding:20px 22px;border-top:1px solid var(--bd2)}
.muname{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;color:var(--gold);letter-spacing:.08em;margin-bottom:8px}
.mulinks{display:flex;flex-direction:column;gap:6px}
.mulinks a{color:var(--gr);font-size:13px;text-decoration:none;transition:.2s}
.mulinks a:hover{color:var(--w)}
.mc{flex:1;padding:72px 32px 32px;overflow-y:auto}
.mp{display:none}.mp.active{display:block}
.mpt{font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:700;color:var(--w);margin-bottom:6px}
.mpt a{color:inherit;text-decoration:none;transition:.2s}
.mpt a:hover{color:var(--gold)}
.mpd{font-size:13px;color:var(--gr);margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--bd2)}
.mgroup{margin-bottom:20px}
.mgtitle{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;letter-spacing:.14em;color:var(--gold);margin-bottom:10px;text-transform:uppercase}
.mlinks{list-style:none;display:flex;flex-direction:column;gap:7px}
.mlinks a{color:var(--gr2);font-size:13.5px;text-decoration:none;transition:.2s;display:flex;align-items:center;gap:7px}
.mlinks a::before{content:'—';color:var(--gold);font-size:10px;opacity:0;transition:.2s;flex-shrink:0}
.mlinks a:hover{color:var(--w);padding-left:4px}
.mlinks a:hover::before{opacity:1}
.mfeat{background:var(--navy3);border:1px solid var(--bd);border-radius:10px;padding:16px;margin-top:20px}
.mflbl{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--gold);letter-spacing:.1em;margin-bottom:12px}
.mfitem{margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--bd2)}
.mfitem:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
.mftitle{font-weight:600;font-size:13.5px;margin-bottom:3px}
.mfdesc{font-size:12px;color:var(--gr);line-height:1.5}

/* ═══ HERO ═══ */
.hero{min-height:100vh;display:flex;align-items:center;position:relative;overflow:hidden;padding-top:72px}
.hgrid{position:absolute;inset:0;background-image:linear-gradient(rgba(201,168,76,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.05) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse 90% 80% at 50% 50%,black 20%,transparent 100%);-webkit-mask-image:radial-gradient(ellipse 90% 80% at 50% 50%,black 20%,transparent 100%)}
.hw{max-width:1320px;margin:0 auto;padding:100px 40px 80px;width:100%;position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
.hbadge{display:inline-flex;align-items:center;gap:8px;background:var(--gold-dim);border:1px solid var(--bd);padding:6px 14px;border-radius:100px;font-size:11px;color:var(--gold);letter-spacing:.1em;text-transform:uppercase;font-weight:600;margin-bottom:24px;font-family:'JetBrains Mono',monospace}
.bdot{width:6px;height:6px;background:var(--gold);border-radius:50%;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.hero h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(32px,4.2vw,64px);font-weight:800;line-height:1.08;letter-spacing:-.025em;margin-bottom:24px}
.hl1{display:block;color:var(--w)}
.hl2{display:block;color:var(--gold);min-height:1.15em}
.hl2::after{content:'';display:block;height:3px;width:55%;background:linear-gradient(90deg,var(--gold),transparent);margin-top:8px}
.tc{display:inline-block;width:3px;height:.8em;background:var(--gold);vertical-align:middle;margin-left:2px;animation:blink 1s infinite}
.hdesc{font-size:16px;color:var(--gr2);line-height:1.8;margin-bottom:36px;max-width:500px}
.hact{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:44px}
.btng{background:var(--gold);color:var(--navy);padding:14px 28px;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:.25s}
.btng:hover{background:var(--gold2);box-shadow:0 8px 30px var(--gold-glow);transform:translateY(-2px)}
.btno{background:transparent;color:var(--w);border:1px solid rgba(255,255,255,.18);padding:14px 28px;border-radius:8px;font-weight:600;font-size:14px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:.25s}
.btno:hover{border-color:var(--gold);color:var(--gold)}
.hstats{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--bd);border-radius:12px;overflow:hidden;background:rgba(13,31,60,.5)}
.hs{padding:18px 10px;text-align:center;border-right:1px solid var(--bd);transition:.3s}
.hs:last-child{border-right:none}
.hs:hover{background:var(--gold-dim)}
.hsn{font-family:'Space Grotesk',sans-serif;font-size:32px;font-weight:800;color:var(--gold);line-height:1}
.hsl{font-size:10px;color:var(--gr);margin-top:4px;font-family:'JetBrains Mono',monospace;letter-spacing:.03em;line-height:1.3}
.hvis{position:relative;height:520px;display:flex;align-items:center;justify-content:center}
#dc{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.orb{position:relative;z-index:5;width:160px;height:160px;flex-shrink:0}
.oring{position:absolute;inset:0;border-radius:50%;border:1.5px solid var(--gold);display:flex;align-items:center;justify-content:center;animation:orp 3s ease-in-out infinite}
.oring::before{content:'';position:absolute;inset:-10px;border-radius:50%;border:1px solid rgba(201,168,76,.22);animation:orp 3s ease-in-out infinite reverse}
@keyframes orp{0%,100%{box-shadow:0 0 20px rgba(201,168,76,.2)}50%{box-shadow:0 0 60px rgba(201,168,76,.6)}}
.ocore{width:118px;height:118px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#142a52,#0d1f3c);display:flex;flex-direction:column;align-items:center;justify-content:center}
.oacf{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:22px;color:var(--gold)}
.ostd{font-size:9px;color:var(--gr);letter-spacing:.14em;text-transform:uppercase;margin-top:2px}
.sat{position:absolute;z-index:6}
.sc{background:rgba(6,14,30,.95);border:1px solid rgba(201,168,76,.28);border-radius:10px;padding:11px 14px;display:flex;align-items:center;gap:10px;backdrop-filter:blur(12px);white-space:nowrap;box-shadow:0 8px 32px rgba(0,0,0,.4);transition:.3s}
.sc:hover{border-color:var(--gold);box-shadow:0 0 30px rgba(201,168,76,.2)}
.si{width:32px;height:32px;border-radius:7px;background:var(--gold-dim);border:1px solid var(--bd);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sn{font-size:13px;font-weight:700}
.ss{font-size:10.5px;color:var(--gr);margin-top:1px}
.stop{top:4%;left:50%;transform:translateX(-50%)}
.sright{top:50%;right:0;transform:translateY(-50%)}
.sbott{bottom:4%;left:50%;transform:translateX(-50%)}
.sleft{top:50%;left:0;transform:translateY(-50%)}
.gi{display:flex;align-items:center;justify-content:center;width:14px;height:14px}

/* ═══ STATS BAR ═══ */
.sbar{background:var(--navy3);border-top:1px solid var(--bd);border-bottom:1px solid var(--bd);position:relative;z-index:1}
.sgrid{max-width:1320px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr)}
.sc2{padding:36px 20px;text-align:center;border-right:1px solid var(--bd);transition:.3s}
.sc2:last-child{border-right:none}
.sc2:hover{background:rgba(201,168,76,.04)}
.scw{display:flex;align-items:baseline;justify-content:center;gap:2px}
.ctr{font-family:'Space Grotesk',sans-serif;font-size:48px;font-weight:800;color:var(--gold);line-height:1}
.csuf{font-family:'Space Grotesk',sans-serif;font-size:28px;font-weight:700;color:var(--gold)}
.slbl{font-size:12px;color:var(--gr);margin-top:8px;font-family:'JetBrains Mono',monospace;letter-spacing:.04em}

/* ═══ SECTIONS ═══ */
section{padding:100px 0;position:relative;z-index:1}
.ctn{max-width:1320px;margin:0 auto;padding:0 40px}
.ew{font-size:15px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:14px;display:block;font-family:'JetBrains Mono',monospace}
.st{font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,3.5vw,46px);font-weight:800;line-height:1.1;letter-spacing:-.02em;margin-bottom:18px}
.sd{font-size:16px;color:var(--gr2);max-width:580px;line-height:1.75}
.gb{width:44px;height:3px;background:linear-gradient(90deg,var(--gold),transparent);margin:14px 0 28px}
.rev{opacity:0;transform:translateY(26px);transition:all .7s cubic-bezier(.16,1,.3,1)}
.rev.vis{opacity:1;transform:translateY(0)}
.d1{transition-delay:.08s}.d2{transition-delay:.18s}.d3{transition-delay:.28s}.d4{transition-delay:.38s}
.secdark{background:var(--navy2)}

/* ═══ PRINCIPLES ═══ */
.pgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:2px;margin-top:60px}
.pcard{background:var(--navy3);padding:52px;transition:.3s;position:relative;overflow:hidden}
.pcard::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--gold),rgba(201,168,76,.2),transparent);transform:scaleX(0);transform-origin:left;transition:.4s}
.pcard:hover::before{transform:scaleX(1)}
.pcard:hover{background:#081728}
.pnw{display:flex;align-items:baseline;gap:12px;margin-bottom:24px}
.pnum{font-family:'Space Grotesk',sans-serif;font-size:72px;font-weight:900;color:var(--gold);line-height:1}
.pnl{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--gold);letter-spacing:.1em;opacity:.6}
.pt{font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:700;margin-bottom:14px}
.pd{font-size:14.5px;color:var(--gr);line-height:1.75}
.ptag{display:inline-flex;margin-top:20px;padding:5px 12px;background:var(--gold-dim);border:1px solid var(--bd);border-radius:100px;font-size:11px;color:var(--gold);letter-spacing:.07em;font-weight:700;font-family:'JetBrains Mono',monospace}

/* ═══ LAYERS ═══ */
.lgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:60px}
.lcard{background:var(--navy3);border:1px solid var(--bd2);border-radius:12px;padding:36px 28px;transition:.3s;position:relative;overflow:hidden}
.lcard::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,rgba(201,168,76,.07),transparent 70%);opacity:0;transition:.3s}
.lcard:hover{border-color:var(--gold);transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,0,0,.3)}
.lcard:hover::after{opacity:1}
.lico{width:44px;height:44px;border-radius:10px;border:1px solid var(--bd);background:var(--gold-dim);display:flex;align-items:center;justify-content:center;margin-bottom:22px}
.lnum{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--gold);letter-spacing:.1em;margin-bottom:10px}
.lt{font-family:'Space Grotesk',sans-serif;font-size:17px;font-weight:700;margin-bottom:10px}
.ld{font-size:13.5px;color:var(--gr);line-height:1.65}

/* ═══ MATURITY ═══ */
.matwrap{margin-top:70px;position:relative}
.mattrack{display:grid;grid-template-columns:repeat(4,1fr);position:relative}
.matlinebg,.matlinefg{position:absolute;top:12px;height:2px;border-radius:1px;left:calc(12.5% + 12px);right:calc(12.5% + 12px)}
.matlinebg{background:rgba(201,168,76,.2);z-index:0}
.matlinefg{background:var(--green);box-shadow:0 0 8px var(--green-glow);z-index:1;width:0;transition:width 1.6s cubic-bezier(.16,1,.3,1)}
.matlinefg.go{width:calc(62.5% - 0px)}
.matcol{padding:0 16px;text-align:center;position:relative;z-index:2}
.dotw{display:flex;justify-content:center;margin-bottom:20px;height:24px;align-items:center}
.dot{width:24px;height:24px;border-radius:50%;border:2px solid rgba(201,168,76,.3);background:var(--navy2);transition:all .6s}
.matcol.da .dot{border-color:var(--gold);background:rgba(201,168,76,.2)}
.matcol.dg .dot{border-color:var(--green)!important;background:var(--green)!important;box-shadow:0 0 20px var(--green-glow)}
.mlvl{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--gold);font-weight:700;letter-spacing:.12em;margin-bottom:8px}
.mname{font-family:'Space Grotesk',sans-serif;font-size:17px;font-weight:700;margin-bottom:10px}
.risk{display:inline-block;padding:4px 12px;border-radius:100px;font-size:11px;font-weight:700;margin-bottom:12px}
.rl{background:rgba(34,197,94,.08);color:#4ade80;border:1px solid rgba(34,197,94,.2)}
.rm{background:rgba(34,197,94,.12);color:#22c55e;border:1px solid rgba(34,197,94,.3)}
.rh{background:rgba(239,68,68,.08);color:#f87171;border:1px solid rgba(239,68,68,.2)}
.mdesc{font-size:13px;color:var(--gr);line-height:1.65}
.tbadge{display:inline-flex;align-items:center;gap:5px;margin-top:12px;font-size:12px;color:var(--green);font-weight:700;font-family:'JetBrains Mono',monospace}

/* ═══ HEX PATH ═══ */
.hexsec{padding:100px 0;background:var(--navy2)}
.hextrack{margin-top:70px;position:relative;overflow:hidden}
.hexrow{display:flex;align-items:center;justify-content:center;position:relative}
/* the horizontal spine line */
.hexrow::before{content:'';position:absolute;top:50%;left:80px;right:80px;height:3px;background:linear-gradient(90deg,rgba(201,168,76,.08),rgba(201,168,76,.25),rgba(201,168,76,.08));border-radius:2px;z-index:0}
.hexrow.rev::before{background:linear-gradient(270deg,rgba(201,168,76,.08),rgba(201,168,76,.25),rgba(201,168,76,.08))}
/* turn connector row */
.hxturnrow{display:flex;justify-content:flex-end;padding-right:calc(12.5% - 0px);margin:8px 0}
.hxturnrow.left{justify-content:flex-start;padding-right:0;padding-left:calc(12.5% - 0px)}
.hxturn{width:3px;height:64px;background:linear-gradient(180deg,rgba(201,168,76,.25),rgba(201,168,76,.08));border-radius:2px;position:relative}
.hxturn::after{content:'↓';position:absolute;bottom:-28px;left:50%;transform:translateX(-50%);color:var(--gold);font-size:18px;opacity:.6;font-weight:700}
/* each hex item */
.hxitem{display:flex;flex-direction:column;align-items:center;width:200px;flex-shrink:0;position:relative;z-index:2}
.hxitem.alt{flex-direction:column-reverse}
.hxlabel{width:170px;text-align:center;padding:12px 0}
.hxmod{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--gold);letter-spacing:.12em;margin-bottom:5px}
.hxname{font-family:'Space Grotesk',sans-serif;font-size:13.5px;font-weight:700;margin-bottom:5px;line-height:1.3;color:var(--w)}
.hxdesc{font-size:11.5px;color:var(--gr);line-height:1.5}
/* the dot connecting label to hex */
.hxdot{width:6px;height:6px;border-radius:50%;background:var(--gold);flex-shrink:0;margin:2px auto;box-shadow:0 0 8px var(--gold-glow)}
.hxstem{width:1.5px;height:20px;background:linear-gradient(180deg,var(--gold),rgba(201,168,76,.1));margin:0 auto}
/* Hexagon */
.hxhex{
  width:88px;height:102px;
  background:var(--navy3);
  clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;
  position:relative;cursor:default;transition:all .35s;flex-shrink:0
}
.hxhex::before{
  content:'';position:absolute;inset:-2.5px;
  background:linear-gradient(135deg,rgba(201,168,76,.5),rgba(201,168,76,.1),rgba(201,168,76,.4));
  clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);
  z-index:-1;transition:all .35s
}
.hxhex:hover{transform:scale(1.1);filter:brightness(1.2)}
.hxhex:hover::before{background:linear-gradient(135deg,rgba(201,168,76,.9),rgba(201,168,76,.4),rgba(201,168,76,.8))}
.hxnum{font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:900;color:var(--gold);line-height:1}
.hxico svg{opacity:.8}
/* Animate gold dot flowing along spine */
.hxflow-dot{position:absolute;width:8px;height:8px;background:var(--gold);border-radius:50%;top:50%;transform:translateY(-50%);box-shadow:0 0 10px var(--gold-glow);animation:hxflow 3s linear infinite;z-index:3}
@keyframes hxflow{0%{left:80px;opacity:0}5%{opacity:1}95%{opacity:1}100%{right:80px;left:calc(100% - 80px);opacity:0}}
.hxflow-dot.rev{animation:hxflowrev 3s linear infinite}
@keyframes hxflowrev{0%{right:80px;left:auto;opacity:0}5%{opacity:1}95%{opacity:1}100%{right:calc(100% - 80px);opacity:0}}

/* ═══ VIDEO SECTION ═══ */
.videosec{background:var(--navy3);border-top:1px solid var(--bd);border-bottom:1px solid var(--bd)}
.videogrid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
.vdesc{font-size:15.5px;color:var(--gr2);line-height:1.8}
.vquote{display:flex;gap:18px;margin-top:32px;align-items:flex-start}
.vqline{width:3px;background:var(--gold);border-radius:2px;flex-shrink:0;min-height:70px}
.vqbody{}
.vqtext{font-size:16px;color:var(--w);line-height:1.7;font-style:italic;margin-bottom:10px}
.vqauthor{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--gold);letter-spacing:.08em}
.videobox{position:relative}
.vplayer{position:relative;width:100%;aspect-ratio:16/9;border-radius:14px;overflow:hidden;cursor:pointer;background:var(--navy);border:1px solid var(--bd)}
.vthumbnail{position:absolute;inset:0;background:linear-gradient(135deg,#0d1f3c 0%,#050c1a 60%,#0a1628 100%);display:flex;flex-direction:column;align-items:center;justify-content:center}
.vtgrid{position:absolute;inset:0;background-image:linear-gradient(rgba(201,168,76,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.04) 1px,transparent 1px);background-size:40px 40px}
.vtcontent{position:relative;z-index:2;text-align:center;padding:32px}
.vtbadge{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;color:var(--gold);margin-bottom:16px;border:1px solid var(--bd);padding:6px 14px;border-radius:100px;display:inline-block}
.vtname{font-family:'Space Grotesk',sans-serif;font-size:26px;font-weight:800;color:var(--w);margin-bottom:6px}
.vtrole{font-size:13px;color:var(--gr2)}
.vtframes{position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--gold),var(--gold2),var(--gold));opacity:.4}
.vplaybtn{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:3;transition:.3s}
.vplayer:hover .vplaybtn{background:rgba(0,0,0,.15)}
.vplayring{width:72px;height:72px;border-radius:50%;background:var(--gold);display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 12px rgba(201,168,76,.2);transition:.3s}
.vplayer:hover .vplayring{transform:scale(1.1);box-shadow:0 0 0 18px rgba(201,168,76,.15)}
.vduration{position:absolute;bottom:14px;right:16px;background:rgba(0,0,0,.7);color:var(--w);font-size:12px;font-family:'JetBrains Mono',monospace;padding:3px 8px;border-radius:4px;z-index:3}
.vstats{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;margin-top:2px;background:var(--bd)}
.vstat{background:var(--navy2);padding:14px 10px;text-align:center}
.vsn{display:block;font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:800;color:var(--gold)}
.vsl{display:block;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--gr);margin-top:2px}

/* ═══ PRODUCTS ═══ */
.prodgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:60px}
.pc{background:var(--navy3);padding:52px 44px;transition:.3s;position:relative;overflow:hidden}
.pc::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--gold),var(--gold2));transform:scaleX(0);transform-origin:left;transition:.4s cubic-bezier(.16,1,.3,1)}
.pc:hover::after{transform:scaleX(1)}
.pc:hover{background:#071520}
.piw{width:52px;height:52px;border-radius:12px;background:var(--gold-dim);border:1px solid var(--bd);display:flex;align-items:center;justify-content:center;margin-bottom:22px;transition:.3s}
.pc:hover .piw{background:var(--gold)}
.plbl{font-family:'JetBrains Mono',monospace;font-size:10.5px;color:var(--gold);letter-spacing:.12em;text-transform:uppercase;margin-bottom:10px}
.ptitle{font-family:'Space Grotesk',sans-serif;font-size:27px;font-weight:800;margin-bottom:14px}
.pdesc{font-size:14.5px;color:var(--gr2);line-height:1.75;margin-bottom:22px}
.pfeat{list-style:none;display:flex;flex-direction:column;gap:7px;margin-bottom:22px}
.pfeat li{font-size:13px;color:var(--gr);display:flex;align-items:center;gap:8px}
.pfeat li::before{content:'';display:block;width:14px;height:1px;background:var(--gold);flex-shrink:0}
.plink{display:inline-flex;align-items:center;gap:8px;color:var(--gold);font-weight:700;font-size:14px;text-decoration:none;font-family:'JetBrains Mono',monospace;transition:gap .2s}
.plink:hover{gap:14px}

/* ═══ BLOG ═══ */
.bgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:60px}
.bcard{background:var(--navy3);border:1px solid var(--bd2);border-radius:12px;overflow:hidden;transition:.3s;text-decoration:none;color:var(--w);display:block}
.bcard:hover{border-color:var(--bd);transform:translateY(-5px);box-shadow:0 20px 50px rgba(0,0,0,.4)}
.bimg{height:200px;position:relative;overflow:hidden;background:var(--navy2)}
.bimg img{width:100%;height:100%;object-fit:cover;filter:brightness(.6) saturate(.7);transition:.5s}
.bcard:hover .bimg img{transform:scale(1.06);filter:brightness(.4) saturate(.5)}
.bovl{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(5,12,26,.85))}
.bcat{position:absolute;bottom:12px;left:14px;z-index:2;padding:4px 10px;background:rgba(5,12,26,.7);border:1px solid var(--bd);border-radius:4px;font-size:10px;color:var(--gold);letter-spacing:.1em;text-transform:uppercase;font-weight:700;font-family:'JetBrains Mono',monospace}
.bbody{padding:24px}
.btitle{font-family:'Space Grotesk',sans-serif;font-size:17px;font-weight:700;line-height:1.35;margin-bottom:10px}
.bexc{font-size:13.5px;color:var(--gr);line-height:1.65;margin-bottom:18px}
.bmeta{display:flex;align-items:center;justify-content:space-between}
.bdate{font-size:11.5px;color:var(--gr);font-family:'JetBrains Mono',monospace}
.bread{font-size:13px;color:var(--gold);font-weight:700}

/* ═══ CTA ═══ */
.ctasec{background:var(--navy3);border-top:1px solid var(--bd);border-bottom:1px solid var(--bd);padding:120px 0;text-align:center;position:relative;overflow:hidden}
.ctawm{position:absolute;font-family:'Space Grotesk',sans-serif;font-size:160px;font-weight:900;color:rgba(201,168,76,.025);top:50%;left:50%;transform:translate(-50%,-50%);white-space:nowrap;pointer-events:none}
.ctain{position:relative;z-index:1}
.ctasec h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,4vw,52px);font-weight:800;margin-bottom:18px;letter-spacing:-.02em}
.ctasec p{font-size:17px;color:var(--gr2);margin:0 auto 40px;max-width:540px;line-height:1.75}
.ctabtns{display:flex;justify-content:center;gap:14px;flex-wrap:wrap}

/* ═══ FOOTER ═══ */
footer{background:var(--navy2);border-top:1px solid var(--bd);padding:80px 0 36px}
.fgrid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:56px;margin-bottom:56px}
.fdesc{color:var(--gr);font-size:14px;line-height:1.75;margin-top:14px;max-width:270px}
.ftitle{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:18px}
.flinks{list-style:none;display:flex;flex-direction:column;gap:10px}
.flinks a{color:var(--gr);font-size:14px;text-decoration:none;transition:.2s}
.flinks a:hover{color:var(--w)}
.fbot{border-top:1px solid var(--bd2);padding-top:28px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
.fcopy{font-size:12px;color:var(--gr);font-family:'JetBrains Mono',monospace}
.flegal{display:flex;gap:20px}
.flegal a{font-size:12px;color:var(--gr);text-decoration:none}
.flegal a:hover{color:var(--gold)}

/* ═══ AI WIDGET ═══ */
.aibtn{position:fixed;bottom:28px;right:28px;z-index:700;display:flex;align-items:center;gap:10px;background:var(--gold);border:none;border-radius:100px;padding:14px 22px;cursor:pointer;box-shadow:0 8px 32px var(--gold-glow);transition:.3s;font-family:'Inter',sans-serif}
.aibtn:hover{background:var(--gold2);transform:translateY(-2px)}
.aidonline{width:8px;height:8px;background:var(--green);border-radius:50%;animation:pulse 2s infinite;flex-shrink:0}
.aiblabel strong{font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;color:var(--navy);display:block}
.aiblabel span{font-size:10px;font-family:'JetBrains Mono',monospace;color:var(--navy);opacity:.7}
.aimodal{position:fixed;inset:0;z-index:1000;display:none;align-items:center;justify-content:center}
.aimodal.open{display:flex}
.aimodalbg{position:absolute;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(6px)}
.aimodalbox{position:relative;z-index:1;background:var(--w);color:var(--navy);border-radius:20px;width:800px;max-width:95vw;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;animation:modin .3s cubic-bezier(.16,1,.3,1)}
@keyframes modin{from{opacity:0;transform:scale(.95) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
.aimodalhdr{padding:32px 40px 0;text-align:center;position:relative}
.aimclose{position:absolute;top:20px;right:24px;background:transparent;border:none;font-size:24px;cursor:pointer;color:#999;line-height:1;transition:.2s}
.aimclose:hover{color:var(--navy)}
.aimbeta{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.12em;color:#666;margin-bottom:8px}
.aimtitle{font-family:'Space Grotesk',sans-serif;font-size:36px;font-weight:800;color:var(--navy);margin-bottom:4px;display:flex;align-items:center;justify-content:center;gap:10px}
.aimtitle span{color:var(--gold)}
.aimsub{font-size:15px;color:#555;margin-bottom:28px}
.aiminpwrap{position:relative;padding:0 40px 20px}
.aiminp{width:100%;border:2px solid var(--navy);border-radius:12px;padding:18px 56px 18px 22px;font-size:16px;font-family:'Inter',sans-serif;outline:none;color:var(--navy);background:var(--w);transition:.2s}
.aiminp:focus{border-color:var(--gold)}
.aiminp::placeholder{color:#999}
.aimsend{position:absolute;right:56px;top:50%;transform:translateY(-50%);background:transparent;border:none;cursor:pointer;color:#999;transition:.2s;padding:4px}
.aimsend:hover{color:var(--gold)}
.aimtrend{padding:0 40px 24px}
.aimtlabel{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;letter-spacing:.1em;color:#666;margin-bottom:12px;display:flex;align-items:center;gap:8px}
.aimtlabel::before{content:'★';color:var(--gold)}
.aimqs{display:flex;gap:10px;overflow-x:auto;padding-bottom:8px}
.aimqs::-webkit-scrollbar{height:3px}
.aimqs::-webkit-scrollbar-thumb{background:#ddd;border-radius:2px}
.aimq{border:1px solid #ddd;border-radius:10px;padding:12px 16px;font-size:13px;cursor:pointer;transition:.2s;background:var(--w);color:var(--navy);font-family:'Inter',sans-serif;flex-shrink:0;text-align:left;line-height:1.4;max-width:200px}
.aimq:hover{border-color:var(--gold);color:var(--gold)}
.aimdiscl{padding:16px 40px;border-top:1px solid #eee;font-size:11.5px;color:#888;text-align:center;line-height:1.5}
.aimdiscl a{color:var(--navy);font-weight:700;text-decoration:none}
.aimmsgs{padding:0 40px 16px;display:none;flex-direction:column;gap:10px;max-height:280px;overflow-y:auto}
.aimmsgs.show{display:flex}
.aimmsg{padding:12px 16px;border-radius:10px;font-size:14px;line-height:1.65;max-width:80%}
.aimmsgb{background:#f0f4f8;color:var(--navy);align-self:flex-start}
.aimmsgu{background:var(--navy3);color:var(--w);align-self:flex-end}
.aimtyp{display:flex;gap:4px;align-items:center;padding:12px 16px;align-self:flex-start}
.aimtyp span{width:6px;height:6px;background:var(--gold);border-radius:50%;animation:tdots 1.2s infinite}
.aimtyp span:nth-child(2){animation-delay:.2s}
.aimtyp span:nth-child(3){animation-delay:.4s}
@keyframes tdots{0%,100%{transform:translateY(0);opacity:.5}50%{transform:translateY(-4px);opacity:1}}

/* ═══ RESPONSIVE ═══ */
@media(max-width:1024px){
  .hw{grid-template-columns:1fr;gap:48px;padding:80px 32px 60px}
  .hvis{height:360px}
  .lgrid{grid-template-columns:repeat(2,1fr)}
  .prodgrid{grid-template-columns:1fr}
  .bgrid{grid-template-columns:repeat(2,1fr)}
  .fgrid{grid-template-columns:1fr 1fr;gap:36px}
  .sgrid{grid-template-columns:repeat(2,1fr)}
  .pgrid{grid-template-columns:1fr}
  .videogrid{grid-template-columns:1fr}
  .nlm{display:none}
  .hexrow,.hexrow.rev{flex-wrap:wrap;gap:12px}
  .hexrow::before,.hexrow.rev::before{display:none}
  .hxflow-dot{display:none}
  .hxitem{width:160px}
}
@media(max-width:768px){
  .nw{padding:0 20px}
  .hw{padding:60px 20px 48px}
  .lgrid{grid-template-columns:1fr}
  .bgrid{grid-template-columns:1fr}
  section{padding:64px 0}
  .ctn{padding:0 20px}
  .fgrid{grid-template-columns:1fr;gap:28px}
  .fbot{flex-direction:column;text-align:center}
  .mattrack{grid-template-columns:1fr 1fr;gap:20px}
  .matlinebg,.matlinefg{display:none}
  .ctasec{padding:80px 0}
  .aibtn{right:16px;bottom:16px;padding:12px 16px}
  .aiblabel span{display:none}
  .hstats{grid-template-columns:repeat(2,1fr)}
  .hs:nth-child(2){border-right:none}
  .hs:nth-child(3){border-top:1px solid var(--bd)}
  .hs:nth-child(4){border-top:1px solid var(--bd);border-right:none}
  .md{width:100%}
  .ms{width:180px}
  .ctr{font-size:36px}
  .sgrid{grid-template-columns:repeat(2,1fr)}
  .sc2:nth-child(2){border-right:none}
  .sc2:nth-child(3){border-top:1px solid var(--bd)}
  .sc2:nth-child(4){border-top:1px solid var(--bd);border-right:none}
  .rpcols{grid-template-columns:1fr 1fr}
  .rpanel{padding:24px}
  .regionbtn span{display:none}
}
@media(max-width:480px){
  .hact{flex-direction:column}
  .btng,.btno{width:100%;justify-content:center}
  .pnum{font-size:52px}
  .pc{padding:36px 28px}
  .mattrack{grid-template-columns:1fr}
  .rpcols{grid-template-columns:1fr}
}`

const ACF_HTML = `<canvas id="neural"></canvas>

<!-- REGION PANEL OVERLAY -->
<div class="rmo" id="rmo" onclick="closeRegion()"></div>
<div class="rpanel" id="rpanel">
  <div class="rphdr">
    <div class="rptitle">Select your region and language</div>
    <button class="rpclose" onclick="closeRegion()">✕ Close</button>
  </div>
  <div class="rpcols">
    <div>
      <div class="rpcol-title">Global</div>
      <a class="rpglobal" href="#" onclick="closeRegion()"><span>🌐</span><span>Global (English)</span></a>
    </div>
    <div>
      <div class="rpcol-title">Europe, Middle East &amp; Africa</div>
      <ul class="rplinks">
        <li><a href="#" onclick="closeRegion()"><span class="rpflag">🇫🇷</span>France <span class="rplang">(Français)</span></a></li>
        <li><a href="#" onclick="closeRegion()"><span class="rpflag">🇩🇪</span>DACH Region <span class="rplang">(Deutsch)</span></a></li>
        <li><a href="#" onclick="closeRegion()"><span class="rpflag">🇬🇧</span>United Kingdom <span class="rplang">(English)</span></a></li>
        <li><a href="#" onclick="closeRegion()"><span class="rpflag">🇪🇸</span>Spain <span class="rplang">(Español)</span></a></li>
        <li><a href="#" onclick="closeRegion()"><span class="rpflag">🇧🇪</span>Belgium <span class="rplang">(Français)</span></a></li>
        <li><a href="#" onclick="closeRegion()"><span class="rpflag">🇨🇭</span>Switzerland <span class="rplang">(Français)</span></a></li>
      </ul>
    </div>
    <div>
      <div class="rpcol-title">North &amp; Latin America</div>
      <ul class="rplinks">
        <li><a href="#" onclick="closeRegion()"><span class="rpflag">🇺🇸</span>United States <span class="rplang">(English)</span></a></li>
        <li><a href="#" onclick="closeRegion()"><span class="rpflag">🇨🇦</span>Canada <span class="rplang">(English/Français)</span></a></li>
        <li><a href="#" onclick="closeRegion()"><span class="rpflag">🇧🇷</span>Brazil <span class="rplang">(Português)</span></a></li>
        <li><a href="#" onclick="closeRegion()"><span class="rpflag">🇲🇽</span>Mexico <span class="rplang">(Español)</span></a></li>
      </ul>
    </div>
    <div>
      <div class="rpcol-title">Asia &amp; Pacific</div>
      <ul class="rplinks">
        <li><a href="#" onclick="closeRegion()"><span class="rpflag">🇸🇬</span>Singapore <span class="rplang">(English)</span></a></li>
        <li><a href="#" onclick="closeRegion()"><span class="rpflag">🇯🇵</span>Japan <span class="rplang">(日本語)</span></a></li>
        <li><a href="#" onclick="closeRegion()"><span class="rpflag">🇦🇺</span>Australia <span class="rplang">(English)</span></a></li>
        <li><a href="#" onclick="closeRegion()"><span class="rpflag">🇰🇷</span>Korea <span class="rplang">(한국어)</span></a></li>
      </ul>
    </div>
  </div>
</div>

<!-- NAV -->
<nav id="nav">
  <div class="nw">
    <button class="ham" id="hambtn" aria-label="Menu"><span></span><span></span><span></span></button>
    <a href="/" class="logo">
      <div class="lb">ACF</div>
      <div><div class="ln">Agentic Commerce Framework®</div><div class="ls">Global Standard for AI Governance</div></div>
    </a>
    <div class="nr">
      <div class="nlm">
        <a href="/standard">Standard</a>
        <a href="/control">ACF Control</a>
        <a href="/blog">Blog</a>
      </div>
      <!-- Region selector Bain-style -->
      <button class="regionbtn" id="regionbtn" onclick="openRegion()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
        <span>GLOBAL | EN</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <a href="/partners/login" class="npart">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z"/></svg>
        Partners
      </a>
      <a href="/contact" class="ncta">Request Assessment</a>
    </div>
  </div>
</nav>

<!-- MEGA MENU -->
<div class="mo" id="mo" onclick="closeMega()"></div>
<div class="md" id="megadrawer">
  <button class="mclose" onclick="closeMega()">×</button>
  <div class="ms">
    <div class="mni active" data-panel="framework" onclick="showPanel('framework')"><span>Framework</span><span class="marr">›</span></div>
    <div class="mni" data-panel="products" onclick="showPanel('products')"><span>Products</span><span class="marr">›</span></div>
    <div class="mni" data-panel="resources" onclick="showPanel('resources')"><span>Resources</span><span class="marr">›</span></div>
    <div class="mni" data-panel="about" onclick="showPanel('about')"><span>About ACF</span><span class="marr">›</span></div>
    <div class="mni" data-panel="partners" onclick="showPanel('partners')"><span>Partners</span><span class="marr">›</span></div>
    <div class="muser">
      <div class="muname">Partner Access</div>
      <div class="mulinks">
        <a href="/partners/login">🔐 Partner Login</a>
        <a href="/partners/apply">Apply to become Partner</a>
        <a href="/contact">Contact</a>
      </div>
    </div>
  </div>
  <div class="mc">
    <div class="mp active" id="panel-framework">
      <div class="mpt"><a href="/standard">ACF Standard →</a></div>
      <div class="mpd">The definitive governance methodology for agentic systems in commercial environments.</div>
      <div class="mgroup"><div class="mgtitle">Architecture</div><ul class="mlinks"><li><a href="/standard#principles">4 Founding Principles</a></li><li><a href="/standard#layers">4 Operational Layers</a></li><li><a href="/standard#maturity">4 Maturity Levels</a></li></ul></div>
      <div class="mgroup"><div class="mgtitle">Methodology</div><ul class="mlinks"><li><a href="/method">8 Implementation Modules</a></li><li><a href="/method#constitution">Agentic Constitution</a></li><li><a href="/method#dda">DDA Role Framework</a></li><li><a href="/method#killswitch">Kill Switch Protocol</a></li></ul></div>
      <div class="mfeat"><div class="mflbl">FEATURED</div><div class="mfitem"><div class="mftitle">Download the ACF White Paper</div><div class="mfdesc">Full specification — free for registered users.</div></div><div class="mfitem"><div class="mftitle">ACF v1.0 — February 2026</div><div class="mfdesc">Official release. What's new in the framework.</div></div></div>
    </div>
    <div class="mp" id="panel-products">
      <div class="mpt"><a href="/products">Products →</a></div>
      <div class="mpd">Three tools operationalizing the ACF Standard across your organization.</div>
      <div class="mgroup"><div class="mgtitle">Diagnostic</div><ul class="mlinks"><li><a href="https://acf-score.com">ACF Score — Sovereignty Metric</a></li><li><a href="/score#methodology">Scoring Methodology</a></li><li><a href="/score#axes">6 Governance Axes</a></li></ul></div>
      <div class="mgroup"><div class="mgtitle">SaaS Platform</div><ul class="mlinks"><li><a href="/control">ACF Control — Governance Dashboard</a></li><li><a href="/control#kpis">18 Sovereignty KPIs</a></li><li><a href="/control#gating">Adaptive Gating System</a></li></ul></div>
      <div class="mgroup"><div class="mgtitle">Certification</div><ul class="mlinks"><li><a href="/certification">ACF Certification Program</a></li><li><a href="/certification#levels">Certification Levels</a></li><li><a href="/certification#process">Audit Process</a></li></ul></div>
    </div>
    <div class="mp" id="panel-resources">
      <div class="mpt"><a href="/blog">Resources →</a></div>
      <div class="mpd">Governance insights, research and technical documentation.</div>
      <div class="mgroup"><div class="mgtitle">Latest Insights</div><ul class="mlinks"><li><a href="/blog/ai-act">EU AI Act &amp; Agentic Systems</a></li><li><a href="/blog/dda">The DDA Role Explained</a></li><li><a href="/blog/kill-switch">Designing a 3-Level Kill Switch</a></li></ul></div>
      <div class="mgroup"><div class="mgtitle">Documentation</div><ul class="mlinks"><li><a href="/docs">Technical Specifications</a></li><li><a href="/research">Research Papers</a></li><li><a href="/academy">ACF Academy</a></li></ul></div>
    </div>
    <div class="mp" id="panel-about">
      <div class="mpt"><a href="/about">About ACF →</a></div>
      <div class="mpd">The story, mission, and legal protection behind the Agentic Commerce Framework®.</div>
      <div class="mgroup"><div class="mgtitle">Who We Are</div><ul class="mlinks"><li><a href="/about#vincent">Vincent DORANGE — Creator</a></li><li><a href="/about#mission">Mission &amp; Values</a></li><li><a href="/about#legal">Legal Protection (INPI)</a></li></ul></div>
      <div class="mgroup"><div class="mgtitle">How We Work</div><ul class="mlinks"><li><a href="/partners">Practitioner Network</a></li><li><a href="/certification">Audit &amp; Certification</a></li><li><a href="/contact">Contact Us</a></li></ul></div>
      <div class="mfeat"><div class="mflbl">REGISTERED</div><div class="mfitem"><div class="mftitle">INPI Protected — Loi n° 2018-670</div><div class="mfdesc">ACF® is a registered trademark. All methodology and tools are legally protected.</div></div></div>
    </div>
    <div class="mp" id="panel-partners">
      <div class="mpt"><a href="/partners">Partners →</a></div>
      <div class="mpd">Join the ACF Practitioner network and offer governance services to your clients.</div>
      <div class="mgroup"><div class="mgtitle">Partner Portal</div><ul class="mlinks"><li><a href="/partners/login">🔐 Login to Partner Portal</a></li><li><a href="/partners/dashboard">Dashboard &amp; Tools</a></li><li><a href="/partners/training">Training Materials</a></li><li><a href="/partners/toolkit">ACF Practitioner Toolkit</a></li></ul></div>
      <div class="mgroup"><div class="mgtitle">Become a Partner</div><ul class="mlinks"><li><a href="/partners/apply">Apply to Join</a></li><li><a href="/partners/tiers">Partner Tiers</a></li><li><a href="/certification">Get ACF Certified First</a></li></ul></div>
    </div>
  </div>
</div>

<!-- HERO -->
<section class="hero">
  <div class="hgrid"></div>
  <div class="hw">
    <div>
      <div class="hbadge rev"><span class="bdot"></span>OFFICIAL STANDARD — v1.0 — FEB 2026</div>
      <h1 class="rev d1">
        <span class="hl1">The Global Standard for</span>
        <span class="hl2"><span id="typed"></span><span class="tc"></span></span>
      </h1>
      <p class="hdesc rev d2">The Agentic Commerce Framework® (ACF) is the definitive governance methodology for deploying, supervising, and controlling autonomous agentic systems in commercial environments.</p>
      <div class="hact rev d3">
        <a href="/contact" class="btng">Request a Governance Assessment →</a>
        <a href="/standard" class="btno">Read the Standard</a>
      </div>
      <div class="hstats rev d4">
        <div class="hs"><div class="hsn">4</div><div class="hsl">Founding<br>Principles</div></div>
        <div class="hs"><div class="hsn">8</div><div class="hsl">Implementation<br>Modules</div></div>
        <div class="hs"><div class="hsn">18</div><div class="hsl">Sovereignty<br>KPIs</div></div>
        <div class="hs"><div class="hsn">17</div><div class="hsl">Proprietary<br>Tools</div></div>
      </div>
    </div>
    <div class="hvis rev d2">
      <canvas id="dc"></canvas>
      <div class="orb">
        <div class="oring"><div class="ocore"><div class="oacf">ACF®</div><div class="ostd">Standard</div></div></div>
      </div>
      <div class="sat stop"><div class="sc"><div class="si"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div><div><div class="sn">ACF Score</div><div class="ss">Sovereignty Metric</div></div></div></div>
      <div class="sat sright"><div class="sc"><div class="si"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></div><div><div class="sn">ACF Control</div><div class="ss">Governance SaaS</div></div></div></div>
      <div class="sat sbott"><div class="sc"><div class="si"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg></div><div><div class="sn">Certification</div><div class="ss">Attestation</div></div></div></div>
      <div class="sat sleft"><div class="sc"><div class="si"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></div><div><div class="sn">Partners</div><div class="ss">Practitioners</div></div></div></div>
    </div>
  </div>
</section>

<!-- STATS BAR -->
<div class="sbar" id="statsbar">
  <div class="sgrid">
    <div class="sc2"><div class="scw"><span class="ctr" id="c1">0</span></div><div class="slbl">Operational Layers</div></div>
    <div class="sc2"><div class="scw"><span class="ctr" id="c2">0</span></div><div class="slbl">Sovereignty KPIs</div></div>
    <div class="sc2"><div class="scw"><span class="ctr" id="c3">0</span></div><div class="slbl">Proprietary Tools</div></div>
    <div class="sc2"><div class="scw"><span class="ctr" id="c4">0</span><span class="csuf">%</span></div><div class="slbl">Human Sovereignty</div></div>
  </div>
</div>

<!-- PRINCIPLES -->
<section class="secdark">
  <div class="ctn">
    <span class="ew rev">// Architecture</span>
    <h2 class="st rev d1">4 Founding Principles</h2>
    <div class="gb rev d1"></div>
    <p class="sd rev d2">Four immutable axioms defining the boundary between human authority and autonomous agent execution.</p>
    <div class="pgrid">
      <div class="pcard rev d1"><div class="pnw"><span class="pnum">01</span><span class="pnl">PRINCIPLE</span></div><div class="pt">Séparation Décision / Exécution</div><p class="pd">No autonomous agent defines its own objectives. Humans define the ends; agents execute exclusively within the defined perimeter. Technically enforced — not a policy, a constraint.</p><span class="ptag">SOVEREIGNTY</span></div>
      <div class="pcard rev d2"><div class="pnw"><span class="pnum">02</span><span class="pnl">PRINCIPLE</span></div><div class="pt">Zones Non Délégables</div><p class="pd">Certain decisions are structurally, ethically, or legally non-automatable. The non-delegable zone is formally defined and technically locked — never configurable by agents themselves.</p><span class="ptag">PROTECTION</span></div>
      <div class="pcard rev d3"><div class="pnw"><span class="pnum">03</span><span class="pnl">PRINCIPLE</span></div><div class="pt">Traçabilité &amp; Interruptibilité</div><p class="pd">Every agent decision is fully traceable, explainable, and stoppable at any time. Three-level kill switch: module stop (&lt;10s), agent stop (&lt;30s), emergency (&lt;60s). Complete auditable log chain, always.</p><span class="ptag">CONTROL</span></div>
      <div class="pcard rev d4"><div class="pnw"><span class="pnum">04</span><span class="pnl">PRINCIPLE</span></div><div class="pt">Gouvernance Vivante</div><p class="pd">Any agentic autonomy requires active, permanent, evolving governance — with dedicated roles (DDA), regular review rituals, and recurring independent audits. Governance is a continuous practice, not a document.</p><span class="ptag">CONTINUITY</span></div>
    </div>
  </div>
</section>

<!-- LAYERS -->
<section>
  <div class="ctn">
    <span class="ew rev">// Structure</span>
    <h2 class="st rev d1">4 Operational Layers</h2>
    <div class="gb rev d1"></div>
    <p class="sd rev d2">A hierarchical architecture from strategic governance to real-time execution supervision.</p>
    <div class="lgrid">
      <div class="lcard rev d1">
        <div class="lico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
        <div class="lnum">LAYER_01</div><div class="lt">Governance &amp; Sovereignty</div><div class="ld">Sovereignty charter, governance committee, RACI matrix, non-delegable zone map.</div>
      </div>
      <div class="lcard rev d2">
        <div class="lico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/></svg></div>
        <div class="lnum">LAYER_02</div><div class="lt">Decision Policy</div><div class="ld">Weighted objectives, arbitration rules, escalation thresholds, regulatory constraints.</div>
      </div>
      <div class="lcard rev d3">
        <div class="lico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/></svg></div>
        <div class="lnum">LAYER_03</div><div class="lt">Agent System</div><div class="ld">Explicit mandate per agent, interaction perimeter, autonomy level, 5-category taxonomy.</div>
      </div>
      <div class="lcard rev d4">
        <div class="lico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
        <div class="lnum">LAYER_04</div><div class="lt">Execution &amp; Supervision</div><div class="ld">Adaptive gating matrix, multi-level alerts, 18 sovereignty KPIs, live dashboards.</div>
      </div>
    </div>
  </div>
</section>

<!-- MATURITY -->
<section class="secdark">
  <div class="ctn">
    <span class="ew rev">// Progression</span>
    <h2 class="st rev d1">4 Agentic Maturity Levels</h2>
    <div class="gb rev d1"></div>
    <p class="sd rev d2">ACF classifies systems by autonomy level. Level 2 is the recommended deployment target.</p>
    <div class="matwrap rev d2" id="matwrap">
      <div class="matlinebg"></div>
      <div class="matlinefg" id="matline"></div>
      <div class="mattrack">
        <div class="matcol" id="mc0"><div class="dotw"><div class="dot"></div></div><div class="mlvl">LEVEL_0</div><div class="mname">Classical Automation</div><div class="risk rl">Very Low Risk</div><p class="mdesc">Fixed rules, no ML. Human intervention for any modification.</p></div>
        <div class="matcol" id="mc1"><div class="dotw"><div class="dot"></div></div><div class="mlvl">LEVEL_1</div><div class="mname">Assisted Agents</div><div class="risk rl">Low Risk</div><p class="mdesc">Agents analyze and recommend. Every final decision remains with a human.</p></div>
        <div class="matcol" id="mc2"><div class="dotw"><div class="dot"></div></div><div class="mlvl">LEVEL_2</div><div class="mname">Governed Agents</div><div class="risk rm">Moderate Risk</div><p class="mdesc">Agents decide within strict governance. Non-delegable zones locked.</p><div class="tbadge">★ Recommended Target</div></div>
        <div class="matcol" id="mc3"><div class="dotw"><div class="dot"></div></div><div class="mlvl">LEVEL_3</div><div class="mname">Supervised Autonomous</div><div class="risk rh">High Risk</div><p class="mdesc">Agents decide and learn. Maximum governance. For mature organizations only.</p></div>
      </div>
    </div>
  </div>
</section>

<!-- HEX PATH MODULES -->
<section class="hexsec">
  <div class="ctn">
    <span class="ew rev">// Methodology</span>
    <h2 class="st rev d1">8 Implementation Modules</h2>
    <div class="gb rev d1"></div>
    <p class="sd rev d2">A sequential path deployed progressively over 6–18 months. Each module builds on the previous.</p>
  </div>
  <div class="hextrack rev d2">
    <!-- ROW 1: MOD 01 → 04 — labels alternate above/below -->
    <div class="hexrow" id="hexrow1">
      <div class="hxflow-dot"></div>
      <!-- MOD 01 - label below -->
      <div class="hxitem">
        <div class="hxstem" style="opacity:0"></div><div class="hxdot" style="opacity:0"></div>
        <div class="hxlabel" style="height:90px"></div>
        <div class="hxhex" style="background:linear-gradient(160deg,#0d2040,#091830)">
          <div class="hxnum">01</div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><path d="M9 17H5a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3m0 0h3a2 2 0 012 2v8a2 2 0 01-2 2h-8a2 2 0 01-2-2v-3"/></svg>
        </div>
        <div class="hxdot"></div><div class="hxstem"></div>
        <div class="hxlabel">
          <div class="hxmod">MOD_01</div>
          <div class="hxname">Sovereignty Diagnostic</div>
          <div class="hxdesc">Sovereignty Score calculation. Risk zone mapping.</div>
        </div>
      </div>
      <!-- MOD 02 - label above -->
      <div class="hxitem alt">
        <div class="hxlabel">
          <div class="hxmod">MOD_02</div>
          <div class="hxname">Decision Mapping</div>
          <div class="hxdesc">Criticality Matrix. Non-delegable zones.</div>
        </div>
        <div class="hxstem" style="transform:scaleY(-1)"></div><div class="hxdot"></div>
        <div class="hxhex" style="background:linear-gradient(160deg,#0e2218,#081808)">
          <div class="hxnum">02</div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
        </div>
        <div class="hxdot" style="opacity:0"></div><div class="hxstem" style="opacity:0"></div>
        <div class="hxlabel" style="height:90px"></div>
      </div>
      <!-- MOD 03 - label below -->
      <div class="hxitem">
        <div class="hxlabel" style="height:90px"></div>
        <div class="hxdot" style="opacity:0"></div><div class="hxstem" style="opacity:0"></div>
        <div class="hxhex" style="background:linear-gradient(160deg,#1a1020,#0f0818)">
          <div class="hxnum">03</div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528"/></svg>
        </div>
        <div class="hxdot"></div><div class="hxstem"></div>
        <div class="hxlabel">
          <div class="hxmod">MOD_03</div>
          <div class="hxname">Agentic Constitution</div>
          <div class="hxdesc">9 articles. Signed by governance committee.</div>
        </div>
      </div>
      <!-- MOD 04 - label above -->
      <div class="hxitem alt">
        <div class="hxlabel">
          <div class="hxmod">MOD_04</div>
          <div class="hxname">Agent System Design</div>
          <div class="hxdesc">Mandate sheets, interaction perimeters.</div>
        </div>
        <div class="hxstem" style="transform:scaleY(-1)"></div><div class="hxdot"></div>
        <div class="hxhex" style="background:linear-gradient(160deg,#201808,#180e04)">
          <div class="hxnum">04</div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><rect x="2" y="2" width="9" height="9" rx="1"/><rect x="13" y="2" width="9" height="9" rx="1"/><rect x="2" y="13" width="9" height="9" rx="1"/><path d="M13 17h4m0 0v4m0-4V13"/></svg>
        </div>
        <div class="hxdot" style="opacity:0"></div><div class="hxstem" style="opacity:0"></div>
        <div class="hxlabel" style="height:90px"></div>
      </div>
    </div>
    <!-- TURN CONNECTOR (right side, since row 2 goes ← ) -->
    <div style="display:flex;justify-content:flex-end;padding-right:calc(12.5% - 44px);margin:4px 0;position:relative;z-index:3">
      <div style="width:3px;height:56px;background:linear-gradient(180deg,rgba(201,168,76,.3),rgba(201,168,76,.1));border-radius:2px;position:relative">
        <div style="position:absolute;bottom:-24px;left:50%;transform:translateX(-50%);color:var(--gold);font-size:16px;opacity:.7;font-weight:700">↓</div>
      </div>
    </div>
    <!-- ROW 2: MOD 08 ← 05 — reversed direction -->
    <div class="hexrow rev" id="hexrow2">
      <div class="hxflow-dot rev"></div>
      <!-- MOD 08 - label above, leftmost in reversed row -->
      <div class="hxitem alt">
        <div class="hxlabel">
          <div class="hxmod">MOD_08</div>
          <div class="hxname">Crisis Management</div>
          <div class="hxdesc">3-level incidents. Kill switch drills.</div>
        </div>
        <div class="hxstem" style="transform:scaleY(-1)"></div><div class="hxdot"></div>
        <div class="hxhex" style="background:linear-gradient(160deg,#200808,#180404)">
          <div class="hxnum">08</div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/></svg>
        </div>
        <div class="hxdot" style="opacity:0"></div><div class="hxstem" style="opacity:0"></div>
        <div class="hxlabel" style="height:90px"></div>
      </div>
      <!-- MOD 07 - label below -->
      <div class="hxitem">
        <div class="hxlabel" style="height:90px"></div>
        <div class="hxdot" style="opacity:0"></div><div class="hxstem" style="opacity:0"></div>
        <div class="hxhex" style="background:linear-gradient(160deg,#0d2040,#091830)">
          <div class="hxnum">07</div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><path d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/></svg>
        </div>
        <div class="hxdot"></div><div class="hxstem"></div>
        <div class="hxlabel">
          <div class="hxmod">MOD_07</div>
          <div class="hxname">Implementation Roadmap</div>
          <div class="hxdesc">5-phase progressive deployment.</div>
        </div>
      </div>
      <!-- MOD 06 - label above -->
      <div class="hxitem alt">
        <div class="hxlabel">
          <div class="hxmod">MOD_06</div>
          <div class="hxname">Continuous Governance</div>
          <div class="hxdesc">Monthly reviews. Annual compliance audit.</div>
        </div>
        <div class="hxstem" style="transform:scaleY(-1)"></div><div class="hxdot"></div>
        <div class="hxhex" style="background:linear-gradient(160deg,#0e2218,#081808)">
          <div class="hxnum">06</div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
        </div>
        <div class="hxdot" style="opacity:0"></div><div class="hxstem" style="opacity:0"></div>
        <div class="hxlabel" style="height:90px"></div>
      </div>
      <!-- MOD 05 - label below, rightmost -->
      <div class="hxitem">
        <div class="hxlabel" style="height:90px"></div>
        <div class="hxdot" style="opacity:0"></div><div class="hxstem" style="opacity:0"></div>
        <div class="hxhex" style="background:linear-gradient(160deg,#1a1020,#0f0818)">
          <div class="hxnum">05</div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
        </div>
        <div class="hxdot"></div><div class="hxstem"></div>
        <div class="hxlabel">
          <div class="hxmod">MOD_05</div>
          <div class="hxname">Security &amp; Reversibility</div>
          <div class="hxdesc">Sandboxing, reversibility plan. Kill switch design.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- VIDEO / FOUNDER -->
<section class="videosec">
  <div class="ctn">
    <div class="videogrid">
      <div>
        <span class="ew rev">// Why ACF</span>
        <h2 class="st rev d1">Governance Cannot Wait.<br>Agents Already Decide.</h2>
        <div class="gb rev d1"></div>
        <p class="vdesc rev d2">In 2026, autonomous agents are already executing decisions in commercial environments — setting prices, qualifying leads, processing claims, managing contracts. Most organizations have no framework to govern them.</p>
        <p class="vdesc rev d3" style="margin-top:16px">ACF was created to fill that void — before a governance failure becomes a legal, financial, or reputational crisis.</p>
        <div class="vquote rev d3">
          <div class="vqline"></div>
          <div class="vqbody">
            <div class="vqtext">"The question is no longer <em>whether</em> to deploy agents. It is <em>how</em> to deploy them without surrendering your sovereignty."</div>
            <div class="vqauthor">— Vincent DORANGE, Creator of the ACF Standard</div>
          </div>
        </div>
      </div>
      <div class="videobox rev d2">
        <div class="vplayer" id="vplayer" onclick="openVideoModal()">
          <div class="vthumbnail">
            <div class="vtgrid"></div>
            <div class="vtcontent">
              <div class="vtbadge">ACF — FOUNDER MESSAGE</div>
              <div class="vtname">Vincent DORANGE</div>
              <div class="vtrole">Creator, Agentic Commerce Framework®</div>
            </div>
          </div>
          <div class="vplaybtn">
            <div class="vplayring">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--navy)"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
          <div class="vduration">3:09</div>
          <div class="vtframes"></div>
        </div>
        <div class="vstats">
          <div class="vstat"><span class="vsn">2026</span><span class="vsl">Official Release</span></div>
          <div class="vstat"><span class="vsn">45p</span><span class="vsl">Full Documentation</span></div>
          <div class="vstat"><span class="vsn">INPI</span><span class="vsl">Legally Protected</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- VIDEO MODAL -->
<div class="aimodal" id="videomodal" style="z-index:1100">
  <div class="aimodalbg" onclick="closeVideoModal()"></div>
  <div style="position:relative;z-index:1;width:900px;max-width:95vw;background:#000;border-radius:14px;overflow:hidden;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;">
    <button onclick="closeVideoModal()" style="position:absolute;top:12px;right:12px;z-index:10;background:rgba(0,0,0,.7);border:1px solid rgba(255,255,255,.2);color:#fff;width:36px;height:36px;border-radius:50%;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center">×</button>
    <div style="text-align:center;padding:40px;color:var(--gr2)">
      <div style="font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--gold);margin-bottom:16px;letter-spacing:.1em">VIDEO PLACEHOLDER</div>
      <div style="font-family:'Space Grotesk',sans-serif;font-size:20px;color:#fff;margin-bottom:10px">Upload your video to enable playback</div>
      <div style="font-size:14px">Replace this modal with a YouTube or Vimeo embed URL in the code</div>
    </div>
  </div>
</div>

<!-- PRODUCTS -->
<section class="secdark">
  <div class="ctn">
    <span class="ew rev">// Ecosystem</span>
    <h2 class="st rev d1">The ACF Ecosystem</h2>
    <div class="gb rev d1"></div>
    <p class="sd rev d2">Three complementary products operationalizing the ACF Standard.</p>
  </div>
  <div class="prodgrid" style="max-width:1320px;margin:60px auto 0;padding:0 40px">
    <div class="pc rev d1">
      <div class="piw"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
      <div class="plbl">DIAGNOSTIC TOOL</div><div class="ptitle">ACF Score</div>
      <div class="pdesc">Proprietary Sovereignty Score measuring your decisional independence across 6 governance dimensions.</div>
      <ul class="pfeat"><li>Composite Sovereignty Score metric</li><li>6-axis radar visualization</li><li>Personalized action plan per axis</li></ul>
      <a href="https://acf-score.com" class="plink" target="_blank">Measure your Score →</a>
    </div>
    <div class="pc rev d2">
      <div class="piw"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg></div>
      <div class="plbl">SAAS PLATFORM</div><div class="ptitle">ACF Control</div>
      <div class="pdesc">Real-time governance dashboard monitoring your 18 Sovereignty KPIs with adaptive gating and automated escalation.</div>
      <ul class="pfeat"><li>18 KPIs across 6 governance axes</li><li>Adaptive gating with human escalation</li><li>Tamper-evident audit logs</li></ul>
      <a href="/control" class="plink">Discover ACF Control →</a>
    </div>
    <div class="pc rev d3">
      <div class="piw"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg></div>
      <div class="plbl">INDEPENDENT ATTESTATION</div><div class="ptitle">ACF Certification</div>
      <div class="pdesc">Independent certification attesting compliance with the ACF governance standard. Publicly verifiable.</div>
      <ul class="pfeat"><li>Level 1, 2, and 3 certification paths</li><li>Publicly verifiable badge</li><li>Annual renewal + continuous monitoring</li></ul>
      <a href="/certification" class="plink">Get Certified →</a>
    </div>
  </div>
</section>

<!-- BLOG -->
<section>
  <div class="ctn">
    <span class="ew rev">// Insights</span>
    <h2 class="st rev d1">Latest from the ACF Blog</h2>
    <div class="gb rev d1"></div>
    <p class="sd rev d2">Governance insights, framework updates, and agentic intelligence research.</p>
    <div class="bgrid">
      <a href="/blog/ai-act" class="bcard rev d1">
        <div class="bimg"><img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=400&fit=crop&q=80" alt="" loading="lazy"><div class="bovl"></div><span class="bcat">AI REGULATION</span></div>
        <div class="bbody"><div class="btitle">How the EU AI Act Applies to Agentic Systems in 2026</div><div class="bexc">The AI Act's risk-based approach creates specific obligations for autonomous agents. Here's what ACF Level 2 governance covers.</div><div class="bmeta"><span class="bdate">2026-02-15</span><span class="bread">Read →</span></div></div>
      </a>
      <a href="/blog/dda" class="bcard rev d2">
        <div class="bimg"><img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80" alt="" loading="lazy"><div class="bovl"></div><span class="bcat">GOVERNANCE</span></div>
        <div class="bbody"><div class="btitle">The DDA: Why Every AI-Native Company Needs a Delegated Decision Agent Officer</div><div class="bexc">The DDA is the legal guardian of your autonomous agents. How to create and empower this critical role.</div><div class="bmeta"><span class="bdate">2026-02-08</span><span class="bread">Read →</span></div></div>
      </a>
      <a href="/blog/kill-switch" class="bcard rev d3">
        <div class="bimg"><img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&q=80" alt="" loading="lazy"><div class="bovl"></div><span class="bcat">TECHNICAL</span></div>
        <div class="bbody"><div class="btitle">Designing a Three-Level Kill Switch for Autonomous Agent Systems</div><div class="bexc">An effective kill switch is not a single button. ACF specifies three interrupt levels with defined response times.</div><div class="bmeta"><span class="bdate">2026-01-29</span><span class="bread">Read →</span></div></div>
      </a>
    </div>
    <div style="text-align:center;margin-top:40px" class="rev"><a href="/blog" class="btno">View All Articles →</a></div>
  </div>
</section>

<!-- CTA -->
<section class="ctasec">
  <div class="ctawm">ACF®</div>
  <div class="ctn ctain">
    <span class="ew">// Next Step</span>
    <h2>Ready to Govern Your<br>Agentic Systems?</h2>
    <p>Request a governance assessment and discover your current Sovereignty Score.</p>
    <div class="ctabtns">
      <a href="/contact" class="btng">Request a Governance Assessment →</a>
      <a href="/partners/apply" class="btno">Become an ACF Partner</a>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="ctn">
    <div class="fgrid">
      <div><a href="/" class="logo"><div class="lb">ACF</div><div><div class="ln">Agentic Commerce Framework®</div><div class="ls">Global Standard for AI Governance</div></div></a><p class="fdesc">The definitive governance standard for organizations deploying autonomous agentic systems. Protected — Loi n° 2018-670.</p></div>
      <div><div class="ftitle">Framework</div><ul class="flinks"><li><a href="/standard">The Standard</a></li><li><a href="/method">Methodology</a></li><li><a href="/research">Research</a></li><li><a href="/blog">Blog</a></li></ul></div>
      <div><div class="ftitle">Products</div><ul class="flinks"><li><a href="https://acf-score.com">ACF Score</a></li><li><a href="/control">ACF Control</a></li><li><a href="/certification">Certification</a></li><li><a href="/academy">Academy</a></li></ul></div>
      <div><div class="ftitle">Organization</div><ul class="flinks"><li><a href="/partners/login">Partner Portal</a></li><li><a href="/about">About</a></li><li><a href="/contact">Contact</a></li><li><a href="/legal">Legal</a></li></ul></div>
    </div>
    <div class="fbot">
      <div class="fcopy">© 2026 Agentic Commerce Framework® — Vincent DORANGE. All rights reserved. Registered INPI.</div>
      <div class="flegal"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/cookies">Cookies</a></div>
    </div>
  </div>
</footer>

<!-- AI BUTTON -->
<button class="aibtn" id="aibtn">
  <div class="aidonline"></div>
  <div class="aiblabel"><strong>Ask ACF Agent</strong><span>AI GOVERNANCE · ONLINE</span></div>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--navy)"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
</button>

<!-- AI MODAL -->
<div class="aimodal" id="aimodal">
  <div class="aimodalbg" onclick="closeAI()"></div>
  <div class="aimodalbox">
    <div class="aimodalhdr">
      <button class="aimclose" onclick="closeAI()">×</button>
      <div class="aimbeta">BETA</div>
      <div class="aimtitle"><span>Ask ACF</span> ★</div>
      <p class="aimsub">A chatbot answering questions based on the ACF Standard and governance insights</p>
    </div>
    <div class="aimmsgs" id="aimmsgs"></div>
    <div class="aiminpwrap">
      <input class="aiminp" id="aiminp" placeholder="Ask about ACF governance..." autocomplete="off">
      <button class="aimsend" id="aimsend">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
      </button>
    </div>
    <div class="aimtrend">
      <div class="aimtlabel">TRENDING QUESTIONS</div>
      <div class="aimqs">
        <button class="aimq" onclick="askQ('What is the ACF Standard?')">What is the ACF Standard?</button>
        <button class="aimq" onclick="askQ('How do I get ACF certified?')">How to get ACF certified?</button>
        <button class="aimq" onclick="askQ('What is the DDA role?')">What is the DDA role?</button>
        <button class="aimq" onclick="askQ('What is the ACF Sovereignty Score?')">What is the Sovereignty Score?</button>
        <button class="aimq" onclick="askQ('What are the 4 Founding Principles of ACF?')">The 4 Founding Principles?</button>
      </div>
    </div>
    <div class="aimdiscl">AI experiment. Responses based on ACF Standard documentation. <a href="/legal">See More</a></div>
  </div>
</div>`

export default function ReferenceHome() {
  useEffect(() => {
    // Inject CSS
    let style = document.getElementById('acf-ref-style')
    if (!style) {
      style = document.createElement('style')
      style.id = 'acf-ref-style'
      document.head.appendChild(style)
    }
    style.textContent = ACF_CSS

    // Remove spacing from Next.js main wrapper
    const main = document.querySelector('main')
    if (main) {
      main.style.paddingTop = '0'
      main.style.marginTop = '0'
    }

    // Run JS directly (ts-nocheck disables TS errors)
    // ══ NEURAL ══
(function(){
  var c=document.getElementById('neural'),x=c.getContext('2d');
  function sz(){c.width=innerWidth;c.height=innerHeight}sz();addEventListener('resize',sz);
  var pts=[];for(var i=0;i<90;i++)pts.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4});
  function draw(){
    x.clearRect(0,0,c.width,c.height);
    for(var i=0;i<pts.length;i++){
      pts[i].x+=pts[i].vx;pts[i].y+=pts[i].vy;
      if(pts[i].x<0||pts[i].x>c.width)pts[i].vx*=-1;
      if(pts[i].y<0||pts[i].y>c.height)pts[i].vy*=-1;
      x.beginPath();x.arc(pts[i].x,pts[i].y,1.5,0,Math.PI*2);x.fillStyle='rgba(201,168,76,.75)';x.fill();
      for(var j=i+1;j<pts.length;j++){
        var dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<160){x.beginPath();x.moveTo(pts[i].x,pts[i].y);x.lineTo(pts[j].x,pts[j].y);x.strokeStyle='rgba(201,168,76,'+(1-d/160)*.4+')';x.lineWidth=.7;x.stroke()}
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ══ DIAGRAM ══
(function(){
  var c=document.getElementById('dc'),x=c.getContext('2d');
  function sz(){c.width=c.offsetWidth;c.height=c.offsetHeight}sz();addEventListener('resize',sz);
  var pulses=[],tick=0;
  function nodes(){var cx=c.width/2,cy=c.height/2;return[{x:cx,y:cy*.12},{x:c.width*.96,y:cy},{x:cx,y:c.height*.88},{x:c.width*.04,y:cy}]}
  function spawn(){var ns=nodes(),n=ns[Math.floor(Math.random()*ns.length)],cx=c.width/2,cy=c.height/2,tc=Math.random()>.5;pulses.push({sx:tc?n.x:cx,sy:tc?n.y:cy,ex:tc?cx:n.x,ey:tc?cy:n.y,t:0,spd:.008+Math.random()*.005,col:Math.random()>.3?'201,168,76':'80,180,255'})}
  function draw(){
    x.clearRect(0,0,c.width,c.height);
    var ns=nodes(),cx=c.width/2,cy=c.height/2;
    ns.forEach(function(n){x.beginPath();x.moveTo(cx,cy);x.lineTo(n.x,n.y);x.strokeStyle='rgba(201,168,76,.1)';x.lineWidth=1;x.stroke()});
    tick++;if(tick%50===0)spawn();
    for(var i=pulses.length-1;i>=0;i--){
      var p=pulses[i];p.t+=p.spd;if(p.t>=1){pulses.splice(i,1);continue}
      var px=p.sx+(p.ex-p.sx)*p.t,py=p.sy+(p.ey-p.sy)*p.t;
      var g=x.createRadialGradient(px,py,0,px,py,6);g.addColorStop(0,'rgba('+p.col+',.9)');g.addColorStop(1,'rgba('+p.col+',0)');
      x.beginPath();x.arc(px,py,5,0,Math.PI*2);x.fillStyle=g;x.fill();
      var tpx=p.sx+(p.ex-p.sx)*Math.max(0,p.t-.15),tpy=p.sy+(p.ey-p.sy)*Math.max(0,p.t-.15);
      x.beginPath();x.moveTo(tpx,tpy);x.lineTo(px,py);x.strokeStyle='rgba('+p.col+',.25)';x.lineWidth=1.5;x.stroke();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ══ SCROLL NAV ══
addEventListener('scroll',function(){document.getElementById('nav').classList.toggle('scrolled',scrollY>50)});

// ══ REGION SELECTOR ══
function openRegion(){document.getElementById('rmo').classList.add('open');document.getElementById('rpanel').classList.add('open');document.body.style.overflow='hidden'}
function closeRegion(){document.getElementById('rmo').classList.remove('open');document.getElementById('rpanel').classList.remove('open');document.body.style.overflow=''}

// ══ MEGA MENU ══
function openMega(){document.getElementById('mo').classList.add('open');document.getElementById('megadrawer').classList.add('open');document.body.style.overflow='hidden'}
function closeMega(){document.getElementById('mo').classList.remove('open');document.getElementById('megadrawer').classList.remove('open');document.body.style.overflow=''}
function showPanel(id){
  document.querySelectorAll('.mni').forEach(function(el){el.classList.toggle('active',el.dataset.panel===id)});
  document.querySelectorAll('.mp').forEach(function(el){el.classList.toggle('active',el.id==='panel-'+id)});
}
document.getElementById('hambtn').addEventListener('click',openMega);
addEventListener('keydown',function(e){if(e.key==='Escape'){closeMega();closeRegion();closeAI();closeVideoModal()}});

// ══ SCROLL REVEAL ══
var ro=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting)e.target.classList.add('vis')})},{threshold:.1});
document.querySelectorAll('.rev').forEach(function(el){ro.observe(el)});

// ══ COUNTERS ══
var countersRun=false;
function runCounters(){
  if(countersRun)return;countersRun=true;
  [{id:'c1',val:4},{id:'c2',val:18},{id:'c3',val:17},{id:'c4',val:100}].forEach(function(t){
    var el=document.getElementById(t.id);if(!el)return;
    var start=null,dur=1600;
    function step(ts){if(!start)start=ts;var p=Math.min((ts-start)/dur,1),e=1-Math.pow(1-p,4);el.textContent=Math.round(e*t.val);if(p<1)requestAnimationFrame(step);else el.textContent=t.val}
    requestAnimationFrame(step);
  });
}
function checkCounters(){var b=document.getElementById('statsbar');if(!b)return;var r=b.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)runCounters()}
addEventListener('scroll',checkCounters,{passive:true});
addEventListener('load',function(){setTimeout(checkCounters,200)});
document.addEventListener('DOMContentLoaded',function(){setTimeout(checkCounters,400)});

// ══ MATURITY ══
var matDone=false;
new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting&&!matDone){
      matDone=true;
      [0,380,760,1140].forEach(function(d,i){
        setTimeout(function(){var el=document.getElementById('mc'+i);if(el)el.classList.add(i===2?'dg':'da')},d);
      });
      setTimeout(function(){var l=document.getElementById('matline');if(l)l.classList.add('go')},380);
    }
  });
},{threshold:.3}).observe(document.getElementById('matwrap'));

// ══ TYPING ══
var words=['Governance','Sovereignty','Intelligence','Commerce'],wi=0,ci=0,del=false,paused=false;
var tel=document.getElementById('typed');
if(tel){
  tel.textContent=words[0];ci=words[0].length;
  function typeStep(){
    if(paused){paused=false;del=true;setTimeout(typeStep,2400);return}
    if(!del&&ci===words[wi].length){paused=true;typeStep();return}
    if(del&&ci===0){del=false;wi=(wi+1)%words.length;setTimeout(typeStep,300);return}
    ci+=del?-1:1;tel.textContent=words[wi].slice(0,ci);
    setTimeout(typeStep,del?45:85);
  }
  setTimeout(typeStep,2600);
}

// ══ VIDEO MODAL ══
function openVideoModal(){document.getElementById('videomodal').classList.add('open');document.body.style.overflow='hidden'}
function closeVideoModal(){document.getElementById('videomodal').classList.remove('open');document.body.style.overflow=''}

// ══ AI ══
var KB={
  acf:'ACF — Agentic Commerce Framework® — is a proprietary governance methodology created by Vincent DORANGE. It defines how organizations deploy and supervise autonomous agentic systems. Built on 4 founding principles, 4 operational layers, 8 modules, and 17 proprietary tools. Released February 2026, registered INPI.',
  cert:'ACF Certification: (1) Complete ACF Score Diagnostic, (2) Implement governance to Level 2, (3) Request independent audit by an ACF Practitioner, (4) Receive time-bound certification badge. Visit /certification for the 3 certification levels.',
  dda:'The DDA — Délégué à la Décision Agentique — is the legal guardian of autonomous agents. They arbitrate inter-agent conflicts, validate non-delegable zones, manage the kill switch, and are accountable for governance compliance. Mandatory for ACF Level 2+.',
  score:'ACF Score measures your Sovereignty Score across 6 axes: Autonomy, Control, Resilience, Dependency, Compliance, Technical Controls. Visit acf-score.com to run your assessment.',
  principles:'ACF has 4 founding principles: (1) Séparation Décision/Exécution — humans define ends, agents execute within perimeters. (2) Zones Non Délégables — certain decisions are structurally locked. (3) Traçabilité & Interruptibilité — full traceability and 3-level kill switch. (4) Gouvernance Vivante — active, permanent governance with dedicated roles.',
  def:'Great question. For detailed information, visit /standard or contact us at /contact. Our Practitioners provide personalized governance assessments for your organization.'
};
function getReply(m){
  var l=m.toLowerCase();
  if(l.includes('what is acf')||l.includes('who created')||l.includes('framework'))return KB.acf;
  if(l.includes('certif'))return KB.cert;
  if(l.includes('dda')||l.includes('delegat'))return KB.dda;
  if(l.includes('score')||l.includes('sovereignty score'))return KB.score;
  if(l.includes('principle'))return KB.principles;
  return KB.def;
}
function addMsg(text,type){var msgs=document.getElementById('aimmsgs');msgs.classList.add('show');var d=document.createElement('div');d.className='aimmsg aimmsg'+type;d.textContent=text;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight}
function showTyping(){var msgs=document.getElementById('aimmsgs');msgs.classList.add('show');var d=document.createElement('div');d.className='aimtyp';d.id='aimtyp';d.innerHTML='<span></span><span></span><span></span>';msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight}
function hideTyping(){var t=document.getElementById('aimtyp');if(t)t.remove()}
function sendMsg(text){if(!text)return;addMsg(text,'u');showTyping();setTimeout(function(){hideTyping();addMsg(getReply(text),'b')},700+Math.random()*400)}
function askQ(q){document.getElementById('aiminp').value=q;sendMsg(q)}
document.getElementById('aimsend').addEventListener('click',function(){var v=document.getElementById('aiminp').value.trim();if(v){document.getElementById('aiminp').value='';sendMsg(v)}});
document.getElementById('aiminp').addEventListener('keydown',function(e){if(e.key==='Enter'){var v=this.value.trim();if(v){this.value='';sendMsg(v)}}});
document.getElementById('aibtn').addEventListener('click',function(){document.getElementById('aimodal').classList.add('open');document.body.style.overflow='hidden'});
function closeAI(){document.getElementById('aimodal').classList.remove('open');document.body.style.overflow=''}

  }, [])

  return <div dangerouslySetInnerHTML={{ __html: ACF_HTML }} />
}
