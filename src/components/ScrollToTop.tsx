import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
export default function ScrollToTop() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const fn = () => setVis(window.scrollY > 600); window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn); }, []);
  return (
    <AnimatePresence>
      {vis && (
        <motion.button initial={{ opacity: 0, scale: .6, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .6, y: 20 }} transition={{ duration: .3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-5 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[#111713]/10 bg-white/80 text-[#53605a] shadow-[0_10px_30px_rgba(17,23,19,.1)] backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:text-[#5b4ef2] sm:bottom-8 sm:right-8 sm:h-12 sm:w-12">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
