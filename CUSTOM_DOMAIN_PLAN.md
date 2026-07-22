# Custom Domain: khiw.dev → New Portfolio

## Current state of khiw.dev (Cloudflare-hosted)

DNS (Cloudflare → currently configured for Vercel via cname.vercel-dns.com):

| Subdomain | Currently → |
|---|---|
| `khiw.dev` | Vercel project `fragments` |
| `www.khiw.dev` | Vercel project `fragments` |
| `studio.khiw.dev` | Vercel project `vibe-coding-platform` |
| `mcp.khiw.dev` | Vercel project `portfolio-mcp-ui` |

The new portfolio is deployed at:

| URL | Project |
|---|---|
| `https://portfolio-vite-wheat.vercel.app` | `getintheqs-projects/portfolio-vite` |

## Recommended path — keep `khiw.dev` on `fragments`, add a sub-domain

Add `app.khiw.dev` (or `v2.khiw.dev`) → the new Vite portfolio via Cloudflare.

### Cloudflare DNS (Records → Add)

| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME | `app` | `cname.vercel-dns.com.` | **DNS only** (grey) |

### Vercel — assign the domain to the new project

```
vercel domains add app.khiw.dev --project portfolio-vite --scope getintheqs-projects
```

Vercel will verify ownership via the CNAME, issue SSL, and the new portfolio
will be served at `https://app.khiw.dev` within ~30 seconds.

### To instead fully migrate `khiw.dev` (REPLACES `fragments`)

1. Cloudflare: change apex `A` record to `76.76.21.21` (already the case in
   the existing setup) — DNS-only (grey cloud).
2. Vercel: `vercel domains add khiw.dev --project portfolio-vite --scope getintheqs-projects`
3. Confirm the existing `fragments` assignment is removed automatically
   when `portfolio-vite` claims it.
4. ✅ Visit https://khiw.dev → new portfolio.

---

## NVIDIA API key — single setting to enable live AI

```
vercel env add NVIDIA_API_KEY production --scope getintheqs-projects --project portfolio-vite
# paste your NVIDIA NIM key when prompted
```

Get a free key (1000 requests/month on Llama 3.1 70B):
- https://build.nvidia.com/ → Log in → any model → "Get API Key"

After adding, the chat header dot turns green and "NVIDIA NIM · Online".

---

## Quick smoke test

```bash
# Static UI
curl -I https://app.khiw.dev      # 200

# Chat proxy reachable
curl -X POST https://app.khiw.dev/api/chat \
  -H 'Content-Type: application/json' \
  -d '{"messages":[{"role":"user","content":"Hi"}],"maxTokens":40}'
# Without NVIDIA key: 500 with helpful hint
# With NVIDIA key:    text/event-stream
```
