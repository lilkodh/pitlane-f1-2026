import NavBar from './components/nav-bar'
import Background8D from './components/background-8d'
import HeroSection from './components/hero-section'
import CardGrid from './components/card-grid'
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function App() {
  // Smooth scrolling for the parallax
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen text-white bg-[#050505] selection:bg-[#39FF88]/30 selection:text-[#39FF88]">
      <div className="noise-overlay" />
      <NavBar />
      <Background8D />
      
      <main className="relative z-10 w-full flex flex-col">
        <HeroSection />
        <CardGrid />
      </main>
    </div>
  )
}
