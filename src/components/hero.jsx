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
// Layers: WebGL particles → gradient → typography → glass panel
// ============================================================

const HEADLINE_WORDS = ['BUILD', 'THE', 'FUTURE'];
const SUBHEAD = 'OF SPEED.';

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const panelRef = useRef(null);
  const taglineRef = useRef(null);
  const carRef = useRef(null);
  const nextRace = getNextRace();

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // 1. Tagline fades in first
    tl.fromTo(taglineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );

    // 2. Each headline word slams in from Z-axis (depth)
    tl.fromTo(
      titleRef.current.querySelectorAll('.hero-word'),
      { z: -400, opacity: 0, rotateX: 45, scale: 0.5 },
      { z: 0, opacity: 1, rotateX: 0, scale: 1, duration: 0.9, stagger: 0.18, ease: 'expo.out', transformPerspective: 1200 },
      '-=0.2'
    );

    // 3. Sub-heading slides in
    tl.fromTo(subRef.current,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );

    // 4. Glass panel rises from bottom
    tl.fromTo(panelRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );

    // 5. Slow parallax on scroll
    gsap.to(titleRef.current, {
      y: -120,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    });

    // Car moves faster and scales slightly for dynamic 3D depth
    gsap.to(carRef.current, {
      y: -60,
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Initial car reveal
    gsap.fromTo(carRef.current,
      { opacity: 0, scale: 0.8, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.4 }
    );
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '72px',
      }}
    >
      {/* Layer 1 — WebGL Particle Field */}
      <ParticleBackground />

      {/* Layer 2 — Radial background gradient */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(57,255,136,0.06) 0%, rgba(5,5,5,0) 70%)',
        pointerEvents: 'none',
      }} />

      {/* Layer 2b — bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', zIndex: 2,
        background: 'linear-gradient(to bottom, transparent, #050505)',
        pointerEvents: 'none',
      }} />

      {/* Layer 3 — Massive Hero Car Render */}
      <img
        ref={carRef}
        src={heroCarImg}
        alt="2026 Formula 1 Car"
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '1400px',
          zIndex: 2,
          pointerEvents: 'none',
          objectFit: 'contain',
          mixBlendMode: 'screen',
        }}
      />

      {/* Layer 4 — Content */}
      <div style={{
        position: 'relative', zIndex: 3,
        width: '100%', maxWidth: '1200px',
        margin: '0 auto', padding: '0 32px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', gap: '32px',
      }}>

        {/* Season tagline */}
        <div ref={taglineRef} style={{ opacity: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '2px', background: '#39FF88' }} />
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.7rem', fontWeight: 700,
            letterSpacing: '0.25em', color: '#39FF88',
            textTransform: 'uppercase',
          }}>
            2026 FIA FORMULA 1 WORLD CHAMPIONSHIP
          </span>
        </div>

        {/* Layer 4 — Massive headline */}
        <div
          ref={titleRef}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {HEADLINE_WORDS.map((word) => (
            <div
              key={word}
              className="hero-word"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(4rem, 12vw, 12rem)',
                fontWeight: 700,
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                color: '#F0F0F0',
                display: 'block',
                opacity: 0,
                transformStyle: 'preserve-3d',
              }}
            >
              {word}
            </div>
          ))}

          {/* Sub-heading */}
          <div
            ref={subRef}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(4rem, 12vw, 12rem)',
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: '#39FF88',
              display: 'block',
              opacity: 0,
              textShadow: '0 0 80px rgba(57,255,136,0.4), 0 0 200px rgba(57,255,136,0.1)',
            }}
          >
            {SUBHEAD}
          </div>
        </div>

        {/* Layer 5 — Glass panel (next race info + countdown) */}
        {nextRace && (
          <div
            ref={panelRef}
            style={{
              opacity: 0,
              background: 'rgba(11,11,11,0.55)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '28px 32px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '40px',
              alignItems: 'center',
              maxWidth: '700px',
            }}
          >
            {/* Next race info */}
            <div style={{ flex: '1 1 200px' }}>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.6rem', fontWeight: 700,
                letterSpacing: '0.2em', color: 'rgba(240,240,240,0.35)',
                marginBottom: '8px', textTransform: 'uppercase',
              }}>
                NEXT RACE — RD. {nextRace.round}
              </p>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.35rem', fontWeight: 700,
                color: '#F0F0F0', marginBottom: '6px',
                letterSpacing: '-0.01em',
              }}>
                {nextRace.flag} {nextRace.name}
              </h2>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(240,240,240,0.45)' }}>
                  <MapPin size={11} /> {nextRace.circuit}
                </span>
                {nextRace.isSprint && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.65rem', fontWeight: 700, color: '#FFD60A' }}>
                    <Zap size={11} /> SPRINT WEEKEND
                  </span>
                )}
              </div>
            </div>

            {/* Divider */}
            <div style={{ width: '1px', height: '60px', background: 'rgba(255,255,255,0.07)' }} className="hidden-mobile" />

            {/* Countdown */}
            <CountdownTimer targetDate={nextRace.date} label="RACE STARTS IN" />

            {/* CTA */}
            <Link
              to={`/calendar/${nextRace.id}`}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: '#39FF88', color: '#050505',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.8rem', fontWeight: 700,
                letterSpacing: '0.05em', padding: '10px 18px',
                borderRadius: '8px', textDecoration: 'none',
                transition: 'all 0.2s ease', whiteSpace: 'nowrap',
              }}
            >
              RACE INFO <ChevronRight size={14} />
            </Link>
          </div>
        )}
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '50%',
        transform: 'translateX(-50%)', zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        animation: 'scrollBounce 2s ease-in-out infinite',
      }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(240,240,240,0.25)' }}>SCROLL</span>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(57,255,136,0.5), transparent)' }} />
      </div>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  );
}
