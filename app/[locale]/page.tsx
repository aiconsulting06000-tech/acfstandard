"use client"
import { useLocale } from 'next-intl'
import AIAgent from "./components/AIAgent"
import messagesEn from '../../messages/en.json'
import messagesFr from '../../messages/fr.json'
const messagesMap: Record<string, any> = { en: messagesEn, fr: messagesFr }
const buildHTML = (locale: string, m: Record<string, any>) => `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ACF — Agentic Commerce Framework®</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
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
.rpanel{position:fixed;top:0;left:0;right:0;max-height:85vh;overflow-y:auto;background:var(--w);color:#1a1a2e;z-index:901;padding:24px 40px 32px;transform:translateY(-100%);transition:transform .35s cubic-bezier(.16,1,.3,1);border-bottom:3px solid var(--gold)}
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
.hw{max-width:1320px;margin:0 auto;padding:30px 40px 50px;width:100%;position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
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
.sc2{padding:20px 20px;text-align:center;border-right:1px solid var(--bd);transition:.3s}
.sc2:last-child{border-right:none}
.sc2:hover{background:rgba(201,168,76,.04)}
.scw{display:flex;align-items:baseline;justify-content:center;gap:2px}
.ctr{font-family:'Space Grotesk',sans-serif;font-size:48px;font-weight:800;color:var(--gold);line-height:1}
.csuf{font-family:'Space Grotesk',sans-serif;font-size:28px;font-weight:700;color:var(--gold)}
.slbl{font-size:12px;color:var(--gr);margin-top:8px;font-family:'JetBrains Mono',monospace;letter-spacing:.04em}

/* ═══ SECTIONS ═══ */
section{padding:60px 0;position:relative;z-index:1}
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
.hexsec{padding:60px 0;background:var(--navy2)}
.hextrack{margin-top:40px;position:relative;overflow:hidden}
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

/* ═══ CINEMATIC ═══ */
.cin-scene{will-change:opacity,transform;position:absolute;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}
.cin-card{background:rgba(201,168,76,.06);border:1px solid rgba(201,168,76,.15);border-radius:12px;padding:20px 16px;text-align:center;transition:all .6s cubic-bezier(.16,1,.3,1)}
.cin-card:hover{border-color:rgba(201,168,76,.5);background:rgba(201,168,76,.12);transform:translateY(-4px) !important}
@keyframes cinGlitch{0%{clip-path:inset(40% 0 61% 0)}20%{clip-path:inset(92% 0 1% 0)}40%{clip-path:inset(43% 0 1% 0)}60%{clip-path:inset(25% 0 58% 0)}80%{clip-path:inset(54% 0 7% 0)}100%{clip-path:inset(58% 0 43% 0)}}
@keyframes cinScanline{0%{top:-5%}100%{top:105%}}
@keyframes cinPulseRing{0%{transform:translate(-50%,-50%) scale(.3);opacity:1}100%{transform:translate(-50%,-50%) scale(3);opacity:0}}
@keyframes cinFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes cinShake{0%,100%{transform:translateX(0)}10%{transform:translateX(-8px)}20%{transform:translateX(8px)}30%{transform:translateX(-5px)}40%{transform:translateX(5px)}50%{transform:translateX(-2px)}60%{transform:translateX(2px)}}
@keyframes cinTypeBar{0%,100%{opacity:1}50%{opacity:0}}
.cin-typing-cursor{display:inline-block;width:2px;height:.85em;background:#c9a84c;vertical-align:middle;margin-left:3px;animation:cinTypeBar .6s step-end infinite}
.cin-glow{text-shadow:0 0 20px rgba(201,168,76,.6),0 0 40px rgba(201,168,76,.3),0 0 80px rgba(201,168,76,.15)}
.cin-scanline{position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(201,168,76,.15),transparent);z-index:5;pointer-events:none;animation:cinScanline 3s linear infinite}

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
.ctasec{background:var(--navy3);border-top:1px solid var(--bd);border-bottom:1px solid var(--bd);padding:70px 0;text-align:center;position:relative;overflow:hidden}
.ctawm{position:absolute;font-family:'Space Grotesk',sans-serif;font-size:160px;font-weight:900;color:rgba(201,168,76,.025);top:50%;left:50%;transform:translate(-50%,-50%);white-space:nowrap;pointer-events:none}
.ctain{position:relative;z-index:1}
.ctasec h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,4vw,52px);font-weight:800;margin-bottom:18px;letter-spacing:-.02em}
.ctasec p{font-size:17px;color:var(--gr2);margin:0 auto 40px;max-width:540px;line-height:1.75}
.ctabtns{display:flex;justify-content:center;gap:14px;flex-wrap:wrap}

/* ═══ FOOTER ═══ */
footer{background:var(--navy2);border-top:1px solid var(--bd);padding:50px 0 28px}
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

/* ═══ VIDEO MODAL OVERLAY ═══ */
.aimodal{position:fixed;inset:0;z-index:1000;display:none;align-items:center;justify-content:center}
.aimodal.open{display:flex}
.aimodalbg{position:absolute;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(6px)}

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
}
.nlm a+a::before{content:"|";color:var(--gold);opacity:.8;margin-right:16px;font-size:12px;font-weight:300}
</style>
</head>
<body>
<canvas id="neural"></canvas>

<!-- REGION PANEL OVERLAY -->
<div class="rmo" id="rmo" onclick="closeRegion()"></div>
<div class="rpanel" id="rpanel">
  <div class="rphdr">
    <div class="rptitle">${m.regionSelector.title}</div>
    <button class="rpclose" onclick="closeRegion()">${m.regionSelector.close}</button>
  </div>
  <div class="rpcols" style="grid-template-columns:repeat(5,1fr);gap:28px">
    <div>
      <div class="rpcol-title">Global</div>
      <a class="rpglobal" href="#" onclick="switchLocale('en');return false"><span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg></span><span>${m.regionSelector.global}</span></a>
      <div class="rpcol-title" style="margin-top:20px">${m.regionSelector.northAmerica}</div>
      <ul class="rplinks">
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇺🇸</span>United States <span class="rplang">(English)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇨🇦</span>Canada <span class="rplang">(EN/FR)</span></a></li>
        <li><a href="#" onclick="switchLocale('es');return false"><span class="rpflag">🇲🇽</span>Mexico <span class="rplang">(Español)</span></a></li>
      </ul>
      <div class="rpcol-title" style="margin-top:20px">${m.regionSelector.latinAmerica}</div>
      <ul class="rplinks">
        <li><a href="#" onclick="switchLocale('pt');return false"><span class="rpflag">🇧🇷</span>Brazil <span class="rplang">(Português)</span></a></li>
        <li><a href="#" onclick="switchLocale('es');return false"><span class="rpflag">🇦🇷</span>Argentina <span class="rplang">(Español)</span></a></li>
        <li><a href="#" onclick="switchLocale('es');return false"><span class="rpflag">🇨🇱</span>Chile <span class="rplang">(Español)</span></a></li>
        <li><a href="#" onclick="switchLocale('es');return false"><span class="rpflag">🇨🇴</span>Colombia <span class="rplang">(Español)</span></a></li>
      </ul>
    </div>
    <div>
      <div class="rpcol-title">${m.regionSelector.westernEurope}</div>
      <ul class="rplinks">
        <li><a href="#" onclick="switchLocale('fr');return false"><span class="rpflag">🇫🇷</span>France <span class="rplang">(Français)</span></a></li>
        <li><a href="#" onclick="switchLocale('de');return false"><span class="rpflag">🇩🇪</span>Germany <span class="rplang">(Deutsch)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇬🇧</span>United Kingdom <span class="rplang">(English)</span></a></li>
        <li><a href="#" onclick="switchLocale('es');return false"><span class="rpflag">🇪🇸</span>Spain <span class="rplang">(Español)</span></a></li>
        <li><a href="#" onclick="switchLocale('it');return false"><span class="rpflag">🇮🇹</span>Italy <span class="rplang">(Italiano)</span></a></li>
        <li><a href="#" onclick="switchLocale('pt');return false"><span class="rpflag">🇵🇹</span>Portugal <span class="rplang">(Português)</span></a></li>
        <li><a href="#" onclick="switchLocale('fr');return false"><span class="rpflag">🇧🇪</span>Belgium <span class="rplang">(FR/NL)</span></a></li>
        <li><a href="#" onclick="switchLocale('fr');return false"><span class="rpflag">🇨🇭</span>Switzerland <span class="rplang">(FR/DE/IT)</span></a></li>
        <li><a href="#" onclick="switchLocale('nl');return false"><span class="rpflag">🇳🇱</span>Netherlands <span class="rplang">(Nederlands)</span></a></li>
        <li><a href="#" onclick="switchLocale('de');return false"><span class="rpflag">🇦🇹</span>Austria <span class="rplang">(Deutsch)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇮🇪</span>Ireland <span class="rplang">(English)</span></a></li>
        <li><a href="#" onclick="switchLocale('fr');return false"><span class="rpflag">🇱🇺</span>Luxembourg <span class="rplang">(FR/DE)</span></a></li>
      </ul>
    </div>
    <div>
      <div class="rpcol-title">${m.regionSelector.nordicBaltic}</div>
      <ul class="rplinks">
        <li><a href="#" onclick="switchLocale('sv');return false"><span class="rpflag">🇸🇪</span>Sweden <span class="rplang">(Svenska)</span></a></li>
        <li><a href="#" onclick="switchLocale('no');return false"><span class="rpflag">🇳🇴</span>Norway <span class="rplang">(Norsk)</span></a></li>
        <li><a href="#" onclick="switchLocale('da');return false"><span class="rpflag">🇩🇰</span>Denmark <span class="rplang">(Dansk)</span></a></li>
        <li><a href="#" onclick="switchLocale('fi');return false"><span class="rpflag">🇫🇮</span>Finland <span class="rplang">(Suomi)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇮🇸</span>Iceland <span class="rplang">(Íslenska)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇪🇪</span>Estonia <span class="rplang">(Eesti)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇱🇻</span>Latvia <span class="rplang">(Latviešu)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇱🇹</span>Lithuania <span class="rplang">(Lietuvių)</span></a></li>
      </ul>
      <div class="rpcol-title" style="margin-top:20px">${m.regionSelector.centralEasternEurope}</div>
      <ul class="rplinks">
        <li><a href="#" onclick="switchLocale('pl');return false"><span class="rpflag">🇵🇱</span>Poland <span class="rplang">(Polski)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇨🇿</span>Czech Republic <span class="rplang">(Čeština)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇸🇰</span>Slovakia <span class="rplang">(Slovenčina)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇭🇺</span>Hungary <span class="rplang">(Magyar)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇷🇴</span>Romania <span class="rplang">(Română)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇧🇬</span>Bulgaria <span class="rplang">(Български)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇭🇷</span>Croatia <span class="rplang">(Hrvatski)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇸🇮</span>Slovenia <span class="rplang">(Slovenščina)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇷🇸</span>Serbia <span class="rplang">(Srpski)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇺🇦</span>Ukraine <span class="rplang">(Українська)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇬🇷</span>Greece <span class="rplang">(Ελληνικά)</span></a></li>
      </ul>
    </div>
    <div>
      <div class="rpcol-title">${m.regionSelector.middleEastAfrica}</div>
      <ul class="rplinks">
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇦🇪</span>UAE <span class="rplang">(العربية)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇸🇦</span>Saudi Arabia <span class="rplang">(العربية)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇮🇱</span>Israel <span class="rplang">(עברית)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇹🇷</span>Turkey <span class="rplang">(Türkçe)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇿🇦</span>South Africa <span class="rplang">(English)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇳🇬</span>Nigeria <span class="rplang">(English)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇰🇪</span>Kenya <span class="rplang">(English)</span></a></li>
        <li><a href="#" onclick="switchLocale('fr');return false"><span class="rpflag">🇲🇦</span>Morocco <span class="rplang">(Français)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇪🇬</span>Egypt <span class="rplang">(العربية)</span></a></li>
      </ul>
    </div>
    <div>
      <div class="rpcol-title">${m.regionSelector.asiaPacific}</div>
      <ul class="rplinks">
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇯🇵</span>Japan <span class="rplang">(日本語)</span></a></li>
        <li><a href="#" onclick="switchLocale('zh');return false"><span class="rpflag">🇨🇳</span>China <span class="rplang">(中文)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇰🇷</span>Korea <span class="rplang">(한국어)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇸🇬</span>Singapore <span class="rplang">(English)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇦🇺</span>Australia <span class="rplang">(English)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇳🇿</span>New Zealand <span class="rplang">(English)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇮🇳</span>India <span class="rplang">(English)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇮🇩</span>Indonesia <span class="rplang">(Bahasa)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇲🇾</span>Malaysia <span class="rplang">(Bahasa)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇹🇭</span>Thailand <span class="rplang">(ภาษาไทย)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇻🇳</span>Vietnam <span class="rplang">(Tiếng Việt)</span></a></li>
        <li><a href="#" onclick="switchLocale('en');return false"><span class="rpflag">🇵🇭</span>Philippines <span class="rplang">(English)</span></a></li>
        <li><a href="#" onclick="switchLocale('zh');return false"><span class="rpflag">🇭🇰</span>Hong Kong <span class="rplang">(中文)</span></a></li>
        <li><a href="#" onclick="switchLocale('zh');return false"><span class="rpflag">🇹🇼</span>Taiwan <span class="rplang">(中文)</span></a></li>
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
      <div><div class="ln">${m.nav.logoText}</div><div class="ls">${m.nav.logoSubtext}</div></div>
    </a>
    <div class="nr">
      <div class="nlm">
        <a href="/standard">${m.nav.theStandard}</a>
        <a href="/${locale}/acf-score">${m.nav.acfScore}</a>
        <a href="/control">${m.nav.acfControl}</a>
        <a href="/certification">${m.nav.acfCertification}</a>
      </div>
      <!-- Region selector Bain-style -->
      <button class="regionbtn" id="regionbtn" onclick="openRegion()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
        <span>${m.nav.region}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <a href="/partners/login" class="npart">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z"/></svg>
        ${m.nav.partners}
      </a>
      <a href="/contact" class="ncta">${m.nav.requestAssessment}</a>
    </div>
  </div>
</nav>

<!-- MEGA MENU -->
<div class="mo" id="mo" onclick="closeMega()"></div>
<div class="md" id="megadrawer">
  <button class="mclose" onclick="closeMega()">×</button>
  <div class="ms">
    <div class="mni active" data-panel="framework" onclick="showPanel('framework')"><span>${m.megaMenu.framework.title}</span><span class="marr">›</span></div>
    <div class="mni" data-panel="products" onclick="showPanel('products')"><span>${m.megaMenu.products.title}</span><span class="marr">›</span></div>
    <div class="mni" data-panel="resources" onclick="showPanel('resources')"><span>${m.megaMenu.resources.title}</span><span class="marr">›</span></div>
    <div class="mni" data-panel="about" onclick="showPanel('about')"><span>${m.megaMenu.about.title}</span><span class="marr">›</span></div>
    <div class="mni" data-panel="partners" onclick="showPanel('partners')"><span>${m.megaMenu.partners.title}</span><span class="marr">›</span></div>
    <div class="muser">
      <div class="muname">${m.megaMenu.user.partnerAccess}</div>
      <div class="mulinks">
        <a href="/partners/login"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg> ${m.megaMenu.user.partnerLogin}</a>
        <a href="/partners/apply">${m.megaMenu.user.applyPartner}</a>
        <a href="/contact">${m.megaMenu.user.contact}</a>
      </div>
    </div>
  </div>
  <div class="mc">
    <div class="mp active" id="panel-framework">
      <div class="mpt"><a href="/standard">${m.megaMenu.framework.link}</a></div>
      <div class="mpd">${m.megaMenu.framework.subtitle}</div>
      <div class="mgroup"><div class="mgtitle">${m.megaMenu.framework.architecture.title}</div><ul class="mlinks"><li><a href="/${locale}/standard#principles">${m.megaMenu.framework.architecture.principles}</a></li><li><a href="/${locale}/standard#layers">${m.megaMenu.framework.architecture.layers}</a></li><li><a href="/${locale}/standard#maturity">${m.megaMenu.framework.architecture.maturity}</a></li></ul></div>
      <div class="mgroup"><div class="mgtitle">${m.megaMenu.framework.methodology.title}</div><ul class="mlinks"><li><a href="/${locale}/standard#modules">${m.megaMenu.framework.methodology.modules}</a></li><li><a href="/${locale}/standard#modules">${m.megaMenu.framework.methodology.constitution}</a></li><li><a href="/${locale}/blog#delegated-decision-agent-officer">${m.megaMenu.framework.methodology.dda}</a></li><li><a href="/${locale}/blog#three-level-kill-switch">${m.megaMenu.framework.methodology.killSwitch}</a></li></ul></div>
      <div class="mfeat"><div class="mflbl">${m.megaMenu.framework.featured.label}</div><a href="#" onclick="event.preventDefault();event.stopPropagation();var a=document.createElement('a');a.href='/acf-whitepaper-${locale === 'fr' ? 'fr' : 'en'}.pdf';a.download='acf-whitepaper-${locale === 'fr' ? 'fr' : 'en'}.pdf';a.target='_parent';window.parent.document.body.appendChild(a);a.click();a.remove()" class="mfitem" style="display:block;text-decoration:none;color:inherit;cursor:pointer"><div class="mftitle">${m.megaMenu.framework.featured.whitepaper.title}</div><div class="mfdesc">${m.megaMenu.framework.featured.whitepaper.description}</div></a><div class="mfitem"><div class="mftitle">${m.megaMenu.framework.featured.release.title}</div><div class="mfdesc">${m.megaMenu.framework.featured.release.description}</div></div></div>
    </div>
    <div class="mp" id="panel-products">
      <div class="mpt"><a href="/standard">${m.megaMenu.products.link}</a></div>
      <div class="mpd">${m.megaMenu.products.subtitle}</div>
      <div class="mgroup"><div class="mgtitle">${m.megaMenu.products.diagnostic.title}</div><ul class="mlinks"><li><a href="https://www.acf-score.com/">${m.megaMenu.products.diagnostic.score}</a></li><li><a href="https://www.acf-score.com/pourquoi">${m.megaMenu.products.diagnostic.methodology}</a></li><li><a href="https://www.acf-score.com/calculator">${m.megaMenu.products.diagnostic.axes}</a></li></ul></div>
      <div class="mgroup"><div class="mgtitle">${m.megaMenu.products.saas.title}</div><ul class="mlinks"><li><a href="/${locale}/acf-control">${m.megaMenu.products.saas.control}</a></li><li><a href="/${locale}/acf-control#modules">${m.megaMenu.products.saas.kpis}</a></li><li><a href="/${locale}/acf-control#drift-engine">${m.megaMenu.products.saas.gating}</a></li></ul></div>
      <div class="mgroup"><div class="mgtitle">${m.megaMenu.products.certification.title}</div><ul class="mlinks"><li><a href="/${locale}/acf-certification">${m.megaMenu.products.certification.program}</a></li><li><a href="/${locale}/acf-certification#levels">${m.megaMenu.products.certification.levels}</a></li><li><a href="/${locale}/acf-certification#process">${m.megaMenu.products.certification.audit}</a></li></ul></div>
    </div>
    <div class="mp" id="panel-resources">
      <div class="mpt"><a href="/${locale}/blog">${m.megaMenu.resources.link}</a></div>
      <div class="mpd">${m.megaMenu.resources.subtitle}</div>
      <div class="mgroup"><div class="mgtitle">${m.megaMenu.resources.insights.title}</div><ul class="mlinks"><li><a href="/${locale}/blog#eu-ai-act-agentic-systems-2026">${m.megaMenu.resources.insights.aiAct}</a></li><li><a href="/${locale}/blog#delegated-decision-agent-officer">${m.megaMenu.resources.insights.dda}</a></li><li><a href="/${locale}/blog#three-level-kill-switch">${m.megaMenu.resources.insights.killSwitch}</a></li></ul></div>
      <div class="mgroup"><div class="mgtitle">${m.megaMenu.resources.documentation.title}</div><ul class="mlinks"><li><a href="/${locale}/standard">${m.megaMenu.resources.documentation.specs}</a></li><li><a href="/${locale}/blog">${m.megaMenu.resources.documentation.research}</a></li><li><a href="/${locale}/acf-certification#academy">${m.megaMenu.resources.documentation.academy}</a></li></ul></div>
      <div class="mgroup"><div class="mgtitle">${m.megaMenu.resources.tools.title}</div><ul class="mlinks"><li><a href="/${locale}/compliance-checker">${m.megaMenu.resources.tools.complianceChecker}</a></li><li><a href="https://artificialintelligenceact.eu/fr/evaluation/verificateur-de-conformite-a-l-acte-de-l-ai-de-l-ue/" target="_blank" rel="noopener">${m.megaMenu.resources.tools.euAiAct}</a></li></ul></div>
    </div>
    <div class="mp" id="panel-about">
      <div class="mpt"><a href="/${locale}/about">${m.megaMenu.about.link}</a></div>
      <div class="mpd">${m.megaMenu.about.subtitle}</div>
      <div class="mgroup"><div class="mgtitle">${m.megaMenu.about.whoWeAre.title}</div><ul class="mlinks"><li><a href="/${locale}/about#vincent">${m.megaMenu.about.whoWeAre.vincent}</a></li><li><a href="/${locale}/about#mission">${m.megaMenu.about.whoWeAre.mission}</a></li><li><a href="/${locale}/legal">${m.megaMenu.about.whoWeAre.legal}</a></li></ul></div>
      <div class="mgroup"><div class="mgtitle">${m.megaMenu.about.howWeWork.title}</div><ul class="mlinks"><li><a href="/${locale}/acf-partners">${m.megaMenu.about.howWeWork.network}</a></li><li><a href="/${locale}/acf-certification">${m.megaMenu.about.howWeWork.audit}</a></li><li><a href="/${locale}/contact">${m.megaMenu.about.howWeWork.contact}</a></li></ul></div>
      <div class="mfeat"><div class="mflbl">${m.megaMenu.about.registered.label}</div><div class="mfitem"><div class="mftitle">${m.megaMenu.about.registered.title}</div><div class="mfdesc">${m.megaMenu.about.registered.description}</div></div></div>
    </div>
    <div class="mp" id="panel-partners">
      <div class="mpt"><a href="/${locale}/acf-partners">${m.megaMenu.partners.link}</a></div>
      <div class="mpd">${m.megaMenu.partners.subtitle}</div>
      <div class="mgroup"><div class="mgtitle">${m.megaMenu.partners.portal.title}</div><ul class="mlinks"><li><a href="/${locale}/acf-partners"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg> ${m.megaMenu.partners.portal.login}</a></li><li><a href="/${locale}/acf-partners">${m.megaMenu.partners.portal.dashboard}</a></li><li><a href="/${locale}/acf-partners">${m.megaMenu.partners.portal.training}</a></li><li><a href="/${locale}/acf-partners">${m.megaMenu.partners.portal.toolkit}</a></li></ul></div>
      <div class="mgroup"><div class="mgtitle">${m.megaMenu.partners.become.title}</div><ul class="mlinks"><li><a href="/${locale}/acf-partners">${m.megaMenu.partners.become.apply}</a></li><li><a href="/${locale}/acf-partners">${m.megaMenu.partners.become.tiers}</a></li><li><a href="/${locale}/acf-certification">${m.megaMenu.partners.become.certified}</a></li></ul></div>
    </div>
  </div>
</div>

<!-- HERO -->
<section class="hero">
  <div class="hgrid"></div>
  <div class="hw">
    <div>
      
      <h1 class="rev d1">
        <span class="hl1">${m.hero.title}</span>
        <span class="hl2"><span id="typed"></span><span class="tc"></span></span>
      </h1>
      <p class="hdesc rev d2">${m.hero.description}</p>
      <div class="hact rev d3">
        <a href="/contact" class="btng">${m.hero.cta.primary}</a>
        <a href="/standard" class="btno">${m.hero.cta.secondary}</a>
      </div>
      <div class="hstats rev d4">
        <div class="hs"><div class="hsn">${m.hero.stats.principles.value}</div><div class="hsl">${m.hero.stats.principles.label}</div></div>
        <div class="hs"><div class="hsn">${m.hero.stats.modules.value}</div><div class="hsl">${m.hero.stats.modules.label}</div></div>
        <div class="hs"><div class="hsn">${m.hero.stats.kpis.value}</div><div class="hsl">${m.hero.stats.kpis.label}</div></div>
        <div class="hs"><div class="hsn">${m.hero.stats.tools.value}</div><div class="hsl">${m.hero.stats.tools.label}</div></div>
      </div>
    </div>
    <div class="hvis rev d2">
      <canvas id="dc"></canvas>
      <div class="orb">
        <div class="oring"><div class="ocore"><div class="oacf">ACF®</div><div class="ostd">Standard</div></div></div>
      </div>
      <div class="sat stop"><div class="sc"><div class="si"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div><div><div class="sn">${m.hero.satellites.score.name}</div><div class="ss">${m.hero.satellites.score.description}</div></div></div></div>
      <div class="sat sright"><div class="sc"><div class="si"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></div><div><div class="sn">${m.hero.satellites.control.name}</div><div class="ss">${m.hero.satellites.control.description}</div></div></div></div>
      <div class="sat sbott"><div class="sc"><div class="si"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg></div><div><div class="sn">${m.hero.satellites.certification.name}</div><div class="ss">${m.hero.satellites.certification.description}</div></div></div></div>
      <div class="sat sleft"><div class="sc"><div class="si"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></div><div><div class="sn">${m.hero.satellites.partners.name}</div><div class="ss">${m.hero.satellites.partners.description}</div></div></div></div>
    </div>
  </div>
</section>

<!-- STATS BAR -->
<div class="sbar" id="statsbar">
  <div class="sgrid">
    <div class="sc2"><div class="scw"><span class="ctr" id="c1">0</span></div><div class="slbl">${m.statsBar.layers.label}</div></div>
    <div class="sc2"><div class="scw"><span class="ctr" id="c2">0</span></div><div class="slbl">${m.statsBar.kpis.label}</div></div>
    <div class="sc2"><div class="scw"><span class="ctr" id="c3">0</span></div><div class="slbl">${m.statsBar.tools.label}</div></div>
    <div class="sc2"><div class="scw"><span class="ctr" id="c4">0</span><span class="csuf">${m.statsBar.sovereignty.suffix}</span></div><div class="slbl">${m.statsBar.sovereignty.label}</div></div>
  </div>
</div>

<!-- PRINCIPLES -->
<section class="secdark" id="principles">
  <div class="ctn">
    <span class="ew rev">${m.principles.badge}</span>
    <h2 class="st rev d1">${m.principles.title}</h2>
    <div class="gb rev d1"></div>
    <p class="sd rev d2">${m.principles.subtitle}</p>
    <div class="pgrid">
      <div class="pcard rev d1"><div class="pnw"><span class="pnum">${m.principles.principle1.number}</span><span class="pnl">PRINCIPLE</span></div><div class="pt">${m.principles.principle1.title}</div><p class="pd">${m.principles.principle1.description}</p><span class="ptag">SOVEREIGNTY</span></div>
      <div class="pcard rev d2"><div class="pnw"><span class="pnum">${m.principles.principle2.number}</span><span class="pnl">PRINCIPLE</span></div><div class="pt">${m.principles.principle2.title}</div><p class="pd">${m.principles.principle2.description}</p><span class="ptag">PROTECTION</span></div>
      <div class="pcard rev d3"><div class="pnw"><span class="pnum">${m.principles.principle3.number}</span><span class="pnl">PRINCIPLE</span></div><div class="pt">${m.principles.principle3.title}</div><p class="pd">${m.principles.principle3.description}</p><span class="ptag">CONTROL</span></div>
      <div class="pcard rev d4"><div class="pnw"><span class="pnum">${m.principles.principle4.number}</span><span class="pnl">PRINCIPLE</span></div><div class="pt">${m.principles.principle4.title}</div><p class="pd">${m.principles.principle4.description}</p><span class="ptag">CONTINUITY</span></div>
    </div>
  </div>
</section>

<!-- LAYERS -->
<section id="layers">
  <div class="ctn">
    <span class="ew rev">${m.layers.badge}</span>
    <h2 class="st rev d1">${m.layers.title}</h2>
    <div class="gb rev d1"></div>
    <p class="sd rev d2">${m.layers.subtitle}</p>
    <div class="lgrid">
      <div class="lcard rev d1">
        <div class="lico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
        <div class="lnum">${m.layers.layer1.number}</div><div class="lt">${m.layers.layer1.title}</div><div class="ld">${m.layers.layer1.description}</div>
      </div>
      <div class="lcard rev d2">
        <div class="lico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/></svg></div>
        <div class="lnum">${m.layers.layer2.number}</div><div class="lt">${m.layers.layer2.title}</div><div class="ld">${m.layers.layer2.description}</div>
      </div>
      <div class="lcard rev d3">
        <div class="lico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/></svg></div>
        <div class="lnum">${m.layers.layer3.number}</div><div class="lt">${m.layers.layer3.title}</div><div class="ld">${m.layers.layer3.description}</div>
      </div>
      <div class="lcard rev d4">
        <div class="lico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
        <div class="lnum">${m.layers.layer4.number}</div><div class="lt">${m.layers.layer4.title}</div><div class="ld">${m.layers.layer4.description}</div>
      </div>
    </div>
  </div>
</section>

<!-- MATURITY -->
<section class="secdark" id="maturity">
  <div class="ctn">
    <span class="ew rev">${m.maturity.badge}</span>
    <h2 class="st rev d1">${m.maturity.title}</h2>
    <div class="gb rev d1"></div>
    <p class="sd rev d2">${m.maturity.subtitle}</p>
    <div class="matwrap rev d2" id="matwrap">
      <div class="matlinebg"></div>
      <div class="matlinefg" id="matline"></div>
      <div class="mattrack">
        <div class="matcol" id="mc0"><div class="dotw"><div class="dot"></div></div><div class="mlvl">${m.maturity.level0.code}</div><div class="mname">${m.maturity.level0.name}</div><div class="risk rl">${m.maturity.level0.risk}</div><p class="mdesc">${m.maturity.level0.description}</p></div>
        <div class="matcol" id="mc1"><div class="dotw"><div class="dot"></div></div><div class="mlvl">${m.maturity.level1.code}</div><div class="mname">${m.maturity.level1.name}</div><div class="risk rl">${m.maturity.level1.risk}</div><p class="mdesc">${m.maturity.level1.description}</p></div>
        <div class="matcol" id="mc2"><div class="dotw"><div class="dot"></div></div><div class="mlvl">${m.maturity.level2.code}</div><div class="mname">${m.maturity.level2.name}</div><div class="risk rm">${m.maturity.level2.risk}</div><p class="mdesc">${m.maturity.level2.description}</p><div class="tbadge">${m.maturity.level2.badge}</div></div>
        <div class="matcol" id="mc3"><div class="dotw"><div class="dot"></div></div><div class="mlvl">${m.maturity.level3.code}</div><div class="mname">${m.maturity.level3.name}</div><div class="risk rh">${m.maturity.level3.risk}</div><p class="mdesc">${m.maturity.level3.description}</p></div>
      </div>
    </div>
  </div>
</section>

<!-- HEX PATH MODULES -->
<section class="hexsec" id="methodology">
  <div class="ctn">
    <span class="ew rev">${m.modules.badge}</span>
    <h2 class="st rev d1">${m.modules.title}</h2>
    <div class="gb rev d1"></div>
    <p class="sd rev d2">${m.modules.subtitle}</p>
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
          <div class="hxmod">${m.modules.module1.code}</div>
          <div class="hxname">${m.modules.module1.name}</div>
          <div class="hxdesc">${m.modules.module1.description}</div>
        </div>
      </div>
      <!-- MOD 02 - label above -->
      <div class="hxitem alt">
        <div class="hxlabel">
          <div class="hxmod">${m.modules.module2.code}</div>
          <div class="hxname">${m.modules.module2.name}</div>
          <div class="hxdesc">${m.modules.module2.description}</div>
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
          <div class="hxmod">${m.modules.module3.code}</div>
          <div class="hxname">${m.modules.module3.name}</div>
          <div class="hxdesc">${m.modules.module3.description}</div>
        </div>
      </div>
      <!-- MOD 04 - label above -->
      <div class="hxitem alt">
        <div class="hxlabel">
          <div class="hxmod">${m.modules.module4.code}</div>
          <div class="hxname">${m.modules.module4.name}</div>
          <div class="hxdesc">${m.modules.module4.description}</div>
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
          <div class="hxmod">${m.modules.module8.code}</div>
          <div class="hxname">${m.modules.module8.name}</div>
          <div class="hxdesc">${m.modules.module8.description}</div>
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
          <div class="hxmod">${m.modules.module7.code}</div>
          <div class="hxname">${m.modules.module7.name}</div>
          <div class="hxdesc">${m.modules.module7.description}</div>
        </div>
      </div>
      <!-- MOD 06 - label above -->
      <div class="hxitem alt">
        <div class="hxlabel">
          <div class="hxmod">${m.modules.module6.code}</div>
          <div class="hxname">${m.modules.module6.name}</div>
          <div class="hxdesc">${m.modules.module6.description}</div>
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
          <div class="hxmod">${m.modules.module5.code}</div>
          <div class="hxname">${m.modules.module5.name}</div>
          <div class="hxdesc">${m.modules.module5.description}</div>
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
        <span class="ew rev">${m.video.badge}</span>
        <h2 class="st rev d1">${m.video.title}</h2>
        <div class="gb rev d1"></div>
        <p class="vdesc rev d2">${m.video.description1}</p>
        <p class="vdesc rev d3" style="margin-top:16px">${m.video.description2}</p>
        <div class="vquote rev d3">
          <div class="vqline"></div>
          <div class="vqbody">
            <div class="vqtext">"${m.video.quote.text}"</div>
            <div class="vqauthor">${m.video.quote.author}</div>
          </div>
        </div>
      </div>
      <div class="videobox rev d2">
        <div class="vplayer" id="vplayer" onclick="openVideoModal()">
          <div class="vthumbnail">
            <div class="vtgrid"></div>
            <div class="vtcontent">
              <div class="vtbadge">${m.video.player.badge}</div>
              <div class="vtname">${m.video.player.name}</div>
              <div class="vtrole">${m.video.player.role}</div>
            </div>
          </div>
          <div class="vplaybtn">
            <div class="vplayring">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--navy)"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
          <div class="vduration">${m.video.player.duration}</div>
          <div class="vtframes"></div>
        </div>
        <div class="vstats">
          <div class="vstat"><span class="vsn">${m.video.stats.release.value}</span><span class="vsl">${m.video.stats.release.label}</span></div>
          <div class="vstat"><span class="vsn">${m.video.stats.documentation.value}</span><span class="vsl">${m.video.stats.documentation.label}</span></div>
          <div class="vstat"><span class="vsn">${m.video.stats.protection.value}</span><span class="vsl">${m.video.stats.protection.label}</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- VIDEO MODAL — CINEMATIC ANIMATION -->
<div class="aimodal" id="videomodal" style="z-index:1100">
  <div class="aimodalbg" onclick="closeVideoModal()"></div>
  <div id="cinematic-container" style="position:relative;z-index:1;width:1060px;max-width:96vw;background:#030810;border-radius:16px;overflow:hidden;aspect-ratio:16/9;border:1px solid rgba(201,168,76,.15);box-shadow:0 0 80px rgba(201,168,76,.08)">
    <button onclick="closeVideoModal()" style="position:absolute;top:14px;right:14px;z-index:100;background:rgba(0,0,0,.8);border:1px solid rgba(255,255,255,.15);color:#fff;width:36px;height:36px;border-radius:50%;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.2s;backdrop-filter:blur(10px)" onmouseover="this.style.borderColor='#c9a84c';this.style.color='#c9a84c'" onmouseout="this.style.borderColor='rgba(255,255,255,.15)';this.style.color='#fff'">x</button>

    <!-- Canvas: particles + effects -->
    <canvas id="cinematic-particles" style="position:absolute;inset:0;width:100%;height:100%;z-index:1"></canvas>

    <!-- Scanline effect -->
    <div class="cin-scanline"></div>

    <!-- Vignette overlay -->
    <div style="position:absolute;inset:0;z-index:3;background:radial-gradient(ellipse at center,transparent 50%,rgba(0,0,0,.6));pointer-events:none"></div>

    <!-- Grid overlay -->
    <div id="cin-grid" style="position:absolute;inset:0;z-index:2;background-image:linear-gradient(rgba(201,168,76,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.04) 1px,transparent 1px);background-size:50px 50px;pointer-events:none;opacity:0;transition:opacity 1.5s"></div>

    <!-- Shockwave ring container -->
    <div id="cin-shockwave" style="position:absolute;inset:0;z-index:4;pointer-events:none;overflow:hidden"></div>

    <!-- Content -->
    <div id="cin-content" style="position:absolute;inset:0;z-index:10;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;padding:40px">

      <!-- Scene 0: Blackout + glitch intro -->
      <div class="cin-scene" id="cin-s0" style="opacity:0">
        <div id="cin-glitch-text" style="font-family:'JetBrains Mono',monospace;font-size:clamp(11px,1.2vw,14px);color:rgba(201,168,76,.8);letter-spacing:.3em;text-transform:uppercase"></div>
      </div>

      <!-- Scene 1: The Problem — typing effect -->
      <div class="cin-scene" id="cin-s1" style="opacity:0">
        <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.2em;color:rgba(201,168,76,.5);margin-bottom:20px">// ${locale === 'fr' ? 'ALERTE SYSTEME' : 'SYSTEM ALERT'}</div>
        <div id="cin-type1" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(22px,3.5vw,44px);font-weight:800;color:#fff;line-height:1.2;max-width:750px"></div>
        <div id="cin-sub1" style="font-size:clamp(13px,1.5vw,16px);color:rgba(255,255,255,.4);margin-top:20px;max-width:550px;opacity:0;transition:opacity .8s">
          ${locale === 'fr'
            ? 'Pricing. Scoring. Engagement client. Logistique. Supply chain. RH.'
            : 'Pricing. Scoring. Customer engagement. Logistics. Supply chain. HR.'}
        </div>
      </div>

      <!-- Scene 2: The Question — dramatic shake -->
      <div class="cin-scene" id="cin-s2" style="opacity:0">
        <div id="cin-question" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,4.5vw,56px);font-weight:900;color:#fff;line-height:1.1">
          ${locale === 'fr'
            ? 'Qui <span style="color:#ef4444;text-shadow:0 0 30px rgba(239,68,68,.5)">gouverne</span><br>vos agents ?'
            : 'Who <span style="color:#ef4444;text-shadow:0 0 30px rgba(239,68,68,.5)">governs</span><br>your agents?'}
        </div>
        <div style="width:60px;height:2px;background:linear-gradient(90deg,transparent,#ef4444,transparent);margin:20px auto 0;opacity:.6"></div>
      </div>

      <!-- Scene 3: ACF Logo — explosive reveal -->
      <div class="cin-scene" id="cin-s3" style="opacity:0">
        <div id="cin-logo-wrap" style="position:relative;margin-bottom:28px">
          <div id="cin-logo-ring1" style="position:absolute;top:50%;left:50%;width:120px;height:120px;border:1px solid rgba(201,168,76,.3);border-radius:50%;transform:translate(-50%,-50%) scale(0);opacity:0"></div>
          <div id="cin-logo-ring2" style="position:absolute;top:50%;left:50%;width:180px;height:180px;border:1px solid rgba(201,168,76,.15);border-radius:50%;transform:translate(-50%,-50%) scale(0);opacity:0"></div>
          <div id="cin-logo" style="position:relative;width:90px;height:90px;border-radius:18px;background:linear-gradient(135deg,#c9a84c,#e8c96a);display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-size:24px;font-weight:900;color:#050c1a;margin:0 auto;transform:scale(0) rotate(-180deg);transition:none">ACF</div>
        </div>
        <div id="cin-title1" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(22px,3.2vw,40px);font-weight:800;color:#fff;opacity:0;transform:translateY(15px);transition:all .6s cubic-bezier(.16,1,.3,1)">Agentic Commerce</div>
        <div id="cin-title2" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(22px,3.2vw,40px);font-weight:800;opacity:0;transform:translateY(15px);transition:all .6s cubic-bezier(.16,1,.3,1) .15s" class="cin-glow">Framework<span style="color:#e8c96a">(R)</span></div>
        <div id="cin-tagline" style="font-size:clamp(12px,1.3vw,15px);color:rgba(255,255,255,.45);margin-top:16px;letter-spacing:.08em;opacity:0;transition:opacity .8s .5s">
          ${locale === 'fr' ? 'Le standard mondial de gouvernance des agents IA' : 'The global standard for AI agent governance'}
        </div>
      </div>

      <!-- Scene 4: 4 Principles — cards fly in from sides -->
      <div class="cin-scene" id="cin-s4" style="opacity:0;width:100%">
        <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.2em;color:rgba(201,168,76,.5);margin-bottom:28px">// ${locale === 'fr' ? '4 PRINCIPES FONDATEURS' : '4 FOUNDING PRINCIPLES'}</div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;max-width:840px;margin:0 auto">
          <div class="cin-card" data-dir="left" style="opacity:0;transform:translateX(-80px) scale(.8)"><div style="font-family:'Space Grotesk',sans-serif;font-size:32px;font-weight:900;color:#c9a84c;line-height:1">01</div><div style="font-size:12px;color:#fff;margin-top:8px;font-weight:700">${locale === 'fr' ? 'Separation' : 'Separation'}</div><div style="font-size:10px;color:rgba(255,255,255,.35);margin-top:4px;line-height:1.4">${locale === 'fr' ? 'Decision / Execution' : 'Decision / Execution'}</div></div>
          <div class="cin-card" data-dir="bottom" style="opacity:0;transform:translateY(60px) scale(.8)"><div style="font-family:'Space Grotesk',sans-serif;font-size:32px;font-weight:900;color:#c9a84c;line-height:1">02</div><div style="font-size:12px;color:#fff;margin-top:8px;font-weight:700">${locale === 'fr' ? 'Zones' : 'Zones'}</div><div style="font-size:10px;color:rgba(255,255,255,.35);margin-top:4px;line-height:1.4">${locale === 'fr' ? 'Non delegables' : 'Non-delegable'}</div></div>
          <div class="cin-card" data-dir="top" style="opacity:0;transform:translateY(-60px) scale(.8)"><div style="font-family:'Space Grotesk',sans-serif;font-size:32px;font-weight:900;color:#c9a84c;line-height:1">03</div><div style="font-size:12px;color:#fff;margin-top:8px;font-weight:700">${locale === 'fr' ? 'Tracabilite' : 'Traceability'}</div><div style="font-size:10px;color:rgba(255,255,255,.35);margin-top:4px;line-height:1.4">${locale === 'fr' ? '& Interruptibilite' : '& Interruptibility'}</div></div>
          <div class="cin-card" data-dir="right" style="opacity:0;transform:translateX(80px) scale(.8)"><div style="font-family:'Space Grotesk',sans-serif;font-size:32px;font-weight:900;color:#c9a84c;line-height:1">04</div><div style="font-size:12px;color:#fff;margin-top:8px;font-weight:700">${locale === 'fr' ? 'Gouvernance' : 'Governance'}</div><div style="font-size:10px;color:rgba(255,255,255,.35);margin-top:4px;line-height:1.4">${locale === 'fr' ? 'Vivante' : 'Living'}</div></div>
        </div>
      </div>

      <!-- Scene 5: Stats — explosive counters -->
      <div class="cin-scene" id="cin-s5" style="opacity:0;width:100%">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px;max-width:740px;margin:0 auto">
          <div style="text-align:center"><div class="cin-counter" data-target="4" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(40px,5.5vw,64px);font-weight:900;color:#c9a84c;line-height:1" class="cin-glow">0</div><div style="font-size:10px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.12em;margin-top:8px">${locale === 'fr' ? 'Principes' : 'Principles'}</div></div>
          <div style="text-align:center"><div class="cin-counter" data-target="8" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(40px,5.5vw,64px);font-weight:900;color:#c9a84c;line-height:1" class="cin-glow">0</div><div style="font-size:10px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.12em;margin-top:8px">Modules</div></div>
          <div style="text-align:center"><div class="cin-counter" data-target="18" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(40px,5.5vw,64px);font-weight:900;color:#c9a84c;line-height:1" class="cin-glow">0</div><div style="font-size:10px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.12em;margin-top:8px">KPIs</div></div>
          <div style="text-align:center"><div class="cin-counter" data-target="3" style="font-family:'Space Grotesk',sans-serif;font-size:clamp(40px,5.5vw,64px);font-weight:900;color:#c9a84c;line-height:1" class="cin-glow">0</div><div style="font-size:10px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.12em;margin-top:8px">${locale === 'fr' ? 'Certifications' : 'Certifications'}</div></div>
        </div>
        <div id="cin-punchline" style="margin-top:36px;font-family:'Space Grotesk',sans-serif;font-size:clamp(16px,2vw,24px);font-weight:700;color:#fff;opacity:0;transition:opacity .8s .6s">
          ${locale === 'fr' ? 'Un framework. Une vision. Un standard.' : 'One framework. One vision. One standard.'}
        </div>
      </div>

      <!-- Scene 6: CTA — grand finale -->
      <div class="cin-scene" id="cin-s6" style="opacity:0">
        <div style="font-family:'Space Grotesk',sans-serif;font-size:clamp(20px,3vw,36px);font-weight:800;color:#fff;margin-bottom:28px;line-height:1.2">
          ${locale === 'fr' ? 'Pret a gouverner<br>vos agents ?' : 'Ready to govern<br>your agents?'}
        </div>
        <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
          <a href="https://www.acf-score.com/" target="_blank" rel="noopener" onclick="closeVideoModal()" style="display:inline-block;padding:16px 36px;border-radius:12px;background:linear-gradient(135deg,#c9a84c,#e8c96a);color:#050c1a;font-weight:800;font-size:15px;text-decoration:none;transition:.3s;font-family:'Space Grotesk',sans-serif;box-shadow:0 0 30px rgba(201,168,76,.3)" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 40px rgba(201,168,76,.5)'" onmouseout="this.style.transform='';this.style.boxShadow='0 0 30px rgba(201,168,76,.3)'">${locale === 'fr' ? 'Diagnostic gratuit' : 'Free diagnostic'} &#8594;</a>
          <a href="/${locale}/standard" onclick="closeVideoModal()" style="display:inline-block;padding:16px 36px;border-radius:12px;border:1px solid rgba(201,168,76,.3);color:#c9a84c;font-weight:700;font-size:15px;text-decoration:none;transition:.3s;font-family:'Space Grotesk',sans-serif;backdrop-filter:blur(10px)" onmouseover="this.style.borderColor='#c9a84c';this.style.transform='translateY(-3px)'" onmouseout="this.style.borderColor='rgba(201,168,76,.3)';this.style.transform=''">${locale === 'fr' ? 'Lire le standard' : 'Read the standard'} &#8594;</a>
        </div>
      </div>

    </div>

    <!-- Progress bar -->
    <div style="position:absolute;bottom:0;left:0;right:0;height:3px;z-index:20;background:rgba(255,255,255,.06)">
      <div id="cin-progress" style="height:100%;width:0%;background:linear-gradient(90deg,#c9a84c,#e8c96a);box-shadow:0 0 10px rgba(201,168,76,.5);transition:width .1s linear"></div>
    </div>

    <!-- Replay -->
    <button id="cin-replay" onclick="startCinematic()" style="display:none;position:absolute;bottom:14px;right:14px;z-index:20;background:rgba(0,0,0,.8);border:1px solid rgba(201,168,76,.3);color:#c9a84c;font-size:11px;padding:8px 16px;border-radius:8px;cursor:pointer;font-family:'JetBrains Mono',monospace;letter-spacing:.06em;backdrop-filter:blur(10px);transition:.2s" onmouseover="this.style.borderColor='#c9a84c'" onmouseout="this.style.borderColor='rgba(201,168,76,.3)'">&#8635; Replay</button>
  </div>
</div>

<!-- PRODUCTS -->
<section class="secdark">
  <div class="ctn">
    <span class="ew rev">${m.products.badge}</span>
    <h2 class="st rev d1">${m.products.title}</h2>
    <div class="gb rev d1"></div>
    <p class="sd rev d2">${m.products.subtitle}</p>
  </div>
  <div class="prodgrid" style="max-width:1320px;margin:60px auto 0;padding:0 40px">
    <div class="pc rev d1">
      <div class="piw"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
      <div class="plbl">${m.products.score.label}</div><div class="ptitle">${m.products.score.title}</div>
      <div class="pdesc">${m.products.score.description}</div>
      <ul class="pfeat"><li>${m.products.score.features.feature1}</li><li>${m.products.score.features.feature2}</li><li>${m.products.score.features.feature3}</li></ul>
      <a href="https://acf-score.com" class="plink" target="_blank">${m.products.score.cta}</a>
    </div>
    <div class="pc rev d2">
      <div class="piw"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg></div>
      <div class="plbl">${m.products.control.label}</div><div class="ptitle">${m.products.control.title}</div>
      <div class="pdesc">${m.products.control.description}</div>
      <ul class="pfeat"><li>${m.products.control.features.feature1}</li><li>${m.products.control.features.feature2}</li><li>${m.products.control.features.feature3}</li></ul>
      <a href="/control" class="plink">${m.products.control.cta}</a>
    </div>
    <div class="pc rev d3">
      <div class="piw"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg></div>
      <div class="plbl">${m.products.certification.label}</div><div class="ptitle">${m.products.certification.title}</div>
      <div class="pdesc">${m.products.certification.description}</div>
      <ul class="pfeat"><li>${m.products.certification.features.feature1}</li><li>${m.products.certification.features.feature2}</li><li>${m.products.certification.features.feature3}</li></ul>
      <a href="/certification" class="plink">${m.products.certification.cta}</a>
    </div>
  </div>
</section>

<!-- BLOG -->
<section>
  <div class="ctn">
    <span class="ew rev">${m.blog.badge}</span>
    <h2 class="st rev d1">${m.blog.title}</h2>
    <div class="gb rev d1"></div>
    <p class="sd rev d2">${m.blog.subtitle}</p>
    <div class="bgrid">
      <a href="/blog/ai-act" class="bcard rev d1">
        <div class="bimg"><img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=400&fit=crop&q=80" alt="" loading="lazy"><div class="bovl"></div><span class="bcat">${m.blog.article1.category}</span></div>
        <div class="bbody"><div class="btitle">${m.blog.article1.title}</div><div class="bexc">${m.blog.article1.excerpt}</div><div class="bmeta"><span class="bdate">${m.blog.article1.date}</span><span class="bread">${m.blog.article1.cta}</span></div></div>
      </a>
      <a href="/blog/dda" class="bcard rev d2">
        <div class="bimg"><img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80" alt="" loading="lazy"><div class="bovl"></div><span class="bcat">${m.blog.article2.category}</span></div>
        <div class="bbody"><div class="btitle">${m.blog.article2.title}</div><div class="bexc">${m.blog.article2.excerpt}</div><div class="bmeta"><span class="bdate">${m.blog.article2.date}</span><span class="bread">${m.blog.article2.cta}</span></div></div>
      </a>
      <a href="/blog/kill-switch" class="bcard rev d3">
        <div class="bimg"><img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&q=80" alt="" loading="lazy"><div class="bovl"></div><span class="bcat">${m.blog.article3.category}</span></div>
        <div class="bbody"><div class="btitle">${m.blog.article3.title}</div><div class="bexc">${m.blog.article3.excerpt}</div><div class="bmeta"><span class="bdate">${m.blog.article3.date}</span><span class="bread">${m.blog.article3.cta}</span></div></div>
      </a>
    </div>
    <div style="text-align:center;margin-top:40px" class="rev"><a href="/blog" class="btno">${m.blog.viewAll}</a></div>
  </div>
</section>

<!-- CTA -->
<section class="ctasec">
  <div class="ctawm">${m.cta.watermark}</div>
  <div class="ctn ctain">
    <span class="ew">${m.cta.badge}</span>
    <h2>${m.cta.title}</h2>
    <p>${m.cta.description}</p>
    <div class="ctabtns">
      <a href="/contact" class="btng">${m.cta.primary}</a>
      <a href="/partners/apply" class="btno">${m.cta.secondary}</a>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="ctn">
    <div class="fgrid">
      <div><a href="/" class="logo"><div class="lb">ACF</div><div><div class="ln">${m.footer.logoText}</div><div class="ls">${m.footer.logoSubtext}</div></div></a><p class="fdesc">${m.footer.description}</p></div>
      <div><div class="ftitle">${m.footer.framework.title}</div><ul class="flinks"><li><a href="/standard">${m.footer.framework.theStandard}</a></li><li><a href="/method">${m.footer.framework.methodology}</a></li><li><a href="/research">${m.footer.framework.research}</a></li><li><a href="/certification">${m.footer.framework.certification}</a></li></ul></div>
      <div><div class="ftitle">${m.footer.products.title}</div><ul class="flinks"><li><a href="/score">${m.footer.products.score}</a></li><li><a href="/control">${m.footer.products.control}</a></li><li><a href="/certification">${m.footer.products.certification}</a></li><li><a href="/academy">${m.footer.products.academy}</a></li></ul></div>
      <div><div class="ftitle">${m.footer.organization.title}</div><ul class="flinks"><li><a href="/partners/login">${m.footer.organization.partnerPortal}</a></li><li><a href="/about">${m.footer.organization.about}</a></li><li><a href="/contact">${m.footer.organization.contact}</a></li><li><a href="/legal">${m.footer.organization.legal}</a></li></ul></div>
    </div>
    <div class="fbot">
      <div class="fcopy">${m.footer.copyright}</div>
      <div class="flegal"><a href="/privacy">${m.footer.legal.privacy}</a><a href="/terms">${m.footer.legal.terms}</a><a href="/cookies">${m.footer.legal.cookies}</a></div>
    </div>
  </div>
</footer>


<script>
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
function switchLocale(loc){closeRegion();document.cookie='NEXT_LOCALE='+loc+';path=/;max-age=31536000;samesite=lax';window.parent.location.href='/'+loc+'/'}

// ══ MEGA MENU ══
function openMega(){document.getElementById('mo').classList.add('open');document.getElementById('megadrawer').classList.add('open');document.body.style.overflow='hidden'}
function closeMega(){document.getElementById('mo').classList.remove('open');document.getElementById('megadrawer').classList.remove('open');document.body.style.overflow=''}
function showPanel(id){
  document.querySelectorAll('.mni').forEach(function(el){el.classList.toggle('active',el.dataset.panel===id)});
  document.querySelectorAll('.mp').forEach(function(el){el.classList.toggle('active',el.id==='panel-'+id)});
}
document.getElementById('hambtn').addEventListener('click',openMega);
addEventListener('keydown',function(e){if(e.key==='Escape'){closeMega();closeRegion();closeVideoModal()}});

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
var words=['${m.hero.typing.word1}','${m.hero.typing.word2}','${m.hero.typing.word3}','${m.hero.typing.word4}'],wi=0,ci=0,del=false,paused=false;
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

// ══ VIDEO MODAL — CINEMATIC ANIMATION ══
var cinTimers=[];
function openVideoModal(){
  document.getElementById('videomodal').classList.add('open');
  document.body.style.overflow='hidden';
  setTimeout(startCinematic,100);
}
function closeVideoModal(){
  document.getElementById('videomodal').classList.remove('open');
  document.body.style.overflow='';
  cinTimers.forEach(function(t){clearTimeout(t)});
  cinTimers=[];
  if(window._cinRAF)cancelAnimationFrame(window._cinRAF);
}
function cinDelay(ms){return new Promise(function(r){cinTimers.push(setTimeout(r,ms))})}

// ══ ADVANCED PARTICLE SYSTEM ══
function initParticles(mode){
  var canvas=document.getElementById('cinematic-particles');
  if(!canvas)return;
  var ctx=canvas.getContext('2d');
  var dpr=window.devicePixelRatio||1;
  canvas.width=canvas.offsetWidth*dpr;
  canvas.height=canvas.offsetHeight*dpr;
  ctx.scale(dpr,dpr);
  var W=canvas.offsetWidth,H=canvas.offsetHeight;
  var cx=W/2,cy=H/2;
  var particles=[];var sparks=[];var time=0;
  // Ambient particles
  for(var i=0;i<80;i++){
    particles.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,r:Math.random()*1.2+.4,o:Math.random()*.35+.1,phase:Math.random()*Math.PI*2});
  }
  window._cinSpawnBurst=function(x,y,count,color){
    for(var i=0;i<count;i++){
      var angle=Math.random()*Math.PI*2;
      var speed=1+Math.random()*4;
      sparks.push({x:x||cx,y:y||cy,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life:1,decay:.01+Math.random()*.02,r:Math.random()*2+1,color:color||'201,168,76'});
    }
  };
  function draw(){
    ctx.clearRect(0,0,W,H);
    time+=.016;
    // Ambient particles
    for(var i=0;i<particles.length;i++){
      var p=particles[i];
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;
      if(p.y<0)p.y=H;if(p.y>H)p.y=0;
      var flicker=.5+.5*Math.sin(time*2+p.phase);
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle='rgba(201,168,76,'+(p.o*flicker)+')';ctx.fill();
      for(var j=i+1;j<particles.length;j++){
        var q=particles[j];var dx=p.x-q.x,dy=p.y-q.y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<100){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle='rgba(201,168,76,'+(1-d/100)*.08+')';ctx.lineWidth=.4;ctx.stroke()}
      }
    }
    // Sparks (burst particles)
    for(var i=sparks.length-1;i>=0;i--){
      var s=sparks[i];
      s.x+=s.vx;s.y+=s.vy;s.vx*=.97;s.vy*=.97;s.life-=s.decay;
      if(s.life<=0){sparks.splice(i,1);continue}
      ctx.beginPath();ctx.arc(s.x,s.y,s.r*s.life,0,Math.PI*2);
      ctx.fillStyle='rgba('+s.color+','+s.life+')';ctx.fill();
      // Trail
      ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(s.x-s.vx*3,s.y-s.vy*3);
      ctx.strokeStyle='rgba('+s.color+','+(s.life*.4)+')';ctx.lineWidth=s.r*s.life*.6;ctx.stroke();
    }
    window._cinRAF=requestAnimationFrame(draw);
  }
  draw();
}

// ══ SHOCKWAVE ══
function spawnShockwave(color){
  var container=document.getElementById('cin-shockwave');
  if(!container)return;
  var ring=document.createElement('div');
  ring.style.cssText='position:absolute;top:50%;left:50%;width:80px;height:80px;border:2px solid '+(color||'rgba(201,168,76,.6)')+';border-radius:50%;animation:cinPulseRing 1.2s ease-out forwards;pointer-events:none';
  container.appendChild(ring);
  setTimeout(function(){ring.remove()},1300);
}

// ══ TYPING EFFECT ══
function typeText(el,text,speed){
  return new Promise(function(resolve){
    el.innerHTML='';var i=0;
    var cursor=document.createElement('span');cursor.className='cin-typing-cursor';
    function type(){
      if(i<text.length){
        // Handle HTML tags
        if(text[i]==='<'){var end=text.indexOf('>',i);el.innerHTML+=text.substring(i,end+1);i=end+1}
        else{el.innerHTML+=text[i];i++}
        el.appendChild(cursor);
        cinTimers.push(setTimeout(type,speed||35));
      }else{setTimeout(function(){cursor.remove();resolve()},400)}
    }
    type();
  });
}

// ══ COUNTER ANIMATION (explosive) ══
function animateCounters(){
  var counters=document.querySelectorAll('.cin-counter');
  counters.forEach(function(el,idx){
    var target=parseInt(el.getAttribute('data-target'),10);
    var duration=800+idx*200;var start=null;
    function step(ts){
      if(!start)start=ts;
      var progress=Math.min((ts-start)/duration,1);
      var eased=1-Math.pow(1-progress,4);
      el.textContent=Math.round(eased*target);
      if(progress>=1){
        el.style.textShadow='0 0 20px rgba(201,168,76,.6),0 0 40px rgba(201,168,76,.3)';
        if(window._cinSpawnBurst){
          var rect=el.getBoundingClientRect();
          var container=document.getElementById('cinematic-particles');
          if(container){var cr=container.getBoundingClientRect();window._cinSpawnBurst(rect.left-cr.left+rect.width/2,rect.top-cr.top+rect.height/2,8)}
        }
      }else{requestAnimationFrame(step)}
    }
    cinTimers.push(setTimeout(function(){requestAnimationFrame(step)},idx*150));
  });
}

// ══ SCENE SHOW/HIDE ══
function showScene(id,opts){
  var el=document.getElementById(id);if(!el)return;
  opts=opts||{};
  el.style.transition='opacity '+(opts.fadeIn||.7)+'s ease, transform '+(opts.fadeIn||.7)+'s cubic-bezier(.16,1,.3,1)';
  el.style.opacity='1';
  el.style.transform='scale(1) translate(0,0)';
}
function hideScene(id,opts){
  return new Promise(function(resolve){
    var el=document.getElementById(id);if(!el){resolve();return}
    opts=opts||{};
    el.style.transition='opacity '+(opts.fadeOut||.5)+'s ease, transform '+(opts.fadeOut||.5)+'s ease';
    el.style.opacity='0';
    el.style.transform=opts.exitTransform||'scale(1.05) translateY(-15px)';
    cinTimers.push(setTimeout(resolve,(opts.fadeOut||.5)*1000+50));
  });
}

// ══ MAIN SEQUENCE ══
function startCinematic(){
  // Reset
  document.querySelectorAll('.cin-scene').forEach(function(s){s.style.opacity='0';s.style.transform='scale(.9)';s.style.transition='none'});
  document.getElementById('cin-replay').style.display='none';
  document.getElementById('cin-progress').style.width='0%';
  document.getElementById('cin-grid').style.opacity='0';
  document.querySelectorAll('.cin-counter').forEach(function(c){c.textContent='0';c.style.textShadow='none'});
  document.querySelectorAll('.cin-card').forEach(function(c){c.style.transition='none';c.style.opacity='0'});
  var progress=document.getElementById('cin-progress');
  var total=26000;var t0=Date.now();
  var pInt=setInterval(function(){var p=Math.min((Date.now()-t0)/total*100,100);progress.style.width=p+'%';if(p>=100)clearInterval(pInt)},60);

  initParticles();

  // === SCENE 0: Glitch intro (2s) ===
  var s0text='${locale === 'fr' ? 'INITIALISATION DU PROTOCOLE...' : 'INITIALIZING PROTOCOL...'}';
  showScene('cin-s0',{fadeIn:.3});
  var glitchEl=document.getElementById('cin-glitch-text');
  var gi=0;var glitchInt=setInterval(function(){
    if(gi<s0text.length){glitchEl.textContent=s0text.substring(0,gi+1);gi++}
    else{clearInterval(glitchInt)}
  },50);
  // Flash effect
  cinDelay(800).then(function(){spawnShockwave('rgba(201,168,76,.4)')});
  cinDelay(1200).then(function(){document.getElementById('cin-grid').style.opacity='1'});

  // === SCENE 1: The Problem (4.5s) ===
  cinDelay(2200).then(function(){
    return hideScene('cin-s0',{fadeOut:.3});
  }).then(function(){
    showScene('cin-s1',{fadeIn:.6});
    var typeEl=document.getElementById('cin-type1');
    var msg='${locale === 'fr' ? 'Vos agents prennent des decisions sans vous.' : 'Your agents make decisions without you.'}';
    return typeText(typeEl,msg,30);
  }).then(function(){
    document.getElementById('cin-sub1').style.opacity='1';
    return cinDelay(2500);
  }).then(function(){
    // === SCENE 2: The Question (3.5s) ===
    return hideScene('cin-s1');
  }).then(function(){
    showScene('cin-s2',{fadeIn:.4});
    spawnShockwave('rgba(239,68,68,.4)');
    // Shake the question
    var q=document.getElementById('cin-question');
    if(q){q.style.animation='cinShake .6s ease .3s'}
    return cinDelay(3200);
  }).then(function(){
    // === SCENE 3: ACF Logo reveal (4.5s) ===
    return hideScene('cin-s2',{exitTransform:'scale(.9) translateY(10px)'});
  }).then(function(){
    showScene('cin-s3',{fadeIn:.3});
    // Logo: spin + scale in
    var logo=document.getElementById('cin-logo');
    if(logo){
      logo.style.transition='transform .9s cubic-bezier(.16,1,.3,1), box-shadow .9s';
      logo.style.transform='scale(1) rotate(0deg)';
      logo.style.boxShadow='0 0 80px rgba(201,168,76,.6),0 0 160px rgba(201,168,76,.2)';
    }
    // Rings expand
    cinDelay(200).then(function(){
      var r1=document.getElementById('cin-logo-ring1');
      var r2=document.getElementById('cin-logo-ring2');
      if(r1){r1.style.transition='all 1s cubic-bezier(.16,1,.3,1)';r1.style.transform='translate(-50%,-50%) scale(1)';r1.style.opacity='1'}
      if(r2){r2.style.transition='all 1.2s cubic-bezier(.16,1,.3,1) .15s';r2.style.transform='translate(-50%,-50%) scale(1)';r2.style.opacity='1'}
    });
    // Burst
    cinDelay(300).then(function(){
      if(window._cinSpawnBurst)window._cinSpawnBurst(null,null,40);
      spawnShockwave();spawnShockwave('rgba(232,201,106,.3)');
    });
    // Titles fade in
    cinDelay(600).then(function(){
      document.getElementById('cin-title1').style.opacity='1';
      document.getElementById('cin-title1').style.transform='translateY(0)';
    });
    cinDelay(800).then(function(){
      document.getElementById('cin-title2').style.opacity='1';
      document.getElementById('cin-title2').style.transform='translateY(0)';
    });
    cinDelay(1000).then(function(){
      document.getElementById('cin-tagline').style.opacity='1';
    });
    return cinDelay(4200);
  }).then(function(){
    // === SCENE 4: Principles (4.5s) ===
    return hideScene('cin-s3');
  }).then(function(){
    showScene('cin-s4',{fadeIn:.5});
    // Cards fly in from different directions
    var cards=document.querySelectorAll('.cin-card');
    cards.forEach(function(card,i){
      cinDelay(200+i*250).then(function(){
        card.style.transition='all .7s cubic-bezier(.16,1,.3,1)';
        card.style.opacity='1';
        card.style.transform='translateX(0) translateY(0) scale(1)';
        // Mini burst on each card
        if(window._cinSpawnBurst){
          var rect=card.getBoundingClientRect();
          var cr=document.getElementById('cinematic-particles').getBoundingClientRect();
          window._cinSpawnBurst(rect.left-cr.left+rect.width/2,rect.top-cr.top+rect.height/2,6);
        }
      });
    });
    return cinDelay(4200);
  }).then(function(){
    // === SCENE 5: Stats (4.5s) ===
    return hideScene('cin-s4');
  }).then(function(){
    showScene('cin-s5',{fadeIn:.5});
    animateCounters();
    cinDelay(1500).then(function(){
      document.getElementById('cin-punchline').style.opacity='1';
      spawnShockwave();
    });
    return cinDelay(4200);
  }).then(function(){
    // === SCENE 6: CTA — stays ===
    return hideScene('cin-s5');
  }).then(function(){
    showScene('cin-s6',{fadeIn:.8});
    if(window._cinSpawnBurst)window._cinSpawnBurst(null,null,25);
    spawnShockwave('rgba(201,168,76,.5)');
    clearInterval(pInt);progress.style.width='100%';
    cinDelay(1200).then(function(){document.getElementById('cin-replay').style.display='block'});
  });
}

</script>
<script>
var REMAP={'/certification':'/acf-certification','/partners':'/acf-partners','/score':'/acf-score','/control':'/acf-control','/partners/login':'/acf-partners','/partners/apply':'/acf-partners','/method':'/standard','/academy':'/acf-certification','/research':'/blog','/privacy':'/legal','/terms':'/legal','/cookies':'/legal'};
var LOCALES=['en','fr','es','de','it','pt','nl','pl','sv','da','no','fi','zh','ru'];
document.addEventListener('click',function(e){
  var a=e.target.closest('a');
  if(!a)return;
  var h=a.getAttribute('href');
  if(!h)return;
  if(h.indexOf('http')===0){e.preventDefault();window.open(h,'_blank');return;}
  if(h.charAt(0)==='#'){closeMega();return;}
  if(h.charAt(0)!=='/')return;
  if(a.getAttribute('onclick'))return;
  // Let PDF/file downloads go through to parent directly
  if(h.match(/\\.(pdf|zip|doc|docx|xls|xlsx)$/i)){e.preventDefault();window.parent.location.href=h;return;}
  e.preventDefault();
  var parts=h.split('/');
  if(parts.length>1&&LOCALES.indexOf(parts[1])!==-1){h='/'+parts.slice(2).join('/');}
  var path=h.split('#')[0].split('?')[0];
  if(path.indexOf('/blog/')===0)h='/blog';
  if(REMAP[path])h=REMAP[path]+h.substring(path.length);
  window.parent.location.href='/${locale}'+h;
});
</script>
</body>
</html>
`

export default function Home() {
  const locale = useLocale()
  const m = messagesMap[locale] || messagesMap.en
  return (
    <>
      <iframe
        srcDoc={buildHTML(locale, m)}
        style={{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",border:"none",zIndex:9999}}
        title="ACF Standard"
      />
      <div style={{position:"fixed",bottom:0,right:0,zIndex:10000}}>
        <AIAgent />
      </div>
    </>
  )
}
