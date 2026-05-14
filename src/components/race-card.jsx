import { useRef, useCallback } from 'react'
import gsap from 'gsap'

export default function RaceCard({ race }) {
  const innerRef = useRef()
  const glareRef = useRef()

  const handleMouseMove = useCallback((e) => {
    const rect = innerRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    // Normalize -1 to 1
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)

    // 3D Tilt & Glow
    gsap.to(innerRef.current, {
      rotateX: -dy * 15,
      rotateY: dx * 15,
      scale: 1.05,
      boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 ${40 - Math.abs(dx)*10}px rgba(57,255,136,0.3)`,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out'
    })

    // Glare position
    const gx = ((e.clientX - rect.left) / rect.width) * 100
    const gy = ((e.clientY - rect.top) / rect.height) * 100
    glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.2) 0%, rgba(57,255,136,0.1) 40%, transparent 70%)`
    glareRef.current.style.opacity = '1'
  }, [])

  const handleMouseLeave = useCallback(() => {
    gsap.to(innerRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 0px rgba(57,255,136,0)',
      duration: 0.7,
      ease: 'power3.out'
    })
    glareRef.current.style.opacity = '0'
  }, [])

  return (
    <div style={{ perspective: '1200px' }} className="w-full">
      <div 
        ref={innerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full rounded-2xl overflow-hidden cursor-pointer"
        style={{
          height: '400px',
          background: 'rgba(11, 11, 11, 0.4)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
      >
        {/* Specular Glare */}
        <div ref={glareRef} className="absolute inset-0 z-20 pointer-events-none opacity-0 transition-opacity duration-300 rounded-2xl" />

        {/* Top 70% Image */}
        <div className="absolute top-0 left-0 right-0 h-[70%] overflow-hidden z-0 bg-[#050505]">
          <img 
            src={race.image} 
            alt={race.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
          {/* Subtle dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0b0b0b] opacity-80" />
        </div>

        {/* Bottom 30% Info */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] p-6 z-10 flex flex-col justify-end" style={{ transformStyle: 'preserve-3d' }}>
          <h3 className="font-hero text-2xl font-bold text-white mb-1" style={{ transform: 'translateZ(30px)' }}>{race.title}</h3>
          <p className="text-[#FFD60A] text-sm font-bold tracking-widest uppercase" style={{ transform: 'translateZ(20px)' }}>{race.subtitle}</p>
        </div>
      </div>
    </div>
  )
}
