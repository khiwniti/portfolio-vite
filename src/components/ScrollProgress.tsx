import { motion, useScroll, useSpring } from 'framer-motion';
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const s = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.2 });
  return <motion.div style={{ scaleX: s }} className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#5b4ef2] via-[#159faf] to-[#c9f36a]" />;
}
