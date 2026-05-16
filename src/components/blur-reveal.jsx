import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BlurReveal({ children, delay = 0, style }) {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.fromTo(ref.current, 
      { opacity: 0, y: 40, filter: 'blur(10px)', scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)', 
        scale: 1,
        duration: 1.2, 
        ease: 'power3.out', 
        delay: delay,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
        }
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} style={{ ...style, willChange: 'opacity, transform, filter' }}>
      {children}
    </div>
  );
}
