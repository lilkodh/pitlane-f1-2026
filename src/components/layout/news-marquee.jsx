import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const HEADLINES = [
  'Cadillac débarque en Formule 1 — onze constructeurs en piste',
  'Réglementation 2026 : aéro active, carburant durable à 100 %',
  'Madrid rejoint le calendrier — nouveau tracé urbain',
  'Norris champion en titre — la saison 2026 s’annonce ouverte',
];

export function NewsMarquee() {
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return undefined;
      const half = track.scrollWidth / 2;
      if (!half) return undefined;
      const tween = gsap.to(track, {
        x: -half,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });
      return () => tween.kill();
    },
    { scope: trackRef }
  );

  const blocks = ['a', 'b'].map((suffix) => (
    <span key={suffix} className="inline-flex items-center gap-3 pr-12">
      <span className="text-f1red">● LIVE</span>
      {HEADLINES.map((h) => (
        <span key={`${suffix}-${h}`} className="text-titanium/90">
          {h}
        </span>
      ))}
    </span>
  ));

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-f1red/30 bg-carbon/90 py-2 text-xs font-mono uppercase tracking-widest text-titanium/90 backdrop-blur-md md:text-sm"
      aria-live="polite"
    >
      <div className="overflow-hidden whitespace-nowrap">
        <div ref={trackRef} className="inline-flex w-max will-change-transform">
          {blocks}
        </div>
      </div>
    </div>
  );
}
