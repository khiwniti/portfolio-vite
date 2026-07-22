import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getBlogs } from '../data/blogStore';
import SectionHeading from './SectionHeading';

const ease = [0.22, 1, 0.36, 1] as const;

export default function BlogSection({
  onSelectBlog,
}: {
  onSelectBlog: (slugOrId: string) => void;
}) {
  const { i18n } = useTranslation();
  const th = i18n.language === 'th';
  const [blogs, setBlogs] = useState(() => getBlogs());
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('all');

  useEffect(() => {
    const sync = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      setBlogs(Array.isArray(detail) ? detail : getBlogs());
    };
    window.addEventListener('portfolio:blogs-updated', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('portfolio:blogs-updated', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(blogs.map((b) => (th && b.categoryTh ? b.categoryTh : b.category)));
    return ['all', ...Array.from(cats)];
  }, [blogs, th]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const q = search.toLowerCase();
      const titleMatch = b.title.toLowerCase().includes(q) || (b.titleTh && b.titleTh.toLowerCase().includes(q));
      const excMatch = b.excerpt.toLowerCase().includes(q) || (b.excerptTh && b.excerptTh.toLowerCase().includes(q));
      const tagMatch = b.tags.some((t) => t.toLowerCase().includes(q));
      const keyMatch = b.keywords.some((k) => k.toLowerCase().includes(q));
      const catMatch =
        activeCat === 'all' ||
        b.category === activeCat ||
        b.categoryTh === activeCat;

      return (titleMatch || excMatch || tagMatch || keyMatch) && catMatch;
    });
  }, [blogs, search, activeCat]);

  const featured = filteredBlogs.find((b) => b.featured) || filteredBlogs[0];
  const regular = filteredBlogs.filter((b) => b.id !== featured?.id);

  return (
    <section id="blog" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-32">
      <div className="flex flex-col justify-between gap-6 pb-12 sm:flex-row sm:items-end">
        <SectionHeading
          index="05 / ai intelligence blog & seo updates"
          title={th ? 'บทความ AI Tools & SEO อัปเดตล่าสุด' : 'AI Tools & Engineering Updates'}
          subtitle={
            th
              ? 'เจาะลึกเครื่องมือ AI ใหม่ล่าสุด LangGraph, MCP, Edge MLOps พร้อมคีย์เวิร์ด SEO อันดับ 1'
              : 'Newest AI Engineer tooling breakdowns, autonomous multi-agent workflows, and SEO updates.'
          }
        />

        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={th ? 'ค้นหาบทความหรือ AI Tools...' : 'Search AI tools, keywords...'}
            className="w-full rounded-2xl border border-[#111713]/10 bg-white/70 py-3.5 pl-11 pr-4 font-mono text-xs text-[#111713] placeholder-[#919994] outline-none transition focus:border-[#5b4ef2] focus:ring-1 focus:ring-[#5b4ef2]"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a837e]">⌕</span>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-[#111713]/5 px-1.5 py-0.5 font-mono text-[10px] text-[#66706a] hover:text-[#111713]"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Categories Filter Bar */}
      <div className="mb-12 flex flex-wrap gap-2">
        {categories.map((cat) => {
          const active = activeCat === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`rounded-full border px-4 py-2 font-mono text-xs font-semibold tracking-wider transition ${
                active
                  ? 'border-[#111713] bg-[#111713] text-white'
                  : 'border-[#111713]/10 bg-white/50 text-[#66706a] hover:bg-white hover:text-[#111713]'
              }`}
            >
              {cat === 'all' ? (th ? 'ทั้งหมด (All Articles)' : 'ALL TOPICS') : cat}
            </button>
          );
        })}
      </div>

      {/* Featured Post Card */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          onClick={() => onSelectBlog(featured.slug || featured.id)}
          className="spotlight border-gradient group mb-12 grid cursor-pointer gap-8 overflow-hidden rounded-[2rem] border border-[#111713]/10 bg-white/72 p-5 shadow-[0_20px_65px_rgba(28,34,29,.06)] transition hover:-translate-y-1 hover:bg-white lg:grid-cols-12 sm:p-8"
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl lg:col-span-7">
            <img
              src={featured.coverImage}
              alt={featured.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <span className="absolute left-4 top-4 rounded-full bg-[#111713] px-3 py-1 font-mono text-[9px] font-extrabold uppercase text-white shadow-lg">
              ★ {th ? 'บทความเด่น (FEATURED AI GUIDE)' : 'FEATURED AI GUIDE'}
            </span>
          </div>

          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-[#8a928d]">
                <span className="text-[#5b4ef2]">{featured.category}</span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span>⏱ {featured.readTime}</span>
              </div>
              <h2 className={`mt-4 font-heading text-2xl font-extrabold leading-snug tracking-tight text-[#111713] group-hover:text-[#5b4ef2] sm:text-3xl ${th ? 'font-thai' : ''}`}>
                {th && featured.titleTh ? featured.titleTh : featured.title}
              </h2>
              <p className={`mt-4 line-clamp-4 text-sm leading-7 text-[#66706a] ${th ? 'font-thai-body text-[15px]' : ''}`}>
                {th && featured.excerptTh ? featured.excerptTh : featured.excerpt}
              </p>
            </div>

            <div className="mt-8 border-t border-[#111713]/10 pt-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-mono text-[10px] text-[#66706a]">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111713] text-[9px] font-bold text-white">KN</span>
                  <span>{featured.author}</span>
                </div>
                <span className="font-heading text-xs font-bold uppercase tracking-wider text-[#5b4ef2]">
                  {th ? 'อ่านบทความนี้ →' : 'Read AI Article →'}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-1">
                {featured.keywords.slice(0, 4).map((kw) => (
                  <span key={kw} className="rounded-full bg-[#111713]/5 px-2.5 py-1 font-mono text-[9px] text-[#6e7772]">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Regular Posts Grid */}
      <AnimatePresence mode="popLayout">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regular.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              onClick={() => onSelectBlog(post.slug || post.id)}
              className="spotlight border-gradient group flex cursor-pointer flex-col justify-between overflow-hidden rounded-[1.7rem] border border-[#111713]/10 bg-white/65 transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_50px_rgba(28,34,29,.08)]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-[#111713]/85 px-2.5 py-1 font-mono text-[9px] text-white backdrop-blur">
                  {post.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-[#8a928d]">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>⏱ {post.readTime}</span>
                    <span>·</span>
                    <span>👁 {post.views.toLocaleString()} views</span>
                  </div>
                  <h3 className={`mt-3 font-heading text-lg font-extrabold leading-snug text-[#111713] group-hover:text-[#5b4ef2] ${th ? 'font-thai' : ''}`}>
                    {th && post.titleTh ? post.titleTh : post.title}
                  </h3>
                  <p className={`mt-2 line-clamp-3 text-xs leading-6 text-[#66706a] ${th ? 'font-thai-body text-[13px]' : ''}`}>
                    {th && post.excerptTh ? post.excerptTh : post.excerpt}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#111713]/10 pt-4">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tg) => (
                      <span key={tg} className="rounded-full bg-[#111713]/5 px-2.5 py-1 font-mono text-[9px] text-[#6f7973]">
                        {tg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {filteredBlogs.length === 0 && (
        <div className="rounded-3xl border border-[#111713]/10 bg-white/65 p-12 text-center font-mono text-sm text-[#7a837e]">
          {th ? 'ไม่พบบทความ AI ที่ค้นหา ลองค้นหาด้วยคำอื่น' : 'No AI articles matched your search query.'}
        </div>
      )}
    </section>
  );
}
