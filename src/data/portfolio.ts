export interface Release {
  version: string;
  date: string;
  tag: 'shipped' | 'scaled' | 'led' | 'fixed';
  title: string;
  titleTh?: string;
  points: string[];
  pointsTh?: string[];
}

export interface Metric {
  value: string;
  label: string;
  labelTh?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  roleTh?: string;
  period: string;
  start: string;
  location: string;
  type: string;
  typeTh?: string;
  color: string;
  summary: string;
  summaryTh?: string;
  stack: string[];
  releases: Release[];
  metrics: Metric[];
}

export interface CaseStudyHighlight {
  title: string;
  titleTh?: string;
  desc: string;
  descTh?: string;
}

export interface CaseStudyDetail {
  challenge: string;
  challengeTh?: string;
  architecture: string;
  architectureTh?: string;
  solution: string[];
  solutionTh?: string[];
  impact: string;
  impactTh?: string;
  highlights: CaseStudyHighlight[];
}

export interface DomainInfo {
  id: string;
  icon: string;
  label: string;
  labelTh?: string;
  color: string;
  tagline: string;
  taglineTh?: string;
  fde: string[];
}

export interface Project {
  id: string;
  name: string;
  nameTh?: string;
  category: string;
  categoryTh?: string;
  blurb: string;
  blurbTh?: string;
  description: string;
  descriptionTh?: string;
  tags: string[];
  accent: string;
  url: string;
  embed: boolean;
  metrics: Metric[];
  caseStudy: CaseStudyDetail;
  domain?: string;
  platform?: string[];
  headline?: string;
  status?: string;
  verified?: string;
  body?: string;
  tech?: string[];
  fde?: string[];
  highlights?: { k: string; v: string }[];
  arch?: { name: string; deploy: string; detail: string }[];
  pipeline?: string[];
}

export const profile = {
  name: 'Khiw Nitithadachot',
  nameTh: 'คิว นิติธาดาโชติ',
  role: 'Forward Deployed AI Engineer / Full Stack Developer',
  roleTh: 'วิศวกร AI Forward Deployed และนักพัฒนา Full Stack',
  tagline:
    'I architect autonomous multi-agent systems, scalable cloud MLOps infrastructure, and interactive 3D spatial digital twins to solve complex enterprise challenges.',
  taglineTh:
    'ฉันออกแบบและพัฒนาระบบ AI Autonomous Multi-Agent, โครงสร้างพื้นฐาน MLOps บนคลาวด์ที่รองรับการขยายตัว และ 3D Digital Twins เพื่อแก้ปัญหาที่ซับซ้อนขององค์กร',
  location: 'Phitsanulok & Bangkok, Thailand',
  locationTh: 'พิษณุโลก และ กรุงเทพมหานคร, ประเทศไทย',
  email: 'kiw.brw@gmail.com',
  phone: '082-997-1887',
  availability: 'Open to Forward-Deployed & Lead AI Engagements',
  availabilityTh: 'เปิดรับงาน Forward-Deployed และที่ปรึกษาระบบ AI',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/getintheq', handle: '/in/getintheq' },
    { label: 'Email', href: 'mailto:kiw.brw@gmail.com', handle: 'kiw.brw@gmail.com' },
    { label: 'Phone', href: 'tel:0829971887', handle: '082-997-1887' },
  ],
  stats: [
    { value: '7+', label: 'Years Engineering Range', labelTh: 'ปีประสบการณ์ทางวิศวกรรม' },
    { value: '15+', label: 'AI & Data Pipelines Deployed', labelTh: 'ระบบ AI & Data ที่ติดตั้งจริง' },
    { value: '฿5.9M+', label: 'Profit & Cost Optimization', labelTh: 'สร้างกำไรและลดต้นทุน' },
    { value: '100%', label: 'Compliance Standards', labelTh: 'ผ่านมาตรฐานสากล (ISO/GMP/ASME)' },
  ],
};

export const skills = [
  {
    group: 'AI / ML & Agents',
    groupTh: 'AI / ML และเอเจนต์',
    items: ['LangGraph', 'Model Context Protocol (MCP)', 'Multi-Agent Workflows', 'LLM Integration', 'Computer Vision (OpenCV)', 'RAG & Vector DBs'],
  },
  {
    group: 'Frontend & Spatial 3D',
    groupTh: 'Frontend และ 3D Digital Twins',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Three.js (WebGL)', 'BIM / IFC Spatial Data'],
  },
  {
    group: 'Backend & Data Pipelines',
    groupTh: 'Backend และจัดการไปป์ไลน์ข้อมูล',
    items: ['FastAPI', 'Python', 'Apache Airflow ETL', 'Azure Synapse Analytics', 'Azure Data Factory', 'Postgres / SQL / Graph DBs'],
  },
  {
    group: 'Infra, MLOps & Simulation',
    groupTh: 'คลาวด์ MLOps และจำลองวิศวกรรม',
    items: ['Docker & Kubernetes', 'Cloudflare Workers', 'AWS Edge Serverless', 'Ansys CFD/FEA', 'COMSOL Multiphysics', 'Moldex3D Simulation'],
  },
];

export const experiences: Experience[] = [
  {
    id: 'bangkok-silicon',
    company: 'Bangkok Silicon',
    role: 'Associate Solution Architect',
    roleTh: 'ที่ปรึกษาสถาปัตยกรรมโซลูชัน (Associate Solution Architect)',
    period: 'Oct 2025 — Apr 2026',
    start: '2025',
    location: 'Bangkok, Thailand',
    type: 'Full-time',
    typeTh: 'งานเต็มเวลา',
    color: '#4d7c0f',
    summary:
      'Architected autonomous multi-agent systems using LangGraph & MCP, edge-first distributed cloud infrastructure, and 3D WebGL digital twins for mission-critical sectors.',
    summaryTh:
      'ออกแบบสถาปัตยกรรมระบบ Autonomous Multi-Agent ด้วย LangGraph และ MCP พร้อมคลาวด์อินฟราสตรัคเจอร์แบบ Edge-first และระบบ 3D Digital Twin สำหรับองค์กรระดับประเทศ',
    stack: ['LangGraph', 'MCP', 'Cloudflare Workers', 'AWS', 'Three.js WebGL', 'Python'],
    metrics: [
      { value: '<100ms', label: 'Telemetry Latency', labelTh: 'ความหน่วงข้อมูล' },
      { value: 'Multi-Agent', label: 'Orchestration', labelTh: 'ประสานงานเอเจนต์' },
      { value: 'End-to-End', label: 'MLOps Pipeline', labelTh: 'ระบบ MLOps ครบวงจร' },
    ],
    releases: [
      {
        version: 'v4.0.0',
        date: 'Apr 2026',
        tag: 'led',
        title: 'Enterprise Autonomous Multi-Agent Orchestration',
        titleTh: 'ระบบประสานงาน Autonomous Multi-Agent ระดับองค์กร',
        points: [
          'Designed LangGraph and Model Context Protocol (MCP) architectures that orchestrate concurrent specialized agents to solve complex industrial workflows.',
          'Automated enterprise decision-making and document intelligence across high-stakes government and industrial domain sectors.',
        ],
        pointsTh: [
          'ออกแบบระบบด้วย LangGraph และ Model Context Protocol (MCP) เพื่อควบคุมตัวแทน AI เฉพาะทางให้ทำงานร่วมกันอย่างอัตโนมัติ',
          'พัฒนาระบบวิเคราะห์เอกสารและการตัดสินใจอัตโนมัติสำหรับโครงการสำคัญของภาครัฐและภาคอุตสาหกรรมขนาดใหญ่',
        ],
      },
      {
        version: 'v3.5.0',
        date: 'Jan 2026',
        tag: 'scaled',
        title: 'High-Scale Edge Telemetry & Cloud Architecture',
        titleTh: 'สถาปัตยกรรมคลาวด์แบบ Edge และประมวลผลข้อมูลความหน่วงต่ำ',
        points: [
          'Deployed edge-first distributed cloud platforms on Cloudflare Workers and AWS Serverless handling massive telemetry ingestion.',
          'Sustained sub-100ms latency without the overhead of traditional heavy server infrastructure.',
        ],
        pointsTh: [
          'ติดตั้งแพลตฟอร์มคลาวด์แบบกระจายตัวบน Cloudflare Workers และ AWS Serverless รองรับข้อมูลโทรมาตรปริมาณมหาศาล',
          'รักษาความหน่วง (Latency) ต่ำกว่า 100ms โดยลดต้นทุนและความซับซ้อนของเซิร์ฟเวอร์แบบดั้งเดิม',
        ],
      },
      {
        version: 'v3.0.0',
        date: 'Nov 2025',
        tag: 'shipped',
        title: 'Interactive 3D Spatial Digital Twins',
        titleTh: 'ระบบจำลองฝาแฝดดิจิทัล 3 มิติ (3D Spatial Digital Twins)',
        points: [
          'Integrated Three.js WebGL, geospatial APIs, and BIM/IFC engineering standards into real-time interactive web environments.',
          'Transformed static industrial facility data into actionable operational models.',
        ],
        pointsTh: [
          'ผสานเทคโนโลยี Three.js WebGL, Geospatial APIs และมาตรฐานงานวิศวกรรม BIM/IFC เข้ากับเว็บแอปพลิเคชัน',
          'เปลี่ยนข้อมูลดิบของโรงงานอุตสาหกรรมให้อยู่ในรูปโมเดล 3 มิติที่ตอบสนองแบบเรียลไทม์',
        ],
      },
    ],
  },
  {
    id: 'libralytics',
    company: 'Libralytics',
    role: 'Lead Data & AI Engineer (Freelance)',
    roleTh: 'หัวหน้าทีมวิศวกรข้อมูลและ AI (อิสระ)',
    period: 'Nov 2024 — Present',
    start: '2024',
    location: 'Bangkok, Thailand',
    type: 'Freelance / Lead',
    typeTh: 'หัวหน้าทีม / อิสระ',
    color: '#6d28d9',
    summary:
      'Lead AI and data pipeline engineering specializing in restaurant/café business intelligence, MLOps infrastructure (Docker/Kubernetes), and full-stack modern web solutions.',
    summaryTh:
      'นำทีมพัฒนา AI Agents และระบบไปป์ไลน์ข้อมูล เชี่ยวชาญด้าน Business Intelligence สำหรับธุรกิจร้านอาหาร ดูแลโครงสร้าง MLOps (Docker/K8s) และแอปพลิเคชัน Full-stack',
    stack: ['FastAPI', 'Next.js', 'Docker', 'Kubernetes', 'Apache Airflow', 'Vector DBs'],
    metrics: [
      { value: 'Full-Stack', label: 'AI Web Apps', labelTh: 'แอป AI เต็มรูปแบบ' },
      { value: 'K8s & Docker', label: 'MLOps Infra', labelTh: 'โครงสร้าง MLOps' },
      { value: 'Airflow ETL', label: 'Automated Pipelines', labelTh: 'ไปป์ไลน์อัตโนมัติ' },
    ],
    releases: [
      {
        version: 'v2.4.0',
        date: 'Jan 2025',
        tag: 'shipped',
        title: 'Modern AI-Powered Business Intelligence Suite',
        titleTh: 'แพลตฟอร์ม BI อัจฉริยะขับเคลื่อนด้วย AI สำหรับธุรกิจร้านอาหาร',
        points: [
          'Built full-stack Next.js & Tailwind web applications with custom FastAPI backends incorporating authentication and automated report generation.',
          'Delivered specialized market research and business model analysis tools for hospitality entrepreneurs.',
        ],
        pointsTh: [
          'พัฒนาเว็บแอปพลิเคชันด้วย Next.js และ Tailwind CSS เชื่อมต่อกับระบบหลังบ้าน FastAPI พร้อมระบบยืนยันตัวตนและสร้างรายงานอัตโนมัติ',
          'สร้างเครื่องมือวิเคราะห์การตลาดและโมเดลธุรกิจเชิงลึกสำหรับผู้ประกอบการร้านอาหารและคาเฟ่',
        ],
      },
      {
        version: 'v2.1.0',
        date: 'Nov 2024',
        tag: 'scaled',
        title: 'Scalable AI/MLOps & Apache Airflow ETL Infrastructure',
        titleTh: 'โครงสร้าง MLOps ที่ขยายตัวได้และไปป์ไลน์ข้อมูล Apache Airflow',
        points: [
          'Containerized AI agents using Docker and Kubernetes to ensure reliable scalable deployment, monitoring, and maintenance.',
          'Engineered complete data scraping and ETL pipelines utilizing Apache Airflow across Graph, Vector, and SQL databases.',
        ],
        pointsTh: [
          'จัดการระบบ AI Agents ในรูปแบบ Container ด้วย Docker และ Kubernetes เพื่อการขยายตัวและตรวจสอบที่เสถียร',
          'สร้างไปป์ไลน์รวบรวมข้อมูลและทำ ETL อัตโนมัติด้วย Apache Airflow จัดเก็บลงฐานข้อมูล Graph, Vector และ SQL',
        ],
      },
    ],
  },
  {
    id: 'tipco-asphalt',
    company: 'Tipco Asphalt Public Company Limited',
    role: 'Data Engineer',
    roleTh: 'วิศวกรข้อมูล (Data Engineer)',
    period: 'Jun 2025 — Aug 2025',
    start: '2025',
    location: 'Bangkok, Thailand',
    type: 'Contract',
    typeTh: 'สัญญาจ้างโครงการ',
    color: '#0369a1',
    summary:
      'Designed and implemented enterprise data ingestion and transformation pipelines using Azure Data Factory and Synapse Analytics while initiating LLM workflow automation.',
    summaryTh:
      'ออกแบบและพัฒนาระบบไปป์ไลน์รวบรวมและแปลงข้อมูลองค์กรด้วย Azure Data Factory และ Azure Synapse Analytics พร้อมนำ LLM มาช่วยงานอัตโนมัติ',
    stack: ['Azure Data Factory', 'Azure Synapse', 'Oracle DB', 'Python', 'LLM Workflows'],
    metrics: [
      { value: 'Azure Cloud', label: 'Data Architecture', labelTh: 'สถาปัตยกรรมคลาวด์' },
      { value: 'Oracle -> Cloud', label: 'Migration Pipeline', labelTh: 'ย้ายข้อมูลสู่คลาวด์' },
      { value: 'LLM Integration', label: 'Workflow Automation', labelTh: 'ระบบอัตโนมัติ LLM' },
    ],
    releases: [
      {
        version: 'v1.8.0',
        date: 'Aug 2025',
        tag: 'shipped',
        title: 'Oracle to Azure Synapse Enterprise Pipeline Migration',
        titleTh: 'ย้ายข้อมูลจาก Oracle สู่คลาวด์ Azure Synapse Analytics',
        points: [
          'Executed high-volume extraction, cleansing, and enrichment pipelines from Oracle databases into modern cloud storage solutions.',
          'Monitored and optimized Azure pipeline performance ensuring cost-efficiency and compliance with data governance standards.',
        ],
        pointsTh: [
          'ดำเนินกระบวนการสกัด ทำความสะอาด และปรับปรุงข้อมูลจากฐานข้อมูล Oracle เข้าสู่คลาวด์สมัยใหม่',
          'ตรวจสอบและปรับแต่งประสิทธิภาพไปป์ไลน์บน Azure เพื่อความคุ้มค่าและสอดคล้องกับนโยบายกำกับดูแลข้อมูล',
        ],
      },
      {
        version: 'v1.7.0',
        date: 'Jul 2025',
        tag: 'led',
        title: 'Large Language Model (LLM) Data Workflow Integration',
        titleTh: 'ริเริ่มผสาน Large Language Model (LLM) เข้ากับกระบวนการข้อมูล',
        points: [
          'Initiated and led a pilot integration of Large Language Models into data pipelines to automate natural language processing tasks and metadata enrichment.',
        ],
        pointsTh: [
          'นำเสนอและเป็นผู้นำโครงการนำ LLM มาช่วยจัดการงานประมวลผลภาษาธรรมชาติและสร้างรายละเอียดข้อมูลอัตโนมัติ',
        ],
      },
    ],
  },
  {
    id: 'q-chang',
    company: 'Q-CHANG (คิวช่าง)',
    role: 'Service Development Specialist',
    roleTh: 'ผู้เชี่ยวชาญด้านการพัฒนาบริการ',
    period: 'Apr 2023 — Jul 2023',
    start: '2023',
    location: 'Bangkok, Thailand',
    type: 'Full-time',
    typeTh: 'งานเต็มเวลา',
    color: '#ea580c',
    summary:
      'Designed service Standard Operating Procedures (SOPs), applied Python text sentiment analysis for clustering customer feedback, and forecasted partner GMV using regression models.',
    summaryTh:
      'ออกแบบขั้นตอนการปฏิบัติงานมาตรฐาน (SOPs) ใช้ Python Sentiment Analysis จัดกลุ่มความเห็นลูกค้า และพยากรณ์ยอดขาย GMV ด้วย Regression',
    stack: ['Python', 'Sentiment Analysis', 'Regression Modeling', 'SOP Design', 'Cost Negotiation'],
    metrics: [
      { value: '3 Years Data', label: 'Clustering Analysis', labelTh: 'วิเคราะห์ข้อมูลย้อนหลัง 3 ปี' },
      { value: 'GMV Forecast', label: 'Regression Models', labelTh: 'พยากรณ์ยอดขายพาร์ทเนอร์' },
      { value: 'New SOPs', label: 'Air Aeration & Cleaning', labelTh: 'สร้างมาตรฐานบริการใหม่' },
    ],
    releases: [
      {
        version: 'v1.5.0',
        date: 'Jun 2023',
        tag: 'led',
        title: 'Air Aeration Service Initiation & Technical SOP Standards',
        titleTh: 'นำโครงการบริการล้างท่ออากาศตั้งแต่ต้นจนเป็นมาตรฐาน SOP',
        points: [
          'Led the new air aeration service project from initial proposal to technical work instruction establishment.',
          'Managed cost negotiations between business category managers and technical operational teams.',
        ],
        pointsTh: [
          'บริหารโครงการบริการใหม่ตั้งแต่ขั้นนำเสนอจนถึงการจัดทำ Work Instruction สำหรับช่างเทคนิค',
          'จัดการการเจรจาต้นทุนระหว่างทีมจัดการธุรกิจและทีมช่างปฏิบัติการเพื่อประสิทธิภาพสูงสุด',
        ],
      },
      {
        version: 'v1.4.0',
        date: 'May 2023',
        tag: 'shipped',
        title: 'Data Science Assurance Provider Selection & GMV Forecasting',
        titleTh: 'คัดเลือกผู้ให้บริการประกันภัยด้วย Data Science และพยากรณ์ GMV',
        points: [
          'Employed Python data cleaning and text sentiment analysis across 3 years of service records to categorize and select a new house cleaning assurance provider.',
          'Applied regression techniques to accurately forecast Gross Merchandise Value (GMV) for business partners.',
        ],
        pointsTh: [
          'ใช้ Python ทำความสะอาดข้อมูลและวิเคราะห์ Sentiment จากบันทึกบริการย้อนหลัง 3 ปี เพื่อคัดเลือกแผนประกันภัยที่เหมาะสม',
          'ประยุกต์ใช้โมเดล Regression ในการพยากรณ์ยอดขายรวม (GMV) เพื่อสนับสนุนการตัดสินใจของพาร์ทเนอร์',
        ],
      },
    ],
  },
  {
    id: 'cp-group',
    company: 'Charoen Pokphand Group (C.P. Group)',
    role: 'Future Leader Developing Program (FLDP)',
    roleTh: 'ผู้นำอนาคต (Future Leader Developing Program)',
    period: 'Sep 2022 — Mar 2023',
    start: '2022',
    location: 'Samut Prakan, Thailand',
    type: 'Management Trainee',
    typeTh: 'โปรแกรมผู้บริหารรุ่นใหม่',
    color: '#16a34a',
    summary:
      'Optimized 24-cavity stack mold capacity to 300,000 pcs/day, boosting OEE to generate +2.9M Baht in sales and 3M Baht in cost reductions. Built Python scraper tools with Google Maps API.',
    summaryTh:
      'เพิ่มกำลังผลิตแม่พิมพ์ Stack Mold เป็น 300,000 ชิ้น/วัน ยกระดับ OEE สร้างยอดขายเพิ่ม 2.9 ล้านบาทและลดต้นทุน 3 ล้านบาท พร้อมพัฒนาโปรแกรมดึงข้อมูลด้วย Python',
    stack: ['Python Scraper', 'Google Maps API', 'Power BI Dashboard', 'OEE Optimization', 'Pareto Analysis'],
    metrics: [
      { value: '+฿2.9M', label: 'Sales Increase Generated', labelTh: 'ยอดขายเพิ่มขึ้น' },
      { value: '-฿3.0M', label: 'Production Cost Saved', labelTh: 'ต้นทุนการผลิตที่ลดได้' },
      { value: '300K pcs/day', label: 'Stack Mold Capacity', labelTh: 'กำลังการผลิตต่อวัน' },
    ],
    releases: [
      {
        version: 'v1.2.0',
        date: 'Feb 2023',
        tag: 'scaled',
        title: 'Stack Mold OEE Optimization Yielding ฿5.9M Total Financial Impact',
        titleTh: 'เพิ่มประสิทธิภาพ OEE แม่พิมพ์ สร้างผลกระทบทางการเงินรวม 5.9 ล้านบาท',
        points: [
          'Orchestrated 24-cavity stack mold optimization at C.P. Food Packaging Industry reaching 300,000 pieces/day capacity.',
          'Exceeded corporate financial targets by generating 2.9 million Baht in sales growth and 3 million Baht in operational cost reduction.',
        ],
        pointsTh: [
          'บริหารจัดการเพิ่มประสิทธิภาพแม่พิมพ์ 24 คาวิตี้ที่บริษัท ซี.พี. สหอุตสาหกรรมบรรจุภัณฑ์ จนบรรลุกำลังผลิต 300,000 ชิ้น/วัน',
          'ทำผลงานทะลุเป้าหมายองค์กร โดยเพิ่มยอดขายได้ 2.9 ล้านบาท และลดต้นทุนความสูญเสียได้ 3 ล้านบาท',
        ],
      },
      {
        version: 'v1.1.0',
        date: 'Nov 2022',
        tag: 'shipped',
        title: 'Python Tele-Sales Lead Scraper & Power BI Executive Dashboard',
        titleTh: 'โปรแกรมดึงข้อมูลกลุ่มเป้าหมายด้วย Python และแดชบอร์ด Power BI',
        points: [
          'Developed a targeted Python tele-sales scraping tool integrated with the Google Maps API to streamline market observation and lead generation.',
          'Designed interactive Power BI executive dashboards presented directly to C.P. Chairman Executives at CPLI global leadership events.',
        ],
        pointsTh: [
          'พัฒนาเครื่องมือดึงข้อมูลการตลาดอัตโนมัติด้วย Python ร่วมกับ Google Maps API เพื่อค้นหากลุ่มเป้าหมายอย่างแม่นยำ',
          'สร้างแดชบอร์ด Power BI สำหรับผู้บริหาร เพื่อรายงานความคืบหน้าโดยตรงต่อผู้บริหารระดับสูงของเครือเจริญโภคภัณฑ์',
        ],
      },
    ],
  },
  {
    id: 'tint',
    company: 'Thailand Institute of Nuclear Technology (TINT)',
    role: 'Operational Nuclear Engineer',
    roleTh: 'วิศวกรปฏิบัติการนิวเคลียร์',
    period: 'Nov 2021 — Jul 2022',
    start: '2021',
    location: 'Bangkok, Thailand',
    type: 'Full-time',
    typeTh: 'งานเต็มเวลา',
    color: '#0284c7',
    summary:
      'Pioneered maintenance systems for WFI & Purified Water radiopharmaceutical production strictly under ISO9001 and GMP standards, applying data science outlier methodologies.',
    summaryTh:
      'พัฒนาระบบบำรุงรักษาระบบน้ำบริสุทธิ์ (WFI & PW) สำหรับผลิตสารเภสัชรังสีภายใต้มาตรฐาน ISO9001/GMP พร้อมใช้ Data Science วิเคราะห์ค่าผิดปกติ',
    stack: ['Outlier Analysis', 'Data Cleaning', 'ISO9001 / GMP', 'HVAC / Cleanroom', 'Radiopharmaceuticals'],
    metrics: [
      { value: '100% GMP', label: 'Radiopharma Compliance', labelTh: 'มาตรฐาน GMP/ISO9001' },
      { value: 'I-131 Safety', label: 'Capsule Synthesizer Protocol', labelTh: 'ความปลอดภัยสารรังสี I-131' },
      { value: 'WFI & PW', label: 'Water Systems Control', labelTh: 'ระบบน้ำเกรดฉีด/บริสุทธิ์' },
    ],
    releases: [
      {
        version: 'v1.0.0',
        date: 'Jun 2022',
        tag: 'fixed',
        title: 'Radiopharmaceutical Preventive Maintenance & Outlier Data Analysis',
        titleTh: 'ระบบบำรุงรักษาเชิงป้องกันและการวิเคราะห์ค่าผิดปกติในสารเภสัชรังสี',
        points: [
          'Applied sophisticated data cleaning and outlier detection methodologies to analyze biological parameters and enhance proactive preventive maintenance.',
          'Authored strict work instructions and radiation safety protocols for handling the I-131 capsule drug synthesizer and cleanroom HVAC parameters.',
        ],
        pointsTh: [
          'ประยุกต์ใช้วิธีการทำความสะอาดข้อมูลและตรวจจับค่าผิดปกติ (Outlier Analysis) วิเคราะห์พารามิเตอร์ทางชีวภาพเพื่อวางแผนซ่อมบำรุงล่วงหน้า',
          'จัดทำคู่มือความปลอดภัยและมาตรฐานปฏิบัติงานสำหรับเครื่องสังเคราะห์ยาสารรังสีไอโอดีน-131 และควบคุมระบบคลีนรูม HVAC',
        ],
      },
    ],
  },
  {
    id: 'mechanical-cfd-epc',
    company: 'Hitachi / MACS / Freelance Specialist',
    role: 'Mechanical Design & CFD/FEA Specialist Engineer',
    roleTh: 'วิศวกรออกแบบเครื่องกล และผู้เชี่ยวชาญจำลอง CFD/FEA',
    period: '2019 — 2021',
    start: '2019',
    location: 'Prachinburi & Bangkok, Thailand',
    type: 'Full-time & Consultant',
    typeTh: 'งานเต็มเวลา และที่ปรึกษา',
    color: '#4d7c0f',
    summary:
      'Conducted advanced Ansys CFD/FEA & Moldex3D simulations for Hitachi home appliance cost reduction, and served as QC Welding Engineer on Bangchack Refinery EPC pipelines under ASME Sec IX.',
    summaryTh:
      'จำลองวิศวกรรมขั้นสูงด้วย Ansys CFD/FEA และ Moldex3D ลดต้นทุนให้ Hitachi และทำหน้าที่วิศวกรตรวจสอบคุณภาพงานเชื่อมท่อโรงกลั่นบางจากตามมาตรฐาน ASME Sec IX',
    stack: ['Ansys CFD/FEA', 'COMSOL', 'Moldex3D', 'SolidWorks CAD', 'AutoCAD Plant 3D', 'ASME Sec IX QC'],
    metrics: [
      { value: 'ASME Sec IX', label: 'Refinery Pipeline QC', labelTh: 'มาตรฐานงานเชื่อมโรงกลั่น' },
      { value: 'Pareto Cost', label: 'Hitachi Part Reduction', labelTh: 'ลดต้นทุนชิ้นส่วนด้วย Pareto' },
      { value: '7+ Years', label: 'CFD & FEA Expertise', labelTh: 'เชี่ยวชาญแบบจำลองของไหล/โครงสร้าง' },
    ],
    releases: [
      {
        version: 'v0.9.0',
        date: 'Jul 2021',
        tag: 'shipped',
        title: 'Hitachi Refrigerator Vacuum Compartment Simulation & Redesign',
        titleTh: 'ออกแบบและจำลองช่องแช่สุญญากาศสำหรับตู้เย็น Hitachi FBF720',
        points: [
          'Executed mechanical stress, fatigue, and Moldex3D plastic injection simulations for appliance parts, collaborating with Japan R&D lab for vacuum testing.',
          'Led part selection cost-reduction initiatives using Pareto techniques.',
        ],
        pointsTh: [
          'จำลองความเค้น ความล้า และการฉีดพลาสติกด้วย Moldex3D และ Ansys ทำงานร่วมกับห้องแล็บประเทศญี่ปุ่นในการทดสอบสุญญากาศ',
          'นำโครงการลดต้นทุนการผลิตโดยใช้เทคนิค Pareto เลือกชิ้นส่วนที่คุ้มค่าที่สุด',
        ],
      },
      {
        version: 'v0.8.0',
        date: 'Jan 2021',
        tag: 'led',
        title: 'Bangchack Refinery EPC Pipeline QC & ASME Section IX Certification',
        titleTh: 'ควบคุมคุณภาพงานเชื่อมและท่อส่งโรงกลั่นบางจากตามมาตรฐาน ASME Section IX',
        points: [
          'Managed QC welding engineering, WPS/WPQ procedure qualifications, joint fit-up inspections, and AutoCAD Plant 3D as-built drawings for refinery EPC project.',
        ],
        pointsTh: [
          'ควบคุมคุณภาพงานเชื่อมท่อ ควบคุมเอกสาร WPS/WPQ ตรวจสอบแนวเชื่อมร่วมกับผู้ตรวจสอบโครงการ และจัดทำแบบ 3D As-built ด้วย AutoCAD Plant 3D',
        ],
      },
    ],
  },
];

export const DOMAINS: DomainInfo[] = [
  {
    id: 'nt',
    icon: '🔋',
    label: 'NT Battery RUL AI Platform',
    labelTh: 'แพลตฟอร์ม AI พยากรณ์อายุแบตเตอรี่ NT',
    color: '#a3e635',
    tagline: 'National Telecom · 1,944 batteries · 6-service Railway MLOps',
    taglineTh: 'บริษัท โทรคมนาคมแห่งชาติ · แบตเตอรี่ 1,944 ลูก · ระบบ MLOps 6 ไมโครเซอร์วิส',
    fde: ['Predictive Maintenance', 'Full MLOps Pipeline', 'LSTM Neural Networks', 'Medallion Data Architecture'],
  },
  {
    id: 'facility-ai',
    icon: '🏢',
    label: 'FacilityAI — CCTV + Building + AI',
    labelTh: 'ระบบ FacilityAI CCTV + อาคาร + AI อัจฉริยะ',
    color: '#22c55e',
    tagline: 'FacilityHub · AI page · CCTV/Access/Floorplan · Live Vercel deployment',
    taglineTh: 'FacilityHub · หน้า AI · CCTV/Access/Floorplan · ติดตั้งจริงบน Vercel',
    fde: ['Building Management Systems', 'CCTV Video AI', 'Facility Maintenance AI', 'AVS / Cloudflare Access'],
  },
  {
    id: 'gov',
    icon: '🏛',
    label: 'Government & Disaster Management',
    labelTh: 'ระบบจัดการภัยพิบัติและภาครัฐ',
    color: '#fb923c',
    tagline: 'DRMD · DDPM · NDWC · GISTDA · 8 deployments',
    taglineTh: 'กรมฝนหลวงฯ · ปภ. · ศูนย์เตือนภัยพิบัติฯ · GISTDA · 8 โครงการจริง',
    fde: ['Business→AI Translation', 'Legacy Integration', 'PINN Physics ML', 'Thai Gov Context'],
  },
  {
    id: 'bim',
    icon: '🏗',
    label: 'Construction, BIM & Carbon',
    labelTh: 'วิศวกรรมก่อสร้าง BIM และคำนวณคาร์บอน',
    color: '#f97316',
    tagline: 'CPAC · NT 3D · CarbonScope · LangGraph agents',
    taglineTh: 'CPAC · NT 3D · CarbonScope · ระบบเอเจนต์ LangGraph',
    fde: ['LangGraph Multi-Agent', 'IFC/Revit Pipeline', 'EN 15978 Carbon', 'MCP Tooling'],
  },
  {
    id: 'weather',
    icon: '🌤',
    label: 'Thai Smart Weather Platform',
    labelTh: 'แพลตฟอร์มพยากรณ์อากาศอัจฉริยะไทย',
    color: '#22d3ee',
    tagline: 'TSWFP · 9 CF Workers · FourCastNet/GraphCast · Full observability',
    taglineTh: 'TSWFP · 9 Cloudflare Workers · FourCastNet/GraphCast · ระบบตรวจวัด OTel ครบวงจร',
    fde: ['AI Observability', 'Edge Microservices', 'Distributed Tracing', 'ML Inference at Edge'],
  },
  {
    id: 'fnb',
    icon: '🍽',
    label: 'BiteBase F&B Intelligence',
    labelTh: 'แพลตฟอร์มวิเคราะห์ธุรกิจร้านอาหาร BiteBase',
    color: '#10b981',
    tagline: 'Restaurant AI SaaS · 2 CF accounts · LangGraph agents',
    taglineTh: 'SaaS ร้านอาหารอัจฉริยะ · 2 คลัสเตอร์ Cloudflare · เอเจนต์ LangGraph',
    fde: ['Multi-tenant SaaS', 'AI Agent Deployment', 'Edge Backend', 'RAG Pipelines'],
  },
  {
    id: 'infra',
    icon: '🤖',
    label: 'AI Infrastructure & Dev Tools',
    labelTh: 'โครงสร้างพื้นฐาน AI และเครื่องมือนักพัฒนา',
    color: '#8b5cf6',
    tagline: 'LLM Proxy · MCP Servers · SuperDoc AI · Graph RAG',
    taglineTh: 'LLM Proxy 29ms · MCP Servers · SuperDoc AI · Graph RAG',
    fde: ['LLM Proxy Engineering', 'MCP Server Design', 'Graph RAG', 'Edge-First Architecture'],
  },
  {
    id: 'property',
    icon: '🏢',
    label: 'Property, Asset & Facility Mgmt',
    labelTh: 'บริหารจัดการอสังหาริมทรัพย์และอาคาร',
    color: '#14b8a6',
    tagline: 'AOT · SCADA AI · AVEVA interface · Thai enterprise',
    taglineTh: 'ทอท. AOT · SCADA AI · ระบบ AVEVA · ลูกค้าองค์กรระดับประเทศ',
    fde: ['AI-Augmented ERP', 'SCADA Integration', 'AVEVA Stack', 'Thai Enterprise Client'],
  },
  {
    id: 'civic',
    icon: '🌱',
    label: 'Civic Tech, AgriTech & LINE Bots',
    labelTh: 'เทคโนโลยีเพื่อสังคม เกษตรอัจฉริยะ และ LINE Bots',
    color: '#f472b6',
    tagline: 'BloodPlus · GISTDA AgriAnalytics · LINE chatbots · CDP wallet',
    taglineTh: 'BloodPlus บริจาคเลือด · GISTDA เกษตร · LINE Chatbots · กระเป๋า Web3 CDP',
    fde: ['LINE Bot Integration', 'Civic AI', 'GISTDA Geo Platform', 'Blockchain/CDP'],
  },
];

export const projects: Project[] = [
  /* ── NT ── */
  {
    id: 'nt-battery-rul',
    name: 'NT Battery RUL Monitoring System',
    nameTh: 'ระบบ AI พยากรณ์อายุขัยแบตเตอรี่ UPS สำหรับ NT',
    category: 'NT Battery RUL AI Platform',
    categoryTh: 'แพลตฟอร์ม AI พยากรณ์อายุแบตเตอรี่ NT',
    domain: 'nt',
    platform: ['Railway', 'Vercel'],
    status: 'production',
    verified: 'Notion: NT-POC Battery RUL Monitoring System v2.0, Jan 23 2026',
    headline: '1,944-battery LSTM MLOps platform for National Telecom UPS infrastructure',
    blurb: '1,944-battery LSTM MLOps platform for National Telecom UPS infrastructure.',
    blurbTh: 'ระบบ MLOps พยากรณ์อายุแบตเตอรี่ UPS 1,944 ลูกสำหรับบริษัท โทรคมนาคมแห่งชาติ',
    description:
      "Production ML platform monitoring 1,944 UPS batteries across 9 NT data center facilities. Predicts Remaining Useful Life using LSTM neural networks (R²=0.85, MAE=2.3 days) and detects anomalies with Isolation Forest (F1=0.90). Full Medallion data pipeline, TimescaleDB hypertables, LINE Bot alerting with Gemini AI, and 3D facility visualization.",
    descriptionTh:
      'แพลตฟอร์ม ML ควบคุมดูแลแบตเตอรี่ UPS 1,944 ลูกในศูนย์ข้อมูล NT ทั้ง 9 แห่ง พยากรณ์อายุการใช้งานคงเหลือ (RUL) ด้วยโครงข่ายประสาทเทียม LSTM (แม่นยำ R²=0.85) ตรวจจับความผิดปกติด้วย Isolation Forest (F1=0.90) โครงสร้าง Medallion Pipeline บน TimescaleDB พร้อมแจ้งเตือนผ่าน LINE Bot',
    body:
      "Production ML platform monitoring 1,944 UPS batteries across 9 NT data center facilities. Predicts Remaining Useful Life using LSTM neural networks (R²=0.85, MAE=2.3 days) and detects anomalies with Isolation Forest (F1=0.90). Full Medallion data pipeline, TimescaleDB hypertables, LINE Bot alerting with Gemini AI, and 3D facility visualization.",
    tags: ['TensorFlow 2.15', 'LSTM', 'TimescaleDB', 'FastAPI', 'Three.js', 'LINE API'],
    tech: [
      'React', 'Vite', 'Three.js', 'Mapbox', 'Express.js', 'TypeScript', 'FastAPI',
      'TensorFlow 2.15', 'TimescaleDB', 'PostgreSQL 16', 'NumPy', 'LINE Messaging API',
      'Gemini AI', 'Railway Cloud', 'Prometheus', 'Winston', 'Sentry'
    ],
    fde: [
      'Enterprise MLOps', 'LSTM time-series prediction', 'Medallion data architecture',
      'Multi-service orchestration', 'Production observability', 'LINE Bot alerting'
    ],
    accent: '#a3e635',
    url: 'https://nt-facility-3-d-manager-new-ui.vercel.app',
    embed: true,
    metrics: [
      { value: '1,944', label: 'Batteries Monitored', labelTh: 'แบตเตอรี่ที่ควบคุม' },
      { value: '0.85 R²', label: 'LSTM Accuracy', labelTh: 'ความแม่นยำโมเดล LSTM' },
      { value: '<150ms', label: 'API p95 Latency', labelTh: 'ความหน่วงข้อมูลต่ำ' },
    ],
    highlights: [
      { k: 'Batteries monitored', v: '1,944' },
      { k: 'NT data center facilities', v: '9' },
      { k: 'Battery strings', v: '81' },
      { k: 'LSTM R² accuracy', v: '0.85' },
      { k: 'MAE prediction error', v: '2.3 days' },
      { k: 'Anomaly detection F1', v: '0.90' },
      { k: 'Sensor ingestion interval', v: '10 seconds' },
      { k: 'Batch prediction (500 batteries)', v: '~18 seconds' },
      { k: 'LSTM features', v: '50+ per timestep' },
      { k: 'Training experiments (GridSearchCV)', v: '243' },
      { k: 'API p95 latency', v: '<150ms' },
      { k: 'ML inference latency', v: '~80ms/battery' },
    ],
    arch: [
      { name: 'Frontend — React + Vite + Three.js + Mapbox', deploy: 'Vercel', detail: '3D battery block visualization, geo map of 9 DCs, real-time sensor dashboard, alert management UI. Deployed as nt-facility-3-d-manager-new-ui on Vercel.' },
      { name: 'Backend API — Express.js + TypeScript + TimescaleDB', deploy: 'Railway', detail: 'REST /api/v1/* — sensor ingestion every 10s, ML dispatch every 60min, alert escalation every 5min. Helmet.js security, CORS, rate limiting, Zod validation.' },
      { name: 'MLOps Service — FastAPI + TensorFlow 2.15', deploy: 'Railway', detail: 'LSTM RUL prediction endpoint, batch 500 batteries in ~18s. Isolation Forest anomaly scoring (precision 0.92, recall 0.88). SHAP explainability per prediction.' },
      { name: 'ML Training Service — Python + TensorFlow', deploy: 'Railway', detail: 'Offline LSTM training: 50+ features × 50 timesteps, GridSearchCV 243 experiments, TimeSeriesSplit CV, early stopping, model versioning.' },
      { name: 'Simulator Service — FastAPI + NumPy', deploy: 'Railway', detail: 'Realistic battery sensor data generation. 200+ batteries per request, 10 parallel workers, LRU cache for performance. Supports multiple degradation profiles.' },
      { name: 'LINE Bot Service — Express.js + Gemini AI', deploy: 'Railway', detail: 'Critical alert push to LINE OA, AI chat for technician queries, webhook handling for 2-way communication with field staff.' },
    ],
    pipeline: [
      'Landing Zone → raw sensor ingest',
      'Bronze Zone → cleansed + deduped',
      'Silver Zone → enriched + normalized',
      'Gold Zone → ML features + analytics-ready'
    ],
    caseStudy: {
      challenge: 'Monitoring 1,944 industrial UPS batteries across 9 remote National Telecom data centers requires real-time predictive health scoring before critical power failure occurs during power grid outages.',
      challengeTh: 'การควบคุมดูแลแบตเตอรี่ UPS อุตสาหกรรม 1,944 ลูกในศูนย์ข้อมูล NT 9 แห่ง ต้องใช้ระบบพยากรณ์สุขภาพแบตเตอรี่ล่วงหน้าก่อนเกิดเหตุไฟฟ้าดับหรือแบตเตอรี่เสื่อมสภาพกะทันหัน',
      architecture: '6 microservices orchestrated across Railway Cloud and Vercel. Ingests telemetry every 10s into TimescaleDB hypertables, runs LSTM neural networks (50+ timesteps × 50 features) via FastAPI, and pushes real-time alerts to LINE Official Accounts.',
      architectureTh: 'สถาปัตยกรรม 6 ไมโครเซอร์วิสบน Railway และ Vercel รวบรวมข้อมูลเซนเซอร์ทุก 10 วินาทีลงใน TimescaleDB ประมวลผลโมเดล LSTM และแจ้งเตือนช่างเทคนิคทันทีผ่าน LINE OA',
      solution: [
        'Built full Medallion Data Architecture (Landing, Bronze, Silver, Gold layers) inside TimescaleDB.',
        'Trained LSTM deep learning models achieving R²=0.85 and Mean Absolute Error of 2.3 days.',
        'Delivered interactive Three.js 3D battery block visualizer allowing technicians to drill from map → facility → string → cell.',
      ],
      solutionTh: [
        'สร้างโครงสร้างข้อมูล Medallion Architecture ครบวงจรภายในฐานข้อมูลอนุกรมเวลา TimescaleDB',
        'ฝึกสอนโมเดล Deep Learning LSTM มีความแม่นยำ R²=0.85 และความคลาดเคลื่อนเฉลี่ยเพียง 2.3 วัน',
        'พัฒนาหน้าจอ Three.js 3D แสดงบล็อกแบตเตอรี่ ให้ช่างเทคนิคซูมดูสถานะรายเซลล์ได้อย่างละเอียด',
      ],
      impact: 'Successfully deployed across 9 NT data center facilities, preventing UPS failures and protecting mission-critical national telecom infrastructure.',
      impactTh: 'ติดตั้งใช้งานจริงครบทั้ง 9 ศูนย์ข้อมูลของ NT ป้องกันความเสียหายของระบบสำรองไฟและรักษาเสถียรภาพโครงข่ายสื่อสารแห่งชาติ',
      highlights: [
        { title: '1,944 Batteries Monitored', titleTh: 'ควบคุมแบตเตอรี่ 1,944 ลูก', desc: 'Real-time telemetry ingestion every 10 seconds across 81 battery strings.', descTh: 'รับส่งข้อมูลเซนเซอร์ทุก 10 วินาที ครอบคลุมแบตเตอรี่สตริง 81 ชุด' },
        { title: 'LSTM Time-Series AI', titleTh: 'โมเดล AI พยากรณ์อนุกรมเวลา LSTM', desc: 'Predicts exact remaining useful life in days with SHAP explainability.', descTh: 'พยากรณ์อายุใช้งานคงเหลือเป็นวันพร้อมระบบอธิบายปัจจัยเสี่ยง SHAP' },
      ]
    }
  },
  {
    id: 'nt-3d-frontend',
    name: 'NT Facility 3D Manager UI',
    nameTh: 'ระบบบริหารจัดการศูนย์ข้อมูล 3 มิติ NT Facility 3D',
    category: 'NT Battery RUL AI Platform',
    categoryTh: 'แพลตฟอร์ม AI พยากรณ์อายุแบตเตอรี่ NT',
    domain: 'nt',
    platform: ['Vercel'],
    status: 'production',
    verified: 'Vercel project: nt-facility-3-d-manager-new-ui',
    headline: 'React + Three.js 3D facility visualization frontend for the NT battery platform',
    blurb: 'React + Three.js 3D facility visualization frontend for the NT battery platform.',
    blurbTh: 'หน้าจอ 3D Digital Twin จำลองศูนย์ข้อมูลและแบตเตอรี่ NT ด้วย Three.js',
    description:
      "The browser-facing 3D digital twin for NT's 9 data center facilities. Uses Three.js for interactive 3D battery block models, Mapbox for geospatial view of facility locations across Thailand, and real-time WebSocket connections to the Railway backend.",
    descriptionTh:
      'ระบบจำลองศูนย์ข้อมูล 3 มิติสำหรับ NT ทั้ง 9 แห่ง ใช้ Three.js แสดงผลบล็อกแบตเตอรี่แบบอินเทอร์แอคทีฟ Mapbox แสดงพิกัดบนแผนที่ประเทศไทย และเชื่อมต่อข้อมูลเซนเซอร์ผ่าน WebSocket แบบเรียลไทม์',
    body:
      "The browser-facing 3D digital twin for NT's 9 data center facilities. Uses Three.js for interactive 3D battery block models, Mapbox for geospatial view of facility locations across Thailand, and real-time WebSocket connections to the Railway backend. Technicians can drill from map → facility → battery string → individual cell.",
    tags: ['React', 'Vite', 'Three.js', 'Mapbox GL', 'WebSocket', 'TailwindCSS'],
    tech: ['React', 'Vite', 'Three.js', 'Mapbox GL', 'WebSocket', 'TailwindCSS'],
    fde: ['3D WebGL visualization', 'Real-time sensor UI', 'Digital twin concept', 'xeokit/Three.js expertise'],
    accent: '#a3e635',
    url: 'https://nt-facility-3-d-manager-new-ui.vercel.app',
    embed: true,
    metrics: [
      { value: '3D WebGL', label: 'Interactive Canvas', labelTh: 'แคนวาสกราฟิก 3 มิติ' },
      { value: '9 DCs', label: 'Facility Mapping', labelTh: 'ครอบคลุม 9 ศูนย์ข้อมูล' },
      { value: 'WebSocket', label: 'Real-Time Telemetry', labelTh: 'ข้อมูลเรียลไทม์ทันที' },
    ],
    highlights: [
      { k: 'Deployment', v: 'Vercel (nt-facility-3-d-manager-new-ui)' },
      { k: '3D engine', v: 'Three.js' },
      { k: 'Map layer', v: 'Mapbox GL' },
      { k: 'Build framework', v: 'React + Vite' },
      { k: 'Backend connection', v: 'Railway REST + WebSocket' },
    ],
    caseStudy: {
      challenge: 'Translating complex sensor tables of 1,944 batteries into an intuitive, visual interface that data center operators can assess in seconds.',
      challengeTh: 'การแปลงข้อมูลตารางเซนเซอร์ซับซ้อนของแบตเตอรี่ 1,944 ลูก ให้เป็นหน้าจอภาพ 3 มิติที่เข้าใจง่ายในไม่กี่วินาที',
      architecture: 'Built on React, Vite, and Three.js with hardware-accelerated shaders and Mapbox GL integration.',
      architectureTh: 'สร้างบน React, Vite และ Three.js พร้อมระบบแสดงผลแผนที่พิกัดจริง Mapbox GL',
      solution: [
        'Created clickable 3D battery representations with color-coded health indicators.',
        'Integrated seamless camera transitions zooming from national Thailand map down to individual battery cells.',
      ],
      solutionTh: [
        'สร้างแบบจำลอง 3 มิติของแบตเตอรี่ที่คลิกดูสถานะได้ พร้อมระบุสีตามระดับสุขภาพ',
        'ออกแบบระบบกลูมกล้องซูมจากแผนที่ประเทศไทยเข้าสู่ห้องเครื่องและรายเซลล์แบตเตอรี่อย่างนุ่มนวล',
      ],
      impact: 'Empowered field engineers to immediately isolate overheating or degraded battery strings.',
      impactTh: 'ช่วยให้วิศวกรภาคสนามตรวจพบสตริงแบตเตอรี่ที่มีอุณหภูมิผิดปกติหรือเสื่อมสภาพได้ทันที',
      highlights: [
        { title: 'Interactive 3D Engine', titleTh: 'เครื่องมือกราฟิก 3 มิติ', desc: 'High-FPS rendering of entire data center rooms.', descTh: 'แสดงผลห้องเครื่องศูนย์ข้อมูลด้วยเฟรมเรตสูงลื่นไหล' },
      ]
    }
  },
  {
    id: 'nt-3d-poc',
    name: 'NT 3D Facility POC',
    nameTh: 'ระบบต้นแบบ 3D BIM Facility Viewer สำหรับ NT',
    category: 'NT Battery RUL AI Platform',
    categoryTh: 'แพลตฟอร์ม AI พยากรณ์อายุแบตเตอรี่ NT',
    domain: 'nt',
    platform: ['Vercel'],
    status: 'poc',
    verified: 'Vercel project: 3-d-nt-facility-poc',
    headline: 'Original IFC-based xeokit 3D facility viewer for NT government tender',
    blurb: 'Original IFC-based xeokit 3D facility viewer for NT government tender.',
    blurbTh: 'ระบบต้นแบบ 3D BIM ใช้ xeokit SDK และ IfcOpenShell ชนะการประมูล NT',
    description:
      "First-generation 3D facility proof-of-concept built to win the NT tender. Uses xeokit SDK with IfcOpenShell for loading IFC 4x3 building models, overlaying architectural BIM geometry with live battery health indicators.",
    descriptionTh:
      'ระบบต้นแบบ 3D Facility รุ่นแรกที่สร้างขึ้นจนชนะการประมูลโครงการ NT ใช้ xeokit SDK ร่วมกับ IfcOpenShell ในการโหลดโมเดลอาคาร IFC 4x3 ซ้อนทับข้อมูลสุขภาพแบตเตอรี่ลงบนโครงสร้างอาคารจริง',
    body:
      "First-generation 3D facility proof-of-concept built to win the NT tender. Uses xeokit SDK with IfcOpenShell for loading IFC 4x3 building models. Demonstrated real-time sensor data overlay on architectural BIM geometry — rooms, floors, and equipment overlaid with live battery health indicators.",
    tags: ['xeokit SDK', 'IfcOpenShell', 'IFC 4x3', 'React', 'WebGL'],
    tech: ['xeokit SDK', 'IfcOpenShell', 'IFC 4x3', 'React', 'WebGL'],
    fde: ['IFC BIM integration', 'BIM sensor overlay', 'POC-to-production pitch', 'xeokit SDK expertise'],
    accent: '#a3e635',
    url: 'https://3-d-nt-facility-poc.vercel.app',
    embed: true,
    metrics: [
      { value: 'IFC 4x3', label: 'BIM Architecture Standard', labelTh: 'มาตรฐานโมเดลอาคาร BIM' },
      { value: 'xeokit SDK', label: '3D BIM Rendering Engine', labelTh: 'เอ็นจินเรนเดอร์โมเดล BIM' },
    ],
    highlights: [
      { k: 'BIM format', v: 'IFC 4x3' },
      { k: '3D engine', v: 'xeokit SDK' },
      { k: 'Parser', v: 'IfcOpenShell' },
      { k: 'Purpose', v: 'NT government tender POC' },
    ],
    caseStudy: {
      challenge: 'Winning a high-stakes national government tender by proving real-time sensor overlay on structural IFC architectural files.',
      challengeTh: 'การชนะการประมูลโครงการสำคัญระดับประเทศโดยพิสูจน์ความสามารถในการซ้อนทับข้อมูลเซนเซอร์ลงบนไฟล์โครงสร้างสถาปัตยกรรม IFC',
      architecture: 'xeokit SDK integrated with IfcOpenShell parsers running in browser WebGL canvas.',
      architectureTh: 'xeokit SDK ทำงานร่วมกับ IfcOpenShell ประมวลผลบน WebGL ในเบราว์เซอร์',
      solution: ['Successfully parsed complex IFC 4x3 building models with sub-second inspection queries.'],
      solutionTh: ['อ่านและถอดรหัสไฟล์โมเดลอาคาร IFC 4x3 ได้อย่างสมบูรณ์แบบพร้อมตอบสนองคำสั่งรวดเร็ว'],
      impact: 'Secured the National Telecom enterprise contract and laid the foundation for the production 3D platform.',
      impactTh: 'คว้าชัยชนะในสัญญาระดับประเทศของ NT และเป็นรากฐานสู่แพลตฟอร์มโปรดักชันจริง',
      highlights: [
        { title: 'IFC 4x3 Compatibility', titleTh: 'รองรับมาตรฐาน IFC 4x3', desc: 'Direct parsing of architectural CAD/BIM structural files.', descTh: 'ถอดรหัสไฟล์โครงสร้างวิศวกรรม CAD/BIM ได้โดยตรง' },
      ]
    }
  },

  /* ── GOV ── */
  {
    id: 'rainmaking-mission',
    name: 'Royal Rainmaking Mission Planning AI',
    nameTh: 'ระบบ AI วางแผนภารกิจฝนหลวงและการบินเกษตร',
    category: 'Government & Disaster Management',
    categoryTh: 'ระบบจัดการภัยพิบัติและภาครัฐ',
    domain: 'gov',
    platform: ['Vercel'],
    status: 'production',
    verified: 'Vercel: rainmaking-mission + pinn-rainmaking-backend + rainmaking-mission-planning',
    headline: 'AI-assisted aircraft seeding mission workspace for the Thai Royal Rainmaking Department',
    blurb: 'AI-assisted aircraft seeding mission workspace for the Thai Royal Rainmaking Department.',
    blurbTh: 'ระบบ AI วางแผนปฏิบัติการบินทำฝนหลวงสำหรับกรมฝนหลวงและการบินเกษตร (DRMD)',
    description:
      "Three-project system for DRMD (กรมฝนหลวงและการบินเกษตร). The mission planner UI shows weather windows, aircraft assignments, and go/no-go confidence scores. A FastAPI backend runs Physics-Informed Neural Networks (PINN) to infer cloud seeding conditions.",
    descriptionTh:
      'ระบบ 3 โครงการสำหรับกรมฝนหลวงและการบินเกษตร แสดงหน้าต่างสภาพอากาศ กำหนดเครื่องบิน และคำนวณคะแนนความมั่นใจ Go/No-Go ขับเคลื่อนด้วยระบบหลังบ้าน FastAPI และโครงข่ายประสาทฟิสิกส์ PINN',
    body:
      "Three-project system for DRMD (กรมฝนหลวงและการบินเกษตร). The mission planner UI shows weather windows, aircraft assignments, and go/no-go confidence scores. A FastAPI backend runs Physics-Informed Neural Networks to infer cloud seeding conditions. The scheduling module handles multi-aircraft route optimization for the rainy season campaign.",
    tags: ['PyTorch (PINN)', 'FastAPI', 'Next.js', 'Mapbox', 'Chart.js'],
    tech: ['Next.js', 'FastAPI', 'PyTorch (PINN)', 'Python', 'Vercel', 'Mapbox', 'Chart.js'],
    fde: ['PINN physics ML', 'Government AI deployment', 'Mission-critical reliability', 'Weather data integration', 'Thai government client'],
    accent: '#fb923c',
    url: 'https://rainmaking-mission-planning.vercel.app',
    embed: true,
    metrics: [
      { value: 'PINN ML', label: 'Physics-Informed Neural Net', labelTh: 'โมเดลโครงข่ายประสาทฟิสิกส์' },
      { value: 'DRMD', label: 'Royal Rainmaking Dept', labelTh: 'กรมฝนหลวงและการบินเกษตร' },
      { value: 'Go/No-Go', label: 'Mission Confidence AI', labelTh: 'วิเคราะห์ตัดสินใจขึ้นบิน' },
    ],
    highlights: [
      { k: 'Client', v: 'Royal Rainmaking Dept (DRMD)' },
      { k: 'ML type', v: 'Physics-Informed Neural Networks' },
      { k: 'Output', v: 'Go/No-go + confidence score' },
      { k: 'Deployments', v: '2 Vercel projects (rainmaking-mission + rainmaking-mission-planning)' },
      { k: 'Production URL', v: 'rainmaking-mission-planning.vercel.app' },
      { k: 'Live title', v: 'Intelligent Insights - PM 2.5 Dashboard' },
      { k: 'Season', v: 'Thailand rainy season operations' },
    ],
    caseStudy: {
      challenge: 'Optimizing cloud seeding aircraft flight paths and chemical seeding timing requires simulating complex atmospheric thermodynamics and cloud microphysics under strict daily mission constraints.',
      challengeTh: 'การวางแผนเส้นทางบินและเวลาโปรยสารเคมีทำฝนหลวง ต้องคำนวณอุณหพลศาสตร์และจุลฟิสิกส์เมฆที่ซับซ้อนภายใต้ข้อจำกัดของปฏิบัติการบินแต่ละวัน',
      architecture: 'FastAPI backend executing PyTorch Physics-Informed Neural Networks (PINN) integrated with interactive Next.js mission planning dashboards.',
      architectureTh: 'ระบบหลังบ้าน FastAPI ประมวลผลโมเดล PyTorch PINN เชื่อมต่อกับแดชบอร์ดวางแผนภารกิจ Next.js',
      solution: [
        'Embedded atmospheric physics equations directly into neural network loss functions (PINN).',
        'Delivered real-time mission planning UI giving pilots and flight directors definitive Go/No-Go recommendations.',
      ],
      solutionTh: [
        'ผสานสมการฟิสิกส์บรรยากาศเข้ากับฟังก์ชันคำนวณความผิดพลาดของโมเดล AI (PINN) โดยตรง',
        'พัฒนาหน้าจอวางแผนปฏิบัติการบินแบบเรียลไทม์ ให้คำแนะนำ Go/No-Go ที่ชัดเจนแก่นักบินและผู้บัญชาการ',
      ],
      impact: 'Maximizes rainfall yield across agricultural regions in Thailand during critical drought mitigation operations.',
      impactTh: 'เพิ่มปริมาณน้ำฝนในพื้นที่เกษตรกรรมทั่วประเทศในช่วงภารกิจบรรเทาภัยแล้งที่สำคัญ',
      highlights: [
        { title: 'PINN Physics AI', titleTh: 'AI เข้าใจสมการฟิสิกส์', desc: 'Ensures ML predictions strictly adhere to atmospheric fluid laws.', descTh: 'รับประกันว่าคำทำนายของโมเดลสอดคล้องกับกฎฟิสิกส์บรรยากาศจริง' },
      ]
    }
  },
  {
    id: 'gdas-disaster',
    name: 'GDAS AI Disaster Watch Dashboard',
    nameTh: 'แดชบอร์ด AI เฝ้าระวังภัยพิบัติ GDAS & ปภ.',
    category: 'Government & Disaster Management',
    categoryTh: 'ระบบจัดการภัยพิบัติและภาครัฐ',
    domain: 'gov',
    platform: ['Vercel'],
    status: 'production',
    verified: 'Vercel: gdas-ai-disaster-watch',
    headline: 'Real-time AI-powered disaster intelligence for Thai emergency management agencies',
    blurb: 'Real-time AI-powered disaster intelligence for Thai emergency management agencies.',
    blurbTh: 'ระบบวิเคราะห์ข้อมูลภัยพิบัติเรียลไทม์สำหรับกรมป้องกันและบรรเทาสาธารณภัย (DDPM)',
    description:
      "Multi-source disaster intelligence dashboard powered by Claude AI. Aggregates data from DDPM (Department of Disaster Prevention and Mitigation) and GDAS feeds, applying LLM-based event classification and priority scoring.",
    descriptionTh:
      'แดชบอร์ดอัจฉริยะเฝ้าระวังภัยพิบัติ ขับเคลื่อนด้วย Claude AI รวบรวมข้อมูลจาก ปภ. (DDPM) และ GDAS จัดหมวดหมู่เหตุการณ์และประเมินระดับความรุนแรงอัตโนมัติ',
    body:
      "Multi-source disaster intelligence dashboard powered by Claude AI. Aggregates data from DDPM (Department of Disaster Prevention and Mitigation) and GDAS feeds, applies LLM-based event classification and priority scoring, and surfaces actionable alerts to emergency operations centres.",
    tags: ['Claude API', 'Next.js', 'REST APIs', 'TailwindCSS'],
    tech: ['Next.js', 'Claude API', 'Vercel', 'REST APIs', 'TailwindCSS'],
    fde: ['Government AI deployment', 'LLM event classification', 'Multi-source data aggregation', 'Emergency management context'],
    accent: '#fb923c',
    url: 'https://gdas-ai-disaster-watch.vercel.app',
    embed: true,
    metrics: [
      { value: 'Claude AI', label: 'Real-Time Event NLP', labelTh: 'วิเคราะห์เหตุการณ์เรียลไทม์' },
      { value: 'DDPM Feeds', label: 'Disaster Prevention Dept', labelTh: 'เชื่อมโยงข้อมูล ปภ.' },
    ],
    highlights: [
      { k: 'Client', v: 'DDPM / GDAS' },
      { k: 'AI', v: 'Claude API event classification' },
      { k: 'Data sources', v: 'DDPM + GDAS disaster feeds' },
    ],
    caseStudy: {
      challenge: 'Aggregating noisy emergency reports across disaster response agencies during floods or storms.',
      challengeTh: 'การรวบรวมรายงานแจ้งเหตุฉุกเฉินที่มีข้อมูลสับสนจากหลายหน่วยงานในช่วงอุทกภัยหรือพายุ',
      architecture: 'Next.js edge dashboard with Claude API natural language classifiers evaluating severity.',
      architectureTh: 'แดชบอร์ด Next.js เชื่อมต่อ Claude API ประเมินระดับความรุนแรงและคัดกรองข่าวฉุกเฉิน',
      solution: ['Automated deduplication and classification of disaster incident reports.'],
      solutionTh: ['คัดกรองรายงานเหตุการณ์ซ้ำซ้อนและจัดลำดับความสำคัญอัตโนมัติ'],
      impact: 'Accelerates emergency response dispatch times for Thai disaster prevention units.',
      impactTh: 'ช่วยให้หน่วยบรรเทาสาธารณภัยส่งทีมช่วยเหลือประชาชนในพื้นที่ประสบภัยได้รวดเร็วยิ่งขึ้น',
      highlights: [{ title: 'LLM Classification', titleTh: 'คัดกรองเหตุการณ์ด้วย AI', desc: 'Real-time NLP priority scoring.', descTh: 'ประเมินความฉุกเฉินของเหตุการณ์ทันทีด้วย AI' }]
    }
  },
  {
    id: 'farmbook',
    name: 'FarmBook AgriAnalytics Dashboard',
    nameTh: 'แพลตฟอร์มเกษตรอัจฉริยะ FarmBook ร่วมกับ GISTDA',
    category: 'Government & Disaster Management',
    categoryTh: 'ระบบจัดการภัยพิบัติและภาครัฐ',
    domain: 'gov',
    platform: ['Vercel'],
    status: 'production',
    verified: 'Verified by fetching live app — AgriAnalytics Dashboard with GISTDA API + Azure AI + Mapbox + voice animation',
    headline: 'GISTDA-integrated Thai agriculture intelligence platform with voice AI and Azure ML',
    blurb: 'GISTDA-integrated Thai agriculture intelligence platform with voice AI and Azure ML.',
    blurbTh: 'แพลตฟอร์มวิเคราะห์เกษตรกรรมเชื่อมต่อดาวเทียม GISTDA และ Azure AI',
    description:
      "Agricultural field analytics platform that connects to GISTDA satellite geo-data APIs for field mapping. Azure AI handles crop analysis inference. Mapbox renders field polygons and zone analytics, with voice animation for field officers.",
    descriptionTh:
      'ระบบวิเคราะห์แปลงเกษตรกรรม เชื่อมต่อ API ภาพถ่ายดาวเทียม GISTDA ประมวลผลวิเคราะห์พืชผลด้วย Azure AI แสดงรูปแปลงบน Mapbox พร้อมระบบเสียงช่วยนำทางเจ้าหน้าที่ภาคสนาม',
    body:
      "Agricultural field analytics platform that connects to GISTDA (Geo-Informatics and Space Technology Development Agency) satellite geo-data APIs for field mapping. Azure AI handles crop analysis inference. Mapbox renders field polygons and zone analytics. Voice animation module assists field officers with spoken guidance.",
    tags: ['GISTDA API', 'Azure AI', 'Mapbox GL', 'React', 'Voice API'],
    tech: ['React', 'Vite', 'Mapbox GL', 'Azure AI', 'GISTDA API', 'Voice API', 'TailwindCSS', 'Vercel'],
    fde: ['GISTDA satellite data integration', 'Azure AI inference', 'Geospatial visualization', 'Thai gov agency integration'],
    accent: '#fb923c',
    url: 'https://farmbook-dashboard.vercel.app',
    embed: true,
    metrics: [
      { value: 'GISTDA API', label: 'Satellite Geo-Data', labelTh: 'ข้อมูลดาวเทียม GISTDA' },
      { value: 'Azure AI', label: 'Crop Analysis ML', labelTh: 'โมเดลวิเคราะห์พืชผล' },
      { value: 'Voice AI', label: 'Field Officer Assistant', labelTh: 'เสียงนำทางเจ้าหน้าที่' },
    ],
    highlights: [
      { k: 'Geo data', v: 'GISTDA satellite API (api-gateway.gistda.or.th)' },
      { k: 'AI inference', v: 'Azure AI models' },
      { k: 'Maps', v: 'Mapbox GL' },
      { k: 'Extra feature', v: 'Voice animation for field officers' },
      { k: 'Vercel project', v: 'farmbook-dashboard' },
      { k: 'Production URL', v: 'farmbook-dashboard.vercel.app' },
    ],
    caseStudy: {
      challenge: 'Bringing advanced satellite crop health monitoring and machine learning diagnostics to field extension officers working across rural Thai farmland.',
      challengeTh: 'การนำข้อมูลภาพถ่ายดาวเทียมวิเคราะห์สุขภาพพืชและ AI ไปให้เจ้าหน้าที่ส่งเสริมการเกษตรภาคสนามในต่างจังหวัดใช้งานได้จริงอย่างสะดวก',
      architecture: 'React + Vite application interfacing with GISTDA API Gateway and Azure AI inference engines.',
      architectureTh: 'แอปพลิเคชัน React + Vite เชื่อมต่อ GISTDA API Gateway และระบบประมวลผล Azure AI',
      solution: ['Integrated geospatial polygon zone mapping with automated voice guidance for farmers.'],
      solutionTh: ['วาดพิกัดรูปแปลงเกษตรบนแผนที่ดาวเทียม พร้อมเสียงบรรยายคำแนะนำที่เข้าใจง่ายสำหรับเกษตรกร'],
      impact: 'Directly supports national precision agriculture initiatives and boosts harvest productivity.',
      impactTh: 'สนับสนุนนโยบายเกษตรแม่นยำแห่งชาติ และเพิ่มผลผลิตทางการเกษตรอย่างยั่งยืน',
      highlights: [{ title: 'GISTDA Integration', titleTh: 'เชื่อมตรงดาวเทียม GISTDA', desc: 'Direct satellite API geospatial mapping.', descTh: 'ดึงพิกัดดาวเทียมวิเคราะห์พื้นที่เกษตรแม่นยำ' }]
    }
  },

  /* ── BIM ── */
  {
    id: 'autonomous-bim',
    name: 'Autonomous BIM AI Agent (CPAC)',
    nameTh: 'เอเจนต์ AI ก่อสร้างอัตโนมัติ CPAC Digital Construction',
    category: 'Construction, BIM & Carbon',
    categoryTh: 'วิศวกรรมก่อสร้าง BIM และคำนวณคาร์บอน',
    domain: 'bim',
    platform: ['Vercel'],
    status: 'production',
    verified: 'Memory + Vercel: autonomous-bim-agent',
    headline: 'LangGraph multi-agent BIM workspace — Generative Design + Revit→BOQ translator for CPAC',
    blurb: 'LangGraph multi-agent BIM workspace — Generative Design + Revit→BOQ translator for CPAC.',
    blurbTh: 'ระบบ LangGraph Multi-Agent ออกแบบผังอัตโนมัติและถอดรหัส Revit สู่ BOQ สำหรับ CPAC',
    description:
      "Enterprise AI workspace for CPAC Digital Construction built on LangGraph with MCP tool integration and LangFuse V3 observability. POC1 delivers AI Generative Design for retail layout optimization. POC2 maps Revit/IFC to กรมบัญชีกลาง budget codes.",
    descriptionTh:
      'ระบบ AI สำหรับ CPAC Digital Construction พัฒนาบน LangGraph ร่วมกับ MCP และตรวจสอบการทำงานด้วย LangFuse V3 POC1 ช่วยออกแบบผังพื้นที่ร้านค้าอัตโนมัติ POC2 ถอดแบบ Revit/IFC เป็นรหัสงบประมาณกรมบัญชีกลาง',
    body:
      "Enterprise AI workspace for CPAC Digital Construction built on LangGraph with MCP tool integration and LangFuse V3 observability. POC1 delivers AI Generative Design for retail layout optimisation. POC2 is a Revit-to-BOQ AI Data Translator that maps IFC elements to กรมบัญชีกลาง government budget codes with full compliance checking.",
    tags: ['LangGraph', 'MCP', 'LangFuse V3', 'Revit API', 'IFC / IfcOpenShell', 'Next.js'],
    tech: ['LangGraph', 'FastAPI', 'Next.js', 'MCP', 'LangFuse V3', 'IFC', 'IfcOpenShell', 'Revit API', 'Python', 'TypeScript', 'Vercel'],
    fde: ['LangGraph multi-agent', 'BIM/IFC pipeline', 'Thai government compliance', 'Enterprise AI deployment', 'LLM observability (LangFuse)', 'MCP orchestration'],
    accent: '#f97316',
    url: 'https://autonomous-bim-agent.vercel.app',
    embed: true,
    metrics: [
      { value: 'LangGraph', label: 'Multi-Agent BIM Core', labelTh: 'ระบบเอเจนต์วิศวกรรมก่อสร้าง' },
      { value: 'Revit → BOQ', label: 'Gov Budget Code Mapping', labelTh: 'แปลงรหัสงบประมาณกรมบัญชีกลาง' },
      { value: 'LangFuse V3', label: 'LLM Tracing & Observability', labelTh: 'ตรวจสอบการทำงาน AI ครบวงจร' },
    ],
    highlights: [
      { k: 'Client', v: 'CPAC Digital Construction' },
      { k: 'POC 1', v: 'AI Generative Design — retail layout' },
      { k: 'POC 2', v: 'Revit → BOQ AI translator (กรมบัญชีกลาง)' },
      { k: 'Observability', v: 'LangFuse V3' },
      { k: 'Agent framework', v: 'LangGraph' },
      { k: 'Tool protocol', v: 'MCP' },
    ],
    caseStudy: {
      challenge: 'Translating complex architectural 3D Revit/IFC models into accurate government Bill of Quantities (BOQ) conforming strictly to กรมบัญชีกลาง standards.',
      challengeTh: 'การถอดปริมาณงานและวัสดุจากแบบจำลอง 3 มิติ Revit/IFC ให้ตรงตามราคากลางและรหัสงบประมาณของกรมบัญชีกลางโดยอัตโนมัติ',
      architecture: 'Hierarchical LangGraph multi-agent workflow connected to Model Context Protocol (MCP) servers and monitored via LangFuse V3.',
      architectureTh: 'ระบบ LangGraph Multi-Agent เชื่อมต่อเซิร์ฟเวอร์ MCP และติดตามทุกขั้นตอนด้วย LangFuse V3',
      solution: ['Automated parsing of IFC element properties into Thai government budget classification codes.'],
      solutionTh: ['อ่านคุณสมบัติชิ้นส่วนอาคาร IFC และจัดเข้าหมวดหมู่รหัสราคากลางงานก่อสร้างภาครัฐอัตโนมัติ'],
      impact: 'Reduces manual quantity estimation time from weeks to hours for CPAC engineers.',
      impactTh: 'ลดระยะเวลาประเมินและถอดแบบก่อสร้างของวิศวกร CPAC จากหลายสัปดาห์เหลือเพียงไม่กี่ชั่วโมง',
      highlights: [{ title: 'Revit to BOQ AI', titleTh: 'แปลงแบบ Revit เป็น BOQ', desc: 'Direct mapping to กรมบัญชีกลาง budget codes.', descTh: 'ถอดรหัสปริมาณงานเทียบราคากลางภาครัฐแม่นยำ' }]
    }
  },
  {
    id: 'carbonscope',
    name: 'CarbonScope — Embodied Carbon Intelligence',
    nameTh: 'แพลตฟอร์มวิเคราะห์คาร์บอนสะสมในอาคาร CarbonScope',
    category: 'Construction, BIM & Carbon',
    categoryTh: 'วิศวกรรมก่อสร้าง BIM และคำนวณคาร์บอน',
    domain: 'bim',
    platform: ['Cloudflare'],
    status: 'production',
    verified: 'Cloudflare workers: carbonscope-backend, carbonscopes-frontend, carbonscope-mcp',
    headline: 'EN 15978-aligned embodied carbon calculation platform for Thai construction',
    blurb: 'EN 15978-aligned embodied carbon calculation platform for Thai construction.',
    blurbTh: 'แพลตฟอร์มคำนวณคาร์บอนสะสมในงานก่อสร้างตามมาตรฐาน EN 15978',
    description:
      "Full-stack embodied carbon intelligence platform calculating lifecycle carbon across stages A1–C4 per EN 15978. A Cloudflare MCP server exposes carbon data as LLM tools, specifically targeting the Thai construction sector.",
    descriptionTh:
      'ระบบวิเคราะห์คาร์บอนตลอดอายุขัยอาคารตั้งแต่ระยะ A1–C4 ตามมาตรฐานยุโรป EN 15978 พร้อมเซิร์ฟเวอร์ Cloudflare MCP เชื่อมต่อข้อมูลวัสดุก่อสร้างไทยกับ AI',
    body:
      "Full-stack embodied carbon intelligence platform with a distinctive brand identity (tagline: 'Embodied Carbon Intelligence', 'Strata' SVG logo, cyan/slate design system). The backend calculates lifecycle carbon across stages A1–C4 per EN 15978. A Cloudflare MCP server exposes carbon data as LLM tools. Targets Thai construction market with local material carbon factor library.",
    tags: ['Cloudflare Workers', 'Cloudflare D1', 'MCP Protocol', 'EN 15978', 'TypeScript'],
    tech: ['Cloudflare Workers', 'Cloudflare D1', 'React', 'TypeScript', 'MCP', 'Hono.js'],
    fde: ['Embodied carbon domain', 'EN 15978 compliance', 'Cloudflare MCP server', 'Edge-first architecture', 'Brand + product design'],
    accent: '#f97316',
    url: 'https://carbonscopes-frontend-production.workers.dev',
    embed: false,
    metrics: [
      { value: 'EN 15978', label: 'Lifecycle Standard', labelTh: 'มาตรฐานคาร์บอนสากล' },
      { value: 'Stages A1-C4', label: 'Full Building Lifecycle', labelTh: 'วิเคราะห์ตลอดอายุขัยอาคาร' },
      { value: 'CF MCP Server', label: 'LLM Tool Exposure', labelTh: 'เชื่อมต่อเครื่องมือกับ AI' },
    ],
    highlights: [
      { k: 'Standard', v: 'EN 15978 lifecycle' },
      { k: 'Stages covered', v: 'A1–C4' },
      { k: 'Brand', v: "Strata logo, 'Embodied Carbon Intelligence'" },
      { k: 'MCP server', v: 'carbonscope-mcp on CF Workers' },
      { k: 'Deployments', v: '4 CF Workers' },
      { k: 'Market', v: 'Thai construction sector' },
    ],
    caseStudy: {
      challenge: 'Calculating precise embodied carbon footprints for large construction projects adhering strictly to European standard EN 15978 across stages A1 to C4.',
      challengeTh: 'การคำนวณคาร์บอนสะสมในอาคารขนาดใหญ่ให้ถูกต้องตามมาตรฐานยุโรป EN 15978 ตั้งแต่ขั้นตอนสกัดวัสดุจนถึงรื้อถอนอาคาร (A1-C4)',
      architecture: '4 dedicated Cloudflare Workers including carbonscope-mcp exposing carbon calculation endpoints to AI agents.',
      architectureTh: '4 Cloudflare Workers ทำงานร่วมกัน รวมถึง carbonscope-mcp ให้ AI เข้าถึงสูตรคำนวณคาร์บอน',
      solution: ['Built comprehensive Thai construction material carbon emission factor library.'],
      solutionTh: ['รวบรวมและจัดสร้างฐานข้อมูลค่าสัมประสิทธิ์การปล่อยคาร์บอนของวัสดุก่อสร้างในประเทศไทย'],
      impact: 'Enables Thai real estate developers to achieve net-zero building certifications efficiently.',
      impactTh: 'สนับสนุนผู้พัฒนาอสังหาริมทรัพย์ไทยในการรับรองอาคารคาร์บอนต่ำและ Net-Zero',
      highlights: [{ title: 'EN 15978 Compliance', titleTh: 'ตรงมาตรฐาน EN 15978', desc: 'Full lifecycle Stages A1 through C4.', descTh: 'คำนวณคาร์บอนครบทุกระยะการก่อสร้าง' }]
    }
  },
  {
    id: 'wood-erp',
    name: 'Panel Plus — Thai Wood Sample ERP',
    nameTh: 'ระบบจัดการต้นทุนไม้ตัวอย่าง Panel Plus ERP',
    category: 'Construction, BIM & Carbon',
    categoryTh: 'วิศวกรรมก่อสร้าง BIM และคำนวณคาร์บอน',
    domain: 'bim',
    platform: ['Vercel'],
    status: 'production',
    verified: 'Notion: PRD Panel Plus AI-Powered Wood Sample Management System',
    headline: 'Thai-language wood sample cost management ERP with full workflow engine',
    blurb: 'Thai-language wood sample cost management ERP with full workflow engine.',
    blurbTh: 'ระบบ ERP ภาษาไทยสำหรับบริหารต้นทุนและสต็อกไม้ตัวอย่างโรงงานอุตสาหกรรม',
    description:
      "Enterprise resource planning system for a Thai wood manufacturer: ระบบจัดการต้นทุนไม้ตัวอย่าง. Covers sample request, production planning, inventory tracking, order delivery, and multi-level approvals.",
    descriptionTh:
      'ระบบ ERP บริหารต้นทุนไม้ตัวอย่างสำหรับผู้ผลิตแผ่นไม้อุตสาหกรรม ครอบคลุมตั้งแต่การขอตัวอย่าง วางแผนผลิต ติดตามสต็อก จัดส่ง และอนุมัติตามขั้นตอน',
    body:
      "Enterprise resource planning system for a Thai wood manufacturer: ระบบจัดการต้นทุนไม้ตัวอย่าง. Covers the full sample lifecycle from request through production planning, inventory tracking, order delivery, cost control, and multi-level approvals. A configurable workflow engine handles business rules without code changes.",
    tags: ['Next.js', 'tRPC', 'PostgreSQL', 'TailwindCSS', 'TypeScript'],
    tech: ['Next.js', 'tRPC', 'PostgreSQL', 'TypeScript', 'TailwindCSS', 'Vercel'],
    fde: ['Enterprise ERP deployment', 'Thai-language UI', 'Workflow engine design', 'Manufacturing domain'],
    accent: '#f97316',
    url: 'https://panel-plus-sample-track.vercel.app',
    embed: true,
    metrics: [
      { value: 'Full ERP', label: 'Sample Lifecycle Engine', labelTh: 'บริหารวงจรไม้ตัวอย่าง' },
      { value: 'Thai UI', label: '100% Native Language', labelTh: 'รองรับภาษาไทยเต็มรูปแบบ' },
    ],
    highlights: [
      { k: 'PRD source', v: 'Notion: Panel Plus AI-Powered Wood Sample Management System' },
      { k: 'Modules', v: 'Sample Requests, Cost Control, Planning, Inventory, Orders, Approvals, Workflow Engine' },
      { k: 'Language', v: 'Thai (ภาษาไทย)' },
      { k: 'Industry', v: 'Thai wood / materials manufacturing — A4/A5 sample catalog monitoring' },
      { k: 'GitHub repos', v: 'khiwniti/PanelPlus-SampleTrack + panel-plus-wood-sample (source)' },
      { k: 'Vercel project', v: 'panel-plus-sample-track (auto-deployed from GitHub)' },
      { k: 'Production URL', v: 'panel-plus-sample-track.vercel.app' },
    ],
    caseStudy: {
      challenge: 'Managing thousands of customized wood and laminate sample requests across factory floor operations and corporate sales teams.',
      challengeTh: 'การจัดการคำขอแผ่นไม้และลามิเนตตัวอย่างนับพันรายการระหว่างโรงงานผลิตและทีมขายของบริษัท',
      architecture: 'Next.js application with full type-safe tRPC backends and PostgreSQL relational workflow schemas.',
      architectureTh: 'แอปพลิเคชัน Next.js ร่วมกับ tRPC และฐานข้อมูล PostgreSQL ควบคุมสถานะงาน',
      solution: ['Created a dynamic workflow engine allowing managers to configure approval rules without code.'],
      solutionTh: ['พัฒนาระบบ Workflow Engine ให้ผู้จัดการปรับเงื่อนไขการอนุมัติงานได้เองโดยไม่ต้องเขียนโค้ดเพิ่ม'],
      impact: 'Eliminated sample stock discrepancies and expedited sales delivery cycles.',
      impactTh: 'ขจัดปัญหาของตัวอย่างสูญหาย และเร่งความเร็วในการจัดส่งตัวอย่างให้ลูกค้าเพื่อปิดการขาย',
      highlights: [{ title: 'Configurable Workflow', titleTh: 'ระบบอนุมัติยืดหยุ่น', desc: 'No-code business rule modification.', descTh: 'ปรับขั้นตอนอนุมัติงานได้ตามความต้องการ' }]
    }
  },

  /* ── BIM: BuildAI / BIM Model Companion (FLAGSHIP) ── */
  {
    id: 'bim-model-companion',
    name: 'BuildAI — AI-Powered BIM Viewer (ASEA / KEO / KOHLER)',
    nameTh: 'BuildAI — โปรแกรมดูโมเดล BIM อัจฉริยะ (ASEA / KEO / KOHLER)',
    category: 'Construction, BIM & Carbon',
    categoryTh: 'วิศวกรรมก่อสร้าง BIM และคำนวณคาร์บอน',
    domain: 'bim',
    platform: ['Vercel'],
    status: 'production',
    verified: 'Live at https://bim-model-companion.vercel.app — HTTP 200, title "BuildAI — AI-Powered BIM Viewer for ASEA/KEO/KOHLER". GitHub: khiwniti/bim-model-companion (TypeScript).',
    headline: 'AI-assisted 3D BIM model viewer — natural-language queries on ASEA / KEO / KOHLER project geometry',
    blurb: 'AI-assisted 3D BIM model viewer — natural-language queries on ASEA / KEO / KOHLER project geometry.',
    blurbTh: 'ระบบดูโมเดล BIM 3 มิติที่ดีเมือบให้ผู้ใช้ถามคำถามด้วยภาษาธรรมชาติสำหรับโครงการ ASEA / KEO / KOHLER',
    description:
      "AI-augmented 3D BIM model viewer — type a question, see the affected elements light up inside the model. Built for engineering teams on ASEAN infrastructure projects (hydropower, industrial estates, hospitality).",
    descriptionTh:
      'ระบบดูแบบ 3 มิติที่ใช้ AI ช่วยให้ทีมงานวิศวกรรมพิมพ์คำถามเป็นภาษาธรรมชาติแล้วเห็นชิ้นส่วนที่เกี่ยวข้องไฮไลต์ขึ้นมาทันที — ออกแบบมาเพื่อโครงการโครงสร้างพื้นฐานในอาเซียน',
    body:
      "AI-augmented 3D BIM model viewer built for the ASEAN precast / MEP market (Kohler Co., KEO International Consultants, Asea Manufacturing). Type any engineering question in plain English or Thai; the system returns the affected model components with their IFC properties, cost band, and clash status.",
    tags: ['Three.js', 'IFC / BIM', 'React', 'AI Query', 'TypeScript'],
    tech: ['React', 'TypeScript', 'Three.js', 'Vite', 'Vercel'],
    fde: ['BIM model query UX', 'Natural-language → IFC resolution', 'ASEAN engineering team deployment', 'AI-assisted design review'],
    accent: '#f97316',
    url: 'https://bim-model-companion.vercel.app',
    embed: true,
    metrics: [
      { value: '3 stacks', label: 'ASEA • KEO • KOHLER', labelTh: 'ลูกค้าองค์กร 3 เจ้า' },
      { value: 'BIM', label: 'AI Model Viewer', labelTh: 'ดูโมเดล 3 มิติด้วย AI' },
      { value: 'NL query', label: 'Plain language → elements', labelTh: 'ถามภาษาธรรมชาติได้' },
    ],
    highlights: [
      { k: 'Stacks served', v: 'KOHLER Co. · KEO Consultants · Asea Manufacturing' },
      { k: 'AI UX', v: 'Natural-language → BIM element highlight' },
      { k: 'Output', v: 'IFC properties + cost band + clash status' },
      { k: 'Vercel project', v: 'bim-model-companion (TypeScript)' },
      { k: 'Production URL', v: 'bim-model-companion.vercel.app' },
    ],
    caseStudy: {
      challenge: 'Reviewing 3D BIM models across hundreds of precast / MEP elements previously required either deep IFC tooling knowledge or back-and-forth with the lead engineer.',
      challengeTh: 'การทบทวนโมเดล BIM ของโครงการก่อสร้างขนาดใหญ่ที่มีชิ้นส่วน IFC หลายร้อยชิ้น เดิมต้องใช้ความรู้ IFC เฉพาะทางหรือถามวิศวกรหลักทีละจุด',
      architecture: 'Three.js WebGL viewer with an AI query layer that maps natural-language intent to IFC element selection.',
      architectureTh: 'ตัวแสดงผล WebGL ด้วย Three.js พร้อมเลเยอร์ AI ที่แมปคำถามภาษาธรรมชาติไปยังชิ้นส่วน IFC ที่เกี่ยวข้อง',
      solution: ['Direct natural-language queries such as "load-bearing walls in zone B" highlight matching elements in the live 3D scene.'],
      solutionTh: ['รองรับคำถามตรง เช่น "กำแพงรับน้ำหนักโซน B" แล้วไฮไลต์ชิ้นส่วนที่ตรงกันในฉาก 3 มิติทันที'],
      impact: 'Cuts model review meetings from hours to minutes for ASEAN engineering teams.',
      impactTh: 'ลดเวลาประชุมทบทวนโมเดลจากหลายชั่วโมงเหลือไม่กี่นาทีสำหรับทีมวิศวกรรมในอาเซียน',
      highlights: [{ title: 'NL → BIM AI', titleTh: 'AI แมปภาษาไปยังโมเดล', desc: 'Plain-language queries resolve to live IFC elements.', descTh: 'พิมพ์คำถามแล้ว AI ชี้ชิ้นส่วน IFC ที่เกี่ยวข้องทันที' }]
    }
  },

  /* ── WEATHER ── */
  {
    id: 'tswfp',
    name: 'Thai Smart Weather Forecast Platform (TSWFP)',
    nameTh: 'แพลตฟอร์มพยากรณ์อากาศอัจฉริยะแห่งชาติ TSWFP',
    category: 'Thai Smart Weather Platform',
    categoryTh: 'แพลตฟอร์มพยากรณ์อากาศอัจฉริยะไทย',
    domain: 'weather',
    platform: ['Cloudflare', 'Vercel'],
    status: 'production',
    verified: 'Cloudflare account 1 Workers list — 9 tswfp-* workers confirmed',
    headline: '9-worker Cloudflare edge platform with FourCastNet ML inference and full OTel observability',
    blurb: '9-worker Cloudflare edge platform with FourCastNet ML inference and full OTel observability.',
    blurbTh: 'ระบบ 9 Cloudflare Workers รันโมเดล FourCastNet/GraphCast พร้อมตรวจวัด OTel ครบวงจร',
    description:
      "National-grade weather intelligence platform built entirely on Cloudflare's edge. Runs FourCastNet and GraphCast ML inference directly in Workers AI, with an OpenTelemetry distributed tracing mesh across 9 dedicated Workers.",
    descriptionTh:
      'แพลตฟอร์มพยากรณ์อากาศระดับประเทศบน Edge คลาวด์ของ Cloudflare ประมวลผลโมเดล FourCastNet และ GraphCast ผ่าน Workers AI พร้อมระบบตรวจสอบ OpenTelemetry ครอบคลุม 9 ไมโครเซอร์วิส',
    body:
      "National-grade weather intelligence platform built entirely on Cloudflare's edge. Runs FourCastNet and GraphCast ML inference directly in Workers AI. A complete observability mesh with distributed tracing, real-time analytics, rate limiting, JWT auth, and multi-channel alert dispatch — all as separate dedicated Workers. GCP migration plan also documented in Notion.",
    tags: ['Cloudflare Workers AI', 'FourCastNet', 'GraphCast', 'OpenTelemetry', 'Cloudflare D1'],
    tech: ['Cloudflare Workers', 'Workers AI', 'FourCastNet', 'GraphCast', 'TypeScript', 'OpenTelemetry', 'Cloudflare D1', 'Cloudflare KV'],
    fde: ['AI observability stack', 'Edge ML inference', 'Distributed microservices', 'Weather domain expertise', 'Cloudflare-first architecture'],
    accent: '#22d3ee',
    url: 'https://tswfp-forecast-api-production.workers.dev',
    embed: false,
    metrics: [
      { value: '9 Workers', label: 'Edge Microservice Mesh', labelTh: 'เครือข่าย 9 ไมโครเซอร์วิส' },
      { value: 'FourCastNet', label: 'AI Weather Prediction', labelTh: 'โมเดลพยากรณ์อากาศ AI' },
      { value: 'OpenTelemetry', label: 'Distributed Tracing', labelTh: 'ตรวจวัดการทำงานทุกโหนด' },
    ],
    highlights: [
      { k: 'ML models', v: 'FourCastNet + GraphCast' },
      { k: 'Total CF Workers', v: '9 dedicated workers' },
      { k: 'Tracing', v: 'OTel-compatible distributed tracing' },
      { k: 'Auth', v: 'JWT gateway worker' },
      { k: 'Alerts', v: 'Multi-channel alert dispatch worker' },
      { k: 'Analytics', v: 'Real-time analytics pipeline worker' },
    ],
    arch: [
      { name: 'tswfp-edge-api', deploy: 'CF Workers', detail: 'Primary edge API gateway — all inbound traffic entry point' },
      { name: 'tswfp-ml-inference', deploy: 'CF Workers AI', detail: 'FourCastNet / GraphCast inference at Cloudflare edge' },
      { name: 'tswfp-distributed-tracing', deploy: 'CF Workers', detail: 'OTel-compatible distributed tracing across all workers' },
      { name: 'tswfp-analytics', deploy: 'CF Workers', detail: 'Real-time analytics pipeline for weather event data' },
      { name: 'tswfp-alert-system', deploy: 'CF Workers', detail: 'Threshold-based alert generation + multi-channel dispatch' },
      { name: 'tswfp-rate-limit', deploy: 'CF Workers', detail: 'API rate limiting + quota management across the mesh' },
      { name: 'tswfp-api-auth', deploy: 'CF Workers', detail: 'JWT validation gateway' },
      { name: 'tswfp-api-production', deploy: 'CF Workers', detail: 'Production API — load-balanced stable deploy' },
      { name: 'tswfp-forecast-api-production', deploy: 'CF Workers', detail: 'Forecast API production — meteorological data pipeline' },
    ],
    caseStudy: {
      challenge: 'Executing heavy meteorological global forecasting models (FourCastNet and GraphCast) with ultra-low latency across distributed Southeast Asian regions.',
      challengeTh: 'การรันโมเดลพยากรณ์อากาศสภาพภูมิอากาศโลก (FourCastNet และ GraphCast) ให้มีความหน่วงต่ำสุดและครอบคลุมทั่วเอเชียตะวันออกเฉียงใต้',
      architecture: 'Distributed 9-worker microservice mesh running on Cloudflare Workers AI with OpenTelemetry tracing.',
      architectureTh: 'สถาปัตยกรรมกระจายตัว 9 Cloudflare Workers ประมวลผล AI ที่ Edge พร้อมติดตามการทำงานด้วย OTel',
      solution: ['Decoupled auth, rate limiting, inference, and alert dispatch into dedicated independent worker nodes.'],
      solutionTh: ['แยกการทำงานระบบยืนยันตัวตน ควบคุมปริมาณ รันโมเดล และแจ้งเตือน ออกเป็น Worker อิสระ 9 โหนด'],
      impact: 'Delivers high-precision national weather intelligence with zero single points of failure.',
      impactTh: 'ให้บริการข้อมูลสภาพอากาศระดับประเทศความแม่นยำสูง โดยปราศจากจุดล้มเหลวเชิงเดี่ยว (Zero SPOF)',
      highlights: [{ title: 'Edge Workers AI', titleTh: 'รัน AI ที่ Edge Cloud', desc: 'Direct FourCastNet inference at network edge.', descTh: 'ประมวลผลสภาพอากาศระดับโลกบน Edge Serverless' }]
    }
  },

  /* ── FNB ── */
  {
    id: 'bitebase',
    name: 'BiteBase Restaurant Intelligence Platform',
    nameTh: 'แพลตฟอร์มวิเคราะห์ธุรกิจร้านอาหาร BiteBase SaaS',
    category: 'BiteBase F&B Intelligence',
    categoryTh: 'แพลตฟอร์มวิเคราะห์ธุรกิจร้านอาหาร BiteBase',
    domain: 'fnb',
    platform: ['Vercel', 'Cloudflare'],
    status: 'production',
    verified: 'Live preview at https://bitebase-ai-agent-chat-prototype.vercel.app — HTTP 200, title "BiteBase AI - Market Intelligence". Production also deployed across Vercel + 2 Cloudflare accounts (9 total deployments).',
    headline: 'Multi-tenant restaurant AI SaaS with LangGraph agents across 2 Cloudflare accounts',
    blurb: 'Multi-tenant restaurant AI SaaS with LangGraph agents across 2 Cloudflare accounts.',
    blurbTh: 'ระบบ SaaS วิเคราะห์ร้านอาหารร่วมกับ LangGraph ทำงานบน 2 คลัสเตอร์ Cloudflare',
    description:
      "Full-stack restaurant intelligence platform for the F&B sector. Covers location intelligence, competitor analysis, and menu optimization through a LangGraph multi-agent backend spanning 2 Cloudflare accounts.",
    descriptionTh:
      'แพลตฟอร์มวิเคราะห์ธุรกิจร้านอาหารและคาเฟ่ครบวงจร วิเคราะห์ทำเล คู่แข่ง และปรับโครงสร้างเมนูด้วยระบบ LangGraph Multi-Agent ประมวลผลบน 2 บัญชี Cloudflare',
    body:
      "Full-stack restaurant intelligence platform for the F&B sector. The flagship SaaS product covers location intelligence, competitor analysis, menu optimisation, and customer insight through a LangGraph multi-agent backend. Two separate Cloudflare accounts handle production routing — account 1 for the primary backend, account 2 (Libralytics) for intelligence and Ollama-powered local LLM features.",
    tags: ['LangGraph', 'Cloudflare Workers', 'Ollama', 'Claude API', 'MCP Server', 'Next.js'],
    tech: ['Next.js', 'LangGraph', 'Cloudflare Workers', 'Cloudflare D1', 'Ollama', 'Claude API', 'TypeScript', 'Vercel', 'MCP'],
    fde: ['Multi-tenant SaaS architecture', 'LangGraph agent deployment', 'Dual-account edge infrastructure', 'F&B domain expertise', 'MCP server design'],
    accent: '#10b981',
    url: 'https://bitebase-ai-agent-chat-prototype.vercel.app',
    embed: true,
    metrics: [
      { value: '9 Deploys', label: 'Dual-Account Cloudflare', labelTh: '9 โปรเจกต์บน 2 บัญชีคลาวด์' },
      { value: 'LangGraph', label: 'Multi-Agent SaaS Core', labelTh: 'ระบบเอเจนต์วิเคราะห์ธุรกิจ' },
      { value: 'Ollama Proxy', label: 'Private Local LLM Inference', labelTh: 'ประมวลผล LLM ส่วนตัว' },
    ],
    highlights: [
      { k: 'Total deployments', v: '9 (Vercel + 2 CF accounts)' },
      { k: 'Account 1 (primary)', v: 'bitebase-backend-prod, bitebase-ai-agents-production' },
      { k: 'Account 2 (Libralytics)', v: 'bitebase-intelligence, bitebase-intelligence-production, bitebase-ollama-proxy' },
      { k: 'MCP server', v: 'mcp-server-bitebase-app' },
      { k: 'Local LLM', v: 'Ollama proxy for private inference' },
      { k: 'Agent framework', v: 'LangGraph' },
    ],
    caseStudy: {
      challenge: 'Providing food and beverage businesses with automated demographic analysis and dynamic competitor menu benchmarking across multiple retail branches.',
      challengeTh: 'การให้ข้อมูลทำเลเชิงลึกและวิเคราะห์กลยุทธ์ราคาคู่แข่งอัตโนมัติแก่ร้านอาหารที่มีหลายสาขา',
      architecture: 'Dual Cloudflare account routing separating core SaaS operations from high-load LangGraph intelligence workers.',
      architectureTh: 'จัดการโหลดบน 2 บัญชี Cloudflare แยกการทำงานแอปหลักออกจากเอเจนต์ LangGraph ที่กินทรัพยากรสูง',
      solution: ['Integrated Ollama local LLM proxy for private, confidential restaurant sales data processing.'],
      solutionTh: ['เชื่อมต่อระบบ Ollama สำหรับประมวลผลข้อมูลยอดขายร้านอาหารที่เป็นความลับอย่างปลอดภัย'],
      impact: 'Empowers F&B entrepreneurs to open winning retail locations with AI-validated confidence.',
      impactTh: 'ช่วยให้ผู้ประกอบการ F&B เปิดสาขาใหม่และปรับราคาเมนูได้อย่างมั่นใจด้วยข้อมูล AI',
      highlights: [{ title: 'Multi-Tenant SaaS', titleTh: 'รองรับหลายสาขาในระบบเดียว', desc: 'Secure data isolation per F&B client.', descTh: 'แยกรหัสข้อมูลปลอดภัยสำหรับลูกค้าแต่ละแบรนด์' }]
    }
  },

  /* ── INFRA ── */
  {
    id: 'nim-proxy',
    name: 'NVIDIA NIM → Anthropic SSE Proxy',
    nameTh: 'เกตเวย์แปลงโปรโตคอล NVIDIA NIM เป็น Anthropic SSE (29ms)',
    category: 'AI Infrastructure & Dev Tools',
    categoryTh: 'โครงสร้างพื้นฐาน AI และเครื่องมือนักพัฒนา',
    domain: 'infra',
    platform: ['Cloudflare'],
    status: 'production',
    verified: 'Memory: NVIDIA proxy confirmed working 29ms TTFT — integrate.api.nvidia.com → Anthropic SSE translation',
    headline: '29ms TTFT Cloudflare Worker translating NIM API calls to Anthropic SSE format',
    blurb: '29ms TTFT Cloudflare Worker translating NIM API calls to Anthropic SSE format.',
    blurbTh: 'Cloudflare Worker แปลงสตรีมมิ่ง API ความเร็วสูง 29ms TTFT ใช้ Claude Code ฟรี',
    description:
      "A Cloudflare Worker protocol translator between NVIDIA NIM API format and Anthropic Server-Sent Events (SSE) streaming format. Confirmed working at 29ms TTFT, enabling Claude to be used inside enterprise VSCode toolchains with zero extra infra cost.",
    descriptionTh:
      'Cloudflare Worker ทำหน้าที่แปลงโปรโตคอลระหว่าง NVIDIA NIM API และ Anthropic SSE ด้วยความเร็วเริ่มต้นเพียง 29ms ทำให้ใช้ Claude Code ร่วมกับเครื่องมือองค์กรได้โดยไม่มีค่าใช้จ่ายเซิร์ฟเวอร์เพิ่ม',
    body:
      "A Cloudflare Worker that acts as a real-time protocol translator between NVIDIA's NIM API format and Anthropic's Server-Sent Events (SSE) streaming format. Enables Claude to be used inside any toolchain that speaks the NIM API — including enterprise VSCode integrations and Claude Code. Zero new servers, no additional infrastructure cost.",
    tags: ['Cloudflare Workers', 'Server-Sent Events', 'NVIDIA NIM API', 'Anthropic API', '29ms TTFT'],
    tech: ['Cloudflare Workers', 'TypeScript', 'Server-Sent Events', 'NVIDIA NIM API', 'Anthropic API', 'Hono.js'],
    fde: ['LLM proxy engineering', 'Protocol translation', 'Edge-first infrastructure', 'Claude Code integration'],
    accent: '#8b5cf6',
    url: 'https://workers.cloudflare.com',
    embed: false,
    metrics: [
      { value: '29ms TTFT', label: 'Ultra-Fast Time to Token', labelTh: 'ตอบสนองโทเคนแรกใน 29ms' },
      { value: '$0 Cost', label: 'Serverless Edge Free Tier', labelTh: 'ไม่มีค่าใช้จ่ายเซิร์ฟเวอร์เพิ่ม' },
      { value: 'NIM → SSE', label: 'Real-Time Translation', labelTh: 'แปลงโปรโตคอลสตรีมมิ่งทันที' },
    ],
    highlights: [
      { k: 'TTFT', v: '29ms (confirmed working)' },
      { k: 'Protocol', v: 'NVIDIA NIM API → Anthropic SSE' },
      { k: 'Infra cost', v: '$0 additional (CF Workers free tier)' },
      { k: 'Use case', v: 'Claude Code + enterprise VSCode toolchains' },
      { k: 'Variants', v: 'nim-proxy + nvd-nim-proxy + cloud-claw' },
    ],
    caseStudy: {
      challenge: 'Using Anthropic Claude models inside strict enterprise development toolchains requiring NVIDIA NIM API formatting without incurring latency penalties.',
      challengeTh: 'การนำ Claude มาใช้ในเครื่องมือพัฒนาระดับองค์กรที่รองรับเฉพาะรูปแบบ NVIDIA NIM API โดยไม่ให้เกิดความล่าช้าในการสตรีมมิ่ง',
      architecture: 'Lightweight Cloudflare Worker executing streaming Server-Sent Events (SSE) transformations on the fly.',
      architectureTh: 'Cloudflare Worker ขนาดเบาทำหน้าที่แปลงข้อมูลสตรีมมิ่ง Server-Sent Events (SSE) แบบทันทีทันใด',
      solution: ['Achieved blistering 29ms Time-To-First-Token (TTFT) performance.'],
      solutionTh: ['ทำความเร็วตอบสนองโทเคนแรก (TTFT) ได้รวดเร็วสุดขีดเพียง 29 มิลลิวินาที'],
      impact: 'Enables entire developer organizations to utilize Claude Code seamlessly.',
      impactTh: 'เปิดให้นักพัฒนาร่วมทีมสามารถใช้เครื่องมือ Claude Code ได้ทันทีโดยไม่ต้องตั้งค่าเซิร์ฟเวอร์ใหม่',
      highlights: [{ title: 'Blistering 29ms TTFT', titleTh: 'ความเร็วตอบสนอง 29ms', desc: 'Zero perceived latency overhead.', descTh: 'แปลงข้อมูลลื่นไหลไม่มีความหน่วงให้รู้สึกได้' }]
    }
  },
  {
    id: 'superdoc',
    name: 'SuperDoc AI — DOCX Editor',
    nameTh: 'โปรแกรมแก้ไขเอกสาร AI อัจฉริยะ SuperDoc AI',
    category: 'AI Infrastructure & Dev Tools',
    categoryTh: 'โครงสร้างพื้นฐาน AI และเครื่องมือนักพัฒนา',
    domain: 'infra',
    platform: ['Vercel'],
    status: 'production',
    verified: 'Fetched live app: ai-docx-editor.vercel.app',
    headline: 'MCP-orchestrated AI DOCX editor with Reviewer + Writer + Analyst agents running simultaneously',
    blurb: 'MCP-orchestrated AI DOCX editor with Reviewer + Writer + Analyst agents running simultaneously.',
    blurbTh: 'โปรแกรมแก้เอกสาร Word ด้วย 3 เอเจนต์ AI ทำงานพร้อมกัน (Reviewer, Writer, Analyst)',
    description:
      "Enterprise AI document editor where three specialized agents work concurrently via MCP orchestration: a Reviewer flagging issues, a Writer rewriting sections, and an Analyst extracting insights. A Cursor-like experience for Word documents.",
    descriptionTh:
      'ระบบแก้ไขเอกสาร Word ระดับองค์กรที่ 3 เอเจนต์ AI ทำงานพร้อมกันผ่านระบบประสานงาน MCP ได้แก่ ตัวตรวจสอบ ตัวเรียบเรียง และตัววิเคราะห์ ให้ประสบการณ์เหมือนใช้ Cursor สำหรับงานเอกสาร',
    body:
      "Enterprise-grade AI document editor where three specialised agents work on a document concurrently via MCP orchestration: a Reviewer agent flagging issues, a Writer agent rewriting sections, and an Analyst agent extracting insights. The result is a Cursor-like experience for Word documents.",
    tags: ['MCP Orchestration', 'Next.js', 'Claude API', 'mammoth.js', 'Concurrent Agents'],
    tech: ['Next.js', 'MCP', 'Claude API', 'mammoth.js', 'TypeScript', 'Vercel'],
    fde: ['MCP multi-agent orchestration', 'Document intelligence', 'Concurrent agent coordination'],
    accent: '#8b5cf6',
    url: 'https://ai-docx-editor.vercel.app',
    embed: true,
    metrics: [
      { value: '3 Agents', label: 'Concurrent Orchestration', labelTh: '3 เอเจนต์ทำงานพร้อมกัน' },
      { value: 'DOCX Native', label: 'Word Document Engine', labelTh: 'รองรับไฟล์เอกสาร Word' },
    ],
    highlights: [
      { k: 'Agents', v: 'Reviewer + Writer + Analyst (concurrent)' },
      { k: 'Protocol', v: 'MCP orchestration' },
      { k: 'Output', v: 'Editable .docx' },
      { k: 'Experience', v: 'Cursor-like for Word documents' },
    ],
    caseStudy: {
      challenge: 'Reviewing and restructuring extensive legal and engineering DOCX files requires simultaneously verifying grammar, tone, compliance, and numerical accuracy.',
      challengeTh: 'การตรวจทานและเรียบเรียงไฟล์เอกสาร Word ยาวนับร้อยหน้า ต้องใช้ทั้งการตรวจไวยากรณ์ น้ำเสียง กฎเกณฑ์ และความถูกต้องของตัวเลขไปพร้อมๆ กัน',
      architecture: 'Next.js client connecting to 3 independent MCP agents operating in parallel threads.',
      architectureTh: 'เว็บแอป Next.js เชื่อมต่อกับเอเจนต์อิสระ 3 ตัวทำงานคู่ขนานกันในเวลาเดียวกัน',
      solution: ['Delivered a Cursor-style inline editing experience for Microsoft Word documents.'],
      solutionTh: ['สร้างประสบการณ์แก้ไขเอกสาร Word แบบคลิกสั่งงานและปรับแก้ทีละบรรทัดเหมือนใช้รหัสโค้ดใน Cursor'],
      impact: 'Dramatically cuts document drafting cycles for technical teams.',
      impactTh: 'ย่นระยะเวลาการเขียนและตรวจทานเอกสารสำคัญทางวิศวกรรมลงกว่าครึ่ง',
      highlights: [{ title: 'Concurrent MCP Agents', titleTh: '3 เอเจนต์ประสานงาน', desc: 'Reviewer, Writer, and Analyst working in harmony.', descTh: 'ตัวตรวจ ตัวเขียน และตัววิเคราะห์ทำงานสอดประสานกัน' }]
    }
  },

  /* ── PROPERTY ── */
  {
    id: 'aot-property',
    name: 'AOT Property Management AI Dashboard',
    nameTh: 'แดชบอร์ด AI บริหารทรัพย์สินท่าอากาศยานไทย (AOT)',
    category: 'Property, Asset & Facility Mgmt',
    categoryTh: 'บริหารจัดการอสังหาริมทรัพย์และอาคาร',
    domain: 'property',
    platform: ['Vercel', 'Cloudflare'],
    status: 'production',
    verified: 'Fetched live app: aot-frontend',
    headline: 'AI-powered property management dashboard for Airports of Thailand (AOT)',
    blurb: 'AI-powered property management dashboard for Airports of Thailand (AOT).',
    blurbTh: 'แดชบอร์ด AI ดูแลพื้นที่และอาคารสำหรับบริษัท ท่าอากาศยานไทย จำกัด (มหาชน)',
    description:
      "AI-augmented property management system for AOT's real estate and facility portfolio. Using Noto Sans Thai for native bilingual interfaces, connected to FastAPI and Cloudflare Worker edge APIs for anomaly alerts and property health scores.",
    descriptionTh:
      'ระบบบริหารจัดการทรัพย์สินและอาคารของท่าอากาศยานไทย (AOT) รองรับภาษาไทยสมบูรณ์แบบ เชื่อมต่อข้อมูลเซนเซอร์ผ่าน Cloudflare Workers และคำนวณคะแนนสุขภาพอาคารด้วย AI',
    body:
      "AI-augmented property management system for AOT's real estate and facility portfolio. The Vite + React frontend uses Noto Sans Thai for bilingual (Thai/English) interfaces. Connected to a FastAPI backend and a Cloudflare Worker edge API for real-time asset condition data. AI module surfaces anomaly alerts and property health scores.",
    tags: ['Airports of Thailand (AOT)', 'React', 'FastAPI', 'Cloudflare Workers', 'Noto Sans Thai'],
    tech: ['React', 'Vite', 'Noto Sans Thai', 'Poppins', 'FastAPI', 'Cloudflare Workers', 'TypeScript'],
    fde: ['Thai-English bilingual UI', 'Government enterprise client', 'AI anomaly detection', 'Edge + backend hybrid'],
    accent: '#14b8a6',
    url: 'https://aot-frontend-five.vercel.app',
    embed: true,
    metrics: [
      { value: 'AOT', label: 'Airports of Thailand Client', labelTh: 'บริษัท ท่าอากาศยานไทย จำกัด' },
      { value: 'Bilingual UI', label: 'Noto Sans Thai + Poppins', labelTh: 'รองรับไทย-อังกฤษสมบูรณ์' },
    ],
    highlights: [
      { k: 'Client', v: 'Airports of Thailand (AOT)' },
      { k: 'UI fonts', v: 'Noto Sans Thai + Poppins' },
      { k: 'Backend', v: 'FastAPI (Vercel) + CF Workers edge API' },
      { k: 'AI feature', v: 'Anomaly alerts + property health scores' },
      { k: 'Production URL', v: 'aot-frontend-five.vercel.app (alias of aot-frontend)' },
      { k: 'Live title', v: 'Property Management AI Dashboard' },
    ],
    caseStudy: {
      challenge: 'Managing real estate assets and commercial space maintenance across national airports requiring bilingual Thai/English executive oversight.',
      challengeTh: 'การบริหารจัดการพื้นที่เชิงพาณิชย์และบำรุงรักษาอาคารท่าอากาศยานแห่งชาติ ที่ต้องการระบบรายงานผู้บริหารสองภาษาไทย-อังกฤษที่แม่นยำ',
      architecture: 'React + Vite dashboard backed by FastAPI and Cloudflare Workers edge sensors.',
      architectureTh: 'แดชบอร์ด React + Vite เชื่อมต่อหลังบ้าน FastAPI และเซนเซอร์ Edge บน Cloudflare',
      solution: ['Automated property health scoring and predictive maintenance alerts.'],
      solutionTh: ['คำนวณคะแนนสุขภาพอาคารและแจ้งเตือนซ่อมบำรุงล่วงหน้าอัตโนมัติ'],
      impact: 'Enhances facility reliability across primary national transportation hubs.',
      impactTh: 'ยกระดับความน่าเชื่อถือของพื้นที่บริการในท่าอากาศยานหลักของประเทศ',
      highlights: [{ title: 'Airports of Thailand', titleTh: 'ลูกค้าระดับชาติ AOT', desc: 'Enterprise asset condition monitoring.', descTh: 'ดูแลและติดตามสภาพสินทรัพย์ระดับประเทศ' }]
    }
  },
  {
    id: 'scada',
    name: 'SCADA AI — Industrial Control Monitoring',
    nameTh: 'ระบบ SCADA AI ควบคุมและตรวจสอบระบบอุตสาหกรรม',
    category: 'Property, Asset & Facility Mgmt',
    categoryTh: 'บริหารจัดการอสังหาริมทรัพย์และอาคาร',
    domain: 'property',
    platform: ['Vercel'],
    status: 'production',
    verified: 'Fetched live app: scada-ai.vercel.app',
    headline: 'AVEVA-style AI-powered SCADA interface with real-time industrial control system monitoring',
    blurb: 'AVEVA-style AI-powered SCADA interface with real-time industrial control system monitoring.',
    blurbTh: 'หน้าจอควบคุมอุตสาหกรรมสไตล์ AVEVA พร้อม AI แจ้งเตือนความผิดปกติทันที',
    description:
      "AI-augmented SCADA interface styled after AVEVA design tokens (#0097D1). Displays real-time P&ID diagrams, equipment status, sensor trends, and AI-generated anomaly alerts for NT facility operations teams monitoring power and cooling.",
    descriptionTh:
      'หน้าจอ SCADA ออกแบบตามมาตรฐาน AVEVA แสดงผังท่อ P&ID สถานะเครื่องจักร กราฟแนวโน้ม และแจ้งเตือนความผิดปกติด้วย AI สำหรับทีมปฏิบัติการศูนย์ข้อมูล NT',
    body:
      "AI-augmented SCADA (Supervisory Control and Data Acquisition) interface styled after AVEVA's design system (confirmed AVEVA blue #0097D1 color tokens in source). Displays real-time P&ID diagrams, equipment status, sensor trends, and AI-generated anomaly alerts. Designed for NT facility operations teams monitoring power and cooling systems.",
    tags: ['AVEVA Stack (#0097D1)', 'P&ID Diagrams', 'WebSocket', 'SCADA AI', 'React'],
    tech: ['React', 'AVEVA Design System', 'WebSocket', 'Chart.js', 'TailwindCSS', 'Vercel'],
    fde: ['OT/IT convergence', 'SCADA domain', 'Industrial UI/UX', 'AVEVA stack familiarity'],
    accent: '#14b8a6',
    url: 'https://scada-ai.vercel.app',
    embed: true,
    metrics: [
      { value: 'AVEVA Blue', label: 'Industrial Design System', labelTh: 'มาตรฐานสีอุตสาหกรรม AVEVA' },
      { value: 'P&ID Live', label: 'Real-Time Diagrams', labelTh: 'ผังระบบท่อและเครื่องมือเรียลไทม์' },
    ],
    highlights: [
      { k: 'Design system', v: 'AVEVA blue (#0097D1) — verified in source' },
      { k: 'Display type', v: 'P&ID diagrams + sensor trends' },
      { k: 'Real-time', v: 'WebSocket live sensor data' },
      { k: 'Client', v: 'NT facility operations' },
    ],
    caseStudy: {
      challenge: 'Modernizing legacy industrial SCADA interfaces so field technicians can view live P&ID diagrams with embedded AI fault predictions on web devices.',
      challengeTh: 'การยกระดับหน้าจอ SCADA อุตสาหกรรมแบบเดิม ให้วิศวกรดูผัง P&ID พร้อมคำทำนายจุดขัดข้องผ่านเว็บเบราว์เซอร์ได้ทันที',
      architecture: 'React frontend following AVEVA industrial color tokens connected to live WebSocket sensor streams.',
      architectureTh: 'แอปพลิเคชัน React ตามมาตรฐานสี AVEVA เชื่อมต่อกระแสข้อมูลเซนเซอร์ผ่าน WebSocket',
      solution: ['Overlaid real-time anomaly alerts directly onto industrial schematic components.'],
      solutionTh: ['ซ้อนจุดแจ้งเตือนความผิดปกติลงบนไดอะแกรมเครื่องจักรในระบบท่อโดยตรง'],
      impact: 'Bridges OT/IT divide for mission-critical power and cooling operations.',
      impactTh: 'เชื่อมผสานเทคโนโลยีปฏิบัติการ (OT) เข้ากับไอทีสมัยใหม่สำหรับระบบควบคุมไฟฟ้าและทำความเย็น',
      highlights: [{ title: 'AVEVA Industrial UX', titleTh: 'มาตรฐานหน้าจอ AVEVA', desc: 'Familiar industrial color tokens and layout.', descTh: 'หน้าจอคุ้นเคยตามมาตรฐานอุตสาหกรรมสากล' }]
    }
  },

  /* ── PROPERTY: FacilityHub SCADA POC (FLAGSHIP) ── */
  {
    id: 'scada-poc-frontend',
    name: 'PolyGuard SCADA — Plastics Food-Packaging Floor Digital Twin',
    nameTh: 'PolyGuard SCADA — ภาพดิจิทัลทวินโรงงานสารพลาสติกบรรจุภัณฑ์อาหาร',
    category: 'Property, Asset & Facility Mgmt',
    categoryTh: 'บริหารจัดการอสังหาริมทรัพย์และอาคาร',
    domain: 'property',
    platform: ['Vercel'],
    status: 'production',
    verified: 'Live at https://scada-poc-frontend.vercel.app — HTTP 200, title "PolyGuard SCADA". GitHub: khiwniti/scada-poc-frontend (Next-gen SCADA platform for plastic injection molding in the food packaging industry).',
    headline: 'Next-gen SCADA platform for plastic injection molding cleanup diagnostics + production forecasts',
    blurb: 'Next-gen SCADA platform for plastic injection molding cleanup diagnostics + production forecasts.',
    blurbTh: 'แพลตฟอร์ม SCADA ยุคใหม่สำหรับการฉีดพลาสติกบรรจุภัณฑ์อาหาร',
    description:
      "PolyGuard SCADA is a next-gen SCADA platform for plastic injection molding in the food packaging industry — targeted at the cleaning/diagnostic workflow that C.P. Food Packaging Industry pioneered. Real-time process telemetry with machine learning-based cleanup-quality scoring and production forecasts.",
    descriptionTh:
      'PolyGuard SCADA เป็นแพลตฟอร์ม SCADA ยุคใหม่สำหรับการขึ้นรูปพลาสติกบรรจุภัณฑ์อาหาร ทำงานร่วมกับกระบวนการทำความสะอาดแม่พิมพ์ที่ซี.พี. สหอุตสาหกรรมบรรจุภัณฑ์เป็นผู้บุกเบิก รองรับการวัดค่ากระบวนการแบบเรียลไทม์ ประเมินคุณภาพการทำความสะอาดด้วย ML และพยากรณ์ยอดผลิต',
    body:
      "PolyGuard SCADA platform for plastic injection molding in the food packaging industry. Built as the digital wrapper around the cleaning/diagnostic workflow that C.P. Food Packaging Industry pioneered (24-cavity stack mold, 300K pcs/day). ML-driven cleanup-quality scoring + production forecast dashboard.",
    tags: ['PolyGuard SCADA', 'Plastic Injection', 'ML Forecast', 'Real-Time Telemetry'],
    tech: ['React', 'TypeScript', 'Vite', 'SCADA Telemetry', 'Vercel'],
    fde: ['CP. Food Packaging cleanup workflow', 'Plastic injection molding diagnostics', 'ML production forecasting'],
    accent: '#14b8a6',
    url: 'https://scada-poc-frontend.vercel.app',
    embed: true,
    metrics: [
      { value: 'PolyGuard', label: 'Production SCADA', labelTh: 'SCADA สายการผลิต' },
      { value: '24 cavity', label: 'Stack Mold Diagnostics', labelTh: 'แม่พิมพ์ 24 คาวิตี้' },
      { value: '300K/day', label: 'Pieces Capacity', labelTh: 'กำลังผลิต 300,000 ชิ้น/วัน' },
    ],
    highlights: [
      { k: 'Workflow', v: 'CP. Food Packaging plastic injection cleaning' },
      { k: 'ML models', v: 'Cleanup quality + production forecast' },
      { k: 'Vercel project', v: 'scada-poc-frontend' },
      { k: 'Live title', v: 'PolyGuard SCADA' },
      { k: 'Production URL', v: 'scada-poc-frontend.vercel.app' },
    ],
    caseStudy: {
      challenge: 'Bringing modern SCADA UX + ML diagnostics to a 24-cavity stack mould plastic injection line that previously relied on operator instinct alone.',
      challengeTh: 'การนำหน้าจอ SCADA สมัยใหม่ + ML วิเคราะห์ ไปใช้กับสายฉีดพลาสติกแม่พิมพ์ 24 คาวิตี้ ที่เดิมพึ่งพาประสบการณ์ของช่างเพียงอย่างเดียว',
      architecture: 'React + Vite SCADA dashboard with real-time telemetry ingestion and ML scoring backend.',
      architectureTh: 'แดชบอร์ด SCADA React + Vite พร้อมระบบรับส่งข้อมูลเรียลไทม์และ ML scoring',
      solution: ['Cleanup quality scoring and production forecast surfaced inline on the SCADA dashboard for shop-floor decision making.'],
      solutionTh: ['คะแนนคุณภาพการทำความสะอาดและพยากรณ์ยอดผลิตแสดงบน SCADA เพื่อช่วยตัดสินใจหน้างาน'],
      impact: 'Reduces mould damage rate and unlocks sub-minute cleanup decisions.',
      impactTh: 'ลดอัตราชำรุดของแม่พิมพ์และช่วยให้ตัดสินใจปรับสภาพแม่พิมพ์ได้ภายในไม่กี่นาที',
      highlights: [{ title: '24-Cavity Inserts', titleTh: 'รองรับแม่พิมพ์ 24 คาวิตี้', desc: 'Diagnostic UI for each cavity in real time.', descTh: 'หน้าจอวินิจฉัยแต่ละคาวิตี้แบบเรียลไทม์' }]
    }
  },

  /* ── CIVIC ── */
  {
    id: 'bloodplus',
    name: 'BloodPlus LINE OA Civic Chatbot',
    nameTh: 'แชทบอต LINE OA บริจาคโลหิต BloodPlus & BloodPlus Fight',
    category: 'Civic Tech, AgriTech & LINE Bots',
    categoryTh: 'เทคโนโลยีเพื่อสังคม เกษตรอัจฉริยะ และ LINE Bots',
    domain: 'civic',
    platform: ['Cloudflare'],
    status: 'production',
    verified: 'Cloudflare: bloodplus-line-oa-server + bloodplusfight-line-chatbot',
    headline: 'AI-powered LINE Official Account for blood donation coordination — Thai civic tech',
    blurb: 'AI-powered LINE Official Account for blood donation coordination — Thai civic tech.',
    blurbTh: 'แชทบอต LINE OA ประสานงานและแจ้งเตือนวิกฤตขาดแคลนโลหิตทั่วประเทศ',
    description:
      "Civic technology project for blood donation coordination in Thailand. A LINE Official Account chatbot handles donor registration, blood type matching queries, and urgent shortage alerts, with gamified civic engagement (BloodPlus Fight).",
    descriptionTh:
      'โครงการเทคโนโลยีเพื่อสังคมสำหรับประสานงานรับบริจาคโลหิตในไทย แชทบอต LINE OA ช่วยลงทะเบียน ค้นหาหน่วยบริจาค แจ้งเตือนกรุ๊ปเลือดขาดแคลน และเล่นเกมสะสมแต้มความดี',
    body:
      "Civic technology project for blood donation coordination in Thailand. A LINE Official Account chatbot handles donor registration, blood type matching queries, donation drive announcements, and urgent shortage alerts. The campaign variant (BloodPlus Fight) handles gamified civic engagement for donation drives.",
    tags: ['LINE Messaging API', 'Cloudflare Workers', 'TypeScript', 'Civic AI', 'Hono.js'],
    tech: ['Cloudflare Workers', 'LINE Messaging API', 'TypeScript', 'Hono.js', 'Cloudflare KV'],
    fde: ['LINE bot deployment', 'Civic AI product', 'Thai public health context'],
    accent: '#f472b6',
    url: 'https://bloodplusfight-line-chatbot.workers.dev',
    embed: false,
    metrics: [
      { value: 'LINE OA', label: 'National Chatbot Platform', labelTh: 'แชทบอต LINE Official Account' },
      { value: 'Blood Matching', label: 'Urgent Shortage Alerts', labelTh: 'จับคู่และแจ้งเตือนวิกฤตเลือด' },
    ],
    highlights: [
      { k: 'Platform', v: 'LINE Official Account' },
      { k: 'Purpose', v: 'Blood donation coordination' },
      { k: 'Variants', v: 'bloodplus-line-oa-server + bloodplusfight campaign bot' },
    ],
    caseStudy: {
      challenge: 'Mobilizing urgent blood donors in specific geographic zones across Thailand during critical hospital blood bank shortages.',
      challengeTh: 'การระดมผู้บริจาคโลหิตเร่งด่วนตามพื้นที่เป้าหมายเมื่อคลังเลือดโรงพยาบาลประสบภาวะขาดแคลนวิกฤต',
      architecture: 'Cloudflare Workers running Hono.js connected to LINE Messaging API webhooks.',
      architectureTh: 'Cloudflare Workers รัน Hono.js รับส่งข้อความกับระบบ Webhook ของ LINE OA',
      solution: ['Created automated geo-targeted broadcast alerts matched to registered donor blood types.'],
      solutionTh: ['สร้างระบบแจ้งเตือนอัตโนมัติตามพิกัดและกรุ๊ปเลือดตรงกับผู้ลงทะเบียน'],
      impact: 'Increases blood drive attendance and saves lives during emergency shortages.',
      impactTh: 'เพิ่มยอดผู้ร่วมบริจาคโลหิตและช่วยชีวิตผู้ป่วยยามฉุกเฉินทั่วประเทศ',
      highlights: [{ title: 'LINE Official Account', titleTh: 'แพลตฟอร์ม LINE OA', desc: 'Seamless access for millions of Thai users.', descTh: 'เข้าถึงคนไทยหลายล้านคนได้ทันทีโดยไม่ต้องลงแอปใหม่' }]
    }
  },

  /* ── FACILITYAI: FacilityHub CCTV + Building + AI (FLAGSHIP) ── */
  {
    id: 'facility-management-app',
    name: 'FacilityHub — CCTV + Building Management + AI',
    nameTh: 'FacilityHub — CCTV + บริหารอาคาร + AI อัจฉริยะ',
    category: 'Facility, Asset & Facility Mgmt',
    categoryTh: 'บริหารจัดการอาคารและสิ่งอำนวยความสะดวก',
    domain: 'facility-ai',
    platform: ['Vercel'],
    status: 'production',
    verified: 'Live at https://facility-management-app-mocha.vercel.app — HTTP 200, title "FacilityHub - CCTV & Building Management". AI feature at /ai route also HTTP 200. GitHub: khiwniti/facility-management-system (TypeScript).',
    headline: 'Next-gen facility platform — CCTV, access control, floor plans + an AI layer for predictive maintenance',
    blurb: 'Next-gen facility platform — CCTV, access control, floor plans + an AI layer for predictive maintenance.',
    blurbTh: 'แพลตฟอร์มอาคารอัจฉริยะ — CCTV, ระบบควบคุมการเข้าออก, แปลนอาคาร + AI บำรุงรักษาเชิงคาดการณ์',
    description:
      "FacilityHub is a building management platform with an embedded AI surface at /ai — surfaces CCTV feeds, access logs, floor plans, and predictive maintenance insights in one operator-grade interface. Built by a mechanical engineer with CFD expertise who applied his simulation domain knowledge directly to facility operations.",
    descriptionTh:
      'FacilityHub เป็นแพลตฟอร์มบริหารอาคารที่มาพร้อมเลเยอร์ AI ที่ /ai รวมฟีด CCTV บันทึกการเข้าออก แปลนอาคาร และข้อมูลเชิงคาดการณ์จาก AI ในหน้าจอเดียวที่ออกแบบสำหรับเจ้าหน้าที่ปฏิบัติการ สร้างโดยวิศวกรเครื่องกลที่มีเชี่ยวชาญด้าน CFD ที่นำความรู้ทางด้านการจำลองมาประยุกต์กับงานบริหารอาคารโดยตรง',
    body:
      "FacilityHub ties together CCTV streams, access-control logs, floor-plan telemetry, and an AI engine that surfaces predictive maintenance signals and operational anomalies. The /ai route exposes the AI copilot surface in its own production-ready page. Built by a mechanical engineer with deep CFD expertise (CFD/FEA, Moldex3D, COMSOL Multiphysics, Ansys) who applies his simulation domain language to the building operations space.",
    tags: ['Facility AI', 'CCTV Integration', 'Predictive Maintenance', 'Mechanical Engineer + AI', 'CFD Domain'],
    tech: ['React', 'TypeScript', 'Vite', 'AI Layer', 'CCTV/RTSP', 'Access Control', 'Vercel'],
    fde: ['CFD-domain language applied to facility ops', 'Predictive maintenance AI', 'AI surface at /ai route', 'Mechanical engineer background + AI engineeer practice'],
    accent: '#22c55e',
    url: 'https://facility-management-app-mocha.vercel.app',
    embed: true,
    metrics: [
      { value: 'CCTV + AI', label: 'Video + Predictive', labelTh: 'วิดีโอ + บำรุงรักษาเชิงคาดการณ์' },
      { value: '/ai page', label: 'AI Copilot Surface', labelTh: 'หน้า AI Copilot แยกต่างหาก' },
      { value: 'CFD ↔ Ops', label: 'Mechanical Engineer Domain', labelTh: 'ผสาน CFD เข้ากับงานอาคาร' },
    ],
    highlights: [
      { k: 'AI route', v: '/ai (live, HTTP 200) — AI Copilot page' },
      { k: 'Capability stack', v: 'CCTV + Access Control + Floorplans' },
      { k: 'AI Capability', v: 'Predictive maintenance + anomaly detection' },
      { k: 'Title (live)', v: 'FacilityHub - CCTV & Building Management' },
      { k: 'Vercel project', v: 'facility-management-app-mocha (TypeScript)' },
      { k: 'GitHub', v: 'khiwniti/facility-management-system' },
      { k: 'Engineering angle', v: 'CFD/FEA domain applied to building operations' },
    ],
    caseStudy: {
      challenge: "Modern facility buildings generate terabytes of CCTV, sensor and access data daily — but operators rarely have the simulation background to convert that raw signal into actionable maintenance decisions.",
      challengeTh: 'อาคารสมัยใหม่สร้างข้อมูล CCTV เซนเซอร์และการเข้าออกนับเทราไบต์ต่อวัน แต่เจ้าหน้าที่ปฏิบัติการมักขาดความรู้ด้านการจำลองที่จะแปลงข้อมูลดิบเป็นการตัดสินใจบำรุงรักษา',
      architecture: 'React + TypeScript SPA with a dedicated /ai route for the AI copilot surface, pulling CCTV + access + floor-plan telemetry into a unified operator-grade view.',
      architectureTh: 'React + TypeScript SPA พร้อมเส้นทาง /ai แยกสำหรับ AI Copilot รวบรวมข้อมูล CCTV + บันทึกเข้าออก + แปลนอาคารเข้ามาในหน้าจอเดียว',
      solution: ['Predictive maintenance signals and anomaly scoring surfaced inline with live CCTV overlays.'],
      solutionTh: ['สัญญาณบำรุงรักษาเชิงคาดการณ์และคะแนนความผิดปกติแสดงบนหน้าจอพร้อมฟีด CCTV สด'],
      impact: 'Helps facility teams respond to issues before they reach the operations floor — a vantage point born from CFD-grade systems thinking.',
      impactTh: 'ช่วยให้ทีมอาคารตอบสนองต่อปัญหาก่อนจะลุกลามไปถึงพื้นปฏิบัติการ — มุมมองที่เกิดจากกระบวนการคิดแบบระบบระดับ CFD',
      highlights: [{ title: '/ai Copilot', titleTh: 'AI Copilot หน้า /ai', desc: 'AI surface route with predictive scoring.', descTh: 'เส้นทาง AI แยกพร้อมระบบคาดการณ์' }]
    }
  },

  /* ── ENSIMU ── */
  {
    id: 'ensimu',
    name: 'Ensimu — Agentic Multiphysics Simulation Platform',
    nameTh: 'แพลตฟอร์มจำลองวิศวกรรม 10 เอเจนต์ Ensimu Studio',
    category: 'AI Infrastructure & Dev Tools',
    categoryTh: 'โครงสร้างพื้นฐาน AI และเครื่องมือนักพัฒนา',
    domain: 'infra',
    platform: ['Vercel', 'Cloudflare'],
    status: 'production',
    verified: 'Memory: ensimu.studio — agentic multiphysics simulation platform',
    headline: '10-agent LangGraph CFD platform with OpenFOAM and COMSOL-grade Trame Workbench UI',
    blurb: '10-agent LangGraph CFD platform with OpenFOAM and COMSOL-grade Trame Workbench UI.',
    blurbTh: 'แพลตฟอร์มจำลอง CFD ใช้ 10 เอเจนต์ LangGraph คุม OpenFOAM และ Trame Workbench',
    description:
      "Ensimu.studio — an agentic simulation platform combining OpenFOAM with a 10-agent LangGraph orchestration system. Dual-surface UI: Next.js dashboard + Trame professional workbench (COMSOL-grade visualization).",
    descriptionTh:
      'แพลตฟอร์มจำลองพลศาสตร์ของไหล (CFD) ผสาน OpenFOAM เข้ากับ 10 เอเจนต์ LangGraph ทำงานร่วมกับหน้าจอ Trame Workbench ให้ความคมชัดเทียบเท่า COMSOL',
    body:
      "Ensimu.studio — an agentic simulation platform combining OpenFOAM with a 10-agent LangGraph orchestration system. The UI is dual-surface: a Next.js management dashboard plus a Trame professional workbench (COMSOL-grade visualisation). 10 specialised agents handle mesh generation, solver configuration, post-processing, and results interpretation. The Cloudflare Worker serves as the API gateway with auth and rate limiting.",
    tags: ['LangGraph (10 Agents)', 'OpenFOAM CFD', 'Trame Workbench', 'COMSOL-Grade Viz', 'Next.js'],
    tech: ['Next.js', 'LangGraph', 'OpenFOAM', 'Trame', 'Python', 'FastAPI', 'Cloudflare Workers', 'Three.js', 'ParaView'],
    fde: ['Simulation domain (CFD/FEA)', 'LangGraph 10-agent orchestration', 'OpenFOAM integration', 'Engineering AI product', 'Dual-surface UI architecture'],
    accent: '#8b5cf6',
    url: 'https://ensimu-space-studio.vercel.app',
    embed: true,
    metrics: [
      { value: '10 Agents', label: 'LangGraph Orchestration', labelTh: '10 เอเจนต์ทำงานประสานกัน' },
      { value: 'OpenFOAM', label: 'CFD Fluid Solver Core', labelTh: 'ระบบคำนวณของไหล OpenFOAM' },
      { value: 'COMSOL Grade', label: 'Trame 3D Workbench', labelTh: 'หน้าจอกราฟิกวิศวกรรมชั้นสูง' },
    ],
    highlights: [
      { k: 'Canonical URL', v: 'ensimu.studio (DNS pending A/CNAME record)' },
      { k: 'Live Vercel production', v: 'ensimu-space-studio.vercel.app' },
      { k: 'Domain', v: 'Computational Fluid Dynamics (CFD)' },
      { k: 'Solver', v: 'OpenFOAM' },
      { k: 'Agents', v: '10-agent LangGraph system' },
      { k: 'UI', v: 'Dual: Next.js dashboard + Trame workbench' },
      { k: 'Grade', v: 'COMSOL-equivalent visualisation' },
      { k: 'CF role', v: 'ensimu-api-gateway (auth + rate limit)' },
    ],
    caseStudy: {
      challenge: 'Running open-source CFD solvers like OpenFOAM typically requires deep PhD-level command-line expertise in meshing, numerical relaxation schemes, and turbulence modeling.',
      challengeTh: 'การใช้งานโปรแกรมคำนวณของไหลขั้นสูงอย่าง OpenFOAM มักต้องใช้ความรู้ระดับปริญญาเอกในการตั้งค่าตาข่ายและสมการความปั่นป่วนผ่านหน้าจอคำสั่งที่ซับซ้อน',
      architecture: 'Dual-surface architecture pairing Next.js cloud dashboards with Python Trame 3D engineering workbenches driven by 10 LangGraph agents.',
      architectureTh: 'สถาปัตยกรรมสองหน้าจอ ผสานแดชบอร์ด Next.js เข้ากับ Trame 3D Workbench ควบคุมด้วย 10 เอเจนต์ AI LangGraph',
      solution: [
        'Created specialized AI agents for meshing, boundary conditions, solver tuning, and post-processing interpretation.',
        'Delivered COMSOL-grade interactive streamlines and pressure contour slicing directly in browser.',
      ],
      solutionTh: [
        'แบ่งหน้าที่เอเจนต์ AI ดูแลการสร้างตาข่าย กำหนดเงื่อนไข ปรับค่าตัวคำนวณ และสรุปผลลัพธ์แยกกันอย่างเป็นระบบ',
        'แสดงผลเส้นสายกระแสของไหลและระนาบความดันได้คมชัดสวยงามระดับเดียวกับ COMSOL ผ่านเบราว์เซอร์',
      ],
      impact: 'Democratizes supercomputer-grade fluid simulations for industrial engineering teams.',
      impactTh: 'เปิดโอกาสให้วิศวกรในอุตสาหกรรมสามารถเข้าถึงการจำลองของไหลระดับซูเปอร์คอมพิวเตอร์ได้อย่างง่ายดาย',
      highlights: [{ title: '10-Agent LangGraph', titleTh: '10 เอเจนต์ร่วมทำงาน', desc: 'Automates end-to-end open-source CFD.', descTh: 'ควบคุมกระบวนการจำลองของไหลตั้งแต่ต้นจนจบ' }]
    }
  },
];
