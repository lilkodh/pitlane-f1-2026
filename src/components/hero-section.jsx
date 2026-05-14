import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const containerRef = useRef()
  const carRef = useRef()
  const title1Ref = useRef()
  const title2Ref = useRef()

  useGSAP(() => {
    // Split text animation
    const chars1 = title1Ref.current.querySelectorAll('.split-char')
    const chars2 = title2Ref.current.querySelectorAll('.split-char')
    
    const tl = gsap.timeline()
    
    // Animate characters flying in from Z-axis (behind camera)
    tl.fromTo([...chars1, ...chars2], 
      { z: 2000, opacity: 0, scale: 3 },
      { z: 0, opacity: 1, scale: 1, duration: 2, stagger: 0.05, ease: 'power4.out' }
    )

    // Scroll Parallax
    gsap.to(carRef.current, {
      y: 200, // Move Y
      scale: 1.3, // Accelerate forward
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    })

    gsap.to([title1Ref.current, title2Ref.current], {
      y: -150,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5
      }
    })
  }, { scope: containerRef })

  const splitText = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="split-char" style={{ transformStyle: 'preserve-3d' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden" style={{ perspective: '1000px' }}>
      
      {/* Massive Car Render (Layered behind text) */}
      <div ref={carRef} className="absolute z-10 w-[120vw] md:w-[90vw] max-w-none flex items-center justify-center pointer-events-none" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -40%)' }}>
        <img 
          src="/src/assets/cars/ferrari-2026.webp" 
          alt="2026 Formula 1 Car" 
          className="w-full h-auto object-contain"
          style={{ filter: 'drop-shadow(0 0 100px rgba(57,255,136,0.15))' }}
          onError={(e) => {
            // Fallback cinematic block if missing
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        <div className="hidden w-[80vw] h-[40vh] border border-[#39FF88]/30 rounded-[3rem] items-center justify-center bg-black/50 backdrop-blur-md shadow-[0_0_80px_rgba(57,255,136,0.1)]">
          <span className="font-hero text-[#FFD60A] text-2xl tracking-[0.3em]">CAR RENDER MISSING</span>
        </div>
      </div>

      {/* Overlapping Typography */}
      <div className="relative z-20 flex flex-col items-center justify-center pointer-events-none w-full px-4" style={{ transformStyle: 'preserve-3d' }}>
        <h1 ref={title1Ref} className="hero-text text-[clamp(4rem,12vw,15rem)] text-white text-center drop-shadow-2xl whitespace-nowrap">
          {splitText('THE NEW')}
        </h1>
        <h1 ref={title2Ref} className="hero-text text-[clamp(4rem,12vw,15rem)] text-[#39FF88] text-center drop-shadow-[0_0_60px_rgba(57,255,136,0.5)] whitespace-nowrap mt-[-2%]">
          {splitText('ERA')}
        </h1>
      </div>

    </section>
  )
}
