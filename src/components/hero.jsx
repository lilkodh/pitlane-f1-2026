import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Link } from 'react-router';
import { ChevronRight, MapPin, Zap } from 'lucide-react';
import ParticleBackground from '../components/particle-background.jsx';
import CountdownTimer from '../components/countdown-timer.jsx';
import { getNextRace } from '../data/races.js';
import heroCarImg from '../assets/hero-car.png';

// ============================================================
// Hero — 8D cinematic entrance for the Pitlane home page
// Layers: WebGL particles → Typography (Behind) → Hero Car → Typography (Front)
// ============================================================

const HEADLINE = "PITLANE";
const SUBHEAD = "F1 2026";

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const carRef = useRef(null);
  const innerCarRef = useRef(null);
  const panelRef = useRef(null);
  const taglineRef = useRef(null);
  const nextRace = getNextRace();

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // 1. Initial State: Typography splits and flies in from Z
    const chars = titleRef.current.querySelectorAll('.hero-char');
    tl.fromTo(chars,
      { 
        opacity: 0, 
        z: 1000, 
        rotateX: 90, 
        scale: 2 
      },
      { 
        opacity: 1, 
        z: 0, 
        rotateX: 0, 
        scale: 1, 
        duration: 1.2, 
        stagger: 0.05, 
        ease: 'expo.out' 
      }
    );

    // 2. Car reveal — accelerating in from bottom
    tl.fromTo(carRef.current,
      { opacity: 0, scale: 0.6, y: 200 },
      { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: 'power4.out' },
      '-=0.8'
    );

    // 3. Tagline & Panel rise
    tl.fromTo([taglineRef.current, panelRef.current],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' },
      '-=0.5'
    );

    // 4. Parallax Scroll Logic
    // Typography moves slower (depth)
    gsap.to(titleRef.current, {
      y: -200,
      opacity: 0.2,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Car moves FASTER and SCALES UP (approaching camera)
    gsap.to(carRef.current, {
      y: -150,
      scale: 1.3,
      rotateX: 5,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Particles streak past camera (warp effect)
    gsap.to('.particle-wrapper', {
      scale: 2.5,
      opacity: 0.2,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    });

    // 5. 8D 360 Mouse Tilt Physics
    const onMouseMove = (e) => {
      if (!innerCarRef.current || !titleRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;
      
      // 360-degree floating car
      gsap.to(innerCarRef.current, {
        rotateX: yPos * -15, 
        rotateY: xPos * 25,  
        x: xPos * 50,        
        y: yPos * 30,
        rotationZ: xPos * 2, // Slight banking       
        duration: 1.2,
        ease: 'power3.out',
        transformPerspective: 1200,
        transformOrigin: 'center center',
      });

      // Inverse parallax on typography
      gsap.to(titleRef.current, {
        x: xPos * -40,
        rotateY: xPos * -10,
        rotateX: yPos * 5,
        duration: 1.5,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    };

    const onMouseLeave = () => {
      if (!innerCarRef.current || !titleRef.current) return;
      gsap.to(innerCarRef.current, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        rotationZ: 0,
        duration: 1.5,
        ease: 'elastic.out(1, 0.4)',
      });
      gsap.to(titleRef.current, {
        x: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 1.5,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    const currentHero = heroRef.current;
    currentHero.addEventListener('mousemove', onMouseMove);
    currentHero.addEventListener('mouseleave', onMouseLeave);

    return () => {
      currentHero.removeEventListener('mousemove', onMouseMove);
      currentHero.removeEventListener('mouseleave', onMouseLeave);
    };

  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '130vh', // Extra height for scroll momentum
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#050505',
      }}
    >
      {/* Layer 1: WebGL Background */}
      <div className="particle-wrapper" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <ParticleBackground />
      </div>

      {/* Layer 2: Subtle Depth Gradient */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(circle at 50% 50%, rgba(var(--color-accent-rgb), 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Layer 3: The 8D Hero Car */}
      <div
        ref={carRef}
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          maxWidth: '1600px',
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          marginTop: '100px',
          transformStyle: 'preserve-3d',
        }}
      >
        <div ref={innerCarRef} style={{ width: '100%', display: 'flex', justifyContent: 'center', transformStyle: 'preserve-3d' }}>
          <img
            src={heroCarImg}
            alt="2026 F1 Concept"
            style={{
              width: '95%',
              height: 'auto',
              filter: 'drop-shadow(0 0 100px rgba(var(--color-accent-rgb), 0.2)) drop-shadow(0 20px 40px rgba(0,0,0,0.8))',
              mixBlendMode: 'screen', // Blends black background if present
            }}
          />
        </div>
      </div>

      {/* Layer 4: Massive Typography (Split Text - Overlapping Car) */}
      <div 
        ref={titleRef}
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 4,
          perspective: '1200px',
          textAlign: 'center',
          width: '100%',
          pointerEvents: 'none',
        }}
      >
        <div style={{ transformStyle: 'preserve-3d' }}>
          {HEADLINE.split('').map((char, i) => (
            <span 
              key={i} 
              className="hero-char"
              style={{
                display: 'inline-block',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(6rem, 15vw, 15rem)',
                fontWeight: 900,
                color: '#F0F0F0',
                letterSpacing: '-0.05em',
                lineHeight: 1,
                textShadow: '0 20px 40px rgba(0,0,0,0.5)',
              }}
            >
              {char}
            </span>
          ))}
        </div>
        <div 
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--color-accent)',
            letterSpacing: '0.5em',
            marginTop: '-20px',
            opacity: 0.8,
            textShadow: '0 10px 20px rgba(var(--color-accent-rgb), 0.5)',
            transition: 'color 0.4s ease, text-shadow 0.4s ease'
          }}
        >
          {SUBHEAD}
        </div>
      </div>

      {/* Layer 5: Floating Content Overlay */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '5%',
        right: '5%',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
      }}>
        <div ref={taglineRef} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '40px', height: '2px', background: 'var(--color-accent)', transition: 'background 0.4s ease' }} />
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            color: 'var(--color-accent)',
            textTransform: 'uppercase',
            transition: 'color 0.4s ease'
          }}>
            The Future of Racing is Here
          </span>
        </div>

        {nextRace && (
          <div
            ref={panelRef}
            style={{
              background: 'rgba(11, 11, 11, 0.4)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '32px 40px',
              display: 'flex',
              alignItems: 'center',
              gap: '60px',
              maxWidth: '850px',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ flex: 1 }}>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.7rem', fontWeight: 700,
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.15em', marginBottom: '10px'
              }}>
                UPCOMING GRAND PRIX
              </p>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.8rem', fontWeight: 800,
                color: '#FFF', letterSpacing: '-0.02em'
              }}>
                {nextRace.flag} {nextRace.name}
              </h3>
            </div>
            
            <div style={{ width: '1px', height: '60px', background: 'rgba(255,255,255,0.1)' }} />

            <CountdownTimer targetDate={nextRace.date} />

            <Link
              to={`/calendar/${nextRace.id}`}
              style={{
                background: 'var(--color-accent)',
                color: '#050505',
                padding: '16px 28px',
                borderRadius: '12px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: '0.9rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 0 20px rgba(var(--color-accent-rgb), 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 0 40px rgba(var(--color-accent-rgb), 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(var(--color-accent-rgb), 0.2)';
              }}
            >
              RACE CENTER <ChevronRight size={18} />
            </Link>
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        opacity: 0.4
      }}>
        <div style={{
          width: '24px',
          height: '40px',
          border: '2px solid #F0F0F0',
          borderRadius: '12px',
          position: 'relative'
        }}>
          <div style={{
            width: '4px',
            height: '8px',
            background: 'var(--color-accent)',
            borderRadius: '2px',
            position: 'absolute',
            top: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'scrollAnim 2s infinite',
            transition: 'background 0.4s ease'
          }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollAnim {
          0% { top: 8px; opacity: 1; }
          100% { top: 24px; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
