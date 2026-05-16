import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

export default function Marquee({ text, speed = 1 }) {
  const marqueeRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // We clone the text dynamically to ensure seamless loop
    const tl = gsap.timeline({ repeat: -1 });
    
    // Animate the text container to move left by half its width (since it's doubled)
    tl.to(marqueeRef.current, {
      xPercent: -50,
      ease: 'none',
      duration: 10 / speed,
    });
  }, { scope: marqueeRef });

  // Duplicate text 4 times to fill the screen
  const duplicatedText = Array(4).fill(text);

  return (
    <div style={{
      width: '100%',
      overflow: 'hidden',
      padding: '40px 0',
      background: '#39FF88',
      display: 'flex',
      alignItems: 'center',
      borderTop: '1px solid rgba(0,0,0,0.1)',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      transform: 'rotate(-2deg) scale(1.05)',
      boxShadow: '0 20px 40px rgba(57,255,136,0.1)',
      zIndex: 20,
      position: 'relative'
    }}>
      <div 
        ref={marqueeRef} 
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          width: 'fit-content'
        }}
      >
        {duplicatedText.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '4rem',
              fontWeight: 900,
              color: '#050505',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              padding: '0 2rem'
            }}>
              {t}
            </span>
            <span style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#050505',
              margin: '0 1rem'
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}
