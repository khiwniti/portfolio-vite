import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { projects, profile } from '../data/portfolio';
import { getBlogs } from '../data/blogStore';
import {
  streamNvidiaChat,
  buildPortfolioSystemPrompt,
  checkChatHealth,
  type ChatMessage as LlmMessage,
} from '../services/nvidiaChat';

interface GenUIItem {
  type: 'project' | 'stats' | 'contact' | 'blog';
  projectIds?: string[];
  blogSlugs?: string[];
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  textEn: string;
  textTh: string;
  time: string;
  genUI?: GenUIItem;
  model?: string;
  source?: 'nvidia-nim' | 'fallback-rule' | 'offline-cache';
  ttftMs?: number;
  tokens?: number;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function AIChatbot({
  onSelectProject,
  onSelectBlog,
}: {
  onSelectProject: (id: string) => void;
  onSelectBlog: (slug: string) => void;
}) {
  const { i18n } = useTranslation();
  const th = i18n.language === 'th';
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHealth, setChatHealth] = useState<'online' | 'degraded' | 'offline' | 'checking'>('checking');
  const [abortCtrl, setAbortCtrl] = useState<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Probe backend health when chat opens
  useEffect(() => {
    if (open && chatHealth === 'checking') {
      checkChatHealth().then(setChatHealth).catch(() => setChatHealth('offline'));
    }
  }, [open, chatHealth]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      textEn:
        "Hi! I'm Khiw's AI assistant, powered by his verified portfolio. I can answer questions about his experience, 34 production systems, and technical capabilities. What would you like to know?",
      textTh:
        'สวัสดีครับ! ผมคือผู้ช่วย AI ของคุณคิว ขับเคลื่อนด้วยข้อมูลผลงานจริง พร้อมตอบคำถามเกี่ยวกับประสบการณ์ โปรเจกต์ที่ติดตั้งจริง 34 ระบบ และขีดความสามารถทางเทคนิค อยากรู้เรื่องอะไรเป็นพิเศษไหมครับ?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      genUI: { type: 'stats' },
    },
  ]);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const quickPrompts = [
    { en: 'Why hire Khiw?', th: 'ทำไมต้องจ้างคิว?', key: 'why-hire' },
    { en: 'NT Battery ML System', th: 'ระบบ AI แบตเตอรี่ NT', key: 'nt-battery' },
    { en: 'LangGraph & MCP', th: 'เอเจนต์ LangGraph & MCP', key: 'langgraph' },
    { en: 'Contact & Availability', th: 'ช่องทางติดต่อ', key: 'contact' },
  ];

  // Heuristic fallback used when NVIDIA NIM is unreachable. Keeps the chatbot
  // usable for visitors even if the backend is down.
  const ruleBasedFallback = (
    query: string
  ): { textEn: string; textTh: string; genUI?: GenUIItem } => {
    const q = query.toLowerCase();
    if (q.includes('why') || q.includes('hire') || q.includes('fde') || q.includes('ทำไม') || q.includes('จ้าง')) {
      return {
        textEn: 'Khiw is a Forward Deployed AI Engineer who ships measurable AI systems end-to-end — multi-agent orchestration, edge MLOps, and 3D digital twins. Generated ฿5.9M in verified business impact at C.P. Group.',
        textTh: 'คุณคิวเป็นวิศวกร AI Forward Deployed ส่งมอบระบบ AI ที่วัดผลได้จริง ตั้งแต่ Multi-Agent ไปจนถึง Edge MLOps สร้างผลกระทบทางธุรกิจ 5.9 ล้านบาทที่เครือ CP',
        genUI: { type: 'stats' },
      };
    }
    if (q.includes('nt') || q.includes('battery') || q.includes('แบต') || q.includes('1944')) {
      return {
        textEn: 'NT Battery RUL monitors 1,944 UPS batteries across 9 NT datacenters via LSTM (R²=0.85) + Isolation Forest alerts pushed to LINE.',
        textTh: 'NT Battery RUL ควบคุมแบตเตอรี่ UPS 1,944 ลูก/ศูนย์ข้อมูล 9 แห่ง ด้วย LSTM (R²=0.85) + Isolation Forest แจ้งเตือนผ่าน LINE',
        genUI: { type: 'project', projectIds: ['nt-battery-rul', 'nt-3d-frontend'] },
      };
    }
    if (q.includes('langgraph') || q.includes('agent') || q.includes('mcp') || q.includes('เอเจนต์')) {
      return {
        textEn: 'Khiw builds deterministic multi-agent systems with LangGraph + MCP. Featured projects: CPAC BIM agent, SuperDoc AI DOCX editor (Reviewer+Writer+Analyst).',
        textTh: 'คุณคิวสร้าง Multi-Agent ด้วย LangGraph + MCP โดดเดน: CPAC BIM, SuperDoc AI (Reviewer+Writer+Analyst)',
        genUI: { type: 'project', projectIds: ['autonomous-bim', 'superdoc', 'nim-proxy'] },
      };
    }
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('ติดต่อ') || q.includes('โทร')) {
      return {
        textEn: 'Khiw is open to Forward-Deployed AI Engineering and team leadership roles. Reach him directly:',
        textTh: 'คุณคิวเปิดรับงาน Forward-Deployed AI และหัวหน้าทีม ติดต่อได้:',
        genUI: { type: 'contact' },
      };
    }
    return {
      textEn: 'Khiw has 7+ years across mechanical simulation (CFD/FEA) and edge-first AI. Deployed 34 production systems across 9 industries. Featured work:',
      textTh: 'คุณคิวมีประสบการณ์ 7+ ปี ผสาน CFD/FEA กับ Edge AI ติดตั้งจริง 34 ระบบ 9 อุตสาหกรรม ผลงานเด่น:',
      genUI: { type: 'project', projectIds: ['nt-battery-rul', 'autonomous-bim', 'superdoc'] },
    };
  };

  // Best-effort GenUI selection from the streamed AI text. Keeps the rich UI
  // even when the LLM is the source of truth.
  const inferGenUI = (query: string, answer: string): GenUIItem | undefined => {
    const q = query.toLowerCase() + ' ' + (answer || '').toLowerCase();
    if (q.includes('why hire') || q.includes('จุดเด่น') || q.match(/\bstats?\b/)) {
      return { type: 'stats' };
    }
    if (q.includes('contact') || q.includes('email') || q.includes('ติดต่อ')) {
      return { type: 'contact' };
    }
    if (q.includes('battery') || q.includes('nt') || q.includes('1,944') || q.includes('แบต')) {
      return { type: 'project', projectIds: ['nt-battery-rul', 'nt-3d-frontend'] };
    }
    if (q.includes('langgraph') || q.includes('mcp') || q.includes('agent') || q.includes('เอเจนต์') || q.includes('bim') || q.includes('docx')) {
      return { type: 'project', projectIds: ['autonomous-bim', 'superdoc', 'nim-proxy'] };
    }
    if (q.includes('weather') || q.includes('อากาศ') || q.includes('forecast')) {
      return { type: 'project', projectIds: ['tswfp'] };
    }
    return undefined;
  };

  const handleSend = async (userQueryText?: string) => {
    const query = userQueryText || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      textEn: query,
      textTh: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    if (!userQueryText) setInput('');
    setIsTyping(true);

    // Pre-compute a parallel fallback so a degraded NVIDIA backend never breaks UX
    const fallback = ruleBasedFallback(query);
    const aiId = `ai-${Date.now()}`;
    const startTime = performance.now();

    // Push an empty AI message; stream into it
    const baseAiMsg: ChatMessage = {
      id: aiId,
      sender: 'ai',
      textEn: '',
      textTh: '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'nvidia-nim',
    };
    setMessages((prev) => [...prev, baseAiMsg]);

    const ctrl = new AbortController();
    setAbortCtrl(ctrl);

    // Build the conversation context (last 8 messages + system prompt)
    const systemPrompt = buildPortfolioSystemPrompt(th ? 'th' : 'en');
    const recent: LlmMessage[] = [];
    for (const m of messages.slice(-8)) {
      const text = m.textEn || m.textTh;
      if (!text) continue;
      if (m.sender === 'user') {
        recent.push({ role: 'user' as const, content: text });
      } else {
        recent.push({ role: 'assistant' as const, content: text });
      }
    }
    const llmMessages: LlmMessage[] = [
      systemPrompt,
      ...recent,
      { role: 'user' as const, content: query },
    ];

    let firstTokenAt = 0;
    let streamed = '';

    try {
      const { fullText } = await streamNvidiaChat({
        messages: llmMessages,
        model: 'meta/llama-3.1-70b-instruct',
        temperature: 0.55,
        maxTokens: 600,
        signal: ctrl.signal,
        onDelta: (delta) => {
          if (!firstTokenAt) firstTokenAt = performance.now();
          streamed += delta;
          // For non-Thai conversations, mirror streamed delta to textTh for consistency
          setMessages((prev) =>
            prev.map((m) =>
              m.id === aiId
                ? { ...m, textEn: streamed, textTh: th ? '' : streamed, ttftMs: m.ttftMs ?? Math.round(firstTokenAt - startTime) }
                : m
            )
          );
        },
      });

      // Normalize Thai vs English output slot. For Thai prompt, the LLM returned
      // Thai already, so write it into textTh (and mirror to textEn).
      const finalEn = th ? '' : fullText;
      const finalTh = th ? fullText : fullText;

      // Decide which GenUI card best fits the answer
      const genUI = inferGenUI(query, streamed);

      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiId
            ? {
                ...m,
                textEn: finalEn,
                textTh: finalTh,
                model: 'llama-3.1-70b-instruct (NVIDIA NIM)',
                source: 'nvidia-nim',
                genUI,
                tokens: fullText.length,
                ttftMs: m.ttftMs ?? Math.round(firstTokenAt - startTime),
              }
            : m
        )
      );
      setChatHealth('online');
    } catch (err) {
      // Network/key failure → gracefully fall back to rule-based reply so
      // the chatbot is never broken for visitors.
      const message = err instanceof Error ? err.message : 'unknown error';
      // eslint-disable-next-line no-console
      console.warn('[AIChatbot] NVIDIA NIM fallback:', message);
      setChatHealth('degraded');
      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiId
            ? {
                ...m,
                textEn: fallback.textEn,
                textTh: fallback.textTh,
                model: 'offline-fallback (NVIDIA unavailable)',
                source: 'fallback-rule',
                genUI: fallback.genUI,
              }
            : m
        )
      );
    } finally {
      setIsTyping(false);
      setAbortCtrl(null);
    }
  };

  const stopStream = () => {
    abortCtrl?.abort();
    setAbortCtrl(null);
    setIsTyping(false);
  };

  const renderGenUI = (item: GenUIItem) => {
    if (item.type === 'stats') {
      return (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {profile.stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-[#111713]/10 bg-white p-2.5 text-center">
              <div className="font-heading text-sm font-extrabold text-[#5b4ef2]">{s.value}</div>
              <div className="mt-0.5 font-mono text-[8px] uppercase tracking-wider text-[#9aa19d]">
                {th && s.labelTh ? s.labelTh : s.label}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (item.type === 'project' && item.projectIds) {
      const projs = projects.filter((p) => item.projectIds!.includes(p.id));
      return (
        <div className="mt-3 space-y-2">
          {projs.map((p) => (
            <div
              key={p.id}
              className="group flex flex-col justify-between rounded-xl border border-[#111713]/10 bg-white p-3 transition hover:border-[#5b4ef2]/30 sm:flex-row sm:items-center"
            >
              <div className="mb-2 sm:mb-0">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
                  <span className="font-mono text-[8px] uppercase tracking-wider text-[#9aa19d]">
                    {th && p.categoryTh ? p.categoryTh : p.category}
                  </span>
                </div>
                <h4 className={`mt-1 font-heading text-xs font-bold text-[#111713] group-hover:text-[#5b4ef2] ${th ? 'font-thai' : ''}`}>
                  {th && p.nameTh ? p.nameTh : p.name}
                </h4>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {p.tags.slice(0, 3).map((tg) => (
                    <span key={tg} className="rounded bg-[#111713]/5 px-1.5 py-0.5 font-mono text-[8px] text-[#7a837e]">{tg}</span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => { setOpen(false); onSelectProject(p.id); }}
                className="flex flex-none items-center gap-1.5 rounded-lg bg-[#111713] px-3 py-2 font-heading text-[10px] font-extrabold uppercase text-white transition hover:-translate-y-0.5"
              >
                {th ? 'ดูผลงาน' : 'View'} →
              </button>
            </div>
          ))}
        </div>
      );
    }

    if (item.type === 'contact') {
      return (
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="flex flex-none items-center gap-2 rounded-xl bg-[#111713] px-4 py-2.5 font-heading text-xs font-extrabold text-white transition hover:-translate-y-0.5"
          >
            ✉️ {profile.email}
          </a>
          <a
            href={`tel:${profile.phone}`}
            className="flex flex-none items-center gap-2 rounded-xl border border-[#111713]/12 bg-white px-4 py-2.5 font-mono text-xs text-[#111713] transition hover:bg-[#111713]/5"
          >
            📞 {profile.phone}
          </a>
        </div>
      );
    }

    if (item.type === 'blog' && item.blogSlugs) {
      const blogs = getBlogs().filter((b) => item.blogSlugs!.includes(b.slug || b.id));
      return (
        <div className="mt-3 space-y-2">
          {blogs.map((b) => (
            <div
              key={b.id}
              onClick={() => { setOpen(false); onSelectBlog(b.slug || b.id); }}
              className="flex cursor-pointer items-center justify-between rounded-xl border border-[#111713]/10 bg-white p-3 transition hover:border-[#5b4ef2]/30"
            >
              <div className="pr-3">
                <span className="font-mono text-[8px] uppercase text-[#5b4ef2]">{b.category}</span>
                <h5 className={`mt-0.5 font-heading text-xs font-bold text-[#111713] ${th ? 'font-thai' : ''}`}>
                  {th && b.titleTh ? b.titleTh : b.title}
                </h5>
              </div>
              <span className="font-mono text-xs font-bold text-[#5b4ef2]">↗</span>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {/* Floating trigger */}
      <div className="fixed bottom-5 left-4 z-50 sm:bottom-8 sm:left-8">
        <AnimatePresence>
          {!open && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setOpen(true)}
              aria-label={th ? 'เปิดผู้ช่วย AI' : 'Open AI assistant'}
              aria-expanded={open}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-[#111713]/12 bg-white shadow-[0_10px_35px_rgba(17,23,19,.12)] backdrop-blur-xl transition hover:border-[#5b4ef2]/40 sm:h-auto sm:w-auto sm:gap-3 sm:rounded-full sm:px-4 sm:py-3"
            >
              {/* Mobile icon */}
              <span className="text-lg sm:hidden">💬</span>
              <span className="absolute right-0 top-0 flex h-2.5 w-2.5 sm:hidden">
                <span className="absolute h-full w-full animate-ping rounded-full bg-[#5b4ef2] opacity-75" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-[#5b4ef2]" />
              </span>
              {/* Desktop pill */}
              <span className="relative hidden h-2.5 w-2.5 sm:flex">
                <span className="absolute h-full w-full animate-ping rounded-full bg-[#5b4ef2] opacity-75" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-[#5b4ef2]" />
              </span>
              <div className="hidden flex-col text-left sm:flex">
                <span className="font-heading text-xs font-extrabold text-[#111713] group-hover:text-[#5b4ef2] transition">
                  {th ? 'ผู้ช่วย AI' : "Khiw's AI Assistant"}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#9aa19d]">
                  {th ? 'ถามข้อมูลผลงาน' : 'Ask about my work'}
                </span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Chat drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.35, ease }}
            className="fixed inset-x-3 bottom-3 top-16 z-50 flex flex-col overflow-hidden rounded-[1.8rem] border border-[#111713]/12 bg-[#fbfaf7] shadow-[0_25px_70px_rgba(17,23,19,.18)] sm:inset-x-auto sm:bottom-8 sm:left-8 sm:top-auto sm:h-[600px] sm:max-h-[75vh] sm:w-[400px] lg:w-[460px]"
            role="dialog"
            aria-modal="true"
            aria-label={th ? 'ผู้ช่วย AI อัจฉริยะ' : "Khiw's AI assistant"}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2 border-b border-[#111713]/10 bg-white px-4 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-8 w-8 flex-none items-center justify-center rounded-xl bg-[#111713] font-heading text-[10px] font-black text-[#c9f36a] sm:h-9 sm:w-9">
                  AI
                </div>
                <div className="min-w-0">
                  <div className="truncate font-heading text-xs font-extrabold text-[#111713] sm:text-sm">
                    {th ? 'ผู้ช่วย AI อัจฉริยะ' : 'Khiw Intelligence Engine'}
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-[#4c7c22]">
                    <span
                      className={`h-1.5 w-1.5 flex-none rounded-full ${
                        chatHealth === 'online'
                          ? 'bg-[#76b900] shadow-[0_0_6px_#76b900]'
                          : chatHealth === 'degraded'
                          ? 'bg-[#f59e0b]'
                          : chatHealth === 'offline'
                          ? 'bg-[#dc2626]'
                          : 'bg-[#9aa19d]'
                      }`}
                    />
                    <span className="truncate">
                      {chatHealth === 'online' && (th ? 'NVIDIA NIM • ออนไลน์ (EN/TH)' : 'NVIDIA NIM · Online · EN/TH')}
                      {chatHealth === 'degraded' && (th ? 'โหมดสำรอง • NVIDIA ขัดข้อง' : 'Fallback mode · NVIDIA degraded')}
                      {chatHealth === 'offline' && (th ? 'ออฟไลน์' : 'Offline')}
                      {chatHealth === 'checking' && (th ? 'กำลังตรวจสอบ…' : 'Checking…')}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex-none rounded-lg border border-[#111713]/10 px-2.5 py-1.5 font-mono text-xs text-[#7a837e] transition hover:bg-[#111713]/5 hover:text-[#111713]"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto overflow-x-hidden p-3 pr-2.5 sm:p-4 sm:pr-3">
              {messages.map((m) => (
                <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[90%] rounded-2xl p-3.5 text-[13px] leading-relaxed sm:max-w-[88%] sm:p-4 ${
                      m.sender === 'user'
                        ? 'bg-[#111713] text-white font-medium rounded-br-sm'
                        : 'border border-[#111713]/10 bg-white text-[#39443d] rounded-bl-sm shadow-sm'
                    } ${th ? 'font-thai-body' : ''}`}
                  >
                    {th ? m.textTh : m.textEn}
                  </div>
                  <span className="mt-1 font-mono text-[8px] text-[#a0a7a2]">
                    {m.time}
                    {m.model && (
                      <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-[#76b900]/10 px-1.5 py-0.5 font-bold text-[#3d6b00]">
                        <span className="h-1 w-1 rounded-full bg-[#76b900]"></span>
                        {m.source === 'nvidia-nim' ? 'NVIDIA NIM' : m.source === 'fallback-rule' ? 'fallback' : 'cache'}
                        {m.ttftMs != null && m.source === 'nvidia-nim' && <span className="opacity-60"> · {m.ttftMs}ms TTFT</span>}
                      </span>
                    )}
                  </span>
                  {m.genUI && <div className="w-full max-w-[95%]">{renderGenUI(m.genUI)}</div>}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 rounded-2xl border border-[#111713]/10 bg-white px-4 py-3 w-max shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#76b900]" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#76b900]" style={{ animationDelay: '150ms' }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#76b900]" style={{ animationDelay: '300ms' }} />
                  <span className="ml-1 font-mono text-[9px] text-[#9aa19d]">
                    {th ? 'กำลังวิเคราะห์ด้วย NVIDIA…' : 'NVIDIA NIM · thinking…'}
                  </span>
                  {abortCtrl && (
                    <button
                      onClick={stopStream}
                      className="ml-2 rounded-md border border-[#111713]/15 px-2 py-0.5 font-mono text-[9px] text-[#7a837e] transition hover:bg-[#111713]/5"
                    >
                      {th ? 'หยุด' : 'stop'}
                    </button>
                  )}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion chips */}
            <div className="flex gap-2 overflow-x-auto border-t border-[#111713]/8 bg-white px-3 py-2.5 no-scrollbar">
              {quickPrompts.map((qp) => (
                <button
                  key={qp.key}
                  onClick={() => handleSend(th ? qp.th : qp.en)}
                  className="whitespace-nowrap rounded-full border border-[#111713]/10 bg-[#111713]/3 px-3 py-1.5 font-mono text-[9px] text-[#66706a] transition hover:border-[#5b4ef2]/40 hover:bg-[#5b4ef2]/8 hover:text-[#5b4ef2]"
                >
                  {th ? qp.th : qp.en}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2 border-t border-[#111713]/10 bg-white p-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={th ? 'ถามเกี่ยวกับโปรเจกต์ สกิล หรือประสบการณ์...' : 'Ask about projects, skills, ROI...'}
                className="flex-1 rounded-xl border border-[#111713]/10 bg-[#f4f2ec] px-3.5 py-2.5 font-mono text-xs text-[#111713] placeholder-[#9aa19d] outline-none focus:border-[#5b4ef2]"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#5b4ef2] font-bold text-white shadow-md transition hover:scale-105 disabled:opacity-40"
              >
                ↑
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
