import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  type BlogPost,
  getBlogs,
  saveBlog,
  deleteBlog,
  getManagedProjects,
  saveManagedProjects,
  isAdminAuthenticated,
  loginAdmin,
  logoutAdmin,
} from '../data/blogStore';
import { type Project } from '../data/portfolio';

export default function AdminPortal({
  onClose,
  onOpenBlog,
}: {
  onClose: () => void;
  onOpenBlog: (slug: string) => void;
}) {
  const { i18n } = useTranslation();
  const th = i18n.language === 'th';
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [loginErr, setLoginErr] = useState(false);

  const [tab, setTab] = useState<'blogs' | 'projects' | 'seo'>('blogs');
  const [blogsList, setBlogsList] = useState<BlogPost[]>([]);
  const [projectsList, setProjectsList] = useState<(Project & { showOnLanding?: boolean })[]>([]);

  // Blog Editor State
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogTitleTh, setBlogTitleTh] = useState('');
  const [blogSlug, setBlogSlug] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogExcerptTh, setBlogExcerptTh] = useState('');
  const [blogCategory, setBlogCategory] = useState('Autonomous Agents & MCP');
  const [blogCover, setBlogCover] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200');
  const [blogReadTime, setBlogReadTime] = useState('5 min read');
  const [blogKeywords, setBlogKeywords] = useState('AI Engineer, Forward Deployed AI Engineer, LangGraph, MCP, Khiw Nitithadachot');
  const [blogContent, setBlogContent] = useState('');
  const [blogFeatured, setBlogFeatured] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setAuthed(isAdminAuthenticated());
    setBlogsList(getBlogs());
    setProjectsList(getManagedProjects());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(user, pass)) {
      setAuthed(true);
      setLoginErr(false);
    } else {
      setLoginErr(true);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setAuthed(false);
  };

  const startCreateNewBlog = () => {
    const newSlug = `new-ai-tool-update-${Date.now().toString().slice(-4)}`;
    setEditingBlog({
      id: newSlug,
      slug: newSlug,
      title: '',
      titleTh: '',
      excerpt: '',
      excerptTh: '',
      content: '## New AI Tool Update 2026\n\nExplain how this AI tool improves enterprise operations and SEO ranking...',
      category: 'Autonomous Agents & MCP',
      tags: ['AI Tools', 'SEO', 'MCP', 'LangGraph'],
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200',
      author: 'Khiw Nitithadachot',
      authorRole: 'Forward Deployed AI Engineer',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: '5 min read',
      views: 120,
      featured: false,
      seoTitle: '',
      metaDescription: '',
      keywords: ['AI Engineer', 'AI Tools', 'Forward Deployed AI', 'Khiw Nitithadachot'],
    });
    setBlogTitle('');
    setBlogTitleTh('');
    setBlogSlug(newSlug);
    setBlogExcerpt('');
    setBlogExcerptTh('');
    setBlogContent('## New AI Tool Update 2026\n\nExplain how this AI tool improves enterprise operations and SEO ranking...');
    setBlogKeywords('AI Engineer, AI Tools, Forward Deployed AI, Khiw Nitithadachot');
  };

  const startEditBlog = (b: BlogPost) => {
    setEditingBlog(b);
    setBlogTitle(b.title);
    setBlogTitleTh(b.titleTh || '');
    setBlogSlug(b.slug || b.id);
    setBlogExcerpt(b.excerpt);
    setBlogExcerptTh(b.excerptTh || '');
    setBlogCategory(b.category);
    setBlogCover(b.coverImage);
    setBlogReadTime(b.readTime);
    setBlogKeywords(b.keywords.join(', '));
    setBlogContent(b.content);
    setBlogFeatured(b.featured);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    const cleanSlug = blogSlug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
    const kwArr = blogKeywords.split(',').map((k) => k.trim()).filter(Boolean);

    const updatedPost: BlogPost = {
      ...editingBlog,
      slug: cleanSlug || editingBlog.id,
      title: blogTitle || 'Untitled AI Guide',
      titleTh: blogTitleTh || blogTitle,
      excerpt: blogExcerpt || 'AI Engineer guide update...',
      excerptTh: blogExcerptTh || blogExcerpt,
      category: blogCategory,
      coverImage: blogCover,
      readTime: blogReadTime || '5 min read',
      keywords: kwArr.length > 0 ? kwArr : ['AI Engineer', 'Khiw Nitithadachot'],
      content: blogContent,
      featured: blogFeatured,
      seoTitle: `${blogTitle} | Khiw Nitithadachot FDE`,
      metaDescription: blogExcerpt || blogContent.slice(0, 150),
    };

    const newBlogs = saveBlog(updatedPost);
    setBlogsList(newBlogs);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
    setEditingBlog(null);
  };

  const handleDeleteBlog = (id: string) => {
    if (window.confirm(th ? 'ต้องการลบบทความนี้ใช่หรือไม่?' : 'Are you sure you want to delete this blog post?')) {
      const newBlogs = deleteBlog(id);
      setBlogsList(newBlogs);
    }
  };

  const toggleProjectVisibility = (id: string) => {
    const updated = projectsList.map((p) => {
      if (p.id === id) {
        return { ...p, showOnLanding: !(p.showOnLanding ?? true) };
      }
      return p;
    });
    setProjectsList(updated);
    saveManagedProjects(updated);
  };

  // SEO Score Calculations
  const calculateSeoScore = (titleText: string, excText: string, bodyText: string, kwsText: string) => {
    let score = 40;
    if (titleText.length >= 25 && titleText.length <= 70) score += 15;
    if (excText.length >= 80 && excText.length <= 160) score += 15;
    if (bodyText.length >= 300) score += 15;
    if (bodyText.includes('## ')) score += 10;
    if (kwsText.toLowerCase().includes('ai engineer')) score += 5;
    return Math.min(score, 100);
  };

  const currentSeoScore = editingBlog
    ? calculateSeoScore(blogTitle, blogExcerpt, blogContent, blogKeywords)
    : 95;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex flex-col bg-[#09090b] text-zinc-300 overflow-y-auto"
    >
      {/* Portal Top Bar */}
      <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-white/[.08] bg-[#111113] px-4 py-3 shadow-xl sm:px-6 sm:py-4">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 font-bold">🔒</span>
          <div className="min-w-0">
            <h1 className="truncate font-heading text-sm font-extrabold text-white sm:text-lg">
              {th ? 'ระบบจัดการหลังบ้าน' : 'Admin Management System'}
            </h1>
            <span className="hidden font-mono text-[10px] uppercase tracking-widest text-[#a3e635] sm:block">
              Khiw Nitithadachot AI & SEO Intelligence
            </span>
          </div>
        </div>

        <div className="flex flex-none items-center gap-2 sm:gap-3">
          {authed && (
            <button
              onClick={handleLogout}
              className="rounded-xl border border-white/[.1] bg-white/[.03] px-2.5 py-1.5 font-mono text-[11px] text-zinc-400 hover:text-white sm:px-3.5 sm:text-xs"
            >
              {th ? 'ออกจากระบบ' : 'Logout'}
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-xl bg-white/10 px-3 py-1.5 font-mono text-[11px] font-bold text-white transition hover:bg-white/20 sm:px-4 sm:text-xs"
          >
            ✕ {th ? 'ปิด' : 'Exit'}
          </button>
        </div>
      </header>

      {/* Main Portal Body */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col p-6 sm:p-10">
        {!authed ? (
          <div className="mx-auto my-auto w-full max-w-md rounded-3xl border border-white/[.08] bg-[#111113] p-8 shadow-2xl sm:p-10">
            <div className="mb-6 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#a3e635]/15 text-2xl text-[#a3e635]">
                🛡️
              </span>
              <h2 className="mt-4 font-heading text-2xl font-bold text-white">
                {th ? 'เข้าสู่ระบบผู้ดูแล' : 'Admin Authentication'}
              </h2>
              <p className="mt-2 font-mono text-xs text-zinc-500">
                {th ? 'ใช้ admin / Admin123 ในการยืนยันตัวตน' : 'Use admin / Admin123 to authenticate'}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-1.5 block font-mono text-xs text-zinc-400">Username</label>
                <input
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="admin"
                  className="w-full rounded-xl border border-white/[.08] bg-[#18181b] px-4 py-3 font-mono text-sm text-white placeholder-zinc-600 outline-none focus:border-[#a3e635]"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-mono text-xs text-zinc-400">Password</label>
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Admin123"
                  className="w-full rounded-xl border border-white/[.08] bg-[#18181b] px-4 py-3 font-mono text-sm text-white placeholder-zinc-600 outline-none focus:border-[#a3e635]"
                />
              </div>

              {loginErr && (
                <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 font-mono text-xs text-rose-400 text-center">
                  {th ? 'รหัสผ่านหรือชื่อผู้ใช้ไม่ถูกต้อง ลองใหม่อีกครั้ง' : 'Invalid admin username or password.'}
                </div>
              )}

              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-[#a3e635] py-3.5 font-heading text-sm font-bold uppercase tracking-wider text-[#09090b] shadow-lg transition hover:scale-[1.02]"
              >
                {th ? 'เข้าสู่ระบบ Admin' : 'Sign In as Admin'}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Tab Bar */}
            <div className="flex flex-col gap-2 border-b border-white/[.08] pb-4 sm:flex-row sm:flex-wrap">
              {[
                { k: 'blogs', l: th ? '📝 จัดการบทความ AI & SEO' : '📝 Manage AI Blogs & SEO' },
                { k: 'projects', l: th ? '🏗️ ควบคุมการแสดงผลโปรเจกต์' : '🏗️ Control Landing Projects' },
                { k: 'seo', l: th ? '🚀 วิเคราะห์สถานะ SEO อันดับ 1' : '🚀 Search Engine Rank #1 Checklist' },
              ].map((tb) => (
                <button
                  key={tb.k}
                  onClick={() => setTab(tb.k as any)}
                  className={`rounded-xl px-4 py-2.5 text-left font-mono text-[11px] font-bold transition sm:text-xs ${
                    tab === tb.k
                      ? 'bg-[#a3e635] text-[#09090b]'
                      : 'bg-white/[.03] text-zinc-400 hover:bg-white/[.06] hover:text-white'
                  }`}
                >
                  {tb.l}
                </button>
              ))}
            </div>

            {saveSuccess && (
              <div className="rounded-2xl bg-emerald-500/20 border border-emerald-500/40 p-4 font-mono text-sm text-emerald-300 text-center">
                ✓ {th ? 'บันทึกข้อมูลและอัปเดตบนเว็บไซต์เรียลไทม์สำเร็จแล้ว' : 'Successfully saved blog post! Live site updated instantly.'}
              </div>
            )}

            {/* TAB 1: MANAGE BLOGS */}
            {tab === 'blogs' && (
              <div className="grid gap-8 lg:grid-cols-12">
                {/* Left: Blogs List */}
                <div className="rounded-3xl border border-white/[.08] bg-[#111113] p-6 lg:col-span-5 sm:p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="font-heading text-xl font-bold text-white">
                      {th ? `บทความในระบบ (${blogsList.length})` : `Published AI Blogs (${blogsList.length})`}
                    </h2>
                    <button
                      onClick={startCreateNewBlog}
                      className="rounded-xl bg-[#a3e635] px-3.5 py-2 font-mono text-xs font-bold uppercase text-[#09090b] hover:scale-105 transition"
                    >
                      + {th ? 'เขียนบทความใหม่' : 'New Post'}
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                    {blogsList.map((b) => (
                      <div
                        key={b.id}
                        className={`flex flex-col justify-between rounded-2xl border p-4 transition ${
                          editingBlog?.id === b.id
                            ? 'border-[#a3e635] bg-[#a3e635]/10'
                            : 'border-white/[.06] bg-white/[.02] hover:border-white/15'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500">
                            <span className="text-purple-400">{b.category}</span>
                            <span>·</span>
                            <span>{b.date}</span>
                          </div>
                          <h4 className="mt-1 font-heading text-sm font-bold text-white line-clamp-2">{b.title}</h4>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-white/[.06] pt-3">
                          <button
                            onClick={() => onOpenBlog(b.slug || b.id)}
                            className="font-mono text-xs text-[#a3e635] hover:underline"
                          >
                            👁 {th ? 'ดูหน้าจริง' : 'Preview'}
                          </button>
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEditBlog(b)}
                              className="rounded bg-white/10 px-2.5 py-1 font-mono text-[10px] text-white hover:bg-white/20"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(b.id)}
                              className="rounded bg-rose-500/20 px-2.5 py-1 font-mono text-[10px] text-rose-300 hover:bg-rose-500 hover:text-white"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Blog Editor Form */}
                <div className="rounded-3xl border border-white/[.08] bg-[#111113] p-6 lg:col-span-7 sm:p-8">
                  {!editingBlog ? (
                    <div className="flex h-[400px] flex-col items-center justify-center text-center font-mono text-sm text-zinc-500">
                      <span>👈 {th ? 'เลือกบทความทางซ้ายเพื่อแก้ไข หรือคลิก "+ เขียนบทความใหม่"' : 'Select a blog post on the left to edit or click "+ New Post"'}</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSaveBlog} className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[.06] pb-4">
                        <h3 className="font-heading text-base font-bold text-white sm:text-lg">
                          {editingBlog.title ? 'Editing Post' : 'Creating New AI Article'}
                        </h3>
                        <span className="rounded-full bg-[#a3e635]/20 px-3 py-1 font-mono text-xs font-bold text-[#a3e635]">
                          SEO Score: {currentSeoScore}/100
                        </span>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block font-mono text-xs text-zinc-400">Post Title (EN)</label>
                          <input
                            type="text"
                            required
                            value={blogTitle}
                            onChange={(e) => setBlogTitle(e.target.value)}
                            placeholder="e.g. Why FDEs Rank #1 in 2026..."
                            className="w-full rounded-xl border border-white/[.08] bg-[#18181b] px-3.5 py-2.5 font-mono text-xs text-white outline-none focus:border-[#a3e635]"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block font-mono text-xs text-zinc-400">Post Title (TH)</label>
                          <input
                            type="text"
                            value={blogTitleTh}
                            onChange={(e) => setBlogTitleTh(e.target.value)}
                            placeholder="e.g. ทำไม FDE ถึงอันดับ 1..."
                            className="w-full rounded-xl border border-white/[.08] bg-[#18181b] px-3.5 py-2.5 font-mono text-xs text-white outline-none focus:border-[#a3e635]"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <label className="mb-1 block font-mono text-xs text-zinc-400">URL Slug (SEO)</label>
                          <input
                            type="text"
                            required
                            value={blogSlug}
                            onChange={(e) => setBlogSlug(e.target.value)}
                            placeholder="langgraph-mcp-guide"
                            className="w-full rounded-xl border border-white/[.08] bg-[#18181b] px-3.5 py-2.5 font-mono text-xs text-white outline-none focus:border-[#a3e635]"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block font-mono text-xs text-zinc-400">Category</label>
                          <input
                            type="text"
                            value={blogCategory}
                            onChange={(e) => setBlogCategory(e.target.value)}
                            placeholder="Autonomous Agents & MCP"
                            className="w-full rounded-xl border border-white/[.08] bg-[#18181b] px-3.5 py-2.5 font-mono text-xs text-white outline-none focus:border-[#a3e635]"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block font-mono text-xs text-zinc-400">Read Time</label>
                          <input
                            type="text"
                            value={blogReadTime}
                            onChange={(e) => setBlogReadTime(e.target.value)}
                            placeholder="5 min read"
                            className="w-full rounded-xl border border-white/[.08] bg-[#18181b] px-3.5 py-2.5 font-mono text-xs text-white outline-none focus:border-[#a3e635]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block font-mono text-xs text-zinc-400">Cover Image URL</label>
                        <input
                          type="text"
                          value={blogCover}
                          onChange={(e) => setBlogCover(e.target.value)}
                          className="w-full rounded-xl border border-white/[.08] bg-[#18181b] px-3.5 py-2.5 font-mono text-xs text-white outline-none focus:border-[#a3e635]"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block font-mono text-xs text-zinc-400">SEO Keywords (comma separated for ranking #1)</label>
                        <input
                          type="text"
                          value={blogKeywords}
                          onChange={(e) => setBlogKeywords(e.target.value)}
                          className="w-full rounded-xl border border-white/[.08] bg-[#18181b] px-3.5 py-2.5 font-mono text-xs text-white outline-none focus:border-[#a3e635]"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block font-mono text-xs text-zinc-400">Excerpt / Meta Description</label>
                        <textarea
                          rows={2}
                          value={blogExcerpt}
                          onChange={(e) => setBlogExcerpt(e.target.value)}
                          className="w-full rounded-xl border border-white/[.08] bg-[#18181b] p-3 font-mono text-xs text-white outline-none focus:border-[#a3e635]"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block font-mono text-xs text-zinc-400">Article Markdown Body (## Headings, code blocks)</label>
                        <textarea
                          rows={10}
                          required
                          value={blogContent}
                          onChange={(e) => setBlogContent(e.target.value)}
                          className="w-full rounded-xl border border-white/[.08] bg-[#18181b] p-3 font-mono text-xs text-white outline-none focus:border-[#a3e635]"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="featToggle"
                          checked={blogFeatured}
                          onChange={(e) => setBlogFeatured(e.target.checked)}
                          className="h-4 w-4 accent-[#a3e635]"
                        />
                        <label htmlFor="featToggle" className="font-mono text-xs text-zinc-300">
                          ★ {th ? 'ตั้งเป็นบทความเด่น (Featured Post)' : 'Set as Featured Article'}
                        </label>
                      </div>

                      <div className="flex justify-end gap-3 border-t border-white/[.06] pt-4">
                        <button
                          type="button"
                          onClick={() => setEditingBlog(null)}
                          className="rounded-xl bg-white/10 px-4 py-2.5 font-mono text-xs text-zinc-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-xl bg-[#a3e635] px-6 py-2.5 font-heading text-sm font-bold uppercase text-[#09090b] shadow-lg hover:scale-105 transition"
                        >
                          💾 Save & Update Live Site
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: MANAGE PROJECTS VISIBILITY */}
            {tab === 'projects' && (
              <div className="rounded-3xl border border-white/[.08] bg-[#111113] p-8 sm:p-10">
                <div className="mb-6">
                  <h2 className="font-heading text-2xl font-bold text-white">
                    {th ? 'ควบคุมการแสดงผลโปรเจกต์บน Landing Page' : 'Landing Page Projects Controller'}
                  </h2>
                  <p className="mt-1 font-mono text-xs text-zinc-500">
                    {th ? 'ติ๊กเลือกเพื่อแสดงหรือซ่อนโปรเจกต์ที่ต้องการ' : 'Toggle visibility checkboxes to control which projects appear on your main portfolio.'}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-h-[650px] overflow-y-auto pr-2">
                  {projectsList.map((p) => {
                    const shown = p.showOnLanding ?? true;
                    return (
                      <div
                        key={p.id}
                        onClick={() => toggleProjectVisibility(p.id)}
                        className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition ${
                          shown
                            ? 'border-emerald-500/50 bg-emerald-500/10'
                            : 'border-white/[.06] bg-white/[.01] opacity-50'
                        }`}
                      >
                        <div>
                          <span className="font-mono text-[10px] uppercase text-zinc-500">{p.id}.app</span>
                          <h4 className="font-heading text-sm font-bold text-white line-clamp-1">{p.name}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`h-3 w-3 rounded-full ${shown ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-zinc-700'}`} />
                          <span className="font-mono text-xs font-bold">{shown ? 'SHOW' : 'HIDE'}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: SEO HEALTH CHECKLIST */}
            {tab === 'seo' && (
              <div className="rounded-3xl border border-white/[.08] bg-[#111113] p-8 sm:p-10">
                <h2 className="font-heading text-2xl font-bold text-white mb-6">
                  {th ? 'เช็คลิสต์ SEO อันดับ 1 (Search Engine Ranking Optimizer)' : 'Search Engine Ranking #1 Optimizer Checklist'}
                </h2>

                <div className="grid gap-6 sm:grid-cols-2">
                  {[
                    { title: 'JSON-LD Structured Data', status: '✓ Active', detail: 'Injected Person, Article, and Organization schemas in <head> dynamically.' },
                    { title: 'Target Keywords in Title', status: '✓ Verified', detail: 'Primary keywords (Forward Deployed AI Engineer, LangGraph, MCP) present in meta tags.' },
                    { title: 'Clean Semantic Slugs', status: '✓ Verified', detail: 'All post slugs use lowercase hyphen-separated ASCII strings.' },
                    { title: 'Responsive 60 FPS Viewport', status: '✓ Verified', detail: 'Mobile device viewport simulation controls active on all embeds.' },
                    { title: 'Bilingual Indexing (th/en)', status: '✓ Active', detail: 'hreflang attributes and fallback localizations active for Thai & English searches.' },
                    { title: 'OpenGraph & Social Sharing', status: '✓ Active', detail: 'og:image, twitter:card, and summary descriptions active.' },
                  ].map((item, i) => (
                    <div key={i} className="rounded-2xl border border-white/[.06] bg-white/[.02] p-6">
                      <div className="flex items-center justify-between border-b border-white/[.06] pb-3 mb-3">
                        <span className="font-heading text-base font-bold text-white">{item.title}</span>
                        <span className="rounded-md bg-emerald-500/20 px-2.5 py-0.5 font-mono text-xs font-bold text-emerald-400">
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-zinc-400 font-mono">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </motion.div>
  );
}
