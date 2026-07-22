import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const links = [
  { key: 'work', href: '#work' },
  { key: 'projects', href: '#projects' },
  { key: 'blog', href: '#blog' },
  { key: 'log', href: '#changelog' },
  { key: 'stack', href: '#stack' },
];

export default function Navbar({ onOpenRecruiter }: { onOpenRecruiter?: () => void }) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5"
    >
      <nav
        className={`flex w-full max-w-7xl items-center justify-between rounded-2xl px-3.5 py-2.5 transition-all duration-500 sm:px-5 sm:py-3 ${
          scrolled || mobileOpen ? 'glass-strong' : 'border border-transparent'
        }`}
      >
        <a href="#top" className="flex items-center gap-2 sm:gap-2.5" onClick={() => setMobileOpen(false)}>
          <span className="relative flex h-8 w-8 flex-none items-center justify-center rounded-xl bg-[#111713] font-heading text-[11px] font-bold text-white shadow-[0_6px_18px_rgba(17,23,19,.2)] sm:h-9 sm:w-9 sm:text-xs">
            KN
          </span>
          <div className="hidden sm:block">
            <span className="block font-heading text-xs font-extrabold tracking-tight text-[#111713]">KHIW NITITHADACHOT</span>
            <span className="block font-mono text-[9px] uppercase tracking-[.16em] text-[#7a837e]">forward deployed ai engineer</span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className="rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.12em] text-[#66706a] transition hover:bg-[#111713]/5 hover:text-[#111713]"
            >
              {t(`nav.${l.key}`)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {onOpenRecruiter && (
            <button
              onClick={onOpenRecruiter}
              className="hidden rounded-xl border border-[#111713]/10 bg-white/60 px-3.5 py-2 font-mono text-[9px] font-bold uppercase tracking-[.1em] text-[#53605a] transition hover:bg-white hover:text-[#5b4ef2] md:block"
            >
              recruiter brief
            </button>
          )}
          <LanguageSwitcher />
          <a
            href="#contact"
            className="group hidden items-center gap-2 rounded-xl bg-[#111713] px-4 py-2 font-mono text-[10px] uppercase tracking-[.13em] text-white shadow-[0_8px_22px_rgba(17,23,19,.15)] transition hover:-translate-y-0.5 sm:flex"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c9f36a] opacity-50" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#c9f36a]" />
            </span>
            {t('nav.available')}
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-[#111713]/5 text-[#111713] transition hover:bg-[#111713]/10 lg:hidden"
          >
            <div className="flex flex-col items-center justify-center gap-[3px]">
              <motion.span
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 5 : 0 }}
                className="block h-[1.5px] w-4 bg-current"
              />
              <motion.span
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                className="block h-[1.5px] w-4 bg-current"
              />
              <motion.span
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -5 : 0 }}
                className="block h-[1.5px] w-4 bg-current"
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong absolute inset-x-3 top-[calc(100%+0.5rem)] z-40 flex flex-col gap-1 rounded-2xl p-3 sm:inset-x-5 lg:hidden"
          >
            {links.map((l) => (
              <a
                key={l.key}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 font-mono text-xs uppercase tracking-wider text-[#53605a] transition hover:bg-[#111713]/5 hover:text-[#111713]"
              >
                {t(`nav.${l.key}`)}
              </a>
            ))}
            {onOpenRecruiter && (
              <button
                onClick={() => { setMobileOpen(false); onOpenRecruiter(); }}
                className="rounded-xl px-4 py-3 text-left font-mono text-xs uppercase tracking-wider text-[#5b4ef2] transition hover:bg-[#5b4ef2]/5"
              >
                {t('nav.contact')} / recruiter brief
              </button>
            )}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-1 flex items-center gap-2 rounded-xl bg-[#111713] px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c9f36a] opacity-50" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[#c9f36a]" />
              </span>
              {t('nav.available')}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
