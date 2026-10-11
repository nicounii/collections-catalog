import { useEffect, useState } from 'react';

/** Ticking countdown to a target date. */
export function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  const day = 86_400_000;
  const hour = 3_600_000;
  const min = 60_000;

  return {
    days: Math.floor(diff / day),
    hours: Math.floor((diff % day) / hour),
    minutes: Math.floor((diff % hour) / min),
    seconds: Math.floor((diff % min) / 1000),
    done: diff === 0,
  };
}

export const pad = (n) => String(n).padStart(2, '0');
