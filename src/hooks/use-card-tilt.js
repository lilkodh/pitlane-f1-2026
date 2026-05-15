import { useRef, useCallback } from 'react';
import { gsap } from 'gsap';

// ============================================================
// useCardTilt — 3D mouse-tracking tilt physics for race cards
// Returns { cardRef, handleMouseMove, handleMouseLeave }
// ============================================================

export function useCardTilt(intensity = 15) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const frameRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;

    // Cancel any pending animation frame
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    frameRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();

      // Mouse position relative to card center (values from -1 to +1)
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Tilt angles
      const rotateX = -y * intensity;
      const rotateY = x * intensity;

      // Apply 3D transform via GSAP
      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformOrigin: 'center center',
        duration: 0.4,
        ease: 'power2.out',
      });

      // Move glare highlight to follow cursor
      const glare = card.querySelector('.card-glare');
      if (glare) {
        const glareX = (x + 0.5) * 100;
        const glareY = (y + 0.5) * 100;
        gsap.to(glare, {
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          opacity: 1,
          duration: 0.3,
        });
      }

      // Intensify green glow on hover
      gsap.to(card, {
        boxShadow: `0 0 40px rgba(57,255,136,0.25), 0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(57,255,136,0.2)`,
        duration: 0.3,
      });
    });
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (!cardRef.current) return;

    const card = cardRef.current;

    // Reset all transforms smoothly
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });

    const glare = card.querySelector('.card-glare');
    if (glare) {
      gsap.to(glare, { opacity: 0, duration: 0.4 });
    }
  }, []);

  return { cardRef, handleMouseMove, handleMouseLeave };
}
