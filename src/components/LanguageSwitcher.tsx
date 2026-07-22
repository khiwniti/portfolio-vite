import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const langs = [{ code: 'en', label: 'EN', name: 'English' }, { code: 'th', label: 'ไทย', name: 'ภาษาไทย' }];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const cur = langs.find(l => l.code === i18n.language) ?? langs[0];

  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)} className="flex items-center gap-1.5 rounded-xl border border-[#111713]/10 bg-white/60 px-3 py-2 font-mono text-[10px] font-bold text-[#53605a] transition hover:bg-white hover:text-[#111713]">
        <svg className="h-3.5 w-3.5 text-[#7b8580]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
        {cur.label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-[#7b8580]">▾</motion.span>
      </button>
      <AnimatePresence>
        {open && (<>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <motion.div initial={{ opacity: 0, y: -6, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: .95 }} transition={{ duration: .2 }} className="absolute right-0 top-full mt-2 z-50 min-w-44 overflow-hidden rounded-xl border border-[#111713]/10 bg-[#fbfaf7] shadow-[0_16px_45px_rgba(17,23,19,.13)]">
            {langs.map(l => (
              <button key={l.code} onClick={() => { i18n.changeLanguage(l.code); setOpen(false); }} className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition ${l.code === i18n.language ? 'bg-[#5b4ef2]/8 text-[#111713]' : 'text-[#66706a] hover:bg-[#111713]/5 hover:text-[#111713]'}`}>
                <span className="w-8 font-mono text-xs font-bold text-[#7c8680]">{l.label}</span><span className="text-sm">{l.name}</span>
                {l.code === i18n.language && <svg className="ml-auto h-3 w-3 text-[#5b4ef2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
              </button>
            ))}
          </motion.div>
        </>)}
      </AnimatePresence>
    </div>
  );
}
