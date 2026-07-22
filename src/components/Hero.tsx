import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ease = [0.22, 1, 0.36, 1] as const;

type LabMode = 'twin' | 'agents' | 'deploys';

function DigitalTwin({ thai }: { thai: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotation = useRef({ x: 0.38, y: 0.7 });
  const drag = useRef({ active: false, x: 0, y: 0 });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    let frame = 0;

    const vertices = [
      [-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
      [-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1],
      [-.45,-.45,-.45],[.45,-.45,-.45],[.45,.45,-.45],[-.45,.45,-.45],
      [-.45,-.45,.45],[.45,-.45,.45],[.45,.45,.45],[-.45,.45,.45],
    ];
    const edges = [
      [0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7],
      [8,9],[9,10],[10,11],[11,8],[12,13],[13,14],[14,15],[15,12],[8,12],[9,13],[10,14],[11,15],
      [0,8],[2,10],[5,13],[7,15],
    ];

    const draw = () => {
      if (!drag.current.active) rotation.current.y += 0.004;
      const ratio = window.devicePixelRatio || 1;
      const bounds = canvas.getBoundingClientRect();
      const width = Math.max(bounds.width, 1);
      const height = Math.max(bounds.height, 1);
      if (canvas.width !== width * ratio || canvas.height !== height * ratio) {
        canvas.width = width * ratio;
        canvas.height = height * ratio;
      }
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const size = Math.min(width, height) * .27;
      const projected = vertices.map(([x,y,z]) => {
        const cxr = Math.cos(rotation.current.x), sxr = Math.sin(rotation.current.x);
        const y1 = y * cxr - z * sxr;
        const z1 = y * sxr + z * cxr;
        const cyr = Math.cos(rotation.current.y), syr = Math.sin(rotation.current.y);
        const x2 = x * cyr + z1 * syr;
        const z2 = -x * syr + z1 * cyr;
        const scale = (3.7 / (3.7 + z2)) * size;
        return { x: cx + x2 * scale, y: cy + y1 * scale };
      });

      edges.forEach(([a,b], index) => {
        ctx.beginPath();
        ctx.moveTo(projected[a].x, projected[a].y);
        ctx.lineTo(projected[b].x, projected[b].y);
        ctx.strokeStyle = index < 12 ? 'rgba(201,243,106,.8)' : index < 24 ? 'rgba(50,190,202,.55)' : 'rgba(132,119,255,.45)';
        ctx.lineWidth = index < 12 ? 1.6 : 1;
        ctx.stroke();
      });

      [0, 2, 5, 7].forEach((node, index) => {
        ctx.beginPath();
        ctx.arc(projected[node].x, projected[node].y, selected === index ? 5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = selected === index ? '#c9f36a' : '#7f8aff';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = selected === index ? 14 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, [selected]);

  const metrics = [
    { label: thai ? 'UPS แบตเตอรี่' : 'UPS batteries', value: '1,944' },
    { label: thai ? 'อุณหภูมิโซน B' : 'Zone B temp', value: '22.1 C' },
    { label: thai ? 'โหลดอินเวอร์เตอร์' : 'Inverter load', value: '78.4%' },
    { label: thai ? 'สถานะ' : 'Status', value: 'Optimal' },
  ];

  return (
    <div className="grid h-full min-h-[340px] grid-rows-[1fr_auto]">
      <div
        className="relative cursor-grab overflow-hidden active:cursor-grabbing"
        onPointerDown={(event) => {
          drag.current = { active: true, x: event.clientX, y: event.clientY };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!drag.current.active) return;
          rotation.current.y += (event.clientX - drag.current.x) * .008;
          rotation.current.x += (event.clientY - drag.current.y) * .008;
          drag.current.x = event.clientX;
          drag.current.y = event.clientY;
        }}
        onPointerUp={() => { drag.current.active = false; }}
      >
        <canvas ref={canvasRef} className="h-full w-full" />
        <div className="absolute left-5 top-5">
          <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#c9f36a]">Spatial operations twin</p>
          <p className="mt-1 font-heading text-lg font-bold text-white">NT Facility / DC-04</p>
        </div>
        <div className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-white/[.06] px-3 py-1.5 font-mono text-[9px] text-white/60 backdrop-blur">
          {thai ? 'ลากเพื่อหมุนแบบจำลอง' : 'Drag to rotate'}
        </div>
      </div>
      <div className="grid grid-cols-2 border-t border-white/10 sm:grid-cols-4">
        {metrics.map((metric, index) => (
          <button
            key={metric.label}
            onClick={() => setSelected(index)}
            className={`border-r border-white/10 px-3 py-3 text-left transition last:border-r-0 ${selected === index ? 'bg-[#c9f36a] text-[#111713]' : 'hover:bg-white/[.05]'}`}
          >
            <span className={`block font-mono text-[8px] uppercase tracking-wider ${selected === index ? 'text-[#111713]/60' : 'text-white/40'}`}>{metric.label}</span>
            <span className="mt-1 block font-heading text-sm font-bold">{metric.value}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AgentGraph({ thai }: { thai: boolean }) {
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [task, setTask] = useState(0);
  const jobs = [
    thai ? 'วิเคราะห์ RUL แบตเตอรี่ 1,944 ลูก' : 'Predict RUL across 1,944 batteries',
    thai ? 'แปลง Revit เป็น BOQ ภาครัฐ' : 'Translate Revit elements to public BOQ',
  ];

  const run = () => {
    if (running) return;
    setRunning(true);
    setStep(1);
    [2, 3, 4].forEach((value, index) => setTimeout(() => setStep(value), 650 * (index + 1)));
    setTimeout(() => setRunning(false), 2700);
  };

  return (
    <div className="flex h-full min-h-[340px] flex-col justify-between p-5 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#9b8cff]">LangGraph orchestration</p>
          <h3 className="mt-1 font-heading text-xl font-bold text-white">Agent control room</h3>
        </div>
        <span className={`rounded-full px-3 py-1 font-mono text-[9px] uppercase ${running ? 'bg-[#c9f36a] text-[#111713]' : 'bg-white/[.06] text-white/50'}`}>{running ? 'Executing' : 'Ready'}</span>
      </div>

      <div className="my-5 grid grid-cols-4 gap-2">
        {['Supervisor', 'Router', 'MCP Tool', 'Output'].map((label, index) => (
          <div key={label} className="relative text-center">
            {index < 3 && <span className={`absolute left-[58%] top-4 h-px w-[84%] transition-colors ${step > index + 1 ? 'bg-[#c9f36a]' : 'bg-white/10'}`} />}
            <span className={`relative z-10 mx-auto flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[10px] font-bold transition-all ${step >= index + 1 ? 'scale-110 border-[#c9f36a] bg-[#c9f36a] text-[#111713]' : 'border-white/10 bg-[#202823] text-white/35'}`}>{index + 1}</span>
            <span className="mt-2 block truncate font-mono text-[8px] uppercase tracking-wider text-white/40">{label}</span>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4 font-mono text-[10px] leading-6 text-white/55">
        <p className={step >= 1 ? 'text-white/75' : ''}>01 / intent mapped to enterprise objective</p>
        <p className={step >= 2 ? 'text-[#9b8cff]' : ''}>02 / supervisor selects specialist worker</p>
        <p className={step >= 3 ? 'text-[#55c7d2]' : ''}>03 / typed MCP tool executes deterministic query</p>
        <p className={step >= 4 ? 'font-bold text-[#c9f36a]' : ''}>04 / output verified against production policy</p>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
        <select value={task} onChange={(event) => setTask(Number(event.target.value))} className="rounded-xl border border-white/10 bg-white/[.06] px-3 py-2.5 font-mono text-[10px] text-white outline-none">
          {jobs.map((job, index) => <option key={job} value={index}>{job}</option>)}
        </select>
        <button onClick={run} disabled={running} className="rounded-xl bg-[#c9f36a] px-5 py-2.5 font-heading text-xs font-extrabold uppercase text-[#111713] transition hover:-translate-y-0.5 disabled:opacity-50">
          {running ? (thai ? 'กำลังรัน' : 'Running') : (thai ? 'รันเวิร์กโฟลว์' : 'Run workflow')}
        </button>
      </div>
    </div>
  );
}

function Deployments({ thai }: { thai: boolean }) {
  const deployments = [
    { name: 'NT Battery RUL', meta: '1,944 batteries / LSTM', status: 'Live', color: '#c9f36a' },
    { name: 'AOT Property AI', meta: 'Airports of Thailand', status: 'Live', color: '#55c7d2' },
    { name: 'Autonomous BIM', meta: 'CPAC / LangGraph', status: 'Live', color: '#9b8cff' },
    { name: 'Thai Weather Edge', meta: '9 Cloudflare Workers', status: 'Live', color: '#ef745f' },
  ];
  const [selected, setSelected] = useState(0);

  return (
    <div className="grid h-full min-h-[340px] lg:grid-cols-[1fr_1.05fr]">
      <div className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r lg:p-6">
        <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#55c7d2]">Production registry</p>
        <h3 className="mt-1 font-heading text-xl font-bold text-white">Selected deployments</h3>
        <div className="mt-5 space-y-2">
          {deployments.map((deployment, index) => (
            <button key={deployment.name} onClick={() => setSelected(index)} className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${selected === index ? 'border-white/20 bg-white/[.08]' : 'border-white/[.06] hover:bg-white/[.04]'}`}>
              <div>
                <span className="block font-heading text-xs font-bold text-white">{deployment.name}</span>
                <span className="mt-1 block font-mono text-[8px] uppercase tracking-wider text-white/35">{deployment.meta}</span>
              </div>
              <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase" style={{ color: deployment.color }}><i className="h-1.5 w-1.5 rounded-full bg-current" />{deployment.status}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between p-5 lg:p-6">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[.16em] text-white/35">deployment signal</span>
          <p className="mt-3 font-heading text-5xl font-extrabold text-white">34</p>
          <p className="font-mono text-[9px] uppercase tracking-wider text-[#c9f36a]">verified production systems</p>
        </div>
        <div className="mt-6 space-y-3">
          {[['API reliability','99.95%'],['Edge TTFT','29ms'],['Industry verticals','9'],['Commercial impact','฿5.9M']].map(([label,value]) => (
            <div key={label} className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <span className="font-mono text-[9px] uppercase tracking-wider text-white/35">{label}</span>
              <span className="font-heading text-sm font-bold text-white">{value}</span>
            </div>
          ))}
        </div>
        <a href="#projects" className="mt-6 inline-flex items-center justify-between rounded-xl bg-white px-4 py-3 font-heading text-xs font-extrabold uppercase text-[#111713] transition hover:-translate-y-0.5">
          <span>{thai ? 'สำรวจผลงานทั้งหมด' : 'Explore all systems'}</span><span>↗</span>
        </a>
      </div>
    </div>
  );
}

function ProofWorkbench({ thai }: { thai: boolean }) {
  const [mode, setMode] = useState<LabMode>('twin');
  const tabs: Array<{ id: LabMode; label: string }> = [
    { id: 'twin', label: thai ? '3D ดิจิทัลทวิน' : '3D digital twin' },
    { id: 'agents', label: thai ? 'ระบบเอเจนต์' : 'agent graph' },
    { id: 'deploys', label: thai ? 'ระบบที่ติดตั้งจริง' : 'deployments' },
  ];

  return (
    <div className="overflow-hidden bg-[#111713] text-white lg:min-h-screen">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-7">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ef745f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e5bd51]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#6ac98c]" />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[.18em] text-white/35">khiw / proof-of-work.lab</span>
        <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase text-[#c9f36a]"><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />online</span>
      </div>

      <div className="border-b border-white/10 p-2">
        <div className="grid grid-cols-3 gap-1">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setMode(tab.id)} className={`rounded-xl px-2 py-2.5 font-mono text-[9px] uppercase tracking-[.09em] transition sm:text-[10px] ${mode === tab.id ? 'bg-white text-[#111713]' : 'text-white/40 hover:bg-white/[.05] hover:text-white/75'}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={mode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .3, ease }} className="h-[410px] sm:h-[440px] lg:h-[calc(100vh-114px)] lg:min-h-[520px]">
          {mode === 'twin' && <DigitalTwin thai={thai} />}
          {mode === 'agents' && <AgentGraph thai={thai} />}
          {mode === 'deploys' && <Deployments thai={thai} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  const { i18n, t } = useTranslation();
  const thai = i18n.language === 'th';
  const { scrollY } = useScroll();
  const copyY = useTransform(scrollY, [0, 700], [0, 70]);
  const copyOpacity = useTransform(scrollY, [0, 650], [1, .15]);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-20 sm:pt-24 lg:pt-0">
      <div className="grid min-h-screen lg:grid-cols-[1.03fr_.97fr]">
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="relative flex items-center px-5 py-16 sm:px-10 lg:px-[7vw] lg:py-28">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease }} className="mb-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#111713]/10 bg-white/65 px-3.5 py-2 font-mono text-[9px] uppercase tracking-[.15em] text-[#53605a] shadow-[0_8px_28px_rgba(17,23,19,.05)]">
                <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#5b4ef2]" />
                {t('hero.availability')}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[.14em] text-[#7a837e]">Bangkok / Phitsanulok / Remote</span>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08, duration: .7, ease }} className="font-mono text-[10px] uppercase tracking-[.22em] text-[#5b4ef2]">
              {thai ? 'วิศวกรเครื่องกล + AI engineer · พร้อมสร้างระบบเชิงคำนวณที่วัดผลได้' : 'Mechanical engineer who converts CFD/simulation intuition into production AI systems'}
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16, duration: .85, ease }} className={`mt-5 font-heading text-[3.1rem] font-extrabold leading-[.98] tracking-[-.055em] text-[#111713] sm:text-[4.5rem] lg:text-[5.6vw] ${thai ? 'font-thai tracking-[-.035em]' : ''}`}>
              {thai ? 'เมื่อไหร่ที่' : 'Where fluid, structure,'}<br />
              <span className="text-[#5b4ef2]">{thai ? 'Physics ต้องพบกับ AI' : 'and AI collide \u2014 I ship.'}</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .28, duration: .75, ease }} className={`mt-7 max-w-xl text-base leading-7 text-[#56615a] sm:text-lg sm:leading-8 ${thai ? 'font-thai-body' : ''}`}>
              {thai
                ? 'วิศวกรเครื่องกลที่ใช้ประสบการณ์ CFD/FEA (OpenFOAM, Ansys, Moldex3D, COMSOL) เปลี่ยนเทคนิค AI \u2014 LangGraph, MCP, NVIDIA NIM \u2014 ให้เป็นระบบเชิงอุตสาหกรรมที่ติดตั้งจริง 34 ระบบ 9 อุตสาหกรรม'
                : 'Mechanical engineer turned AI engineer. I translate CFD/FEA intuition (OpenFOAM, Ansys, Moldex3D, COMSOL) into deterministic AI systems \u2014 multi-agent LangGraph + MCP, NVIDIA NIM inference, edge MLOps \u2014 and ship them into live production across 9 industry verticals.'}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .38, duration: .7, ease }} className="mt-9 flex flex-wrap gap-3">
              <a href="#projects" className="group inline-flex items-center gap-3 rounded-2xl bg-[#111713] px-6 py-3.5 font-heading text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(17,23,19,.16)] transition hover:-translate-y-1">
                {thai ? 'ดูผลงานที่ส่งมอบ' : 'Explore shipped systems'}
                <span className="transition-transform group-hover:translate-x-1">↗</span>
              </a>
              <a href="#contact" className="inline-flex items-center rounded-2xl border border-[#111713]/12 bg-white/55 px-6 py-3.5 font-heading text-sm font-bold text-[#111713] transition hover:bg-white">
                {thai ? 'เริ่มต้นบทสนทนา' : 'Start a conversation'}
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .55, duration: .8 }} className="mt-12 grid max-w-xl grid-cols-4 border-y border-[#111713]/10 py-5">
              {[
                ['34', thai ? 'ระบบจริง' : 'production systems'],
                ['9', thai ? 'อุตสาหกรรม' : 'industry verticals'],
                ['10y', thai ? 'CFD + AI' : 'CFD + AI combined'],
                ['฿5.9M', thai ? 'ผลกระทบธุรกิจ' : 'business impact'],
              ].map(([value, label], index) => (
                <div key={value} className={`${index ? 'border-l border-[#111713]/10 pl-4 sm:pl-6' : ''}`}>
                  <span className="block font-heading text-xl font-extrabold tracking-tight text-[#111713] sm:text-2xl">{value}</span>
                  <span className="mt-1 block font-mono text-[8px] uppercase tracking-[.12em] text-[#7a837e] sm:text-[9px]">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* Flagship project pills */}
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .62, duration: .7 }} className="mt-7 flex flex-col gap-2">
              <p className="font-mono text-[9px] uppercase tracking-[.18em] text-[#7a837e]">{thai ? 'ระบบหลักที่เพิ่งติดตั้งจริง' : 'Recently live flagship systems'}</p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://facility-management-app-mocha.vercel.app/ai"
                  className="group inline-flex items-center gap-2 rounded-2xl border border-[#22c55e]/30 bg-[#22c55e]/8 px-3.5 py-2 font-heading text-[11px] font-extrabold uppercase text-[#0f4d22] transition hover:border-[#22c55e]/60 hover:bg-[#22c55e]/15"
                  style={{ backgroundColor: 'rgba(34,197,94,.10)' }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]"></span>
                  FacilityHub · AI
                  <span className="text-[#22c55e]/70 transition group-hover:translate-x-1">↗</span>
                </a>
                <a
                  href="https://bim-model-companion.vercel.app"
                  className="group inline-flex items-center gap-2 rounded-2xl border border-[#f97316]/30 px-3.5 py-2 font-heading text-[11px] font-extrabold uppercase text-[#7c2d12] transition hover:border-[#f97316]/60"
                  style={{ backgroundColor: 'rgba(249,115,22,.10)' }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]"></span>
                  BuildAI · BIM Viewer
                  <span className="text-[#f97316]/70 transition group-hover:translate-x-1">↗</span>
                </a>
                <a
                  href="https://scada-poc-frontend.vercel.app"
                  className="group inline-flex items-center gap-2 rounded-2xl border border-[#14b8a6]/30 px-3.5 py-2 font-heading text-[11px] font-extrabold uppercase text-[#0f4f4a] transition hover:border-[#14b8a6]/60"
                  style={{ backgroundColor: 'rgba(20,184,166,.10)' }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#14b8a6]"></span>
                  PolyGuard SCADA
                  <span className="text-[#14b8a6]/70 transition group-hover:translate-x-1">↗</span>
                </a>
                <a
                  href="https://ensimu-space-studio.vercel.app"
                  className="group inline-flex items-center gap-2 rounded-2xl border border-[#8b5cf6]/30 px-3.5 py-2 font-heading text-[11px] font-extrabold uppercase text-[#3b0764] transition hover:border-[#8b5cf6]/60"
                  style={{ backgroundColor: 'rgba(139,92,246,.10)' }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]"></span>
                  Ensimu · CFD + AI
                  <span className="text-[#8b5cf6]/70 transition group-hover:translate-x-1">↗</span>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 45 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .24, duration: .95, ease }} className="relative lg:sticky lg:top-0 lg:h-screen">
          <ProofWorkbench thai={thai} />
        </motion.div>
      </div>
    </section>
  );
}