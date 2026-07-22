import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { profile } from '../data/portfolio';

const proof = [
  { value: '34+', en: 'production systems', th: 'ระบบที่ติดตั้งจริง' },
  { value: '9', en: 'industry verticals', th: 'อุตสาหกรรม' },
  { value: '29ms', en: 'edge TTFT', th: 'ความหน่วง Edge' },
  { value: '฿5.9M', en: 'commercial impact', th: 'ผลกระทบธุรกิจ' },
];

export default function RecruiterBrief({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { i18n } = useTranslation();
  const thai = i18n.language === 'th';
  const [copied, setCopied] = useState(false);

  const copyProfile = async () => {
    const text = `${profile.name}\n${profile.role}\n${profile.email}\n${profile.phone}\nhttps://www.linkedin.com/in/getintheq`;
    await navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            aria-label="Close recruiter brief"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-[#111713]/30 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: .4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-3 right-3 top-3 z-[90] flex w-[calc(100%-1.5rem)] max-w-xl flex-col overflow-hidden rounded-[2rem] border border-[#111713]/10 bg-[#fbfaf7] shadow-[0_30px_90px_rgba(17,23,19,.22)] sm:bottom-5 sm:right-5 sm:top-5"
            role="dialog"
            aria-modal="true"
            aria-label={thai ? 'ข้อมูลสรุปสำหรับฝ่ายสรรหา' : 'Recruiter hiring snapshot'}
          >
            <header className="flex items-center justify-between border-b border-[#111713]/10 px-5 py-4 sm:px-7">
              <div>
                <span className="font-mono text-[8px] uppercase tracking-[.18em] text-[#5b4ef2]">recruiter brief / 01</span>
                <h2 className="mt-1 font-heading text-lg font-extrabold text-[#111713]">{thai ? 'ข้อมูลสรุปสำหรับ HR' : 'Hiring snapshot'}</h2>
              </div>
              <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111713]/5 text-[#53605a] transition hover:bg-[#111713] hover:text-white">✕</button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7">
              <div className="rounded-[1.7rem] bg-[#111713] p-6 text-white sm:p-8">
                <span className="font-mono text-[8px] uppercase tracking-[.16em] text-[#c9f36a]">recommended profile</span>
                <h3 className="mt-4 font-heading text-3xl font-extrabold tracking-[-.04em]">{profile.name}</h3>
                <p className="mt-2 text-sm font-semibold text-[#b7acff]">{thai ? profile.roleTh : profile.role}</p>
                <p className={`mt-5 text-sm leading-7 text-white/55 ${thai ? 'font-thai-body' : ''}`}>{thai ? profile.taglineTh : profile.tagline}</p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                {proof.map((item) => (
                  <div key={item.en} className="rounded-2xl border border-[#111713]/10 bg-white p-4">
                    <span className="font-heading text-2xl font-extrabold text-[#111713]">{item.value}</span>
                    <span className="mt-1 block font-mono text-[8px] uppercase tracking-wider text-[#7a837e]">{thai ? item.th : item.en}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 border-t border-[#111713]/10 pt-6">
                <span className="font-mono text-[8px] uppercase tracking-[.18em] text-[#5b4ef2]">why this candidate</span>
                <ul className="mt-4 space-y-3">
                  {[
                    thai ? 'ทำงานร่วมกับลูกค้าโดยตรง ตั้งแต่ค้นหาโจทย์จนถึง production' : 'Owns the full customer loop from ambiguity to production.',
                    thai ? 'เชื่อมความรู้ AI, Full Stack, Cloud และวิศวกรรมเข้าด้วยกัน' : 'Combines AI, full-stack, cloud, and engineering domain depth.',
                    thai ? 'มีผลงานภาครัฐ โทรคมนาคม ก่อสร้าง และอุตสาหกรรมจริง' : 'Verified delivery across government, telecom, construction, and industry.',
                    thai ? 'สื่อสารกับทั้งผู้บริหารและทีมเทคนิคได้อย่างมีประสิทธิภาพ' : 'Translates effectively between executives and technical teams.',
                  ].map((item) => (
                    <li key={item} className={`flex gap-3 text-sm leading-6 text-[#56615a] ${thai ? 'font-thai-body' : ''}`}>
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#5b4ef2]" />{item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 rounded-2xl border border-[#111713]/10 bg-white p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-[#7a837e]">availability</span>
                    <p className="mt-1 text-sm font-bold text-[#111713]">{thai ? profile.availabilityTh : profile.availability}</p>
                  </div>
                  <span className="relative flex h-3 w-3"><i className="absolute h-full w-full animate-ping rounded-full bg-[#4c7c22]/60" /><i className="relative h-3 w-3 rounded-full bg-[#4c7c22]" /></span>
                </div>
              </div>
            </div>

            <footer className="grid grid-cols-2 gap-2 border-t border-[#111713]/10 p-4 sm:p-5">
              <button onClick={copyProfile} className="rounded-xl border border-[#111713]/10 bg-white px-4 py-3 font-heading text-xs font-extrabold text-[#111713] transition hover:bg-[#111713]/5">{copied ? (thai ? 'คัดลอกแล้ว' : 'Copied') : (thai ? 'คัดลอกข้อมูล' : 'Copy profile')}</button>
              <a href={`mailto:${profile.email}`} className="rounded-xl bg-[#111713] px-4 py-3 text-center font-heading text-xs font-extrabold text-white transition hover:-translate-y-0.5">{thai ? 'ติดต่อคิว' : 'Contact Khiw'} ↗</a>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}