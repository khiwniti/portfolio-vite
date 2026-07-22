// Vercel Edge Function — proxies chat requests to NVIDIA NIM.
//
// Why Edge:  NVIDIA's NIM API is geo-distributed. Running on Vercel Edge
// keeps TTFT low (the user's existing port is `integrate.api.nvidia.com`
// streaming SSE, identical surface area to `nim-proxy`.
//
// Auth: NVIDIA_API_KEY is read from `process.env.NVIDIA_API_KEY`. The browser
// never sees the key. In dev, `vercel dev` injects it from `.env.local`.
//
// CORS: open for the dev origin only; production locked to khiw.dev.

import type { VercelRequest, VercelResponse } from '@vercel/node';

const ALLOWED_ORIGINS = new Set([
  'https://khiw.dev',
  'https://www.khiw.dev',
  'https://getintheq.io',
  'https://getintheq.space',
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:3000',
]);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin ?? '';
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGINS.has(origin) ? origin : 'https://khiw.dev');
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, x-conversation-id, x-model-id'
  );

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'NVIDIA_API_KEY not configured on server',
      hint: 'Set NVIDIA_API_KEY in Vercel dashboard → Project → Settings → Environment Variables',
    });
  }

  try {
    const body = req.body as {
      messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
      model?: string;
      maxTokens?: number;
      temperature?: number;
      topP?: number;
      stream?: boolean;
    };

    if (!body?.messages?.length) {
      return res.status(400).json({ error: 'messages[] is required' });
    }

    // Default model: Llama 3.1 70B Instruct on NIM — strong EN/TH reasoning,
    // 128K context, $0.59/Mtok → cheap enough for portfolio chatbot traffic.
    const model = body.model ?? 'meta/llama-3.1-70b-instruct';
    const upstream = 'https://integrate.api.nvidia.com/v1/chat/completions';

    const upstreamRes = await fetch(upstream, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: body.stream === false ? 'application/json' : 'text/event-stream',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: body.messages,
        max_tokens: body.maxTokens ?? 1024,
        temperature: body.temperature ?? 0.6,
        top_p: body.topP ?? 0.95,
        stream: body.stream !== false,
      }),
    });

    if (!upstreamRes.ok || !upstreamRes.body) {
      const errText = await upstreamRes.text();
      return res.status(upstreamRes.status).json({
        error: 'NVIDIA upstream error',
        status: upstreamRes.status,
        detail: errText.slice(0, 500),
      });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('X-Accel-Buffering', 'no');

    const reader = upstreamRes.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(decoder.decode(value, { stream: true }));
    }
    res.end();
  } catch (err) {
    console.error('[chat] upstream error:', err);
    return res.status(502).json({
      error: 'chat proxy failed',
      detail: err instanceof Error ? err.message : String(err),
    });
  }
}
