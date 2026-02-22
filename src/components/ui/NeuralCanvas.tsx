'use client'
import React, { useEffect, useRef } from 'react'

export default function NeuralCanvas(){
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(()=>{
    const c = ref.current; if(!c) return
    const el = c as HTMLCanvasElement
    const x = el.getContext('2d')!
    let raf = 0
    function sz(){el.width = window.innerWidth; el.height = window.innerHeight}
    sz(); window.addEventListener('resize', sz)
    const pts: any[] = []
    for(let i=0;i<90;i++) pts.push({x:Math.random()*el.width,y:Math.random()*el.height,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4})
    function draw(){
      x.clearRect(0,0,el.width,el.height)
      for(let i=0;i<pts.length;i++){
        pts[i].x += pts[i].vx; pts[i].y += pts[i].vy
        if(pts[i].x<0||pts[i].x>el.width) pts[i].vx *= -1
        if(pts[i].y<0||pts[i].y>el.height) pts[i].vy *= -1
        x.beginPath(); x.arc(pts[i].x,pts[i].y,1.5,0,Math.PI*2); x.fillStyle='rgba(201,168,76,.75)'; x.fill()
        for(let j=i+1;j<pts.length;j++){
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx*dx+dy*dy)
          if(d<160){ x.beginPath(); x.moveTo(pts[i].x,pts[i].y); x.lineTo(pts[j].x,pts[j].y); x.strokeStyle = 'rgba(201,168,76,'+((1-d/160)*.4)+')'; x.lineWidth = .7; x.stroke() }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return ()=>{ window.removeEventListener('resize', sz); cancelAnimationFrame(raf) }
  },[])

  return <canvas id="neural" ref={ref} />
}
