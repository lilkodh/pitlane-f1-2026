import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const PHRASES = ['SYSTEMS CHECK', 'TYRE WARM-UP', 'LIGHTS OUT'];

/** Stitch: 000 → 100 km/h over 2.5s, then GSAP cinematic exit */
const COUNTER_MS = 2500;

export function IgnitionScreen({ onComplete }) {
  const rootRef = useRef(null);
  const barRef = useRef(null);
  const phraseRef = useRef(null);
  const [speed, setSpeed] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const finishedRef = useRef(false);

  useEffect(() => {
    let raf;
    const t0 = performance.now();
    const loop = (t) => {
      const p = Math.min(1, (t - t0) / COUNTER_MS);
      setSpeed(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(loop);
      else if (!finishedRef.current && rootRef.current) {
        finishedRef.current = true;
        gsap.to(rootRef.current, {
          y: -48,
          opacity: 0,
          filter: 'blur(10px)',
          duration: 0.55,
          ease: 'power2.inOut',
          onComplete: () => onComplete?.(),
        });
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPhraseIndex((i) => (i + 1) % PHRASES.length);
    }, 900);
    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      if (barRef.current) {
        gsap.fromTo(
          barRef.current,
          { scaleX: 0.02 },
          { scaleX: 1, duration: 2.45, ease: 'power2.inOut' }
        );
      }
    },
    { scope: rootRef }
  );

  useGSAP(
    () => {
      if (!phraseRef.current) return undefined;
      gsap.fromTo(
        phraseRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    },
    { dependencies: [phraseIndex], scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-carbon"
      role="status"
      aria-live="assertive"
      aria-label="Pitlane startup sequence"
    >
      <p className="font-mono text-sm tracking-[0.35em] text-glow/90">IGNITION</p>
      <p
        ref={phraseRef}
        key={phraseIndex}
        className="mt-6 font-mono text-lg font-bold text-titanium md:text-2xl"
      >
        {PHRASES[phraseIndex]}
      </p>
      <div className="mt-10 font-mono text-6xl font-bold tabular-nums text-f1red md:text-8xl">
        {String(speed).padStart(3, '0')}
        <span className="ml-2 text-2xl text-titanium/60 md:text-3xl">km/h</span>
      </div>
      <div className="mt-12 h-1.5 w-64 overflow-hidden rounded-full bg-white/10 md:w-96">
        <div
          ref={barRef}
          className="h-full origin-left rounded-full bg-gradient-to-r from-f1red via-red-500 to-glow shadow-glow"
          style={{ transform: 'scaleX(0.02)' }}
        />
      </div>
    </div>
  );
}
