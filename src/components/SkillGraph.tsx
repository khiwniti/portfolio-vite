import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import SectionHeading from './SectionHeading';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  group: string;
}

interface Edge {
  from: string;
  to: string;
  strength: number;
  [key: string]: string | number;
}

const COLORS: Record<string, string> = {
  core: '#5b4ef2',
  ai: '#4c7c22',
  frontend: '#159faf',
  backend: '#d3624f',
  infra: '#9b8cff',
};

const NODES_DATA = [
  { id: 'khiw', label: 'Khiw', group: 'core', color: '#5b4ef2', size: 22 },
  { id: 'langgraph', label: 'LangGraph', group: 'ai', color: '#4c7c22', size: 16 },
  { id: 'mcp', label: 'MCP', group: 'ai', color: '#4c7c22', size: 15 },
  { id: 'fastapi', label: 'FastAPI', group: 'backend', color: '#d3624f', size: 14 },
  { id: 'python', label: 'Python', group: 'backend', color: '#d3624f', size: 15 },
  { id: 'next', label: 'Next.js', group: 'frontend', color: '#159faf', size: 15 },
  { id: 'react', label: 'React', group: 'frontend', color: '#159faf', size: 14 },
  { id: 'three', label: 'Three.js', group: 'frontend', color: '#159faf', size: 13 },
  { id: 'cloudflare', label: 'Cloudflare', group: 'infra', color: '#9b8cff', size: 14 },
  { id: 'k8s', label: 'Kubernetes', group: 'infra', color: '#9b8cff', size: 13 },
  { id: 'tf', label: 'TensorFlow', group: 'ai', color: '#4c7c22', size: 14 },
  { id: 'llm', label: 'LLM / RAG', group: 'ai', color: '#4c7c22', size: 15 },
  { id: 'airflow', label: 'Airflow', group: 'infra', color: '#9b8cff', size: 12 },
  { id: 'ansys', label: 'Ansys CFD', group: 'infra', color: '#d3624f', size: 12 },
];

const EDGES_DATA: Edge[] = [
  { from: 'khiw', to: 'langgraph', strength: 3 },
  { from: 'khiw', to: 'mcp', strength: 3 },
  { from: 'khiw', to: 'fastapi', strength: 2 },
  { from: 'khiw', to: 'next', strength: 2 },
  { from: 'khiw', to: 'cloudflare', strength: 2 },
  { from: 'langgraph', to: 'llm', strength: 2 },
  { from: 'langgraph', to: 'mcp', strength: 2 },
  { from: 'llm', to: 'tf', strength: 1 },
  { from: 'llm', to: 'python', strength: 2 },
  { from: 'fastapi', to: 'python', strength: 2 },
  { from: 'next', to: 'react', strength: 2 },
  { from: 'next', to: 'three', strength: 1 },
  { from: 'cloudflare', to: 'k8s', strength: 1 },
  { from: 'cloudflare', to: 'airflow', strength: 1 },
  { from: 'tf', to: 'python', strength: 1 },
  { from: 'ansys', to: 'python', strength: 1 },
  { from: 'khiw', to: 'ansys', strength: 1 },
];

export default function SkillGraph() {
  const { i18n } = useTranslation();
  const th = i18n.language === 'th';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);

  const initNodes = useCallback(() => {
    const rect = canvasRef.current?.getBoundingClientRect();
    const w = rect?.width || 600;
    const h = rect?.height || 380;
    nodesRef.current = NODES_DATA.map((nd) => ({
      ...nd,
      x: nd.id === 'khiw' ? w / 2 : Math.random() * w * 0.8 + w * 0.1,
      y: nd.id === 'khiw' ? h / 2 : Math.random() * h * 0.8 + h * 0.1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodesRef.current.length > 0) {
        nodesRef.current.forEach((node) => {
          node.x = Math.min(rect.width - node.size - 5, Math.max(node.size + 5, node.x));
          node.y = Math.min(rect.height - node.size - 5, Math.max(node.size + 5, node.y));
        });
      }
    };
    resize();
    initNodes();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let closest = '';
      let closestDist = 40;
      nodesRef.current.forEach((n) => {
        const d = Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2);
        if (d < closestDist) { closest = n.id; closestDist = d; }
      });
      setHovered(closest || null);
    };
    canvas.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);
      const nodes = nodesRef.current;
      const centerX = w / 2;
      const centerY = h / 2;

      // force simulation
      nodes.forEach((n) => {
        // attract to center
        n.vx += (centerX - n.x) * 0.0003;
        n.vy += (centerY - n.y) * 0.0003;
        // repel from each other
        nodes.forEach((m) => {
          if (n.id === m.id) return;
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          if (dist < 100) {
            const force = (100 - dist) * 0.001;
            n.vx += (dx / dist) * force;
            n.vy += (dy / dist) * force;
          }
        });
        // attract along edges
        EDGES_DATA.forEach((e) => {
          let other: Node | undefined;
          if (e.from === n.id) other = nodes.find((nd) => nd.id === e.to);
          else if (e.to === n.id) other = nodes.find((nd) => nd.id === e.from);
          if (other) {
            const dx = other.x - n.x;
            const dy = other.y - n.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const target = 100 + e.strength * 20;
            if (dist > target) {
              n.vx += (dx / dist) * 0.015 * e.strength;
              n.vy += (dy / dist) * 0.015 * e.strength;
            }
          }
        });
        // apply
        n.vx *= 0.88;
        n.vy *= 0.88;
        n.x += n.vx;
        n.y += n.vy;
        n.x = Math.max(n.size + 5, Math.min(w - n.size - 5, n.x));
        n.y = Math.max(n.size + 5, Math.min(h - n.size - 5, n.y));
      });

      // draw edges
      EDGES_DATA.forEach((e) => {
        const a = nodes.find((n) => n.id === e.from);
        const b = nodes.find((n) => n.id === e.to);
        if (!a || !b) return;
        const isHovered = hovered === e.from || hovered === e.to;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = isHovered ? 'rgba(91,78,242,0.5)' : 'rgba(17,23,19,0.06)';
        ctx.lineWidth = isHovered ? e.strength : 1;
        ctx.stroke();
      });

      // draw nodes
      nodes.forEach((n) => {
        const isHover = hovered === n.id;
        const isConnected = hovered
          ? EDGES_DATA.some((edge) =>
              (edge.from === hovered && edge.to === n.id) ||
              (edge.to === hovered && edge.from === n.id)
            ) || n.id === hovered
          : false;
        const alpha = hovered ? (isConnected ? 1 : 0.25) : 0.85;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(n.x, n.y, isHover ? n.size + 3 : n.size, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        if (isHover) { ctx.shadowColor = n.color; ctx.shadowBlur = 16; }
        ctx.fill();
        ctx.shadowBlur = 0;
        // label
        ctx.fillStyle = '#111713';
        ctx.font = `600 ${isHover ? '11' : '9'}px "DM Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y + (isHover ? n.size + 16 : n.size + 13));
        ctx.globalAlpha = 1;
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); canvas.removeEventListener('mousemove', onMouseMove); };
  }, [hovered, initNodes]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-32">
      <SectionHeading
        index={th ? '03 / แผนที่ทักษะ' : '03 / skill network'}
        title={th ? 'เทคโนโลยีที่เชื่อมโยงกัน' : 'The connected stack'}
        subtitle={th ? 'โครงข่ายทักษะ AI-Full-Stack ของคิวที่ใช้จริงใน production ทั้งหมด' : 'A live graph of every technology Khiw deploys in production.'}
      />
      <div className="relative overflow-hidden rounded-[2rem] border border-[#111713]/10 bg-white/50 shadow-[0_18px_60px_rgba(28,34,29,.05)]">
        <div className="absolute inset-0 technical-grid opacity-30" />
        <canvas ref={canvasRef} className="relative h-[300px] w-full sm:h-[380px]" style={{ cursor: 'crosshair' }} />
        <div className="flex flex-col gap-3 border-t border-[#111713]/10 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#7a837e]">
            {th ? 'คลิกหรือเลื่อนเมาส์เพื่อสำรวจโครงข่าย' : 'Hover nodes to explore connections'}
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {Object.entries(COLORS).map(([group, color]) => (
              <span key={group} className="flex items-center gap-1.5 font-mono text-[8px] uppercase text-[#8a928d]">
                <i className="h-2 w-2 rounded-full" style={{ background: color }} />
                {group}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
