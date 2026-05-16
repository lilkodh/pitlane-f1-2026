import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// ============================================================
// CustomCursor — High-Fidelity 8D "Hard Better" Cursor
// Features: Velocity stretching, Magnetic snapping, Blend modes
// ============================================================

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const labelRef = useRef(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    // Hide default cursor for the true premium feel
    document.body.style.cursor = 'none';

    const ctx = gsap.context(() => {
      let mouse = { x: 0, y: 0 };
      let pos = { x: 0, y: 0 };
      let ratio = 0.15;
      let active = false;

      const onMouseMove = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        // Velocity & Angle calculation for stretching
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;
        const velocity = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        // Dot follows instantly
        gsap.to(cursorRef.current, {
          x: mouse.x,
          y: mouse.y,
          duration: 0.1,
        });

        // Follower stretches based on velocity
        gsap.to(followerRef.current, {
          x: mouse.x,
          y: mouse.y,
          rotation: angle,
          scaleX: 1 + velocity / 100, // Stretch on movement
          scaleY: 1 - velocity / 200, // Squish on movement
          duration: 0.6,
          ease: 'power3.out',
        });

        pos.x = mouse.x;
        pos.y = mouse.y;

        // Check for interactive elements
        const target = e.target;
        const isClickable = target.closest('a, button, [role="button"], .race-card-hover');
        
        if (isClickable) {
          if (!active) {
            active = true;
            gsap.to(followerRef.current, {
              scale: 2.5,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.5)',
              mixBlendMode: 'difference',
              duration: 0.4
            });
            gsap.to(cursorRef.current, { opacity: 0, duration: 0.2 });
            
            // Set label if applicable
            if (target.closest('.race-card-hover')) setLabel('VIEW');
            else setLabel('');
          }
        } else {
          if (active) {
            active = false;
            gsap.to(followerRef.current, {
              scale: 1,
              backgroundColor: 'transparent',
              borderColor: 'rgba(var(--color-accent-rgb), 0.4)',
              mixBlendMode: 'normal',
              duration: 0.4
            });
            gsap.to(cursorRef.current, { opacity: 1, duration: 0.2 });
            setLabel('');
          }
        }
      };

      const onMouseDown = () => {
        gsap.to(followerRef.current, { scale: 0.8, duration: 0.2 });
      };

      const onMouseUp = () => {
        gsap.to(followerRef.current, { scale: active ? 2.5 : 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mouseup', onMouseUp);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mouseup', onMouseUp);
        document.body.style.cursor = 'auto';
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Center Dot */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          background: 'var(--color-accent)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10001,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 15px var(--color-accent)',
          transition: 'background 0.4s ease, box-shadow 0.4s ease'
        }}
      />
      {/* Outer Follower Ring */}
      <div
        ref={followerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          border: '1px solid rgba(var(--color-accent-rgb), 0.4)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFF',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '8px',
          fontWeight: 700,
          letterSpacing: '0.1em',
        }}
      >
        <span style={{ opacity: label ? 1 : 0, transition: 'opacity 0.2s' }}>{label}</span>
      </div>
    </>
  );
}
