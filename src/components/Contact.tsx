import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { profile } from '../data/portfolio';

export default function Contact({ onOpenAdmin }: { onOpenAdmin?: () => void }) {
  const { t, i18n } = useTranslation();
  const thai = i18n.language === 'th';

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .75, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[2.5rem] bg-[#111713] px-6 py-14 text-white shadow-[0_28px_80px_rgba(17,23,19,.2)] sm:px-12 sm:py-20 lg:px-20"
      >
        <div className="technical-grid absolute inset-0 opacity-[.08]" />
        <div className="absolute -right-28 -top-36 h-80 w-80 rounded-full bg-[#5b4ef2]/35 blur-[100px]" />
        <div className="absolute -bottom-40 -left-28 h-80 w-80 rounded-full bg-[#c9f36a]/20 blur-[105px]" />

        <div className="relative grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.18em] text-[#c9f36a]">
              <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
              {t('nav.available')}
            </span>
            <h2 className={`mt-6 max-w-4xl font-heading text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-white sm:text-6xl lg:text-7xl ${thai ? 'font-thai tracking-[-.03em]' : ''}`}>
              {thai ? 'มีโจทย์ยากที่ต้องส่งมอบจริงไหม?' : 'Bring me the problem that cannot stay a prototype.'}
            </h2>
            <p className={`mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base ${thai ? 'font-thai-body' : ''}`}>
              {t('contact.subtitle')}
            </p>
          </div>

          <a href={`mailto:${profile.email}`} className="group inline-flex items-center justify-between gap-5 rounded-2xl bg-[#c9f36a] px-6 py-4 font-heading text-sm font-extrabold text-[#111713] transition hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(201,243,106,.2)] lg:min-w-72">
            <span>{profile.email}</span><span className="transition-transform group-hover:translate-x-1">↗</span>
          </a>
        </div>

        <div className="relative mt-14 flex flex-wrap items-center gap-2 border-t border-white/10 pt-7">
          {profile.socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-4 py-2 font-mono text-[9px] uppercase tracking-wider text-white/55 transition hover:border-white/25 hover:text-white">
              {social.label} / {social.handle}
            </a>
          ))}
        </div>
      </motion.div>

      <footer className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#111713]/10 pt-6 text-center sm:flex-row sm:text-left">
        <span className="font-mono text-[9px] uppercase tracking-wider text-[#7a837e]">{t('contact.footer')}</span>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          {onOpenAdmin && (
            <button onClick={onOpenAdmin} className="font-mono text-[9px] uppercase tracking-wider text-[#7a837e] transition hover:text-[#5b4ef2]">
              secure admin / cms ↗
            </button>
          )}
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#9aa19d]">{t('contact.builtWith')}</span>
        </div>
      </footer>
    </section>
  );
}