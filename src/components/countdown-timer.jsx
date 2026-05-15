import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useCountdown } from '../hooks/use-countdown.js';

export default function CountdownTimer({ targetDate, label = 'NEXT RACE IN' }) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current.querySelectorAll('.cd-digit'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 1.8 }
    );
  }, { scope: containerRef });

  if (isExpired) {
    return (
      <div ref={containerRef} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', fontWeight: 700, color: '#39FF88', letterSpacing: '0.15em' }}>
        🏁 RACE IN PROGRESS
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.2em', color: 'rgba(240,240,240,0.4)', marginBottom: '10px', textTransform: 'uppercase' }}>
        {label}
      </p>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <DigitBlock value={days} unit="DAYS" />
        <Sep />
        <DigitBlock value={hours} unit="HRS" />
        <Sep />
        <DigitBlock value={minutes} unit="MIN" />
        <Sep />
        <DigitBlock value={seconds} unit="SEC" isLive />
      </div>
    </div>
  );
}

function DigitBlock({ value, unit, isLive = false }) {
  return (
    <div className="cd-digit" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <div style={{ background: 'rgba(57,255,136,0.06)', border: `1px solid ${isLive ? 'rgba(57,255,136,0.3)' : 'rgba(57,255,136,0.1)'}`, borderRadius: '8px', padding: '10px 14px', minWidth: '58px', textAlign: 'center' }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.8rem', fontWeight: 700, color: isLive ? '#39FF88' : '#F0F0F0', lineHeight: 1, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.52rem', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(240,240,240,0.3)' }}>{unit}</span>
    </div>
  );
}

function Sep() {
  return <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', fontWeight: 300, color: 'rgba(240,240,240,0.2)', marginBottom: '18px', userSelect: 'none' }}>:</span>;
}
