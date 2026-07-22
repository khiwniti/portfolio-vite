import { type Project, projects } from './portfolio';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleTh?: string;
  excerpt: string;
  excerptTh?: string;
  content: string; // rich markdown / HTML paragraphs
  contentTh?: string;
  category: string;
  categoryTh?: string;
  tags: string[];
  coverImage: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  views: number;
  featured: boolean;
  // SEO Metadata
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
}

export const DEFAULT_BLOGS: BlogPost[] = [
  {
    id: 'langgraph-mcp-autonomous-agents-2026',
    slug: 'langgraph-mcp-autonomous-agents-2026',
    title: 'Why Forward Deployed AI Engineers Are Dominating 2026: LangGraph & MCP Multi-Agent Workflows',
    titleTh: 'ทำไมวิศวกร AI Forward Deployed ถึงเป็นที่ต้องการอันดับ 1 ในปี 2026: เจาะลึก LangGraph & MCP Multi-Agent',
    excerpt: 'Explore how Forward Deployed AI Engineers solve complex enterprise bottlenecks by combining LangGraph supervisor architectures with Model Context Protocol (MCP) servers.',
    excerptTh: 'สำรวจบทบาทของวิศวกร AI Forward Deployed ในการแก้ปัญหาคอขวดองค์กร ด้วยสถาปัตยกรรม LangGraph Supervisor และระบบ Model Context Protocol (MCP)',
    category: 'Autonomous Agents & MCP',
    categoryTh: 'ระบบเอเจนต์อัตโนมัติ & MCP',
    tags: ['LangGraph', 'Model Context Protocol', 'Forward Deployed AI', 'Multi-Agent', 'Enterprise AI'],
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    author: 'Khiw Nitithadachot',
    authorRole: 'Forward Deployed AI Engineer',
    date: 'June 10, 2026',
    readTime: '6 min read',
    views: 4820,
    featured: true,
    seoTitle: 'Forward Deployed AI Engineer Guide 2026 | LangGraph & MCP Multi-Agent Workflows',
    metaDescription: 'Learn how Forward Deployed AI Engineers build deterministic multi-agent architectures with LangGraph and Model Context Protocol (MCP) for enterprise production.',
    keywords: ['AI Engineer', 'Forward Deployed AI Engineer', 'LangGraph', 'Model Context Protocol', 'Autonomous AI Agents', 'Khiw Nitithadachot', 'Multi-Agent Workflows', 'AI production 2026'],
    content: `## The Rise of the Forward Deployed AI Engineer (FDE)

In 2026, standard prompt engineering and basic Retrieval-Augmented Generation (RAG) chains are no longer enough for mission-critical enterprise operations. Companies don't need toy chatbots; they need **Forward Deployed AI Engineers** who embed directly inside customer operational environments, map ambiguous executive problems into deterministic systems, and own production reliability from ingestion to deployment.

### Why Monolithic LLM Prompts Fail in Production

When enterprise teams attempt to solve multi-step workflows—such as analyzing engineering CAD models, verifying compliance against national regulations, and updating ERP databases—single monolithic LLM calls suffer from compounding hallucination rates.

\`\`\`
[Legacy Monolithic Approach]
User Query ──> [Single Huge Prompt + LLM] ──> Compounding Hallucinations (30%+ Error)

[Forward Deployed Multi-Agent MCP Approach]
User Query ──> [LangGraph Supervisor]
                 ├──> [Document Parser Agent via MCP]
                 ├──> [Compliance Verification Agent]
                 └──> [Database & Simulation Tool Executor] ──> 100% Deterministic Output
\`\`\`

### The Model Context Protocol (MCP) Breakthrough

By standardizing how AI models connect to internal data silos and external tools, the **Model Context Protocol (MCP)** eliminates custom spaghetti integration code. As an FDE, I build lightweight MCP servers on edge compute (Cloudflare Workers, AWS Fargate) that expose enterprise databases, spatial digital twins, and simulation solvers as strictly typed deterministic tools.

### Key Takeaways for AI Engineers
1. **Stateful Orchestration:** Use LangGraph shared memory graphs so concurrent worker agents can pass structured artifacts without losing execution context.
2. **Eval-Driven CI/CD:** Never deploy a prompt or model change without offline and online eval harnesses gating deployments in your CI/CD pipelines.
3. **Domain Grounding:** Embed deep domain logic (ASME standards, EN 15978 carbon rules, Thai government context) directly into agent gating steps.`,
    contentTh: `## การเติบโตอย่างก้าวกระโดดของวิศวกร AI Forward Deployed (FDE)

ในปี 2026 การเขียน Prompt พื้นฐานหรือระบบ RAG ธรรมดาไม่สามารถตอบโจทย์งานสำคัญระดับองค์กรได้อีกต่อไป องค์กรขนาดใหญ่ต้องการ **Forward Deployed AI Engineer** ที่เข้าไปทำงานร่วมกับทีมผู้ใช้งานจริง วิเคราะห์และแปลงโจทย์ที่คลุมเครือให้เป็นระบบอัตโนมัติที่มีความแม่นยำสูง

### ทำไมระบบ LLM แบบดั้งเดิมจึงล้มเหลวในการใช้งานจริง

เมื่อพยายามแก้ปัญหาที่มีหลายขั้นตอน เช่น วิเคราะห์โมเดลสถาปัตยกรรม ตรวจสอบกฎระเบียบภาครัฐ และอัปเดตฐานข้อมูล ERP การเรียกใช้ LLM เพียงครั้งเดียวด้วย Prompt ขนาดใหญ่มักเกิดข้อความหลอน (Hallucination) สะสม

### นวัตกรรม Model Context Protocol (MCP)

ระบบ **MCP** ช่วยสร้างมาตรฐานการเชื่อมต่อระหว่างโมเดล AI กับฐานข้อมูลองค์กรและเครื่องมือก่อสร้างจำลอง โดยไม่ต้องเขียนโค้ดเชื่อมต่อที่ซับซ้อน ทำให้ระบบ AI สามารถเรียกใช้คำสั่งผ่านสคีมาที่กำหนดไว้ล่วงหน้าได้อย่างแม่นยำ 100%`,
  },
  {
    id: 'nvidia-nim-anthropic-sse-streaming-proxy',
    slug: 'nvidia-nim-anthropic-sse-streaming-proxy',
    title: 'NVIDIA NIM to Anthropic SSE Streaming Proxy: Zero-Cost 29ms TTFT Enterprise Integration',
    titleTh: 'สร้างเกตเวย์แปลงสตรีมมิ่ง NVIDIA NIM เป็น Anthropic SSE ความหน่วงต่ำ 29ms TTFT บน Cloudflare',
    excerpt: 'Discover how to engineer an ultra-low latency Cloudflare Worker protocol proxy that translates NVIDIA NIM API calls to Anthropic SSE format in 29ms.',
    excerptTh: 'เจาะลึกเทคนิคพัฒนา Cloudflare Worker แปลงโปรโตคอล NVIDIA NIM เป็น Anthropic SSE ด้วยความเร็วโทเคนแรกเพียง 29 มิลลิวินาที',
    category: 'Edge AI & Cloud MLOps',
    categoryTh: 'คลาวด์ Edge AI & MLOps',
    tags: ['Cloudflare Workers', 'NVIDIA NIM', 'Anthropic Claude', 'Streaming Proxy', 'Edge Computing'],
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    author: 'Khiw Nitithadachot',
    authorRole: 'Forward Deployed AI Engineer',
    date: 'June 05, 2026',
    readTime: '5 min read',
    views: 3410,
    featured: true,
    seoTitle: 'NVIDIA NIM to Anthropic SSE Streaming Proxy | Zero-Cost Edge AI Architecture',
    metaDescription: 'Step-by-step tutorial on building a 29ms TTFT protocol proxy on Cloudflare Workers translating NVIDIA NIM APIs to Anthropic Claude SSE format.',
    keywords: ['NVIDIA NIM API', 'Anthropic Claude SSE', 'Streaming Proxy', 'Cloudflare Workers AI', 'Khiw Nitithadachot', 'AI Engineer tutorial', 'Time to First Token TTFT'],
    content: `## Bridging NVIDIA NIM and Anthropic Claude at the Edge

Enterprise development teams frequently face strict infrastructure constraints. Many internal developer platforms and automated toolchains are hardcoded to communicate via the **NVIDIA NIM API** specification. However, developers want to leverage frontier reasoning models like Anthropic's Claude 3.7 Sonnet and Claude Code.

### The 29ms TTFT Cloudflare Worker Solution

Instead of spinning up expensive intermediate AWS EC2 instances or Docker containers to handle payload translation, I architected a lightweight **Cloudflare Worker Edge Proxy**.

\`\`\`
Enterprise Toolchain ──(NVIDIA NIM Payload)──> [Cloudflare Worker Edge Proxy]
                                                      │ (Protocol Transformation)
Anthropic Claude API <──(Anthropic SSE Stream)────────┘
\`\`\`

### Performance & Cost ROI
* **Time-To-First-Token (TTFT):** Blistering **29ms** response time verified in production test harnesses.
* **Infrastructure Overhead:** **$0 additional monthly budget** utilizing Cloudflare Workers serverless edge compute.
* **Security Compliance:** Full streaming header sanitization and OAuth2 verification handled at edge locations worldwide.`,
    contentTh: `## เชื่อมต่อ NVIDIA NIM และ Anthropic Claude ด้วย Serverless Edge

ทีมพัฒนาระดับองค์กรมักมีข้อจำกัดด้านอินฟราสตรัคเจอร์ ระบบภายในหลายแห่งถูกล็อกให้คุยผ่านโปรโตคอล NVIDIA NIM แต่โปรแกรมเมอร์ต้องการใช้ความสามารถของ Claude 3.7

### โซลูชัน Cloudflare Worker ความเร็ว 29ms TTFT

แทนที่จะเช่าเซิร์ฟเวอร์ AWS ขนาดใหญ่ให้สิ้นเปลือง ผมออกแบบ Cloudflare Worker ทำหน้าที่แปลงสตรีมมิ่ง Server-Sent Events (SSE) แบบ Real-time ทันที ทำให้ได้ความเร็วตอบสนองโทเคนแรกเพียง 29 มิลลิวินาที และไม่มีค่าใช้จ่ายเซิร์ฟเวอร์เพิ่มแม้แต่บาทเดียว`,
  },
  {
    id: '3d-spatial-digital-twins-threejs-webgl-bim',
    slug: '3d-spatial-digital-twins-threejs-webgl-bim',
    title: 'Building 60 FPS 3D Spatial Digital Twins with Three.js WebGL and IFC BIM Engineering Standards',
    titleTh: 'สร้างระบบ 3D Spatial Digital Twins แสดงผล 60 FPS ด้วย Three.js WebGL ร่วมกับโมเดลอาคาร BIM IFC',
    excerpt: 'Learn how to transform millions of raw IoT sensor telemetry events into interactive, real-time 3D spatial digital twins for industrial refinery and telecom facilities.',
    excerptTh: 'เทคนิคแปลงข้อมูลเซนเซอร์ IoT หลายล้านรายการต่อวัน ให้เป็นระบบจำลอง 3D Digital Twins แบบเรียลไทม์สำหรับโรงงานและศูนย์ข้อมูลขนาดใหญ่',
    category: '3D Spatial & Digital Twins',
    categoryTh: '3D Digital Twins & กราฟิกมิติ',
    tags: ['Three.js', 'WebGL', 'BIM IFC', 'Digital Twins', 'Spatial Intelligence', 'IoT'],
    coverImage: 'https://images.unsplash.com/photo-1508873696983-2df5293cb92b?q=80&w=1200&auto=format&fit=crop',
    author: 'Khiw Nitithadachot',
    authorRole: 'Forward Deployed AI Engineer',
    date: 'May 28, 2026',
    readTime: '7 min read',
    views: 5120,
    featured: false,
    seoTitle: '60 FPS 3D Spatial Digital Twins | Three.js WebGL & BIM IFC Standards',
    metaDescription: 'Master high-performance 3D spatial digital twins using Three.js WebGL instanced rendering, IFC BIM standards, and real-time IoT telemetry.',
    keywords: ['3D Digital Twins', 'Three.js WebGL', 'BIM IFC', 'Spatial Intelligence', 'IoT Sensor Telemetry', 'Khiw Nitithadachot', 'National Telecom 3D facility'],
    content: `## The Spatial Intelligence Imperative

Industrial operations, telecom data centers (such as National Telecom's 9 DC facilities), and petroleum refineries generate millions of IoT sensor events every day. When operators monitor battery temperatures, UPS strings, or SCADA P&ID flows on flat tabular spreadsheets, Mean Time To Resolution (MTTR) suffers.

### Achieving 60 FPS with Massive CAD Geometries

Loading full architectural CAD or BIM files (IFC 4x3 standard) directly into a browser WebGL canvas can easily crash mobile devices or freeze desktop screens. To sustain buttery smooth **60 FPS render performance**, we implement strict geometry optimization pipelines:

1. **Instanced Rendering:** Draw thousands of identical battery cells or structural joints in a single GPU draw call.
2. **Level of Detail (LOD):** Dynamically swap complex CAD meshes for lightweight bounding bounding boxes when camera perspective zooms out to national facility views.
3. **WebTransport Ingestion:** Receive sub-second telemetry packets from edge workers without HTTP handshake friction.

### Production Case Study: NT 1,944-Battery Digital Twin

In our production deployment for National Telecom, technicians can seamlessly glide camera perspective from a national map of Thailand directly into facility rooms, string racks, and individual battery cells—instantly spotting overheating risks before grid outages occur.`,
    contentTh: `## ความสำคัญของ Spatial Intelligence ในงานวิศวกรรม

ศูนย์ข้อมูลและโรงงานอุตสาหกรรมสร้างข้อมูลพารามิเตอร์เซนเซอร์มหาศาลทุกวัน การดูตัวเลขบนตารางธรรมดาทำให้ช่างเทคนิคหาจุดเกิดเหตุขัดข้องไม่ทันเวลา

### เรนเดอร์โมเดล CAD ขนาดใหญ่ให้ลื่นไหลที่ 60 FPS

เราใช้เทคนิค Instanced Rendering และ LOD ในโปรแกรม Three.js WebGL ทำให้แสดงผลโมเดลอาคาร BIM IFC ได้อย่างคมชัดลื่นไหล ช่างเทคนิคสามารถกดซูมจากแผนที่ประเทศไทยเข้าสู่ห้องเครื่องและเซลล์แบตเตอรี่ได้ทันที`,
  },
  {
    id: 'medallion-data-architecture-lstm-predictive-maintenance',
    slug: 'medallion-data-architecture-lstm-predictive-maintenance',
    title: 'The Complete Guide to Medallion Data Architecture for Predictive Maintenance LSTM Neural Networks',
    titleTh: 'คู่มือฉบับสมบูรณ์: โครงสร้าง Medallion Data Architecture สำหรับฝึกสอนโมเดล AI พยากรณ์ LSTM',
    excerpt: 'Deep dive into organizing landing, bronze, silver, and gold time-series data pipelines inside TimescaleDB and Azure Synapse for high-accuracy RUL prediction.',
    excerptTh: 'เจาะลึกการจัดระเบียบไปป์ไลน์ข้อมูลอนุกรมเวลา (Bronze, Silver, Gold) ใน TimescaleDB เพื่อฝึกโมเดลพยากรณ์อายุแบตเตอรี่ที่มีความแม่นยำสูง R²=0.85',
    category: 'Data Engineering & MLOps',
    categoryTh: 'วิศวกรรมข้อมูล & MLOps',
    tags: ['Medallion Architecture', 'TimescaleDB', 'LSTM ML', 'Azure Synapse', 'Predictive Maintenance'],
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    author: 'Khiw Nitithadachot',
    authorRole: 'Forward Deployed AI Engineer',
    date: 'May 15, 2026',
    readTime: '8 min read',
    views: 2950,
    featured: false,
    seoTitle: 'Medallion Data Architecture Guide 2026 | Predictive Maintenance LSTM Neural Networks',
    metaDescription: 'Learn how to architect Bronze, Silver, and Gold time-series data pipelines in TimescaleDB and Azure Synapse for LSTM remaining useful life AI models.',
    keywords: ['Medallion Data Architecture', 'TimescaleDB hypertables', 'LSTM Neural Networks', 'Remaining Useful Life RUL', 'Khiw Nitithadachot', 'Azure Data Factory ETL'],
    content: `## Why Predictive AI Models Require Medallion Data Lakes

When training Long Short-Term Memory (**LSTM**) neural networks to predict Remaining Useful Life (RUL) across 1,944 UPS batteries, data cleanliness is the #1 predictor of model R² accuracy. Unsanitized sensor noise and duplicate timestamps will ruin deep learning loss convergence.

### The 4-Tier Medallion Pipeline

\`\`\`
[Landing Zone] Raw high-frequency telemetry every 10 seconds
      │
      ▼ (Cleansing & Deduplication via Apache Airflow / ADF)
[Bronze Zone] Immutable raw historical archive with schema enforcement
      │
      ▼ (Feature Enrichment & Outlier Filtering)
[Silver Zone] Normalized time-series hypertables (TimescaleDB)
      │
      ▼ (Rolling Windows & SHAP Feature Extraction)
[Gold Zone] Analytics-ready tensors dispatching directly to TensorFlow 2.15
\`\`\`

### Real-World Benchmark: R² = 0.85 Accuracy

By structuring our timeseries data across Bronze, Silver, and Gold hypertables, our LSTM model achieved an exceptional **R² = 0.85** prediction accuracy with a Mean Absolute Error (**MAE**) of just **2.3 days** across 243 GridSearchCV hyperparameter tuning experiments.`,
    contentTh: `## ทำไมโมเดลพยากรณ์ AI จึงต้องใช้ Medallion Data Architecture

ในการฝึกสอนโมเดล Deep Learning LSTM เพื่อทำนายอายุขัยแบตเตอรี่ ความสะอาดของข้อมูลคือปัจจัยสำคัญที่สุด หากมีค่ารบกวนหรือ Timestamp ซ้ำซ้อน โมเดลจะไม่สามารถเรียนรู้ความสัมพันธ์ได้

### โครงสร้างไปป์ไลน์ข้อมูล 4 ระดับ (Bronze -> Silver -> Gold)

การแบ่งชั้นข้อมูลอย่างเป็นระบบใน TimescaleDB ช่วยให้โมเดล LSTM ของเราทำความแม่นยำได้สูงถึง R² = 0.85 และมีความคลาดเคลื่อนเฉลี่ยเพียง 2.3 วันเท่านั้น`,
  },
];

/* Storage Keys */
export const STORAGE_BLOGS_KEY = 'fde_ai_blogs_v1';
export const STORAGE_PROJECTS_KEY = 'fde_ai_projects_v1';
export const STORAGE_ADMIN_AUTH = 'fde_ai_admin_auth_v1';

/* Get Blogs */
export function getBlogs(): BlogPost[] {
  try {
    const saved = localStorage.getItem(STORAGE_BLOGS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to read blogs from storage', e);
  }
  return DEFAULT_BLOGS;
}

/* Save Blogs */
export function saveBlogs(blogs: BlogPost[]): void {
  try {
    localStorage.setItem(STORAGE_BLOGS_KEY, JSON.stringify(blogs));
    window.dispatchEvent(new CustomEvent('portfolio:blogs-updated', { detail: blogs }));
  } catch (e) {
    console.error('Failed to save blogs', e);
  }
}

/* Get Single Blog by Slug or ID */
export function getBlogBySlug(slug: string): BlogPost | undefined {
  const blogs = getBlogs();
  return blogs.find((b) => b.slug === slug || b.id === slug);
}

/* Delete Blog */
export function deleteBlog(id: string): BlogPost[] {
  const blogs = getBlogs().filter((b) => b.id !== id);
  saveBlogs(blogs);
  return blogs;
}

/* Save Single Blog (Add or Edit) */
export function saveBlog(post: BlogPost): BlogPost[] {
  const blogs = getBlogs();
  const existingIdx = blogs.findIndex((b) => b.id === post.id);
  if (existingIdx >= 0) {
    blogs[existingIdx] = post;
  } else {
    blogs.unshift(post);
  }
  saveBlogs(blogs);
  return blogs;
}

/* Get Projects with Overrides */
export function getManagedProjects(): (Project & { showOnLanding?: boolean })[] {
  try {
    const saved = localStorage.getItem(STORAGE_PROJECTS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to read managed projects', e);
  }
  return projects.map((p) => ({ ...p, showOnLanding: true }));
}

/* Save Managed Projects */
export function saveManagedProjects(projs: (Project & { showOnLanding?: boolean })[]): void {
  try {
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projs));
    window.dispatchEvent(new CustomEvent('portfolio:projects-updated', { detail: projs }));
  } catch (e) {
    console.error('Failed to save managed projects', e);
  }
}

/* Admin Auth Check */
export function isAdminAuthenticated(): boolean {
  try {
    return localStorage.getItem(STORAGE_ADMIN_AUTH) === 'true';
  } catch (e) {
    return false;
  }
}

/* Admin Login */
export function loginAdmin(u: string, p: string): boolean {
  if (u === 'admin' && p === 'Admin123') {
    localStorage.setItem(STORAGE_ADMIN_AUTH, 'true');
    return true;
  }
  return false;
}

/* Admin Logout */
export function logoutAdmin(): void {
  localStorage.removeItem(STORAGE_ADMIN_AUTH);
}
