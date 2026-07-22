import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({ value, suffix = '', label, duration = 2000 }: { value: number | string; suffix?: string; label: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const num = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, ''), 10) : value;
  const pre = typeof value === 'string' ? value.replace(/[0-9]/g, '') : '';

  useEffect(() => {
    if (!inView || !num) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * num));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, num, duration]);

  return (
    <div ref={ref}>
      <span className="font-heading text-3xl font-bold text-white">{pre}{count}{suffix}</span>
      {label && <span className="mt-1 block font-mono text-[9px] uppercase tracking-widest text-zinc-600">{label}</span>}
    </div>
  );
}
