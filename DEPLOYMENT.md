# Deployment Guide — AI Developer Portfolio on Vercel + Cloudflare

This repo builds two co-deployed surfaces:

1. **Static SPA** (`dist/index.html`, vite-plugin-singlefile) — the portfolio UI
   with all 34 projects and the AI chatbot on every page.
2. **Edge Serverless Function** (`api/chat.ts`) — proxies the browser to NVIDIA
   NIM (`integrate.api.nvidia.com/v1/chat/completions`) using a server-side
   `NVIDIA_API_KEY`. The browser never sees the key.

The portfolio chat UI is fully **grounded** in `src/data/portfolio.ts` — when
the LLM needs context, it receives a system prompt that lists every project,
tag, URL, and verified production status straight from the data file. If the
NVIDIA proxy is offline the bot falls back to a small, hand-written rule
engine so the chat UI is never broken.

---

## Quick start

```bash
# 1. Install
npm install

# 2. Dev (localhost:5173)
vercel dev   # or: npm run dev

# 3. Production build (single-file dist/index.html, ~210KB gz)
npm run build

# 4. Deploy (first time, project name khiw-dev-spa or any unique slug)
vercel --prod
```

After the FIRST deploy you'll get a `.vercel.app` URL. Take note of it and
follow the Cloudflare / custom-domain section below to point `khiw.dev` at it.

---

## Environment variables (set in Vercel → Project → Settings → Environment Variables)

| Name | Value | Environment |
|---|---|---|
| `NVIDIA_API_KEY` | Your NVIDIA NIM API key (https://build.nvidia.com/settings/api-keys) | Production, Preview |

Optional debugging:
| `LOG_PROXY_ERRORS` | `1` | Production | — prints upstream errors in Vercel logs |

You can obtain the key from https://build.nvidia.com/ → "Get API Key" —
**free tier** includes 1000 req/month on Llama 3.1 70B.

---

## Cloudflare DNS → Vercel (custom domain: khiw.dev)

> ⚠ **Note** — `khiw.dev` and `www.khiw.dev` are currently assigned to the
> existing Vercel project `fragments` (serving `fragments.e2b.dev`). After this
> deploy, move the production alias to the new project.

### Step 1 — Disable existing assignment in Vercel

```
vercel domains rm khiw.dev --project fragments       # (run only when ready to migrate)
# or via dashboard: domains.khiw.dev → khiw.dev → Remove
```

### Step 2 — Cloudflare DNS records (in Cloudflare Dashboard → khiw.dev → DNS)

Add `A` record for **apex (`khiw.dev`)** and `CNAME` for **`www`**:

```
Type    Name    Target                        Proxy
A       @       76.76.21.21                   DNS only (grey cloud)
CNAME   www     cname.vercel-dns.com.         DNS only (grey cloud)
```

(Grey cloud = DNS-only; Vercel does the SSL/TLS for the apex via ACME.)

If you also want a sub-domain for the chat-API surface:

```
CNAME   api     cname.vercel-dns.com.         Proxied (orange cloud) — optional, conflicts with `api` use elsewhere
```

### Step 3 — Add `khiw.dev` to the new Vercel project

```
# Replace <project> with the slug from `vercel project ls`
vercel domains add khiw.dev --project <project>
vercel domains add www.khiw.dev --project <project>
```

Vercel will verify ownership (it'll see the Cloudflare DNS records) and issue
the SSL certificate. Wait ~30 seconds and `https://khiw.dev` should resolve.

### Step 4 — Lock Cloudflare proxy OFF for the apex

Because Vercel issues its own SSL for `khiw.dev`, set the proxy to **DNS only**
(grey cloud icon) on those two records. If you turn on the orange cloud,
Cloudflare will intercept and terminate TLS, which may break ACME.

---

## Vercel project settings

- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Install command**: `npm install`
- **Framework preset**: Vite
- **Node version**: 20.x (or whatever is latest LTS Vercel offers)
- **Functions**: Edge Functions auto-enabled (the `api/chat.ts` becomes an
  Edge Serverless function with full streaming support)

---

## Sanity checks after deploy

```bash
# 1. Static UI is reachable
curl -I https://khiw.dev | head -3

# 2. Each displayed production URL is reachable
for u in $(grep -oE "url: '[^']*'" src/data/portfolio.ts | sed "s/url: '//;s/'$//"); do
  printf "%-70s %s\n" "$u" "$(curl -s -o /dev/null -w '%{http_code}' -L --max-time 8 "$u")"
done

# 3. Chat proxy responds with streaming
curl -N -X POST https://khiw.dev/api/chat \
  -H 'Content-Type: application/json' \
  -d '{"messages":[{"role":"user","content":"Hi"}],"maxTokens":50}'
# Expected: text/event-stream with `data: {...}` frames ending in `data: [DONE]`
```

---

## Observations during build

- `vite-plugin-singlefile` inlines CSS + JS into a single `index.html` → safe
  for any static host (Cloudflare Pages, Netlify, GitHub Pages).
- For headless verification of the AI integration: use `curl -N` against
  `/api/chat` to confirm SSE streaming and TTFT latency.
- The chatbot polls `/api/chat` health on open; the header status dot reflects
  the latest probe result.
