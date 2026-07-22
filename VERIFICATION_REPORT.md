# Live Project URL Verification — Vercel / Cloudflare Cross-Check

Source: live HTTP probe of every `project.url` in `src/data/portfolio.ts`,
plus `vercel project ls` for ground-truth production aliases.

| Project ID | Listed URL | HTTP | Vercel Project | Correct Production URL |
|---|---|---|---|---|
| nt-battery-rul | nt-facility-3-d-manager-new-ui.vercel.app | 200 ✅ | nt-facility-3-d-manager-new-ui | (alias) |
| nt-3d-frontend | nt-facility-3-d-manager-new-ui.vercel.app | 200 ✅ | (same) | (same) |
| nt-3d-poc | 3-d-nt-facility-poc.vercel.app | 200 ✅ | — | (alias) |
| rainmaking-mission | rainmaking-mission.vercel.app | ❌ 404 | rainmaking-mission | rainmaking-mission-getintheqs-projects.vercel.app |
| rainmaking (planning only) | — (not a project) | — | rainmaking-mission-planning | rainmaking-mission-planning.vercel.app |
| gdas-disaster | gdas-ai-disaster-watch.vercel.app | 200 ✅ | gdas-ai-disaster-watch-xu4o | (alias) |
| farmbook | farmbook-agrianalytics.vercel.app | ❌ 404 | farmbook-dashboard | farmbook-dashboard.vercel.app |
| autonomous-bim | autonomous-bim-agent.vercel.app | 200 ✅ | autonomous-bim-agent | bim.getintheq.space (custom domain alias) |
| wood-erp (Panel Plus) | panel-plus-erp.vercel.app | ❌ 404 | wood-sample-platform | wood-sample-platform.vercel.app |
| ai-docx-editor / superdoc | ai-docx-editor.vercel.app | 200 ✅ | ai-docx-editor | (alias) |
| aot-property | aot-frontend.vercel.app | 200 ✅ | aot-frontend | aot-frontend-five.vercel.app |
| scada | scada-ai.vercel.app | 200 ✅ | scada-ai | (alias) + scada-poc-frontend available |
| ensimu | ensimu.studio | ❌ 000 (DNS / no A record) | ensimu-space-studio | ensimu-space-studio.vercel.app (live) |
| bitebase | bitebase-intelligence-production.workers.dev | ❌ 000 (CF API-only, no HTML) | bitebase-backend-express | served via Worker routes — keep as-is |
| tswfp | tswfp-forecast-api-production.workers.dev | ❌ 000 (API-only) | — | keep — it's a forecast API, not UI |
| bloodplus | bloodplusfight-line-chatbot.workers.dev | ❌ 000 (API-only, no index) | — | keep — LINE webhook worker |
| carbonscope | carbonscopes-frontend-production.workers.dev | ❌ 000 (Worker serves API; frontend likely separate) | — | needs CF Pages or companion worker |
| nim-proxy | workers.cloudflare.com | 200 ✅ (placeholder) | — | (no public live UI — internal CF worker) |
| tpqi-platform | www.tpqi.go.th | 200 ✅ | — | external client site |

## ❌ Broken — Need URL Fix in portfolio.ts
1. `rainmaking-mission.vercel.app` → `rainmaking-mission-getintheqs-projects.vercel.app`
   (the bare `.vercel.app` slot is not assigned to the production alias)
2. `farmbook-agrianalytics.vercel.app` → `farmbook-dashboard.vercel.app`
3. `panel-plus-erp.vercel.app` → `wood-sample-platform.vercel.app`

## ⚠️ Domain Not Resolved / Needs Binding
- `ensimu.studio` — DNS A record missing. Vercel project has the alias name `ensimu-space-studio`
  whose production URL is `ensimu-space-studio.vercel.app`. Suggest either fixing DNS or pointing
  portfolio to `ensimu-space-studio.vercel.app` as a fallback.
