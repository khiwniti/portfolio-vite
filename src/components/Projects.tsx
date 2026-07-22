import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { type Project, DOMAINS } from '../data/portfolio';
import { getManagedProjects } from '../data/blogStore';
import SectionHeading from './SectionHeading';

const ease = [0.22, 1, 0.36, 1] as const;

function Card({ p, onSelectProject }: { p: Project; onSelectProject?: (id: string) => void }) {
  const { t, i18n } = useTranslation();
  const th = i18n.language === 'th';
  const [live, setLive] = useState(false);
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (r) {
      ref.current!.style.setProperty('--x', `${e.clientX - r.left}px`);
      ref.current!.style.setProperty('--y', `${e.clientY - r.top}px`);
    }
  }, []);

  const deviceWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  const handleLoadLive = () => {
    setLoading(true);
    setLive(true);
  };

  const handleIframeLoad = () => {
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease }}
      ref={ref}
      onMouseMove={onMove}
      className="spotlight border-gradient group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-[#111713]/10 bg-white/72 shadow-[0_16px_55px_rgba(28,34,29,.05)] transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_65px_rgba(28,34,29,.1)]"
    >
      <div
        className="absolute inset-x-0 top-0 z-10 h-px"
        style={{ background: `linear-gradient(90deg, ${p.accent}60, transparent)` }}
      />
      {/* embed with custom controls */}
      <div className="relative mx-3 mt-3 overflow-hidden rounded-[1.4rem] border border-[#111713]/10 bg-[#111713] sm:mx-4 sm:mt-4">
        {/* Window Chrome & Device Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#202721] px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
          </div>

          {/* Device Toggles when Live is Active */}
          {live && (
            <div className="flex items-center gap-1 rounded-lg bg-black/40 p-0.5 border border-white/[0.05]">
              {(['desktop', 'tablet', 'mobile'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDevice(d)}
                  className={`rounded px-2.5 py-1 text-[10px] font-mono font-bold uppercase transition ${
                    device === d
                      ? 'bg-white/10 text-white'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {d === 'desktop' ? '🖥' : d === 'tablet' ? '📟' : '📱'}
                </button>
              ))}
            </div>
          )}

          <span className="hidden font-mono text-[10px] text-white/35 sm:block">{p.id}.live.view</span>
        </div>

        {/* Iframe Viewport Container */}
        <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#111713]">
          {live ? (
            <div
              className="relative h-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ width: deviceWidths[device], maxWidth: '100%' }}
            >
              {loading && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-[#111713]/95">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-white" style={{ borderTopColor: p.accent }} />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                    {th ? 'กำลังเชื่อมต่อเซิร์ฟเวอร์...' : 'establishing secure node link...'}
                  </span>
                </div>
              )}
              <iframe
                src={p.url}
                title={p.name}
                onLoad={handleIframeLoad}
                className="h-full w-full bg-white border-0"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
              <button
                onClick={() => setLive(false)}
                className="absolute right-3 top-3 z-10 rounded-lg bg-black/80 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur transition hover:bg-black"
              >
                ✕ {t('projects.close')}
              </button>
            </div>
          ) : (
            <button
              onClick={handleLoadLive}
              className="flex h-full w-full flex-col items-center justify-center transition group-hover:bg-white/[0.02]"
              style={{ background: `linear-gradient(160deg, ${p.accent}22, #111713 65%)` }}
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full transition group-hover:scale-110"
                style={{ background: p.accent, boxShadow: `0 0 35px ${p.accent}50` }}
              >
                <span className="ml-1 text-xl text-[#111713]">▶</span>
              </div>
              <span className="mt-3 font-mono text-xs tracking-wider text-white/60">
                {t('projects.loadPreview')}
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-between p-6">
        <div>
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#5b4ef2]">
            {th && p.categoryTh ? p.categoryTh : p.category}
          </span>
          <h3 className={`mt-3 font-heading text-2xl font-extrabold tracking-tight text-[#111713] ${th ? 'font-thai' : ''}`}>
            {th && p.nameTh ? p.nameTh : p.name}
          </h3>
          <p className={`mt-3 line-clamp-3 text-sm leading-7 text-[#66706a] ${th ? 'font-thai-body text-[15px]' : ''}`}>
            {th && p.descriptionTh ? p.descriptionTh : p.description}
          </p>
        </div>

        <div>
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#111713]/10 pt-5">
            {p.metrics.map((m) => (
              <div key={m.label}>
                <span className="font-heading text-xl font-extrabold text-[#111713] sm:text-2xl">
                  {m.value}
                </span>
                <span className="ml-2 font-mono text-[9px] text-[#7a837e]">
                  {th && m.labelTh ? m.labelTh : m.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.tags.map((tg) => (
              <span
                key={tg}
                className="rounded-full bg-[#111713]/5 px-2.5 py-1 font-mono text-[9px] text-[#5f6963]"
              >
                {tg}
              </span>
            ))}
          </div>

          {/* Project Focus Deep Dive Trigger Button */}
          {onSelectProject && (
            <button
              onClick={() => onSelectProject(p.id)}
              className="mt-6 flex w-full items-center justify-between rounded-2xl border border-[#111713]/10 bg-[#111713] px-5 py-3.5 font-heading text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span>{th ? 'สำรวจเจาะลึกโปรเจกต์ (Project Focus View)' : 'Explore Project Focus Page'}</span>
              <span className="font-mono text-base text-[#c9f36a]">
                →
              </span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ onSelectProject }: { onSelectProject?: (id: string) => void }) {
  const { t, i18n } = useTranslation();
  const th = i18n.language === 'th';
  const [filterDomain, setFilterDomain] = useState('all');
  const [managedProjects, setManagedProjects] = useState(() => getManagedProjects());

  useEffect(() => {
    const sync = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      setManagedProjects(Array.isArray(detail) ? detail : getManagedProjects());
    };
    window.addEventListener('portfolio:projects-updated', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('portfolio:projects-updated', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const shownProjects = managedProjects.filter((project) => project.showOnLanding !== false);
  const visibleProjects = filterDomain === 'all'
    ? shownProjects
    : shownProjects.filter((project) => project.domain === filterDomain);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-32">
      <SectionHeading index={t('projects.index')} title={t('projects.title')} subtitle={t('projects.subtitle')} />

      {/* Industry Domain Filter Pills */}
      <div className="mb-12 flex flex-wrap gap-2.5">
        <button
          onClick={() => setFilterDomain('all')}
          className={`rounded-full border px-4 py-2 font-mono text-xs font-bold transition ${
            filterDomain === 'all'
              ? 'border-[#111713] bg-[#111713] text-white'
              : 'border-[#111713]/10 bg-white/55 text-[#66706a] hover:bg-white hover:text-[#111713]'
          }`}
        >
          {th ? `ทั้งหมด (${shownProjects.length} โปรเจกต์)` : `ALL DOMAINS (${shownProjects.length})`}
        </button>
        {DOMAINS.map((d) => {
          const count = shownProjects.filter((p) => p.domain === d.id).length;
          const active = filterDomain === d.id;
          return (
            <button
              key={d.id}
              onClick={() => setFilterDomain(d.id)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs font-semibold transition ${
                active
                  ? 'text-[#111713]'
                  : 'border-[#111713]/10 bg-white/55 text-[#66706a] hover:bg-white hover:text-[#111713]'
              }`}
              style={active ? { borderColor: d.color, background: d.color, color: '#09090b' } : {}}
            >
              <span>{d.icon}</span>
              <span>{th && d.labelTh ? d.labelTh : d.label}</span>
              <span className="rounded-full bg-[#111713]/10 px-1.5 py-0.5 text-[10px] text-current">{count}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="popLayout">
        <div className="grid gap-8 lg:grid-cols-2">
          {visibleProjects.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <Card p={p} onSelectProject={onSelectProject} />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </section>
  );
}
