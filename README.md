# █ AFAQ.DEV — Cyberpunk Developer Portfolio

An immersive, multi-page portfolio for **Afaq Ahmad — Full Stack Developer**, built as a dark
cyberpunk / hacker-terminal experience. Next.js 14 (App Router) + Three.js (R3F) + GSAP + Lenis
+ an interactive AI terminal powered by the Claude API.

```
AFAQ AHMAD :: Full Stack Developer :: Faisalabad, Pakistan
// building systems that scale, interfaces that feel.
```

## ✦ Features

- **Boot sequence** — fake OS boot on first visit (sessionStorage gated)
- **Custom crosshair cursor** with trailing ghost
- **Lenis smooth scroll** synced to the GSAP ticker
- **Framer Motion page transitions** (scanline / glitch reveal between routes)
- **8 routes**, each with its own Three.js scene:
  - `/` — 50k-ish particle neural cloud (custom GLSL) + scroll reveals (wireframe, tech orbit, waveform)
  - `/about` — abstract wireframe head, animated counters, timeline, CLASSIFIED stamp
  - `/skills` — floating geometry cluster, terminal skill bars, SVG radar matrix
  - `/lab` — live WebGL experiments (noise field, ray marcher, spring physics, typo glitch) with fullscreen
  - `/contact` — point-cloud globe with a firing arc + terminal-style form (Resend)
  - `/case-studies` — scroll-driven 3D corridor of project panels → `/case-studies/[slug]` overlays
  - `/archive` — draggable Windows 95 desktop embedding the original portfolio
  - `/terminal` — full xterm.js terminal: 20+ commands, history, tab-completion, AI chat, matrix, easter eggs
- **Konami code** (↑↑↓↓←→←→BA) triggers a site-wide Matrix rain
- **Reduced-motion aware**, keyboard-navigable, phosphor focus rings
- All content lives in [`lib/data.ts`](lib/data.ts) — a single typed source of truth

## ✦ Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router, TypeScript) |
| 3D / WebGL | Three.js · @react-three/fiber · @react-three/drei · custom GLSL |
| Animation | GSAP 3 + ScrollTrigger · Framer Motion |
| Smooth scroll | Lenis |
| Terminal | @xterm/xterm |
| AI | Anthropic Claude API (`/api/terminal`) |
| Email | Resend (`/api/contact`) |
| Styling | Tailwind CSS + CSS custom properties |

> Note: Tailwind **v3** is used (rock-solid with Next 14). GLSL shaders are inlined as TS strings
> in [`lib/shaders.ts`](lib/shaders.ts) to avoid an extra webpack loader.

## ✦ Getting Started

```bash
# 1. Install
npm install

# 2. Configure env
cp .env.example .env.local
#   then fill in ANTHROPIC_API_KEY and RESEND_API_KEY (both optional for local browsing)

# 3. Dev
npm run dev      # http://localhost:3000

# 4. Production
npm run build && npm start
```

The site runs fully without API keys — the **AI terminal** shows an offline notice and the
**contact form** logs submissions server-side instead of emailing until keys are provided.

## ✦ Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `ANTHROPIC_API_KEY` | for AI chat | Powers `ask`/`chat` in the terminal via Claude |
| `RESEND_API_KEY` | for email | Sends contact-form submissions |
| `CONTACT_FROM` | optional | Verified Resend sender (defaults to `onboarding@resend.dev`) |
| `CONTACT_EMAIL` | optional | Inbox for submissions (defaults to `afaq.dev.js@gmail.com`) |
| `NEXT_PUBLIC_SITE_URL` | optional | Canonical URL for metadata |

## ✦ Terminal Commands

`help` · `whoami` · `ls` · `cat about.txt` · `cat resume.pdf` · `ls projects/` ·
`cat projects/<slug>` · `skills --list` · `skills --json` · `contact` · `neofetch` ·
`cd <page>` · `open <url>` · `ask <question>` · `chat` · `theme <matrix|amber|blue|white>` ·
`matrix` · `snake` · `hack` · `fortune` · `ping afaq.dev` · `ssh pakistan` · `clear`

Hidden: `ls -la .secrets` · `cat .secrets/story.txt` · `decrypt` · `cat .env` · `sudo rm -rf /` · `konami`

## ✦ Deployment

Optimised for **Vercel** (serverless API routes for the terminal + contact). Push to GitHub and
import the repo, or:

```bash
npm i -g vercel && vercel
```

Add the env vars in the Vercel dashboard. CI (lint + typecheck + build) runs via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## ✦ Project Structure

```
app/            routes (home, about, skills, lab, contact, case-studies, archive, terminal) + api/
components/
  three/        R3F scenes (HeroParticles, Wireframe, TechOrbit, Waveform, Globe, ProjectRoom, ...)
  terminal/     xterm.js wrapper + command parser
  ui/           Cursor, Nav, StatusBar, transitions, Win95 windows, etc.
  sections/     scroll-reveal helpers
lib/            data.ts (content) · gsap.ts · shaders.ts
```

---

Built by Afaq Ahmad · `afaq.dev.js@gmail.com`
# portfolio
