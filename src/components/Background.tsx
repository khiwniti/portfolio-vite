import { useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export default function Background() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.3 });
  const { scrollY } = useScroll();
  const violetY = useTransform(scrollY, [0, 3000], [0, -160]);
  const limeY = useTransform(scrollY, [0, 3000], [0, 190]);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setMouse({ x: event.clientX / window.innerWidth, y: event.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-[10] overflow-hidden bg-[#f4f2ec]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,.95),transparent_48%),radial-gradient(ellipse_at_bottom_right,rgba(91,78,242,.06),transparent_45%)]" />
      <div className="technical-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
      <motion.div style={{ y: violetY }} className="animate-float-1 absolute -left-40 top-16 h-[34rem] w-[34rem] rounded-full bg-[#5b4ef2]/10 blur-[130px]" />
      <motion.div style={{ y: limeY }} className="animate-float-2 absolute -right-48 top-[35%] h-[38rem] w-[38rem] rounded-full bg-[#c9f36a]/18 blur-[150px]" />
      <div className="absolute bottom-[-14rem] left-[28%] h-[34rem] w-[34rem] rounded-full bg-[#159faf]/8 blur-[150px]" />
      <div
        className="absolute h-[28rem] w-[28rem] rounded-full bg-[#5b4ef2]/5 blur-[110px] transition-all duration-700 ease-out"
        style={{ left: `calc(${mouse.x * 100}% - 14rem)`, top: `calc(${mouse.y * 100}% - 14rem)` }}
      />
      <div
        className="animate-grain"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />
    </div>
  );
}