import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getBlogBySlug, getBlogs } from '../data/blogStore';
import SEOHead from './SEOHead';

const ease = [0.22, 1, 0.36, 1] as const;

export default function BlogPostPage({
  slugOrId,
  onBack,
  onSelectBlog,
}: {
  slugOrId: string;
  onBack: () => void;
  onSelectBlog: (slug: string) => void;
}) {
  const { i18n } = useTranslation();
  const th = i18n.language === 'th';
  const blog = getBlogBySlug(slugOrId) || getBlogs()[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slugOrId]);

  if (!blog) return null;

  const related = getBlogs()
    .filter((b) => b.id !== blog.id)
    .slice(0, 3);

  // Format content paragraphs
  const contentText = th && blog.contentTh ? blog.contentTh : blog.content;
  const sections = contentText.split('\n\n').filter(Boolean);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease }}
      className="relative min-h-screen bg-[#09090b] pb-32 text-zinc-300"
    >
      <SEOHead
        title={blog.seoTitle || blog.title}
        description={blog.metaDescription || blog.excerpt}
        keywords={blog.keywords}
        image={blog.coverImage}
        url={`https://khiw.dev/blog/${blog.slug || blog.id}`}
        type="article"
        blogPost={blog}
      />

      {/* Sticky Reader Header */}
      <header className="sticky top-0 z-50 border-b border-white/[.08] bg-[#09090b]/90 px-5 py-4 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 rounded-xl border border-white/[.08] bg-white/[.03] px-4 py-2 font-mono text-xs text-zinc-400 transition hover:border-white/20 hover:bg-white/[.06] hover:text-white"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>{th ? 'กลับสู่บทความ AI ทั้งหมด' : 'Back to AI Blog'}</span>
          </button>

          <span className="font-mono text-xs text-zinc-500 hidden sm:block">
            {blog.category} · ⏱ {blog.readTime}
          </span>

          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span>👁 {blog.views.toLocaleString()}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 pt-12 sm:px-8 sm:pt-16">
        {/* Article Header */}
        <div className="mb-12 border-b border-white/[.08] pb-12">
          <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-500">
            <span className="rounded-md bg-[#a3e635] px-2.5 py-1 font-bold text-[#09090b]">
              {blog.category}
            </span>
            <span>·</span>
            <span>{blog.date}</span>
            <span>·</span>
            <span>⏱ {blog.readTime}</span>
          </div>

          <h1 className={`font-heading text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl ${th ? 'font-thai' : ''}`}>
            {th && blog.titleTh ? blog.titleTh : blog.title}
          </h1>

          <p className={`mt-6 text-lg leading-relaxed text-zinc-400 sm:text-xl ${th ? 'font-thai-body' : ''}`}>
            {th && blog.excerptTh ? blog.excerptTh : blog.excerpt}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 font-heading text-lg font-bold text-white shadow-lg">
              KN
            </div>
            <div>
              <div className="font-heading text-base font-bold text-white">{blog.author}</div>
              <div className="font-mono text-xs text-[#a3e635]">{blog.authorRole}</div>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="mb-16 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/[.08] bg-[#111113] shadow-2xl">
          <img src={blog.coverImage} alt={blog.title} className="h-full w-full object-cover" />
        </div>

        {/* Article Content Body */}
        <div className="prose prose-invert max-w-none space-y-6 leading-relaxed text-zinc-300 sm:text-lg">
          {sections.map((sec, i) => {
            if (sec.startsWith('## ')) {
              return (
                <h2 key={i} className={`mt-12 mb-4 font-heading text-2xl font-bold text-white sm:text-3xl ${th ? 'font-thai' : ''}`}>
                  {sec.replace('## ', '')}
                </h2>
              );
            }
            if (sec.startsWith('### ')) {
              return (
                <h3 key={i} className={`mt-8 mb-3 font-heading text-xl font-bold text-[#a3e635] sm:text-2xl ${th ? 'font-thai' : ''}`}>
                  {sec.replace('### ', '')}
                </h3>
              );
            }
            if (sec.startsWith('```')) {
              return (
                <div key={i} className="my-6 overflow-x-auto rounded-2xl border border-white/[.08] bg-[#111113] p-6 font-mono text-xs text-zinc-200 sm:text-sm">
                  <pre>{sec.replace(/```/g, '')}</pre>
                </div>
              );
            }
            if (sec.startsWith('* ') || sec.startsWith('1. ')) {
              return (
                <div key={i} className="my-4 rounded-2xl border border-white/[.05] bg-white/[.02] p-5 text-base leading-relaxed text-zinc-300 font-mono">
                  {sec}
                </div>
              );
            }
            return (
              <p key={i} className={`text-zinc-300 leading-relaxed ${th ? 'font-thai-body' : ''}`}>
                {sec}
              </p>
            );
          })}
        </div>

        {/* SEO Keywords & Tags Footer Box */}
        <div className="mt-16 rounded-3xl border border-white/[.08] bg-[#111113] p-8 sm:p-10">
          <div className="mb-4 font-mono text-xs tracking-widest text-zinc-500 uppercase">
            {th ? '● คีย์เวิร์ดและแท็ก SEO (SEO Optimization Keywords)' : '● SEO Optimization Keywords'}
          </div>
          <div className="flex flex-wrap gap-2">
            {blog.keywords.map((kw) => (
              <span
                key={kw}
                className="rounded-xl border border-white/[.08] bg-white/[.03] px-3.5 py-1.5 font-mono text-xs text-zinc-300 transition hover:border-[#a3e635] hover:text-[#a3e635]"
              >
                #{kw}
              </span>
            ))}
          </div>
        </div>

        {/* Related Articles Bento Grid */}
        {related.length > 0 && (
          <div className="mt-24 border-t border-white/[.08] pt-16">
            <h2 className={`mb-8 font-heading text-2xl font-bold text-white sm:text-3xl ${th ? 'font-thai' : ''}`}>
              {th ? 'บทความ AI ที่เกี่ยวข้อง (Related AI Engineer Guides)' : 'Related AI Engineer Guides'}
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {related.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectBlog(rel.slug || rel.id)}
                  className="spotlight border-gradient group flex cursor-pointer flex-col justify-between rounded-2xl border border-white/[.06] bg-[#111113] p-5 transition hover:border-white/20"
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-xl bg-black">
                    <img src={rel.coverImage} alt={rel.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="mt-4">
                    <span className="font-mono text-[10px] uppercase text-[#a3e635]">{rel.category}</span>
                    <h4 className={`mt-2 line-clamp-2 font-heading text-sm font-bold text-white group-hover:text-[#a3e635] ${th ? 'font-thai' : ''}`}>
                      {th && rel.titleTh ? rel.titleTh : rel.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
}
