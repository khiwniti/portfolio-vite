import { useEffect, useRef } from 'react';

export default function GradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId = 0;
    let mouse = { x: 0.5, y: 0.5 };
    const onMove = (e: MouseEvent) => { mouse = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }; };
    window.addEventListener('mousemove', onMove);

    const blobs = [
      { x: 0.2, y: 0.25, r: 260, color: [91, 78, 242], vx: 0.12, vy: 0.09, phase: 0 },
      { x: 0.75, y: 0.35, r: 300, color: [21, 159, 175], vx: -0.08, vy: 0.11, phase: 1.5 },
      { x: 0.5, y: 0.7, r: 280, color: [201, 243, 106], vx: 0.06, vy: -0.07, phase: 3 },
      { x: 0.3, y: 0.6, r: 220, color: [239, 116, 95], vx: -0.1, vy: -0.05, phase: 4.5 },
    ];

    let t = 0;
    const draw = () => {
      t += 0.003;
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      blobs.forEach((b) => {
        const px = b.x + Math.sin(t * b.vx * 2 + b.phase) * 0.08 + (mouse.x - 0.5) * 0.03;
        const py = b.y + Math.cos(t * b.vy * 2 + b.phase) * 0.06 + (mouse.y - 0.5) * 0.02;
        const grad = ctx.createRadialGradient(px * w, py * h, 0, px * w, py * h, b.r);
        grad.addColorStop(0, `rgba(${b.color.join(',')},0.07)`);
        grad.addColorStop(1, `rgba(${b.color.join(',')},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px * w, py * h, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('mousemove', onMove); };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10" />;
}
