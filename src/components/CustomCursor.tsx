import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const rPos = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let raf: number;
    const move = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const loop = () => {
      rPos.current.x += (pos.current.x - rPos.current.x) * 0.1;
      rPos.current.y += (pos.current.y - rPos.current.y) * 0.1;
      if (dot.current) { dot.current.style.left = `${pos.current.x}px`; dot.current.style.top = `${pos.current.y}px`; }
      if (ring.current) { ring.current.style.left = `${rPos.current.x}px`; ring.current.style.top = `${rPos.current.y}px`; }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', move);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const sel = 'a,button,[role="button"],input,textarea,select,[data-hover]';
    const enter = () => setHovering(true);
    const leave = () => setHovering(false);
    const obs = new MutationObserver(() => {
      document.querySelectorAll(sel).forEach(el => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave); el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });
    });
    obs.observe(document.body, { childList: true, subtree: true });
    document.querySelectorAll(sel).forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });
    return () => obs.disconnect();
  }, []);

  return (<><div ref={dot} className={`cursor-dot${hovering ? ' hovering' : ''}`} /><div ref={ring} className={`cursor-ring${hovering ? ' hovering' : ''}`} /></>);
}
