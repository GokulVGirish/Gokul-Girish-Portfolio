// All portfolio copy lives here — edit this file to update the site.

export const profile = {
  name: 'Gokul V Girish',
  firstName: 'Gokul',
  role: 'Full-Stack Developer',
  location: 'Bangalore, India',
  email: 'gokulvgirish@gmail.com',
  phone: '+91 80751 59038',
  resume: '/resume/Gokul_V_Girish_Resume.pdf',
  portrait: '/assets/portrait.webp',
  portraitFallback: '/assets/portrait.png',
  socials: {
    github: 'https://github.com/GokulVGirish',
    linkedin: 'https://www.linkedin.com/in/gokul-girish-146b7429b/',
  },
  tagline: 'I build lending & FinTech platforms end to end — from database schema to delightful UI.',
  summary:
    'Full-stack engineer at Autovert Technologies working on production lending software for Ecofy Finance — a loan origination system on PHP (Filament), Node.js and PostgreSQL, plus borrower journeys for rooftop-solar and electric-vehicle (2W/3W) finance. Equally at home in React, Next.js and TypeScript, designing secure APIs, or crafting smooth GSAP motion.',
  status: [
    { label: 'Currently', value: 'Software Engineer @ Autovert Technologies' },
    { label: 'Building', value: 'Loan origination & lending journeys for Ecofy Finance' },
    // { label: 'Stack', value: 'React · Next.js · Node.js · PostgreSQL · AWS' },
  ],
}

export const stats = [
  { value: 15, suffix: '+', label: 'Projects worked on' },
  { value: 6, suffix: '', label: 'Lending platforms for Ecofy Finance' },
  { value: 1, suffix: 'M+', label: 'Records handled with indexed search' },
  { value: 30, suffix: '+', label: 'Tools & technologies' },
]

export const nav = [
  { id: 'about', label: 'Process' },
  { id: 'skills', label: 'Stack' },
  { id: 'experience', label: 'Journey' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

export const skillGroups = [
  {
    title: "Frontend",
    icon: "Layers",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux",
      "Tailwind CSS",
      "GSAP",
      "Framer Motion",
      "HTML5",
      "CSS3",
      "TanStack Query",
      "Zustand",
    ],
  },
  {
    title: "Backend",
    icon: "Server",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Socket.io",
      "WebRTC",
      "JWT Auth",
      "MVC",
      "Clean Architecture",
    ],
  },
  {
    title: "Data",
    icon: "Database",
    items: ["PostgreSQL", "MongoDB", "Firebase", "Indexing & Search"],
  },
  {
    title: "Cloud & Delivery",
    icon: "Cloud",
    items: [
      "AWS EC2",
      "AWS S3",
      "Vercel",
      "CI/CD",
      "Git",
      "Postman",
      "Networking",
    ],
  },
  {
    title: "Quality",
    icon: "ShieldCheck",
    items: [
      "Jest (Unit)",
      "Puppeteer (E2E)",
      "Functional Testing",
      "Security Testing",
      "Data Structures",
    ],
  },
];

export const marquee = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'PHP', 'Filament', 'Express', 'PostgreSQL', 'MongoDB',
  'GSAP', 'Tailwind CSS', 'Socket.io', 'WebRTC', 'AWS', 'Redux', 'Jest', 'Puppeteer', 'Vercel',
]

export const timeline = [
  {
    type: 'work',
    period: '2024 — Present',
    title: 'Software Engineer',
    org: 'Autovert Technologies Pvt. Ltd.',
    place: 'Bangalore, Karnataka',
    points: [
      'Part of the team building Galaxy LOS, the loan origination system used by parent company Ecofy Finance (PHP · Filament · Node.js · PostgreSQL).',
      'Built borrower-facing loan journeys for rooftop solar and electric 2-wheeler / 3-wheeler finance: multi-step onboarding with PAN verification.',
      'Designed, built and deployed the corporate website autovert.in with Next.js SSR/SSG and GSAP motion.',
      'Work across the stack in the banking & FinTech domain: database design, APIs and responsive React UI.',
    ],
    tags: ['PHP · Filament', 'Node.js', 'PostgreSQL', 'Next.js', 'GSAP'],
  },
  {
    type: 'work',
    period: '2023 — 2024',
    title: 'MERN Stack Development',
    org: 'Brototype',
    place: 'Kochi, Kerala',
    points: [
      'Completed intensive, project-driven full-stack training on MongoDB, Express, React and Node.',
      'Built Kalikaal (e-commerce) and Namaste Vibe (WebRTC video calls) from schema to deployment.',
      'Practised Clean Architecture, JWT auth, testing and AWS deployment workflows.',
    ],
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
  },
  {
    type: 'education',
    period: '2019 — 2022',
    title: 'BSc in Mathematics',
    org: 'SNM College, MG University',
    place: 'Kottayam, Kerala',
    points: ['A strong analytical foundation: logic, proofs and problem decomposition carried into algorithms and system design.'],
    tags: ['Analytical thinking', 'Problem solving'],
  },
]

export const projects = [
  {
    id: '01',
    name: 'Galaxy LOS',
    kicker: 'Loan origination system · Ecofy Finance',
    type: 'Professional · Team project',
    description:
      'The loan origination system used by Ecofy Finance, Autovert’s parent company, to move loan applications from lead to disbursal. I’m part of the team building it.',
    impact: [
      'Work queues for unallocated, newly allocated, WIP and TAT-breached cases',
      'Pipeline and analysis views tracking amounts across stages',
      'Role-based access, lead management, queries and notifications',
    ],
    tech: ['PHP', 'Filament', 'Node.js', 'PostgreSQL'],
    internal: true,
    accent: 'from-ember-500/30 via-fuchsia-500/10 to-transparent',
  },
  {
    id: '02',
    name: 'Clean-Energy Loan Journeys',
    kicker: 'Solar · E-2W · E-3W finance · Ecofy Finance',
    type: 'Professional',
    description:
      'Digital borrower journeys for Ecofy’s green-finance products: rooftop solar loans and electric two-wheeler and three-wheeler vehicle loans. Applicants move through guided steps from basic details to submission, with checks built in along the way.',
    impact: [
      'Journeys for three products: rooftop solar, electric 2-wheelers and 3-wheelers',
      'Step-by-step flow: basic info, company details, contact info',
      'Inline PAN verification and field-level validation to cut drop-off',
    ],
    tech: ['User journeys', 'PAN verification', 'Form validation', 'Responsive UI'],
    internal: true,
    accent: 'from-emerald-400/25 via-sky-400/10 to-transparent',
  },
  {
    id: '03',
    name: 'Autovert',
    kicker: 'Official company website',
    description:
      'The corporate web platform for Autovert Technologies, built for performance, search visibility and interactive visual storytelling.',
    impact: [
      'SSR + static generation tuned for Core Web Vitals',
      'Scroll-triggered GSAP motion & micro-interactions',
      'Modular, responsive component architecture',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'GSAP', 'Tailwind CSS'],
    type: 'Professional',
    live: 'https://autovert.in/',
    github: null,
    accent: 'from-ember-500/30 via-ember-600/10 to-transparent',
  },
  {
    id: '04',
    name: 'Kalikaal',
    type: 'Personal build',
    kicker: 'Fashion e-commerce store',
    description:
      'A full online clothing store with a customer storefront and an admin panel, migrated from MongoDB to a normalised PostgreSQL schema.',
    impact: [
      'Razorpay, wallet & COD checkout with coupons and best-offer engine',
      'Orders, refunds & stock updates wrapped in SQL transactions',
      'Admin analytics with Chart.js and CSV sales reports',
    ],
    tech: ['Node.js', 'Express', 'EJS', 'PostgreSQL', 'Razorpay', 'Chart.js'],
    live: null,
    github: 'https://github.com/GokulVGirish/kalikaal',
    accent: 'from-rose-400/25 via-ember-500/10 to-transparent',
  },
  {
    id: '05',
    name: 'Namaste Vibe',
    type: 'Personal build',
    kicker: 'Meet strangers instantly',
    description:
      'A real-time video calling platform connecting strangers, designed on Clean Architecture for scalability and low latency.',
    impact: [
      'Peer-to-peer WebRTC video with low latency',
      'Socket.IO chat & live call notifications',
      'Separated auth, video & messaging services',
    ],
    tech: ['Next.js', 'Express', 'WebRTC', 'Socket.IO', 'AWS EC2'],
    live: 'https://namaste-vibe.vercel.app/',
    github: 'https://github.com/GokulVGirish/NamasteVibe-Frontend',
    githubBackend: 'https://github.com/GokulVGirish/NamasteVibe-Backend',
    accent: 'from-amber-300/25 via-teal-400/10 to-transparent',
  },
]

export const miniProjects = [
  {
    name: 'Customer Manager',
    description:
      'React + TypeScript user management built to filter and search over 1M users, with MongoDB Atlas indexing and debounced queries.',
    tech: ['React', 'TypeScript', 'MongoDB Atlas'],
    github: 'https://github.com/GokulVGirish/SkyGoals-MachineTask-Backend',
  },
  {
    name: 'Snaplok Gallery',
    description:
      'Bulk image uploads to secure AWS S3 storage with JWT authentication, built on clean architecture principles.',
    tech: ['React', 'TypeScript', 'AWS S3', 'JWT'],
    github: 'https://github.com/GokulVGirish/SNAPLOK-GALLERY',
  },
]

export const pillars = [
  {
    icon: 'Server',
    title: 'Backend & data',
    text: 'REST APIs, auth, SQL transactions and schemas that hold up in production, on Node.js, PHP and PostgreSQL.',
    tags: ['Node.js', 'PHP · Filament', 'PostgreSQL', 'MongoDB'],
  },
  {
    icon: 'Layers',
    title: 'Frontend & motion',
    text: 'Fast, accessible React and Next.js interfaces with polished, purposeful GSAP animation.',
    tags: ['React', 'Next.js', 'TypeScript', 'GSAP'],
  },
  {
    icon: 'Landmark',
    title: 'FinTech product',
    text: 'Lending workflows, solar and EV loan onboarding, KYC checks and operations dashboards for a real NBFC.',
    tags: ['Loan origination', 'KYC / PAN', 'Dashboards'],
  },
]

/* ── "How I work" ─────────────────────────────────────────────
   One example feature (a password reset flow) followed from ticket to production. */
export const processSteps = [
  {
    key: 'scope',
    label: 'Scope',
    title: 'Break the ticket down before touching code.',
    text: 'I read the requirement, ask the questions nobody wrote down, agree on acceptance criteria, and split the work into tasks I can estimate.',
    tags: ['Requirements', 'Edge cases', 'Estimation'],
  },
  {
    key: 'design',
    label: 'Design',
    title: 'Agree on the data and the API contract first.',
    text: 'Schema changes go in as migrations, and endpoints, payloads and error codes are settled early so frontend and backend can move in parallel.',
    tags: ['PostgreSQL', 'Migrations', 'REST'],
  },
  {
    key: 'build',
    label: 'Build',
    title: 'Build on a branch, in small commits.',
    text: 'A feature branch with small, focused commits: the backend first, then the UI wired to real endpoints, so every commit leaves the app working.',
    tags: ['Git', 'Node.js', 'React'],
  },
  {
    key: 'verify',
    label: 'Verify',
    title: 'Test it, then let someone else try to break it.',
    text: 'Tests for the logic and the edge cases, a pull request with clear notes, and CI running lint, tests and build before anything gets merged.',
    tags: ['Jest', 'Code review', 'CI'],
  },
  {
    key: 'ship',
    label: 'Ship',
    title: 'Ship it, then watch it in production.',
    text: 'Merge, the pipeline deploys, and I keep an eye on logs and errors after the release. A feature is done when it works for real users.',
    tags: ['CI/CD', 'AWS · Vercel', 'Monitoring'],
  },
]

/* ── Stack orbit ──────────────────────────────────────────────────
   Inner rings spin faster. `abbr` is shown on small screens. */
export const orbitRings = [
  {
    name: 'Frontend',
    color: '#f5c48a',
    speed: 0.24,
    tools: [
      { name: 'React', abbr: 'Re', note: 'Component-driven interfaces, from this site to Zusand, a cookie-auth frontend built with TanStack Query.' },
      { name: 'Next.js', abbr: 'Nx', note: 'Routing, server rendering and SEO-friendly React apps.' },
      { name: 'TypeScript', abbr: 'TS', note: 'Typed props and API contracts, so bugs show up in the editor instead of in production.' },
      { name: 'Tailwind', abbr: 'Tw', note: 'Design tokens and fast, consistent styling. This whole site is Tailwind.' },
      { name: 'GSAP', abbr: 'GS', note: 'Scroll and interaction animation, including the pinned process section and this orbit.' },
    ],
  },
  {
    name: 'Backend',
    color: '#e8954a',
    speed: 0.16,
    tools: [
      { name: 'Node.js', abbr: 'No', note: 'REST APIs, auth flows and background jobs.' },
      { name: 'Express', abbr: 'Ex', note: 'Kalikaal, my first full web app: an online fashion store with EJS views and PostgreSQL.' },
      { name: 'REST APIs', abbr: 'RE', note: 'Predictable endpoints with validation, proper status codes and clear errors.' },
      { name: 'Socket.io', abbr: 'IO', note: 'Realtime features like live updates and chat.' },
      { name: 'JWT Auth', abbr: 'JW', note: 'Token and cookie-based authentication that stays secure.' },
    ],
  },
  {
    name: 'Data & cloud',
    color: '#bfb4a3',
    speed: 0.11,
    tools: [
      { name: 'PostgreSQL', abbr: 'PG', note: 'Relational schemas, migrations, transactions and reporting queries.' },
      { name: 'MongoDB', abbr: 'Mo', note: 'Document data for MERN projects.' },
      { name: 'AWS', abbr: 'AW', note: 'Hosting and file storage with EC2 and S3.' },
      { name: 'Vercel', abbr: 'Vc', note: 'Deploys for frontends, including this portfolio.' },
      { name: 'Git', abbr: 'Gt', note: 'Branches, reviews and a commit history that makes sense.' },
    ],
  },
]
