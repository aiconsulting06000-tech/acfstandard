import React from 'react'
import Hero from '../../src/components/home/Hero'
import StatsBar from '../../src/components/home/StatsBar'
import Principles from '../../src/components/home/Principles'
import Layers from '../../src/components/home/Layers'
import Maturity from '../../src/components/home/Maturity'
import Methodology from '../../src/components/home/Methodology'
import Ecosystem from '../../src/components/home/Ecosystem'
import HexPath from '../../src/components/home/HexPath'
import VideoSection from '../../src/components/home/VideoSection'
import Products from '../../src/components/home/Products'
import Blog from '../../src/components/home/Blog'
import CTA from '../../src/components/home/CTA'
import NeuralCanvas from '../../src/components/ui/NeuralCanvas'
import DiagramCanvas from '../../src/components/ui/DiagramCanvas'
import AIWidget from '../../src/components/ui/AIWidget'

export default function Page(){
  return (
    <>
      <NeuralCanvas />
      <Hero />
      <StatsBar />
      <Principles />
      <Layers />
      <Maturity />
      <Methodology />
      <Ecosystem />
      <HexPath />
      <VideoSection />
      <Products />
      <Blog />
      <CTA />
      <AIWidget />
    </>
  )
}
