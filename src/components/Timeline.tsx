import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { experiences } from '../data/portfolio';
import SectionHeading from './SectionHeading';

const ease = [0.22, 1, 0.36, 1] as const;
const releaseColors: Record<string, string> = {
  shipped: '#4c7c22', scaled: '#167f8d', led: '#5b4ef2', fixed: '#d3624f',
};

export default function Timeline() {
  const { t, i18n } = useTranslation();
  const thai = i18n.language === 'th';
  const [active, setActive] = useState(experiences[0].id);
  const railRef = useRef<HTMLDivElement>(null);
  const experience = experiences.find((item) => item.id === active)!;

  const scrollRail = (direction: number) => {
    railRef.current?.scrollBy({ left: direction * 360, behavior: 'smooth' });
  };

  return (
    <section id="work" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-32">
      <SectionHeading index={t('timeline.index')} title={t('timeline.title')} subtitle={t('timeline.subtitle')} />

      <div className="mb-7 flex justify-end gap-2">
        {[-1, 1].map((direction) => (
          <button key={direction} onClick={() => scrollRail(direction)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#111713]/10 bg-white/55 text-[#111713] transition hover:-translate-y-0.5 hover:bg-white">
            {direction < 0 ? '←' : '→'}
          </button>
        ))}
      </div>

      <div className="relative">
        <span className="absolute left-0 right-0 top-3 h-px bg-[#111713]/10" />
        <div ref={railRef} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
          {experiences.map((item, index) => {
            const selected = item.id === active;
            return (
              <button key={item.id} onClick={() => setActive(item.id)} className="group relative w-[290px] flex-none snap-start text-left sm:w-[330px]">
                <div className="mb-5 flex items-center gap-3">
                  <span className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-4 border-[#f4f2ec] transition ${selected ? 'bg-[#111713]' : 'bg-[#c9cec9]'}`}>
                    <i className={`h-1.5 w-1.5 rounded-full ${selected ? 'bg-[#c9f36a]' : 'bg-white'}`} />
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[.16em] text-[#7a837e]">{String(index + 1).padStart(2, '0')} / {item.period}</span>
                </div>

                <div className={`min-h-[210px] rounded-3xl border p-5 transition-all duration-300 ${selected ? 'border-[#5b4ef2]/35 bg-white shadow-[0_18px_45px_rgba(28,34,29,.08)]' : 'border-[#111713]/10 bg-white/42 hover:bg-white/75'}`}>
                  <span className="font-mono text-[9px] uppercase tracking-[.14em] text-[#7a837e]">{thai && item.typeTh ? item.typeTh : item.type}</span>
                  <h3 className="mt-3 font-heading text-xl font-extrabold tracking-tight text-[#111713]">{item.company}</h3>
                  <p className={`mt-1 text-sm font-semibold ${thai ? 'font-thai' : ''}`} style={{ color: selected ? '#5b4ef2' : '#66706a' }}>{thai && item.roleTh ? item.roleTh : item.role}</p>
                  <p className={`mt-4 line-clamp-3 text-xs leading-6 text-[#6f7973] ${thai ? 'font-thai-body text-[13px]' : ''}`}>{thai && item.summaryTh ? item.summaryTh : item.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.stack.slice(0, 3).map((skill) => <span key={skill} className="rounded-full bg-[#111713]/5 px-2.5 py-1 font-mono text-[9px] text-[#66706a]">{skill}</span>)}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={experience.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .45, ease }} className="mt-7 overflow-hidden rounded-[2rem] border border-[#111713]/10 bg-white/70 shadow-[0_20px_70px_rgba(28,34,29,.07)] backdrop-blur">
          <div className="grid lg:grid-cols-[.8fr_1.2fr]">
            <div className="border-b border-[#111713]/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <span className="font-mono text-[9px] uppercase tracking-[.18em] text-[#5b4ef2]">{experience.period} / {experience.location}</span>
              <h3 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-[#111713]">{experience.company}</h3>
              <p className={`mt-2 font-semibold text-[#5b4ef2] ${thai ? 'font-thai' : ''}`}>{thai && experience.roleTh ? experience.roleTh : experience.role}</p>
              <p className={`mt-5 text-sm leading-7 text-[#66706a] ${thai ? 'font-thai-body' : ''}`}>{thai && experience.summaryTh ? experience.summaryTh : experience.summary}</p>
              <div className="mt-7 grid grid-cols-3 border-y border-[#111713]/10 py-4">
                {experience.metrics.map((metric, index) => (
                  <div key={metric.label} className={index ? 'border-l border-[#111713]/10 pl-3' : ''}>
                    <span className="block font-heading text-base font-extrabold text-[#111713]">{metric.value}</span>
                    <span className="mt-1 block font-mono text-[7px] uppercase tracking-wider text-[#8a928d]">{thai && metric.labelTh ? metric.labelTh : metric.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[.18em] text-[#7a837e]">{t('timeline.releaseHistory')}</span>
                <span className="font-mono text-[9px] text-[#a0a7a2]">{experience.releases.length} releases</span>
              </div>
              <div className="space-y-6">
                {experience.releases.map((release, index) => {
                  const accent = releaseColors[release.tag];
                  return (
                    <div key={release.version} className="grid grid-cols-[auto_1fr] gap-4">
                      <div className="flex flex-col items-center">
                        <span className="rounded-full px-2.5 py-1 font-mono text-[8px] font-bold" style={{ background: `${accent}15`, color: accent }}>{release.version}</span>
                        {index < experience.releases.length - 1 && <span className="mt-2 w-px flex-1 bg-[#111713]/10" />}
                      </div>
                      <div className="pb-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[8px] font-bold uppercase tracking-wider" style={{ color: accent }}>{release.tag}</span>
                          <span className="font-mono text-[8px] text-[#929a95]">{release.date}</span>
                        </div>
                        <h4 className={`mt-1.5 font-heading text-sm font-bold text-[#111713] ${thai ? 'font-thai' : ''}`}>{thai && release.titleTh ? release.titleTh : release.title}</h4>
                        <ul className="mt-2 space-y-1.5">
                          {(thai && release.pointsTh ? release.pointsTh : release.points).map((point) => <li key={point} className={`flex gap-2 text-xs leading-5 text-[#6a746e] ${thai ? 'font-thai-body text-[13px]' : ''}`}><span className="mt-2 h-1 w-1 flex-none rounded-full" style={{ background: accent }} />{point}</li>)}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}