import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function TiltCard({
  children,
  className = '',
  intensity = 6,
  glareColor = 'rgba(91,78,242,0.08)',
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glareColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(springX, [0, 1], [-intensity, intensity]);
  const glareX = useTransform(springX, [0, 1], [0, 100]);
  const glareY = useTransform(springY, [0, 1], [0, 100]);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0.5); y.set(0.5); }}
      style={{ rotateX, rotateY, perspective: 900, transformStyle: 'preserve-3d' }}
      className={`relative ${className}`}
    >
      {children}
      {glareColor && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500"
          style={{
            background: useTransform([glareX, glareY], ([gx, gy]) =>
              `radial-gradient(circle at ${gx}% ${gy}%, ${glareColor}, transparent 55%)`
            ),
          }}
        />
      )}
    </motion.div>
  );
}
