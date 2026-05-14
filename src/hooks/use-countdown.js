import { useEffect, useState } from 'react';

function pad(n) {
  return String(n).padStart(2, '0');
}

export function useCountdown(targetDate) {
  const [parts, setParts] = useState(() => computeParts(targetDate));

  useEffect(() => {
    const tick = () => setParts(computeParts(targetDate));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return parts;
}

function computeParts(targetDate) {
  const end = new Date(targetDate).getTime();
  const now = Date.now();
  let diff = Math.max(0, end - now);
  const days = Math.floor(diff / 86400000);
  diff -= days * 86400000;
  const hours = Math.floor(diff / 3600000);
  diff -= hours * 3600000;
  const minutes = Math.floor(diff / 60000);
  diff -= minutes * 60000;
  const seconds = Math.floor(diff / 1000);
  return {
    done: end <= now,
    label: `${days}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
    days,
    hours,
    minutes,
    seconds,
  };
}
