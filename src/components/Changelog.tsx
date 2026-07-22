import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { experiences } from '../data/portfolio';
import SectionHeading from './SectionHeading';

const ease = [0.22, 1, 0.36, 1] as const;

const TAGS: Record<string, { label: string; en: string; th: string; color: string }> = {
  shipped: { label: 'SHIPPED', en: 'New', th: 'เพิ่ม', color: '#4c7c22' },
  scaled: { label: 'SCALED', en: 'Improved', th: 'ปรับปรุง', color: '#167f8d' },
  led: { label: 'LED', en: 'Led', th: 'นำทีม', color: '#5b4ef2' },
  fixed: { label: 'FIXED', en: 'Fixed', th: 'แก้ไข', color: '#d3624f' },
};

const MONTHS: Record<string, number> = { jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12 };
const parseDate = (d: string) => {
  const [m, y] = d.toLowerCase().split(' ');
  return Number(y) * 100 + (MONTHS[m] ?? 0);
};

export default function Changelog() {
  const { t, i18n } = useTranslation();
  const th = i18n.language === 'th';

  const allReleases = useMemo(() => {
    const list: Array<Record<string, unknown>> = [];
    experiences.forEach((e) => {
      e.releases.forEach((r) => {
        list.push({ ...r, company: e.company, cc: e.color, sk: parseDate(r.date) });
      });
    });
    return list.sort((a: Record<string, unknown>, b: Record<string, unknown>) =>
      (b.sk as number) - (a.sk as number)
    );
  }, []);

  const [filter, setFilter] = useState('all');
  const visible = filter === 'all'
    ? allReleases
    : allReleases.filter((e: Record<string, unknown>) => e.tag === filter);

  return (
    <section id="changelog" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-32">
      <SectionHeading index={t('changelog.index')} title={t('changelog.title')} subtitle={t('changelog.subtitle')} />

      {/* Changelog toolbar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-full border px-3.5 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[.14em] transition ${
              filter === 'all'
                ? 'border-[#111713] bg-[#111713] text-white'
                : 'border-[#111713]/10 bg-white/50 text-[#66706a] hover:bg-white hover:text-[#111713]'
            }`}
          >
            {th ? 'ทั้งหมด' : 'All'}
          </button>
          {Object.entries(TAGS).map(([key, tag]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[.14em] transition ${
                filter === key
                  ? 'text-white'
                  : 'border-[#111713]/10 bg-white/50 text-[#66706a] hover:bg-white hover:text-[#111713]'
              }`}
              style={filter === key ? { background: tag.color, borderColor: tag.color } : {}}
            >
              <span className="text-[8px]">{key === 'shipped' ? '●' : key === 'scaled' ? '◆' : key === 'led' ? '▲' : '■'}</span>
              {tag.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.14em] text-[#9aa19d]">
          <span className="flex h-2 w-2 rounded-full bg-[#4c7c22] animate-pulse" />
          {visible.length} {th ? 'เวอร์ชัน' : 'releases'}
        </div>
      </div>

      {/* Changelog feed — release-notes format */}
      <div className="overflow-hidden rounded-[2rem] border border-[#111713]/10 bg-white/55">
        <AnimatePresence mode="popLayout">
          <motion.div layout>
            {visible.map((e: Record<string, unknown>, index: number) => {
              const entry = e as any;
              const tag = TAGS[entry.tag as string];
              const isLast = index === visible.length - 1;
              return (
                <motion.article
                  key={`${entry.company}-${entry.version}`}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, ease }}
                  className={`relative px-5 py-5 sm:px-7 sm:py-6 ${isLast ? '' : 'border-b border-[#111713]/8'}`}
                >
                  {/* Release header line */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span
                      className="font-mono text-sm font-bold tracking-tight"
                      style={{ color: entry.cc as string }}
                    >
                      {entry.version}
                    </span>
                    <span
                      className="flex items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[.08em]"
                      style={{ background: `${tag.color}14`, color: tag.color }}
                    >
                      {entry.tag === 'shipped' ? '●' : entry.tag === 'scaled' ? '◆' : entry.tag === 'led' ? '▲' : '■'}
                      {th ? tag.th : tag.en}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-[9px] text-[#9aa19d]">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: entry.cc as string }} />
                      {entry.company}
                    </span>
                    <span className="ml-auto font-mono text-[9px] text-[#a0a7a2]">{entry.date}</span>
                  </div>

                  {/* Release title */}
                  <h3 className={`mt-3 font-heading text-base font-extrabold tracking-tight text-[#111713] sm:text-lg ${th ? 'font-thai' : ''}`}>
                    {th && entry.titleTh ? entry.titleTh : entry.title}
                  </h3>

                  {/* Release notes bullets */}
                  <ul className="mt-3 space-y-1.5">
                    {(th && entry.pointsTh ? entry.pointsTh : entry.points).map((p: string, i: number) => (
                      <li
                        key={i}
                        className={`flex gap-3 text-[12px] leading-6 text-[#66706a] sm:text-[13px] ${th ? 'font-thai-body' : ''}`}
                      >
                        <span
                          className="mt-[7px] flex-none font-mono text-[9px] font-bold"
                          style={{ color: tag.color }}
                        >
                          {entry.tag === 'shipped' ? '+' : entry.tag === 'scaled' ? '^' : entry.tag === 'led' ? '*' : '~'}
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
