import { motion } from 'framer-motion';
const e = [0.22, 1, 0.36, 1] as const;
export default function SectionHeading({ index, title, subtitle }: { index: string; title: string; subtitle?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease: e }} className="mb-12 grid gap-5 border-t border-[#111713]/10 pt-5 sm:grid-cols-[180px_1fr] sm:gap-8 lg:mb-16">
      <span className="font-mono text-[9px] uppercase tracking-[.22em] text-[#5b4ef2]">{index}</span>
      <div>
        <h2 className="max-w-3xl font-heading text-3xl font-extrabold tracking-[-.045em] text-[#111713] sm:text-5xl lg:text-[3.8rem]">{title}</h2>
        {subtitle && <p className="mt-4 max-w-2xl text-sm leading-7 text-[#66706a] sm:text-base">{subtitle}</p>}
      </div>
    </motion.div>
  );
}
