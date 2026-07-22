import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { skills } from '../data/portfolio';
import SectionHeading from './SectionHeading';

const accents = ['#5b4ef2', '#159faf', '#4c7c22', '#d3624f'];

export default function Skills() {
  const { t, i18n } = useTranslation();
  const thai = i18n.language === 'th';

  return (
    <section id="stack" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-32">
      <SectionHeading index={t('skills.index')} title={t('skills.title')} subtitle={t('skills.subtitle')} />
      <div className="border-y border-[#111713]/10">
        {skills.map((group, index) => (
          <motion.div
            key={group.group}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .55, delay: index * .06, ease: [0.22, 1, 0.36, 1] }}
            className="group grid gap-5 border-b border-[#111713]/10 py-7 last:border-b-0 sm:grid-cols-[70px_260px_1fr] sm:items-start sm:gap-7"
          >
            <span className="font-mono text-[9px] uppercase tracking-[.18em]" style={{ color: accents[index] }}>0{index + 1}</span>
            <h3 className={`font-heading text-xl font-extrabold tracking-tight text-[#111713] ${thai ? 'font-thai' : ''}`}>{thai && group.groupTh ? group.groupTh : group.group}</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {group.items.map((item) => (
                <span key={item} className="relative font-mono text-[10px] text-[#66706a] transition group-hover:text-[#111713] before:mr-2 before:inline-block before:h-1 before:w-1 before:rounded-full before:bg-[#111713]/25">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}