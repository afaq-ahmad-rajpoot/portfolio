// =============================================================
//  PORTFOLIO DATA LAYER — single source of truth
//  Afaq Ahmad :: Full Stack Developer
// =============================================================

export interface SkillItem {
  name: string;
  level: number;
}
export interface SkillCategory {
  category: string;
  items: SkillItem[];
}
export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  outcome: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  featured: boolean;
  company: string;
  period: string;
}
export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  type: "education" | "work" | "achievement";
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Afaq Ahmad",
    title: "Full Stack Developer",
    tagline: "// building systems that scale, interfaces that feel.",
    bio: [
      "Full Stack Developer with 2+ years of professional experience building scalable web applications using React.js, Next.js, Node.js, TypeScript, PostgreSQL, and MongoDB.",
      "Recently expanded expertise into Python backend development with FastAPI, asynchronous architectures, Redis task queues, Docker containerization, Linux administration, and AWS cloud services.",
      "Experienced in designing and integrating APIs, implementing authentication and payment systems, developing high-performance data processing pipelines, and contributing to production-grade applications serving real-world users.",
    ],
    location: "Faisalabad, Pakistan",
    email: "afaq.dev.js@gmail.com",
    phone: "+923074102357",
    github: "https://github.com/afaq-ahmad",
    linkedin: "https://linkedin.com/in/afaq-ahmad",
    currentlyBuilding: "FindSocial — Social Media Discovery & Analytics Platform",
    currentlyLearning: "Advanced WebGL / GLSL Shaders",
    currentlyReading: "Clean Architecture — Robert C. Martin",
    oldPortfolioUrl: "https://my-portfolio-blond-chi.vercel.app/",
  },

  stats: [
    { label: "Years of Experience", value: 2, suffix: "+" },
    { label: "Projects Shipped", value: 8, suffix: "+" },
    { label: "Production Users", value: 1, suffix: "k+" },
    { label: "Cups of Coffee", value: 9999, suffix: "+" },
  ],

  timeline: [
    { year: "2019", title: "ICS — Superior College, Sahiwal", description: "Intermediate in Computer Science. Foundation in programming and mathematics.", type: "education" },
    { year: "2023", title: "MERN Stack Intern — Gamica Cloud", description: "Contributed to frontend and backend modules of client projects using React and Node.js. Focused on responsive design, API development, and UI consistency. May 2023 – May 2024, Faisalabad.", type: "work" },
    { year: "2024", title: "BSCS — Virtual University Pakistan", description: "Bachelor of Science in Computer Science.", type: "education" },
    { year: "2024", title: "MERN Stack Developer — Dzone Technologies", description: "Delivered production-grade apps (Sogauto, ScamJam, Barnvest) with Next.js, Node.js, PostgreSQL. Sep 2024 – Mar 2026, Faisalabad.", type: "work" },
    { year: "2026", title: "Full Stack Developer — Eprecisio Technologies LLC", description: "Building FindSocial — high-performance social media analytics. FastAPI, MongoDB, Redis, Next.js. Mar 2026 – Present.", type: "work" },
    { year: "2026", title: "Dentwise — Personal Project", description: "Launched full-stack AI dental appointment platform with voice assistant (Vapi), Clerk auth, Stripe billing, automated invoices.", type: "achievement" },
  ] as TimelineEntry[],

  skills: [
    {
      category: "Frontend",
      items: [
        { name: "HTML5 / CSS3", level: 95 },
        { name: "JavaScript", level: 92 },
        { name: "TypeScript", level: 85 },
        { name: "ReactJS", level: 90 },
        { name: "Next.js", level: 88 },
        { name: "Redux Toolkit", level: 80 },
        { name: "TailwindCSS", level: 95 },
        { name: "Bootstrap", level: 82 },
      ],
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js / Express", level: 85 },
        { name: "FastAPI / Python", level: 75 },
        { name: "Prisma ORM", level: 82 },
        { name: "Sequelize", level: 75 },
        { name: "REST APIs", level: 90 },
        { name: "WebSockets", level: 78 },
        { name: "aiohttp / httpx", level: 72 },
      ],
    },
    {
      category: "Databases",
      items: [
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 83 },
        { name: "MySQL", level: 78 },
        { name: "Redis", level: 75 },
      ],
    },
    {
      category: "DevOps",
      items: [
        { name: "Docker", level: 78 },
        { name: "Docker Compose", level: 75 },
        { name: "Linux (Ubuntu)", level: 75 },
        { name: "AWS (S3, SES, ECS, ECR)", level: 68 },
        { name: "Kubernetes (basics)", level: 62 },
        { name: "Vercel", level: 90 },
        { name: "Git / GitHub", level: 92 },
        { name: "CI/CD", level: 70 },
      ],
    },
    {
      category: "Tools",
      items: [
        { name: "Stripe", level: 82 },
        { name: "Auth0", level: 78 },
        { name: "Clerk", level: 83 },
        { name: "Firebase", level: 75 },
        { name: "Resend", level: 80 },
        { name: "Vapi (AI Voice)", level: 75 },
        { name: "Playwright", level: 70 },
        { name: "Pandas / OpenPyXL", level: 70 },
        { name: "Figma", level: 70 },
        { name: "Postman", level: 88 },
      ],
    },
  ] as SkillCategory[],

  radar: [
    { axis: "Frontend", value: 0.92 },
    { axis: "Backend", value: 0.82 },
    { axis: "Database", value: 0.83 },
    { axis: "DevOps", value: 0.72 },
    { axis: "Architecture", value: 0.78 },
    { axis: "Communication", value: 0.85 },
  ],

  projects: [
    {
      slug: "sogauto",
      title: "Sogauto",
      tagline: "Full car-selling platform with real-time chat & multi-language support",
      description: "Full car-selling platform built entirely with Next.js (frontend & backend) and Prisma ORM.",
      problem: "Algerian car market lacked a unified digital platform supporting buyer/seller roles, multi-language content, and business verification badges.",
      solution: "Built with Next.js and Prisma ORM. Implemented user roles (buyer/seller), business badges (Silver, Gold, Platinum), multi-language support (Arabic/French/English), account verification, real-time chat, and email notifications.",
      outcome: "Production-grade platform serving real users in Algeria with full multi-language and role-based access control.",
      tech: ["Next.js", "Prisma ORM", "PostgreSQL", "TypeScript", "TailwindCSS"],
      liveUrl: "https://www.sogauto.dz/en",
      githubUrl: "",
      image: "/textures/sogauto-preview.jpg",
      featured: true,
      company: "Dzone Technologies",
      period: "Sep 2024 – Mar 2026",
    },
    {
      slug: "scamjam",
      title: "ScamJam",
      tagline: "Scam reporting & subscription platform with 2FA and admin panel",
      description: "Scam reporting and subscription platform with Next.js, Node.js, Stripe integration, and two-step verification (2FA) via email OTP.",
      problem: "No user-friendly platform existed for reporting scams, verifying users via 2FA, and managing subscriptions.",
      solution: "Built admin panel, user dashboards, light/dark mode, and notification system. Stripe subscription management and 2FA via email OTP.",
      outcome: "Live platform with subscription management, 2FA security, and full admin oversight.",
      tech: ["Next.js", "Node.js", "Stripe", "PostgreSQL", "TailwindCSS", "TypeScript"],
      liveUrl: "https://www.scamjam.bot/",
      githubUrl: "",
      image: "/textures/scamjam-preview.jpg",
      featured: true,
      company: "Dzone Technologies",
      period: "Sep 2024 – Mar 2026",
    },
    {
      slug: "findsocial",
      title: "FindSocial",
      tagline: "Social Media Discovery & Analytics Platform with real-time scraping",
      description: "High-performance social media analytics platform with FastAPI backend, real-time WebSocket job tracking, multi-platform scraping, and modern Next.js frontend.",
      problem: "Brands and creators needed a unified platform to discover social media presence and track analytics across Instagram, TikTok, YouTube, Spotify, SoundCloud, and X.",
      solution: "FastAPI API Gateway, billing engine, and scraping coordinator. Redis task queues, WebSocket communication, Auth0 + Stripe integration, automated Excel reports, AWS ECS Fargate + Kubernetes deployment. Modern Next.js frontend with real-time data updates.",
      outcome: "Production system handling high-concurrency social analytics workloads with real-time delivery and automated reporting.",
      tech: ["FastAPI", "Python", "MongoDB", "Redis", "Docker", "Playwright", "Auth0", "Stripe", "AWS SES", "AWS ECS", "Next.js", "TypeScript", "WebSockets"],
      liveUrl: "https://www.findsocial.io/",
      githubUrl: "",
      image: "/textures/findsocial-preview.jpg",
      featured: true,
      company: "Eprecisio Technologies LLC",
      period: "Mar 2026 – Present",
    },
    {
      slug: "dentwise",
      title: "Dentwise",
      tagline: "AI-powered dental appointment platform with voice assistant",
      description: "Full-stack dental appointment management platform with AI voice booking, automated emails, and subscription management.",
      problem: "Dental clinics needed a modern appointment management system with AI-powered voice booking for premium users, automated email flows, and subscription management.",
      solution: "3-step booking flow (Dentist → Service & Time → Confirm), Clerk auth, Resend email notifications and invoices, Stripe subscriptions with smart upgrade pricing, admin dashboard, AI voice assistant via Vapi for premium users, PostgreSQL backend.",
      outcome: "Complete live SaaS platform with freemium model, AI voice booking, automated invoicing, and real-time appointment tracking.",
      tech: ["Next.js", "TypeScript", "TailwindCSS", "Shadcn UI", "TanStack Query", "PostgreSQL", "Clerk", "Vapi", "Resend", "Stripe"],
      liveUrl: "https://dentwise.ai/en",
      githubUrl: "",
      image: "/textures/dentwise-preview.jpg",
      featured: true,
      company: "Personal Project",
      period: "2026",
    },
    {
      slug: "barnvest",
      title: "Barnvest",
      tagline: "Goods management & analytics dashboard",
      description: "Goods management and analytics dashboard using Next.js, Node.js, Sequelize, and PostgreSQL.",
      problem: "Agricultural goods tracking lacked a centralized analytics dashboard with email reporting.",
      solution: "Built interactive graphs, email integration, and optimized database queries for better performance.",
      outcome: "Production dashboard with measurable query performance improvements.",
      tech: ["Next.js", "Node.js", "Sequelize", "PostgreSQL", "TailwindCSS"],
      liveUrl: "",
      githubUrl: "",
      image: "/textures/barnvest-preview.jpg",
      featured: false,
      company: "Dzone Technologies",
      period: "Sep 2024 – Mar 2026",
    },
  ] as Project[],

  experience: [
    {
      company: "Eprecisio Technologies LLC",
      role: "Full Stack Developer",
      period: "Mar 2026 – Present",
      location: "Faisalabad, Pakistan",
      description: "Working on FindSocial — social media discovery and analytics platform.",
      bullets: [
        "Contributed to high-performance FastAPI backend serving as API Gateway, billing engine, and scraping coordinator.",
        "Built async APIs using FastAPI, asyncio, aiohttp, and httpx for high-concurrency workloads.",
        "Developed scraping modules for Instagram, TikTok, YouTube, Spotify, SoundCloud, and X (Twitter).",
        "Implemented Redis-based task queues and WebSocket communication for real-time job tracking.",
        "Integrated Auth0 authentication and Stripe subscription management with tier-based feature access.",
        "Generated automated Excel reports using Pandas and OpenPyXL; delivered via AWS SES.",
        "Containerized services with Docker and participated in AWS CodeBuild, ECR, ECS Fargate, and Kubernetes deployments.",
        "Developed modern, responsive Next.js / TypeScript frontend with real-time API integrations.",
      ],
    },
    {
      company: "Dzone Technologies",
      role: "MERN Stack Developer",
      period: "Sep 2024 – Mar 2026",
      location: "Faisalabad, Pakistan",
      description: "Delivered multiple production-grade web applications.",
      bullets: [
        "Built Sogauto — full car-selling platform with Next.js, Prisma ORM, user roles, business badges, multi-language support, real-time chat, and email notifications.",
        "Built ScamJam — scam reporting and subscription platform with Next.js, Node.js, Stripe, 2FA via email OTP, admin panel, and light/dark mode.",
        "Built Barnvest — goods management and analytics dashboard with Next.js, Node.js, Sequelize, PostgreSQL, and optimized database queries.",
      ],
    },
    {
      company: "Gamica Cloud",
      role: "MERN Stack Developer (Intern)",
      period: "May 2023 – May 2024",
      location: "Faisalabad, Pakistan",
      description: "Contributed to frontend and backend modules of client projects using React and Node.js during internship.",
      bullets: [
        "Developed responsive UI components using React.",
        "Built RESTful API endpoints with Node.js and Express.",
        "Ensured UI consistency and cross-browser compatibility.",
      ],
    },
  ],

  education: [
    { degree: "BSCS — Bachelor of Science in Computer Science", institution: "Virtual University Pakistan", year: "2024" },
    { degree: "Intermediate in Computer Science (ICS)", institution: "Superior College, Sahiwal", year: "2019" },
  ],

  languages: [
    { name: "English", level: "Conversational" },
    { name: "Urdu", level: "Native" },
    { name: "Punjabi", level: "Native" },
  ],

  lab: [
    { title: "Noise Field", description: "Perlin noise particle system — mouse controls turbulence", component: "NoiseField" },
    { title: "Ray Marching", description: "GLSL ray marching shader rendering abstract SDF geometry", component: "RayMarcher" },
    { title: "Physics Sim", description: "Spring-driven floating geometry — drag to disturb", component: "PhysicsSim" },
    { title: "Typographic Glitch", description: "Text that glitches, tears, and reassembles on hover", component: "TypoGlitch" },
  ],

  terminal: {
    welcomeMessage: [
      "  ██████████████████████████████████████",
      "  █                                    █",
      "  █   AFAQ AHMAD :: FULL STACK DEV     █",
      "  █   Faisalabad, Pakistan            █",
      "  █   afaq.dev.js@gmail.com           █",
      "  █                                    █",
      "  ██████████████████████████████████████",
      "",
      "  Type `help` to list all commands.",
      "  Type `ask [your question]` to chat with AI.",
    ].join("\n"),
    systemPrompt:
      "You are the AI assistant embedded in Afaq Ahmad's developer portfolio terminal. Afaq is a Full Stack Developer based in Faisalabad, Pakistan with 2+ years of professional experience. He has built production applications: Sogauto (car-selling platform with multi-language support), ScamJam (scam reporting + subscription platform), FindSocial (social media analytics platform at Eprecisio Technologies), Dentwise (AI dental appointment platform with voice assistant), and Barnvest (goods management dashboard). His primary stack includes Next.js, React, TypeScript, Node.js, FastAPI, Python, PostgreSQL, MongoDB, Redis, Docker, and more. He has experience with Stripe, Auth0, Clerk, Vapi, Resend, AWS (S3, SES, ECS), and Kubernetes. He completed his BSCS from Virtual University Pakistan in 2024. Answer any questions about Afaq, his projects, skills, experience, or background in a helpful, concise, terminal-style manner. Keep responses punchy and developer-friendly.",
  },

  fortunes: [
    "Started with a div. Now I containerize microservices. Growth.",
    "The best error message is the one that never shows up.",
    "Ship it. You can refactor in prod... I mean, in the next sprint.",
    "PostgreSQL: because your data deserves ACID.",
    "There are two hard things in CS: cache invalidation, naming things, and off-by-one errors.",
    "I don't just write code — I architect experiences.",
    "async/await: turning callback hell into callback purgatory.",
    "Faisalabad runs on chai and clean architecture.",
  ],

  nav: [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "SKILLS", href: "/skills" },
    { label: "LAB", href: "/lab" },
    { label: "WORK", href: "/case-studies" },
    { label: "ARCHIVE", href: "/archive" },
    { label: "CONTACT", href: "/contact" },
    { label: "TERMINAL", href: "/terminal" },
  ],
} as const;

export type PortfolioData = typeof PORTFOLIO_DATA;
