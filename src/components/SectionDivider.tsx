import { motion } from 'framer-motion';
export default function SectionDivider() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="h-px w-full origin-center bg-gradient-to-r from-transparent via-[#111713]/12 to-transparent" />
    </div>
  );
}
