import { PORTFOLIO_DATA } from "@/lib/data";

export interface CommandContext {
  navigate: (path: string) => void;
  setTheme: (name: string) => void;
  startMatrix: () => void;
  startSnake: () => void;
  clear: () => void;
  print: (text: string) => void;
}

const { personal, projects, skills, fortunes } = PORTFOLIO_DATA;

const G = "\x1b[32m";
const C = "\x1b[36m";
const Y = "\x1b[33m";
const R = "\x1b[0m";
const B = "\x1b[1m";

function bar(level: number) {
  const cells = Math.round(level / 10);
  return "█".repeat(cells) + "░".repeat(10 - cells);
}

function projectDetail(slug: string): string {
  const p = projects.find((x) => x.slug === slug);
  if (!p) return `${Y}cat: ${slug}: No such project${R}`;
  return [
    `${B}${G}${p.title}${R} — ${p.tagline}`,
    `${C}company${R}  :: ${p.company} (${p.period})`,
    `${C}stack${R}    :: ${p.tech.join(", ")}`,
    `${C}problem${R}  :: ${p.problem}`,
    `${C}solution${R} :: ${p.solution}`,
    `${C}outcome${R}  :: ${p.outcome}`,
    p.liveUrl ? `${C}live${R}     :: ${p.liveUrl}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export const HELP_TEXT = [
  `${B}${G}AVAILABLE COMMANDS${R}`,
  "",
  `${C}whoami${R}            identity card`,
  `${C}ls${R}                list files`,
  `${C}cat about.txt${R}     about section`,
  `${C}cat resume.pdf${R}    resume (ascii)`,
  `${C}ls projects/${R}      list projects`,
  `${C}cat projects/<x>${R}  project details (sogauto, scamjam, findsocial, dentwise, barnvest)`,
  `${C}skills --list${R}     all skills with bars`,
  `${C}skills --json${R}     raw skills JSON`,
  `${C}contact${R}           contact info`,
  `${C}neofetch${R}          system info`,
  `${C}cd <page>${R}         navigate (about, skills, projects, lab, archive, contact)`,
  `${C}open <url>${R}        open a URL`,
  `${C}ask <question>${R}    chat with AI about Afaq`,
  `${C}theme <name>${R}      matrix | amber | blue | white`,
  `${C}matrix${R}            matrix rain`,
  `${C}snake${R}             play snake`,
  `${C}hack${R}              initiate sequence`,
  `${C}fortune${R}           dev wisdom`,
  `${C}ping afaq.dev${R}     ping`,
  `${C}ssh pakistan${R}      connect`,
  `${C}clear${R}             clear screen`,
  `${C}help${R}              this list`,
].join("\n");

const NEOFETCH = [
  `${G}        _____${R}        ${B}${G}afaq${R}@${B}${G}eprecisio${R}`,
  `${G}       /  _  \\${R}       ----------------`,
  `${G}      |  (_)  |${R}      ${C}OS${R}: AfaqOS v2.6`,
  `${G}      |   _   |${R}      ${C}Host${R}: Faisalabad, Pakistan`,
  `${G}      |  | |  |${R}      ${C}Uptime${R}: 2+ years dev experience`,
  `${G}      |__| |__|${R}      ${C}Shell${R}: JavaScript / Python`,
  `${G}              ${R}      ${C}Resolution${R}: 1920x1080`,
  `${G}              ${R}      ${C}CPU${R}: Brain @ 3.2GHz`,
  `${G}              ${R}      ${C}Memory${R}: PostgreSQL + MongoDB + Redis`,
  `${G}              ${R}      ${C}Stack${R}: Next.js / FastAPI / Docker`,
].join("\n");

const WHOAMI = [
  `${G} ▄▀█ █▀▀ ▄▀█ █▀█${R}`,
  `${G} █▀█ █▀░ █▀█ ▀▀█${R}`,
  "",
  `${B}Afaq Ahmad${R} :: ${personal.title}`,
  `${personal.location} · ${personal.email}`,
  `Building ${personal.currentlyBuilding}`,
].join("\n");

export function runCommand(input: string, ctx: CommandContext): string | null {
  const trimmed = input.trim();
  if (!trimmed) return "";
  const [cmd, ...args] = trimmed.split(/\s+/);
  const arg = args.join(" ");
  const lc = cmd.toLowerCase();

  switch (lc) {
    case "help":
      return HELP_TEXT;
    case "clear":
      ctx.clear();
      return null;
    case "whoami":
      return WHOAMI;
    case "neofetch":
      return NEOFETCH;
    case "ls":
      if (args[0] === "projects/" || args[0] === "projects")
        return projects.map((p) => `${G}${p.slug}${R}`).join("  ");
      if (args[0] === "-la" && args[1] === ".secrets")
        return `${Y}.secrets/story.txt   .env   .konami${R}`;
      return `${C}about.txt  projects/  skills.json  contact.sh  resume.pdf${R}`;
    case "cat": {
      const target = args[0] || "";
      if (target === "about.txt")
        return personal.bio.join("\n\n");
      if (target === "resume.pdf")
        return [
          `${B}${G}AFAQ AHMAD — ${personal.title}${R}`,
          `${personal.location} | ${personal.email} | ${personal.phone}`,
          "",
          `${C}EXPERIENCE${R}`,
          ...PORTFOLIO_DATA.experience.map((e) => `  • ${e.role} @ ${e.company} (${e.period})`),
          "",
          `${C}EDUCATION${R}`,
          ...PORTFOLIO_DATA.education.map((e) => `  • ${e.degree} — ${e.institution} (${e.year})`),
        ].join("\n");
      if (target.startsWith("projects/"))
        return projectDetail(target.replace("projects/", ""));
      if (target === ".env")
        return `${Y}Nice try. Env vars are in Vercel. 😄${R}`;
      if (target === ".secrets/story.txt")
        return `${G}Started with a div. Now I containerize microservices. Growth.${R}`;
      return `${Y}cat: ${target}: No such file or directory${R}`;
    }
    case "skills":
      if (args[0] === "--json")
        return JSON.stringify(skills, null, 2);
      return skills
        .map(
          (c) =>
            `${B}${C}${c.category}${R}\n` +
            c.items.map((it) => `  ${it.name.padEnd(20)} [${G}${bar(it.level)}${R}] ${it.level}%`).join("\n")
        )
        .join("\n\n");
    case "contact":
      return `${G}${personal.email}${R} | ${personal.phone} | ${personal.linkedin} | ${personal.github}`;
    case "cd": {
      const map: Record<string, string> = {
        about: "/about",
        skills: "/skills",
        projects: "/case-studies",
        "case-studies": "/case-studies",
        lab: "/lab",
        archive: "/archive",
        contact: "/contact",
        home: "/",
        "~": "/",
      };
      const dest = map[args[0]?.toLowerCase()];
      if (dest) {
        ctx.navigate(dest);
        return `${G}Navigating to ${dest}...${R}`;
      }
      return `${Y}cd: ${args[0] || ""}: No such directory${R}`;
    }
    case "open":
      if (arg) {
        const url = arg.startsWith("http") ? arg : `https://${arg}`;
        if (typeof window !== "undefined") window.open(url, "_blank");
        return `${G}Opening ${url}...${R}`;
      }
      return `${Y}open: missing url${R}`;
    case "theme":
      if (["matrix", "amber", "blue", "white", "perf"].includes(args[0])) {
        ctx.setTheme(args[0]);
        return `${G}Theme set to ${args[0]}.${R}`;
      }
      return `${Y}theme: available -> matrix | amber | blue | white${R}`;
    case "matrix":
      ctx.startMatrix();
      return `${G}Entering the matrix...${R}`;
    case "snake":
      ctx.startSnake();
      return `${G}Loading SNAKE.exe... use arrow keys. Press Q to quit.${R}`;
    case "hack":
      return [
        `${G}Initializing exploit...${R}`,
        `${G}[████████████████████] 100%${R}`,
        `${G}Bypassing firewall... done${R}`,
        `${B}${G}ACCESS GRANTED :: Welcome to Afaq's system${R}`,
      ].join("\n");
    case "fortune":
      return `${C}"${fortunes[Math.floor(Math.random() * fortunes.length)]}"${R}`;
    case "ping":
      return `${G}Reply from afaq.dev: bytes=32 time=1ms TTL=128${R}`;
    case "ssh":
      if (args[0] === "pakistan")
        return `${G}Connecting to Faisalabad... [████████] Connected. It's hot here.${R}`;
      return `${Y}ssh: could not resolve host ${args[0] || ""}${R}`;
    case "konami":
      return `${G}↑↑↓↓←→←→BA — try it anywhere on the site. 🎮${R}`;
    case "decrypt":
      return `${Y}Decrypting... ERROR: The real treasure was the code we shipped along the way.${R}`;
    case "sudo":
      if (arg.includes("rm -rf"))
        return `${R}Nice try. This system has been hardened. -- Afaq`;
      return `${Y}sudo: permission denied${R}`;
    case "ask":
      return null; // handled async in component
    default:
      return `${Y}command not found: ${cmd}. Type 'help' for commands.${R}`;
  }
}

export const COMMAND_NAMES = [
  "help", "whoami", "ls", "cat", "skills", "contact", "neofetch", "cd",
  "open", "ask", "theme", "matrix", "snake", "hack", "fortune", "ping",
  "ssh", "clear",
];
