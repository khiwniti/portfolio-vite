import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { type Project, projects } from '../data/portfolio';

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProjectFocusPage({
  project,
  onBack,
  onSelectProject,
}: {
  project: Project;
  onBack: () => void;
  onSelectProject: (id: string) => void;
}) {
  const { t, i18n } = useTranslation();
  const th = i18n.language === 'th';
  const [live, setLive] = useState(false);
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [loading, setLoading] = useState(false);
  const iframeRef = useRef<HTMLDivElement>(null);

  // find prev and next project
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // scroll to top on mount or project change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLive(false);
  }, [project.id]);

  const onSpotlightMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
  }, []);

  const cs = project.caseStudy;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease }}
      className="relative min-h-screen bg-[#09090b] pb-32 text-zinc-300"
    >
      {/* Top sticky navigation */}
      <header className="sticky top-0 z-50 border-b border-white/[.08] bg-[#09090b]/90 px-3.5 py-3 backdrop-blur-xl sm:px-8 sm:py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
          <button
            onClick={onBack}
            className="group flex flex-none items-center gap-1.5 rounded-xl border border-white/[.08] bg-white/[.03] px-2.5 py-2 font-mono text-xs text-zinc-400 transition hover:border-white/20 hover:bg-white/[.06] hover:text-white sm:gap-2 sm:px-4"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span className="hidden sm:inline">{th ? 'กลับสู่หน้าหลัก (Portfolio)' : 'Back to Portfolio'}</span>
            <span className="sm:hidden">{th ? 'กลับ' : 'Back'}</span>
          </button>

          <div className="hidden min-w-0 items-center gap-3 lg:flex">
            <span className="h-2 w-2 flex-none rounded-full" style={{ background: project.accent }} />
            <span className={`truncate font-heading text-sm font-bold text-white ${th ? 'font-thai' : ''}`}>
              {th && project.nameTh ? project.nameTh : project.name}
            </span>
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="flex flex-none items-center gap-1.5 rounded-xl bg-[#a3e635] px-2.5 py-2 font-heading text-xs font-bold uppercase tracking-wider text-[#09090b] transition hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(163,230,53,.3)] sm:gap-2 sm:px-4"
            style={project.accent !== '#a3e635' ? { background: project.accent, color: '#fff' } : {}}
          >
            <span className="hidden sm:inline">{th ? 'เปิดดูระบบจริง' : 'Open Live App'}</span>
            <span className="sm:hidden">{th ? 'เปิด' : 'Open'}</span>
            <span>↗</span>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pt-8 sm:px-8 sm:pt-20">
        {/* Project Hero Header */}
        <div className="mb-10 border-b border-white/[.06] pb-10 sm:mb-16 sm:pb-16">
          <div className="mb-4 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[.25em]" style={{ color: project.accent }}>
            <span className="flex h-2 w-2 items-center justify-center rounded-full" style={{ background: project.accent }}>
              <span className="h-full w-full animate-ping rounded-full opacity-75" style={{ background: project.accent }} />
            </span>
            <span>{th && project.categoryTh ? project.categoryTh : project.category}</span>
          </div>

          <h1 className={`font-heading text-3xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-[4.5rem] lg:leading-none ${th ? 'font-thai' : ''}`}>
            {th && project.nameTh ? project.nameTh : project.name}
          </h1>

          <p className={`mt-5 max-w-3xl text-base leading-relaxed text-zinc-400 sm:mt-6 sm:text-xl ${th ? 'font-thai-body sm:text-lg' : ''}`}>
            {th && project.descriptionTh ? project.descriptionTh : project.description}
          </p>

          {/* Key metrics banner */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                onMouseMove={onSpotlightMove}
                className="spotlight rounded-2xl border border-white/[.06] bg-[#111113] p-4 transition hover:border-white/[.12] sm:p-6"
              >
                <div className="font-heading text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl" style={{ color: project.accent }}>
                  {m.value}
                </div>
                <div className="mt-1.5 font-mono text-[11px] tracking-wider text-zinc-500 sm:mt-2 sm:text-xs">
                  {th && m.labelTh ? m.labelTh : m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Preview / Architecture Canvas */}
        <div className="mb-16 sm:mb-24">
          <div className="mb-6 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
            <h2 className={`font-heading text-xl font-bold text-white sm:text-2xl ${th ? 'font-thai' : ''}`}>
              {th ? 'หน้าจอโต้ตอบและสถาปัตยกรรม' : 'Interactive Architecture Canvas'}
            </h2>
            <span className="font-mono text-xs text-zinc-600">{project.id}.live.preview</span>
          </div>

          <div
            ref={iframeRef}
            className="overflow-hidden rounded-3xl border border-white/[.08] bg-[#111113] shadow-2xl"
          >
            {/* Window Chrome & Device Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[.06] bg-[#18181b] px-4 py-3 sm:gap-4 sm:px-6 sm:py-3.5">
              <div className="flex gap-1.5 sm:gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80 sm:h-3 sm:w-3" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80 sm:h-3 sm:w-3" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80 sm:h-3 sm:w-3" />
              </div>

              {/* Device Layout Toggles when Live is Active */}
              {live && (
                <div className="flex items-center gap-1 rounded-lg border border-white/[0.05] bg-black/40 p-0.5">
                  {(['desktop', 'tablet', 'mobile'] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDevice(d)}
                      className={`rounded-lg px-2 py-1.5 text-xs font-mono font-bold uppercase transition sm:px-3 ${
                        device === d ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      <span className="sm:hidden">{d === 'desktop' ? '🖥' : d === 'tablet' ? '📟' : '📱'}</span>
                      <span className="hidden sm:inline">
                        {d === 'desktop' ? '🖥 Desktop' : d === 'tablet' ? '📟 Tablet' : '📱 Mobile'}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="hidden items-center gap-2 rounded-lg bg-black/40 px-3 py-1 font-mono text-xs text-zinc-400 lg:flex">
                  <span className="h-2 w-2 rounded-full" style={{ background: project.accent }} />
                  <span className="max-w-[180px] truncate">{project.url}</span>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-zinc-500 transition hover:text-white"
                >
                  {t('projects.open')} ↗
                </a>
              </div>
            </div>

            {/* Iframe Viewport Container */}
            <div className="relative aspect-[16/9] w-full flex items-center justify-center overflow-hidden bg-[#09090b]">
              {live ? (
                <div
                  className="relative h-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    width: device === 'desktop' ? '100%' : device === 'tablet' ? '768px' : '375px',
                    maxWidth: '100%',
                  }}
                >
                  {loading && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#09090b]/90 gap-3">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-white" style={{ borderTopColor: project.accent }} />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                        {th ? 'กำลังเชื่อมต่อเซิร์ฟเวอร์...' : 'establishing secure node link...'}
                      </span>
                    </div>
                  )}
                  <iframe
                    src={project.url}
                    title={project.name}
                    onLoad={() => setLoading(false)}
                    className="h-full w-full bg-white border-0"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                  />
                  <button
                    onClick={() => setLive(false)}
                    className="absolute right-4 top-4 z-10 rounded-xl bg-black/80 px-3 py-1.5 font-mono text-xs text-white backdrop-blur transition hover:bg-black"
                  >
                    ✕ {t('projects.close')}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setLoading(true);
                    setLive(true);
                  }}
                  className="group relative flex h-full w-full flex-col items-center justify-center overflow-hidden"
                  style={{ background: `linear-gradient(160deg, ${project.accent}18, #09090b 65%)` }}
                >
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.04) 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                  />
                  <motion.div
                    className="relative flex h-20 w-20 items-center justify-center rounded-full shadow-2xl transition group-hover:scale-110"
                    style={{ background: project.accent, boxShadow: `0 0 50px ${project.accent}70` }}
                  >
                    <span className="ml-1 text-3xl text-[#09090b]">▶</span>
                  </motion.div>
                  <span className="mt-6 font-mono text-sm tracking-wider text-zinc-400">
                    {t('projects.loadPreview')}
                  </span>
                  <span className="mt-2 font-mono text-xs text-zinc-600">
                    {th ? 'คลิกเพื่อโหลดแอปพลิเคชันหรือสถาปัตยกรรมแบบ Live' : 'Click to launch interactive environment'}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Case Study Deep Dive Sections */}
        <div className="mb-16 grid gap-5 sm:mb-24 sm:gap-8 lg:grid-cols-12">
          {/* Challenge / Problem Space */}
          <div
            onMouseMove={onSpotlightMove}
            className="spotlight rounded-3xl border border-white/[.06] bg-[#111113] p-5 sm:p-8 lg:col-span-6 lg:p-10"
          >
            <div className="mb-4 inline-flex rounded-xl bg-amber-500/10 px-3 py-1 font-mono text-xs font-bold text-amber-400">
              {th ? '● ปัญหาและความท้าทาย (The Challenge)' : '● The Problem Space'}
            </div>
            <h3 className={`mt-2 font-heading text-2xl font-bold text-white sm:text-3xl ${th ? 'font-thai' : ''}`}>
              {th ? 'โจทย์ที่คลุมเครือและความซับซ้อน' : 'Ambiguity & Operational Friction'}
            </h3>
            <p className={`mt-4 text-base leading-relaxed text-zinc-400 ${th ? 'font-thai-body text-[15px]' : ''}`}>
              {th && cs.challengeTh ? cs.challengeTh : cs.challenge}
            </p>
          </div>

          {/* Architecture Deep Dive */}
          <div
            onMouseMove={onSpotlightMove}
            className="spotlight rounded-3xl border border-white/[.06] bg-[#111113] p-5 sm:p-8 lg:col-span-6 lg:p-10"
          >
            <div className="mb-4 inline-flex rounded-xl bg-cyan-500/10 px-3 py-1 font-mono text-xs font-bold text-cyan-400">
              {th ? '● โครงสร้างทางวิศวกรรม (Architecture)' : '● Architecture Deep Dive'}
            </div>
            <h3 className={`mt-2 font-heading text-2xl font-bold text-white sm:text-3xl ${th ? 'font-thai' : ''}`}>
              {th ? 'สถาปัตยกรรมที่ออกแบบ' : 'System Engineering Deep Dive'}
            </h3>
            <p className={`mt-4 text-base leading-relaxed text-zinc-400 ${th ? 'font-thai-body text-[15px]' : ''}`}>
              {th && cs.architectureTh ? cs.architectureTh : cs.architecture}
            </p>
          </div>

          {/* Solution & Implementation Highlights */}
          <div
            onMouseMove={onSpotlightMove}
            className="spotlight rounded-3xl border border-white/[.06] bg-[#111113] p-5 sm:p-8 lg:col-span-8 lg:p-10"
          >
            <div className="mb-4 inline-flex rounded-xl bg-emerald-500/10 px-3 py-1 font-mono text-xs font-bold text-emerald-400">
              {th ? '● เทคนิคและแนวทางแก้ปัญหา (Technical Implementation)' : '● Technical Implementation'}
            </div>
            <h3 className={`mt-2 font-heading text-2xl font-bold text-white sm:text-3xl ${th ? 'font-thai' : ''}`}>
              {th ? 'จุดเด่นทางวิศวกรรมที่นำมาใช้' : 'Key Implementation Breakthroughs'}
            </h3>
            <ul className="mt-6 space-y-4">
              {(th && cs.solutionTh ? cs.solutionTh : cs.solution).map((sol, index) => (
                <li key={index} className={`flex items-start gap-3 text-base text-zinc-300 ${th ? 'font-thai-body' : ''}`}>
                  <span className="mt-2 flex h-5 w-5 flex-none items-center justify-center rounded-full font-mono text-xs font-bold" style={{ background: `${project.accent}20`, color: project.accent }}>
                    ✓
                  </span>
                  <span className="leading-relaxed">{sol}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Measurable Impact & ROI */}
          <div
            onMouseMove={onSpotlightMove}
            className="spotlight flex flex-col justify-between rounded-3xl border border-white/[.06] bg-[#111113] p-5 sm:p-8 lg:col-span-4 lg:p-10"
            style={{ background: `linear-gradient(180deg, #111113 0%, ${project.accent}08 100%)` }}
          >
            <div>
              <div className="mb-4 inline-flex rounded-xl bg-purple-500/10 px-3 py-1 font-mono text-xs font-bold text-purple-400">
                {th ? '● ผลลัพธ์และผลกระทบ (Measurable Impact)' : '● Production ROI'}
              </div>
              <h3 className={`mt-2 font-heading text-2xl font-bold text-white ${th ? 'font-thai' : ''}`}>
                {th ? 'ผลกระทบต่อองค์กร' : 'Production Impact'}
              </h3>
              <p className={`mt-4 text-base leading-relaxed text-zinc-300 ${th ? 'font-thai-body text-[15px]' : ''}`}>
                {th && cs.impactTh ? cs.impactTh : cs.impact}
              </p>
            </div>
            <div className="mt-8 border-t border-white/[.08] pt-6">
              <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
                {th ? 'สถานะการทำงาน' : 'Deployment Status'}
              </span>
              <div className="mt-2 flex items-center gap-2 font-mono text-sm font-bold text-emerald-400">
                <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
                <span>Production Verified 🚀</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Highlights Bento Cards */}
        <div className="mb-24">
          <h2 className={`mb-8 font-heading text-3xl font-bold text-white ${th ? 'font-thai' : ''}`}>
            {th ? 'จุดเด่นเชิงลึก (Case Study Breakthroughs)' : 'Breakthrough Highlights'}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {cs.highlights.map((h, index) => (
              <div
                key={index}
                onMouseMove={onSpotlightMove}
                className="spotlight rounded-2xl border border-white/[.06] bg-[#111113] p-8 transition hover:border-white/[.12]"
              >
                <div className="mb-4 font-mono text-xs text-zinc-600">BREAKTHROUGH_0{index + 1}</div>
                <h4 className={`font-heading text-xl font-bold text-white ${th ? 'font-thai' : ''}`} style={{ color: project.accent }}>
                  {th && h.titleTh ? h.titleTh : h.title}
                </h4>
                <p className={`mt-3 text-sm leading-relaxed text-zinc-400 ${th ? 'font-thai-body text-base' : ''}`}>
                  {th && h.descTh ? h.descTh : h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Verification & Deployment Metadata Section */}
        {project.verified && (
          <div className="mb-16 rounded-3xl border border-emerald-500/30 bg-emerald-500/[.04] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold">✓</span>
                <div>
                  <div className="font-heading text-base font-bold text-white">
                    {th ? 'ข้อมูลการติดตั้งและตรวจสอบจริง (Verified Production Data)' : 'Verified Production Deployment Data'}
                  </div>
                  <div className="font-mono text-xs text-emerald-400/90">{project.verified}</div>
                </div>
              </div>
              {project.platform && (
                <div className="flex flex-wrap gap-2">
                  {project.platform.map((pl) => (
                    <span
                      key={pl}
                      className="rounded-lg border border-white/[.1] bg-black/40 px-3 py-1 font-mono text-xs text-white"
                    >
                      ☁ {pl}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Key Metrics & Facts Grid (if detailed highlights exist) */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-24">
            <h2 className={`mb-6 font-heading text-2xl font-bold text-white ${th ? 'font-thai' : ''}`}>
              {th ? 'เมตริกและสถิติสำคัญของโปรเจกต์ (Detailed Benchmarks & Facts)' : 'Detailed Engineering Benchmarks & Facts'}
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {project.highlights.map((h) => (
                <div
                  key={h.k}
                  onMouseMove={onSpotlightMove}
                  className="spotlight rounded-2xl border border-white/[.06] bg-[#111113] p-5 transition hover:border-white/[.12]"
                >
                  <div className="font-heading text-2xl font-extrabold text-white" style={{ color: project.accent }}>
                    {h.v}
                  </div>
                  <div className="mt-1 font-mono text-xs text-zinc-500">{h.k}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data Pipeline Flow (if present) */}
        {project.pipeline && project.pipeline.length > 0 && (
          <div className="mb-24 rounded-3xl border border-white/[.06] bg-[#111113] p-8 sm:p-10">
            <h3 className={`mb-6 font-heading text-xl font-bold text-white ${th ? 'font-thai' : ''}`}>
              {th ? 'ขั้นตอนการสกัดและประมวลผลข้อมูล (Medallion Data Pipeline)' : 'Data Architecture & Medallion Pipeline Flow'}
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              {project.pipeline.map((zone, i) => (
                <div key={zone} className="flex items-center gap-4">
                  <div
                    className="rounded-xl border border-white/[.1] bg-white/[.03] px-5 py-3 font-mono text-xs font-semibold text-white"
                    style={{ borderColor: `${project.accent}50` }}
                  >
                    {zone}
                  </div>
                  {i < project.pipeline!.length - 1 && <span className="font-mono text-base text-zinc-600">→</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Architecture Services & Microservices Breakdown (if present) */}
        {project.arch && project.arch.length > 0 && (
          <div className="mb-24">
            <h2 className={`mb-6 font-heading text-2xl font-bold text-white ${th ? 'font-thai' : ''}`}>
              {th ? `สถาปัตยกรรมและไมโครเซอร์วิส (${project.arch.length} โหนดระบบ)` : `Microservices & Architecture Components (${project.arch.length} Services)`}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.arch.map((svc) => (
                <div
                  key={svc.name}
                  onMouseMove={onSpotlightMove}
                  className="spotlight flex flex-col justify-between rounded-2xl border border-white/[.06] bg-[#111113] p-6 transition hover:border-white/[.12]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-white/[.06] pb-3.5">
                      <span className="font-mono text-sm font-bold text-white">{svc.name}</span>
                      <span
                        className="rounded-md px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider"
                        style={{ background: `${project.accent}18`, color: project.accent }}
                      >
                        {svc.deploy}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">{svc.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FDE Skills Demonstrated (if present) */}
        {project.fde && project.fde.length > 0 && (
          <div className="mb-24 rounded-3xl border border-white/[.06] bg-[#111113] p-8 sm:p-10">
            <h3 className={`mb-6 font-heading text-xl font-bold text-white ${th ? 'font-thai' : ''}`}>
              {th ? 'ทักษะและขีดความสามารถ Forward Deployed Engineer ที่นำเสนอ' : 'Forward Deployed AI Engineer Skills Demonstrated'}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {project.fde.map((f, i) => (
                <div key={f} className="flex items-center gap-3 rounded-xl border border-white/[.05] bg-white/[.02] p-4">
                  <span
                    className="flex h-6 w-6 flex-none items-center justify-center rounded-full font-mono text-xs font-bold"
                    style={{ background: `${project.accent}20`, color: project.accent }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-zinc-200">{f}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technology Stack Matrix */}
        <div className="mb-24 rounded-3xl border border-white/[.06] bg-[#111113] p-8 sm:p-12">
          <div className="mb-6 font-mono text-xs tracking-[.25em] text-zinc-500 uppercase">
            {th ? 'เครื่องมือและเทคโนโลยีที่ใช้ (Tech Stack)' : 'Deployed Tech Stack Matrix'}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {project.tags.map((tg) => (
              <span
                key={tg}
                className="rounded-xl border border-white/[.08] bg-white/[.03] px-4 py-2.5 font-mono text-sm font-semibold text-zinc-200 transition hover:border-white/25 hover:bg-white/[.06] hover:text-white"
              >
                {tg}
              </span>
            ))}
          </div>
        </div>

        {/* Next & Previous Project Navigation Footer */}
        <footer className="border-t border-white/[.08] pt-12 pb-16">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <button
              onClick={() => onSelectProject(prevProject.id)}
              className="group flex flex-col items-start text-left rounded-2xl border border-white/[.06] bg-[#111113] p-6 w-full sm:w-[48%] transition hover:border-white/20"
            >
              <span className="font-mono text-xs text-zinc-500 group-hover:text-zinc-400">
                ← {th ? 'โปรเจกต์ก่อนหน้า' : 'Previous Project'}
              </span>
              <span className={`mt-2 font-heading text-xl font-bold text-white ${th ? 'font-thai' : ''}`}>
                {th && prevProject.nameTh ? prevProject.nameTh : prevProject.name}
              </span>
            </button>

            <button
              onClick={() => onSelectProject(nextProject.id)}
              className="group flex flex-col items-end text-right rounded-2xl border border-white/[.06] bg-[#111113] p-6 w-full sm:w-[48%] transition hover:border-white/20"
            >
              <span className="font-mono text-xs text-zinc-500 group-hover:text-zinc-400">
                {th ? 'โปรเจกต์ถัดไป' : 'Next Project'} →
              </span>
              <span className={`mt-2 font-heading text-xl font-bold text-white ${th ? 'font-thai' : ''}`} style={{ color: nextProject.accent }}>
                {th && nextProject.nameTh ? nextProject.nameTh : nextProject.name}
              </span>
            </button>
          </div>
        </footer>
      </main>
    </motion.div>
  );
}
