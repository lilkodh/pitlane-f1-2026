import { useState, useEffect } from 'react';

// ============================================================
// useCountdown — calculates time remaining to a target date
// Returns { days, hours, minutes, seconds, isExpired }
// Updates every second via setInterval
// ============================================================

export function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    // Calculate once immediately, then tick every second
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    // Cleanup interval on unmount or targetDate change
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

function calculateTimeLeft(targetDate) {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isExpired: false };
}
