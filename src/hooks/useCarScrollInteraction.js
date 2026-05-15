import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * Scroll-driven “telemetry” motion: subtle rotateY on the hero car stack + gentle bob.
 *
 * @param {React.RefObject<HTMLElement | null>} scopeRef — ScrollTrigger range (e.g. full hero)
 * @param {React.RefObject<HTMLElement | null>} rotateRef — receives rotateY / rotateX scrub
 * @param {React.RefObject<HTMLElement | null> | undefined} bobRef — optional inner bob target
 */
export function useCarScrollInteraction(scopeRef, rotateRef, bobRef) {
  const bobTweenRef = useRef(null);

  useGSAP(
    () => {
      const scope = scopeRef?.current;
      const rotateEl = rotateRef?.current;
      if (!scope || !rotateEl) return undefined;

      const reduceMotion =
        typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

      if (reduceMotion) {
        return undefined;
      }

      gsap.set(rotateEl, { transformPerspective: 1100 });

      const st = gsap.to(rotateEl, {
        rotateY: 11,
        rotateX: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: scope,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.85,
        },
      });

      if (bobRef?.current) {
        bobTweenRef.current = gsap.to(bobRef.current, {
          y: 6,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      return () => {
        st.scrollTrigger?.kill();
        bobTweenRef.current?.kill();
        bobTweenRef.current = null;
      };
    },
    { scope: scopeRef, dependencies: [] }
  );
}
