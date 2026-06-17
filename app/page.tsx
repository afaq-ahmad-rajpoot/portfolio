"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { PORTFOLIO_DATA } from "@/lib/data";
import Typewriter from "@/components/ui/Typewriter";
import { ScrambleText } from "@/components/ui/Scramble";
import Reveal from "@/components/sections/Reveal";

const HeroParticles = dynamic(() => import("@/components/three/HeroParticles"), { ssr: false });
const Wireframe = dynamic(() => import("@/components/three/Wireframe"), { ssr: false });
const TechOrbit = dynamic(() => import("@/components/three/TechOrbit"), { ssr: false });
const Waveform = dynamic(() => import("@/components/three/Waveform"), { ssr: false });

const STACK_LINES = [
  "npm install next react typescript tailwindcss",
  "pip install fastapi redis pandas openpyxl",
  "npm install prisma sequelize stripe @clerk/nextjs",
  "docker compose up -d  # postgres mongo redis",
];

export default function Home() {
  const { personal } = PORTFOLIO_DATA;
  const waveProgress = useRef(0);
  const waveSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = waveSectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const p = 1 - rect.bottom / (window.innerHeight + rect.height);
      waveProgress.current = Math.min(Math.max(p, 0), 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative">
      {/* ===== HERO ===== */}
      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
        <HeroParticles />
        <div className="relative z-10 px-6 text-center">
          <h1 className="font-display text-[clamp(3rem,12vw,10rem)] font-extrabold leading-[0.9] tracking-tight text-white glow">
            <ScrambleText text="AFAQ AHMAD" autoOnMount as="span" />
          </h1>
          <p className="mt-2 font-display text-[clamp(1.2rem,4vw,2.6rem)] font-light text-electric glow-blue">
            {personal.title}
          </p>
          <p className="mt-6 font-mono text-sm text-phosphor/80 sm:text-base">
            <Typewriter text={personal.tagline} startDelay={900} />
          </p>
        </div>
        <Link
          href="#work"
          className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-blink font-mono text-xs uppercase tracking-[0.3em] text-phosphor"
        >
          ↓ SCROLL TO ENTER SYSTEM
        </Link>
      </section>

      {/* ===== REVEAL 1 — THE WORK ===== */}
      <section id="work" className="relative flex min-h-screen items-center overflow-hidden py-24">
        <Wireframe />
        <span className="section-stamp -top-10 right-4">01</span>
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-phosphor/60">
              [ 01 ] // THE WORK
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-white sm:text-6xl">
              Production systems, <span className="text-phosphor glow">shipped.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 border border-phosphor/30 bg-black/50 p-6 backdrop-blur-sm sm:p-10">
              <p className="font-mono text-xs uppercase tracking-widest text-electric">
                FEATURED :: FindSocial
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-white sm:text-4xl">
                Social Media Discovery &amp; Analytics Platform
              </h3>
              <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-phosphor/70">
                High-performance FastAPI backend, Redis task queues, WebSocket real-time job
                tracking, multi-platform scraping, and a modern Next.js frontend — handling
                high-concurrency analytics workloads.
              </p>
              <Link
                href="/case-studies"
                className="mt-6 inline-block btn-flicker px-5 py-2 font-mono text-xs uppercase tracking-widest interactive"
              >
                EXPLORE WORK →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== REVEAL 2 — THE STACK ===== */}
      <section className="relative flex min-h-screen items-center overflow-hidden py-24">
        <TechOrbit />
        <span className="section-stamp -top-10 left-4">02</span>
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-phosphor/60">
              [ 02 ] // THE STACK
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 border border-phosphor/30 bg-black/70 backdrop-blur-sm">
              <div className="flex items-center gap-2 border-b border-phosphor/20 px-4 py-2">
                <span className="h-3 w-3 rounded-full bg-danger" />
                <span className="h-3 w-3 rounded-full bg-amber" />
                <span className="h-3 w-3 rounded-full bg-phosphor" />
                <span className="ml-3 font-mono text-[11px] text-phosphor/50">
                  afaq@stack: ~/install
                </span>
              </div>
              <div className="space-y-2 p-5 font-mono text-xs sm:text-sm">
                {STACK_LINES.map((line) => (
                  <p key={line} className="text-phosphor/80">
                    <span className="text-electric">$</span> {line}
                  </p>
                ))}
                <p className="text-phosphor glow">✓ environment ready — 0 vulnerabilities</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== REVEAL 3 — THE SIGNAL ===== */}
      <section
        ref={waveSectionRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden py-24"
      >
        <Waveform progress={waveProgress} />
        <span className="section-stamp -top-10 right-4">03</span>
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-phosphor/60">
              [ 03 ] // THE SIGNAL
            </p>
            <p className="mt-6 font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
              &ldquo;I don&apos;t just write code —<br />I architect{" "}
              <span className="text-electric glow-blue">experiences.</span>&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== REVEAL 4 — CTA ===== */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-24">
        <HeroParticles count={4000} />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-4xl font-bold text-white sm:text-6xl">
              Ready to <span className="text-phosphor glow">connect?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/case-studies"
                className="btn-flicker px-8 py-3 font-mono text-sm uppercase tracking-widest interactive"
              >
                EXPLORE WORK →
              </Link>
              <Link
                href="/terminal"
                className="btn-flicker px-8 py-3 font-mono text-sm uppercase tracking-widest interactive"
                style={{ borderColor: "var(--electric)", color: "var(--electric)" }}
              >
                OPEN TERMINAL &gt;_
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
