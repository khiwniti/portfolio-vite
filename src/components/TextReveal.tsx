import { motion, type Variants } from 'framer-motion';

const word: Variants = {
  hidden: { opacity: 0, y: 24, rotateX: 10 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function TextReveal({ text, className = '', stagger = 0.035 }: { text: string; className?: string; stagger?: number }) {
  const words = text.split(' ');
  const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: 0.08 } } };

  return (
    <motion.span variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-30px' }} className={`inline-flex flex-wrap ${className}`}>
      {words.map((w, i) => (
        <motion.span key={i} variants={word} className="mr-[0.28em] inline-block">{w}</motion.span>
      ))}
    </motion.span>
  );
}
