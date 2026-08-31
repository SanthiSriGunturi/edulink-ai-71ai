export type Role = "student" | "university" | "recruiter";

export const student = {
  name: "Rahul Sharma",
  program: "B.Tech Computer Science, 2026",
  college: "NIT Jamshedpur",
  verified: true,
  readiness: 78,
  skills: ["React", "Node.js", "JavaScript", "SQL", "Git", "Python"],
};

export type TargetRole = {
  id: string;
  label: string;
  skills: { skill: string; demand: number; you: number }[];
  courses: { title: string; provider: string; weeks: number }[];
};

export const targetRoles: TargetRole[] = [
  {
    id: "fullstack",
    label: "Full Stack Developer",
    skills: [
      { skill: "React", demand: 95, you: 88 },
      { skill: "Node.js", demand: 90, you: 80 },
      { skill: "Docker", demand: 85, you: 20 },
      { skill: "Vector DB", demand: 70, you: 10 },
      { skill: "SQL", demand: 80, you: 72 },
      { skill: "CI/CD", demand: 75, you: 30 },
    ],
    courses: [
      { title: "Docker & Containers in Practice", provider: "NPTEL x AWS", weeks: 4 },
      { title: "Vector Databases with pgvector", provider: "EduLink Labs", weeks: 3 },
      { title: "CI/CD with GitHub Actions", provider: "Infosys Springboard", weeks: 2 },
    ],
  },
  {
    id: "data",
    label: "Data Engineer",
    skills: [
      { skill: "Python", demand: 95, you: 74 },
      { skill: "SQL", demand: 92, you: 72 },
      { skill: "Spark", demand: 84, you: 15 },
      { skill: "Airflow", demand: 76, you: 12 },
      { skill: "Cloud", demand: 88, you: 34 },
      { skill: "Warehousing", demand: 80, you: 40 },
    ],
    courses: [
      { title: "Apache Spark Fundamentals", provider: "Databricks Academy", weeks: 5 },
      { title: "Orchestration with Airflow", provider: "EduLink Labs", weeks: 3 },
      { title: "Azure Data Fundamentals", provider: "Microsoft Learn", weeks: 4 },
    ],
  },
  {
    id: "devops",
    label: "Cloud / DevOps Engineer",
    skills: [
      { skill: "Linux", demand: 90, you: 55 },
      { skill: "Docker", demand: 94, you: 20 },
      { skill: "Kubernetes", demand: 88, you: 10 },
      { skill: "Terraform", demand: 78, you: 8 },
      { skill: "CI/CD", demand: 86, you: 30 },
      { skill: "Monitoring", demand: 70, you: 25 },
    ],
    courses: [
      { title: "Kubernetes for Developers", provider: "CNCF x EduLink", weeks: 6 },
      { title: "Infrastructure as Code: Terraform", provider: "HashiCorp", weeks: 4 },
      { title: "Observability with Grafana", provider: "EduLink Labs", weeks: 2 },
    ],
  },
];

export const internships = [
  {
    id: 1,
    company: "Tata Consultancy Services",
    role: "Full Stack Intern",
    location: "Ranchi, Jharkhand",
    stipend: "₹35,000 / month",
    match: 92,
    skills: ["React", "Node.js", "SQL"],
    verified: true,
  },
  {
    id: 2,
    company: "Infosys Digital",
    role: "Cloud Platform Trainee",
    location: "Remote (India)",
    stipend: "₹28,000 / month",
    match: 74,
    skills: ["Docker", "AWS", "Linux"],
    verified: true,
  },
  {
    id: 3,
    company: "Zoho Corporation",
    role: "Backend Engineering Intern",
    location: "Chennai",
    stipend: "₹40,000 / month",
    match: 81,
    skills: ["Node.js", "PostgreSQL", "REST"],
    verified: true,
  },
  {
    id: 4,
    company: "Tata Steel Digital",
    role: "Data Engineering Intern",
    location: "Jamshedpur, Jharkhand",
    stipend: "₹32,000 / month",
    match: 66,
    skills: ["Python", "Spark", "SQL"],
    verified: true,
  },
];

export const kpis = [
  { label: "Total Enrolled", value: "1,200", sub: "Across 6 departments", trend: "+8% YoY" },
  { label: "Active Placed", value: "68%", sub: "816 students placed", trend: "+5% YoY" },
  {
    label: "Top Skill Deficit",
    value: "Cloud Native & DevOps",
    sub: "Detected in 45% of postings",
    trend: "Critical",
  },
  { label: "Average Match Score", value: "72%", sub: "vs. recruiter demand", trend: "+3 pts" },
];

export const deficits = [
  { skill: "Kubernetes & Containers", demand: 78, supply: 21, gap: 57, industry: "IT Services" },
  { skill: "Vector Databases / RAG", demand: 64, supply: 12, gap: 52, industry: "AI Products" },
  { skill: "Cloud Security", demand: 59, supply: 18, gap: 41, industry: "BFSI" },
  { skill: "IoT & Edge Analytics", demand: 47, supply: 19, gap: 28, industry: "Manufacturing" },
  { skill: "System Design", demand: 71, supply: 46, gap: 25, industry: "Product Cos." },
];

export const syllabusRecos = [
  {
    course: "CS304 — Legacy Database Systems",
    action: "Replace",
    with: "Vector Databases & Distributed Systems",
    rationale: "45% of regional hiring now requires vector search / RAG exposure.",
    impact: "High",
  },
  {
    course: "CS411 — Software Engineering",
    action: "Augment",
    with: "Containerised Delivery & CI/CD Lab",
    rationale: "78% of recruiters list Docker/K8s as a screening filter.",
    impact: "High",
  },
  {
    course: "EL220 — Microprocessors",
    action: "Augment",
    with: "Edge Analytics for Industrial IoT",
    rationale: "Manufacturing corridor in Jharkhand reports 28% supply gap.",
    impact: "Medium",
  },
];

export const candidates = [
  {
    id: 1,
    name: "Rahul Sharma",
    college: "NIT Jamshedpur",
    tier: "Tier 1",
    skills: ["React", "Node.js", "SQL"],
    match: 94,
    verified: true,
  },
  {
    id: 2,
    name: "Ananya Iyer",
    college: "IIIT Ranchi",
    tier: "Tier 1",
    skills: ["Python", "Spark", "AWS"],
    match: 91,
    verified: true,
  },
  {
    id: 3,
    name: "Md. Faizan Ansari",
    college: "BIT Sindri",
    tier: "Tier 2",
    skills: ["Docker", "Kubernetes", "Go"],
    match: 87,
    verified: true,
  },
  {
    id: 4,
    name: "Priya Mahato",
    college: "Ranchi University",
    tier: "Tier 3",
    skills: ["Java", "SQL", "Spring"],
    match: 73,
    verified: false,
  },
  {
    id: 5,
    name: "Karan Verma",
    college: "NIT Rourkela",
    tier: "Tier 1",
    skills: ["React", "TypeScript", "GraphQL"],
    match: 89,
    verified: true,
  },
  {
    id: 6,
    name: "Sneha Kujur",
    college: "BIT Mesra",
    tier: "Tier 2",
    skills: ["Python", "Pandas", "SQL"],
    match: 68,
    verified: true,
  },
];
