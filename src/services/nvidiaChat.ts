// NVIDIA NIM streaming client for the portfolio chatbot.
//
// Calls our own `/api/chat` Vercel Edge Function (which proxies to
// `integrate.api.nvidia.com`). The server holds the NVIDIA_API_KEY —
// the browser never sees it.
//
// Used by AIChatbot.tsx. Falls back to keyword-matching if the network or
// upstream fails so the UI never breaks.
//
// Portfolio data is statically imported so the system prompt is ready on
// first paint. Vite tree-shakes the unused parts of the portfolio data.
import { projects, profile, experiences, skills, DOMAINS } from '../data/portfolio';

export type ChatRole = 'system' | 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface NvidiaChatOptions {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  signal?: AbortSignal;
  onDelta: (text: string) => void;
}

const ENDPOINT = (() => {
  if (typeof window === 'undefined') return '/api/chat';
  // Vercel dev server exposes api/ under the same origin
  return `${window.location.origin}/api/chat`;
})();

export async function streamNvidiaChat(opts: NvidiaChatOptions): Promise<{ fullText: string }> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
    },
    body: JSON.stringify({
      messages: opts.messages,
      model: opts.model,
      temperature: opts.temperature,
      maxTokens: opts.maxTokens,
      stream: true,
    }),
    signal: opts.signal,
  });

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => '');
    throw new Error(`chat proxy ${res.status}: ${detail.slice(0, 200)}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let fullText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // SSE frames are "data: {...}\n\n"; strip and parse JSON
    let idx: number;
    while ((idx = buffer.indexOf('\n\n')) !== -1) {
      const frame = buffer.slice(0, idx).trim();
      buffer = buffer.slice(idx + 2);
      if (!frame || frame.startsWith(':')) continue;
      const line = frame.split('\n').find((l) => l.startsWith('data:'));
      if (!line) continue;
      const payload = line.slice(5).trim();
      if (payload === '[DONE]') return { fullText };
      try {
        const json = JSON.parse(payload);
        const delta =
          json?.choices?.[0]?.delta?.content ??
          json?.choices?.[0]?.message?.content ??
          '';
        if (delta) {
          fullText += delta;
          opts.onDelta(delta);
        }
      } catch {
        // ignore malformed frame
      }
    }
  }
  return { fullText };
}

// ────────────────────────────────────────────────────────────────────────────
// Project-aware system prompt builder. Bakes live portfolio data into the
// system prompt so the LLM gives accurate, project-specific answers.
// ────────────────────────────────────────────────────────────────────────────

export function buildPortfolioSystemPrompt(lang: 'en' | 'th'): ChatMessage {
  // Portfolio data is statically imported above; tree-shaking + Vite's chunking
  // keep cold-start cost in check.

  const projectSnippets = projects
    .map((p: any, i: number) => {
      const name = lang === 'th' && p.nameTh ? p.nameTh : p.name;
      const desc = lang === 'th' && p.descriptionTh ? p.descriptionTh : p.description;
      const tags = (p.tags ?? []).slice(0, 8).join(', ');
      const urlOk = p.embed ? 'live' : 'API/Worker only';
      const liveUrl = p.url ?? '';
      return `${i + 1}. [${p.id}] ${name} — ${desc} | url=${liveUrl} (${urlOk}) | tags=${tags}`;
    })
    .join('\n');

  const domainList = (DOMAINS ?? [])
    .map((d: any) => `${d.icon} ${lang === 'th' && d.labelTh ? d.labelTh : d.label}`)
    .join(' / ');

  const recentExperience = (experiences ?? [])
    .map((e: any) => `${e.company} · ${e.role} · ${e.period}`)
    .join(' | ');

  if (lang === 'th') {
    return {
      role: 'system',
      content: `คุณคือผู้ช่วย AI อัจฉริยะของ ${profile.nameTh ?? profile.name} (${profile.roleTh ?? profile.role}) — Forward Deployed AI Engineer

คำตอบของคุณต้องอ้างอิงโปรเจกต์จริงที่ปรากฏในรายการด้านล่างนี้เท่านั้น ห้ามสร้างโปรเจกต์หรือตัวเลขที่ไม่มีอยู่จริง
หากผู้ใช้ถามเรื่องที่อยู่นอกเหนือโปรเจกต์ ทักษะ หรือประสบการณ์ของคิว ให้ตอบสั้นๆ ว่า "ข้อมูลนี้อยู่นอกขอบเขตของผม" และแนะนำให้ติดต่อทางอีเมล ${profile.email ?? ''}

โปรเจกต์ที่ติดตั้งจริง (${projects.length} ระบบ):
${projectSnippets}

โดเมนความเชี่ยวชาญ 9 ด้าน: ${domainList}

ประสบการณ์ล่าสุด: ${recentExperience}

ทักษะหลัก: ${(skills ?? []).flatMap((s: any) => s.items ?? []).slice(0, 24).join(', ')}

กฎการตอบ:
- ตอบเป็นภาษาไทย กระชับ 2–4 ประโยค เว้นแต่ผู้ใช้จะขอรายละเอียด
- เมื่อพูดถึงโปรเจกต์ ให้ระบุชื่อ ตัวเลขที่วัดได้ และ URL ที่ตรวจสอบแล้วจากรายการ
- หากโปรเจกต์อยู่ในสถานะ embed=false ให้บอกด้วยว่าเป็น API หรือ Worker ไม่ใช่หน้าเว็บทั่วไป`,
    };
  }

  return {
    role: 'system',
    content: `You are ${profile.name}'s AI assistant — a portfolio copilot grounded ONLY in the verified systems below. Never invent projects, metrics, or companies.

Profile: ${profile.role} — ${profile.tagline}
Contact: ${profile.email} · ${profile.phone} · LinkedIn ${(profile.socials ?? []).find((s: any) => s.label === 'LinkedIn')?.handle ?? ''}

Verified deployed systems (${projects.length} total):
${projectSnippets}

9 industry domains: ${domainList}

Recent experience: ${recentExperience}

Skill areas: ${(skills ?? []).flatMap((s: any) => s.items ?? []).slice(0, 24).join(', ')}

When the user asks about a project, quote the verifiable URL from the list above and key metrics. If a project is in embed=false state, mention that the listed URL is an API/Cloudflare Worker endpoint, not an HTML UI. If the question is outside Khiw's work, deflect politely with the contact above.`,
  };
}

// In-memory health check: allows the UI to render an "online / degraded" badge
export async function checkChatHealth(timeoutMs = 2500): Promise<'online' | 'degraded' | 'offline'> {
  if (typeof window === 'undefined') return 'offline';
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    const res = await fetch(`${window.location.origin}/api/chat`, {
      method: 'OPTIONS',
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    if (res.status === 204 || res.status === 200 || res.status === 405) return 'online';
    return 'degraded';
  } catch {
    return 'offline';
  }
}
