'use client'
import React, { useEffect, useRef } from 'react'

export default function DiagramCanvas(){
  const ref = useRef<HTMLCanvasElement | null>(null)
  useEffect(()=>{
    const canvas = ref.current; if(!canvas) return
    const el = canvas as HTMLCanvasElement
    const x = el.getContext('2d')!
    let raf = 0
    function sz(){ el.width = el.offsetWidth; el.height = el.offsetHeight }
    sz(); window.addEventListener('resize', sz)
    let pulses: any[] = []
    let tick = 0
    function nodes(){ const cx = el.width/2, cy = el.height/2; return [{x:cx,y:cy*.12},{x:el.width*.96,y:cy},{x:cx,y:el.height*.88},{x:el.width*.04,y:cy}] }
    function spawn(){ const ns = nodes(); const n = ns[Math.floor(Math.random()*ns.length)]; const cx = el.width/2, cy = el.height/2; const tc = Math.random()>.5; pulses.push({sx: tc ? n.x : cx, sy: tc ? n.y : cy, ex: tc? cx : n.x, ey: tc? cy : n.y, t:0, spd:.008+Math.random()*.005, col: Math.random()>.3 ? '201,168,76' : '80,180,255'}) }
    function draw(){
      x.clearRect(0,0,el.width,el.height)
      const ns = nodes(), cx = el.width/2, cy = el.height/2
      ns.forEach(n=>{ x.beginPath(); x.moveTo(cx,cy); x.lineTo(n.x,n.y); x.strokeStyle='rgba(201,168,76,.1)'; x.lineWidth=1; x.stroke() })
      tick++; if(tick%50===0) spawn()
      for(let i=pulses.length-1;i>=0;i--){ const p = pulses[i]; p.t += p.spd; if(p.t>=1){ pulses.splice(i,1); continue } const px = p.sx + (p.ex-p.sx)*p.t, py = p.sy + (p.ey-p.sy)*p.t; const g = x.createRadialGradient(px,py,0,px,py,6); g.addColorStop(0,'rgba('+p.col+',.9)'); g.addColorStop(1,'rgba('+p.col+',0)'); x.beginPath(); x.arc(px,py,5,0,Math.PI*2); x.fillStyle = g; x.fill(); const tpx = p.sx + (p.ex-p.sx)*Math.max(0,p.t-.15), tpy = p.sy + (p.ey-p.sy)*Math.max(0,p.t-.15); x.beginPath(); x.moveTo(tpx,tpy); x.lineTo(px,py); x.strokeStyle = 'rgba('+p.col+',.25)'; x.lineWidth = 1.5; x.stroke() }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return ()=>{ window.removeEventListener('resize', sz); cancelAnimationFrame(raf) }
  },[])

  return <canvas id="dc" ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%'}} />
}
