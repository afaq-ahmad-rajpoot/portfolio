"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { PORTFOLIO_DATA } from "@/lib/data";
import Reveal from "@/components/sections/Reveal";
import Counter from "@/components/ui/Counter";
import LinkedInProfileCard from "@/components/ui/LinkedInProfileCard";
import { ScrambleText } from "@/components/ui/Scramble";

const AbstractHead = dynamic(() => import("@/components/three/AbstractHead"), { ssr: false });

export default function AboutPage() {
  const { personal, stats, timeline } = PORTFOLIO_DATA;
  const [stamped, setStamped] = useState(true);

  useEffect(() => {
    setStamped(false);
    const t = setTimeout(() => setStamped(true), 1300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative pt-14">
      {/* CLASSIFIED stamp intro */}
      {!stamped && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black">
          <span className="rotate-[-12deg] border-4 border-danger px-8 py-3 font-display text-5xl font-extrabold uppercase tracking-widest text-danger animate-flicker">
            CLASSIFIED
          </span>
        </div>
      )}

      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left: 3D head (sticky) */}
        <div className="relative hidden h-[70vh] lg:block">
          <div className="sticky top-24 h-[70vh]">
            <AbstractHead />
          </div>
        </div>

        {/* Right: content */}
        <div className="space-y-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-phosphor/60">
              // DOSSIER
            </p>
            <h1 className="mt-3 font-display text-5xl font-extrabold text-white glow sm:text-7xl">
              <ScrambleText text="ABOUT" autoOnMount />
            </h1>
          </Reveal>

          {/* SUBJECT */}
          <Reveal>
            <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-electric">
              :: SUBJECT
            </h2>
            <pre className="whitespace-pre-wrap border border-phosphor/20 bg-black/50 p-5 font-mono text-sm text-phosphor/80">
{`NAME     :: ${personal.name}
ROLE     :: ${personal.title}
STATUS   :: Available for work
LOC      :: ${personal.location}`}
            </pre>
          </Reveal>

          <Reveal>
            <LinkedInProfileCard />
          </Reveal>

          {/* BIOGRAPHY */}
          <Reveal>
            <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-electric">
              :: BIOGRAPHY
            </h2>
            <div className="space-y-4">
              {personal.bio.map((para, i) => (
                <p key={i} className="font-mono text-sm leading-relaxed text-phosphor/75">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          {/* STATISTICS */}
          <Reveal>
            <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-electric">
              :: STATISTICS
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="border border-phosphor/20 bg-black/50 p-4">
                  <div className="font-display text-3xl font-bold text-phosphor glow">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-phosphor/50">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* TIMELINE */}
          <Reveal>
            <h2 className="mb-6 font-mono text-sm uppercase tracking-widest text-electric">
              :: TIMELINE
            </h2>
            <ol className="relative space-y-6 border-l border-phosphor/20 pl-6">
              {timeline.map((t, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border border-phosphor bg-black" />
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-sm font-bold text-phosphor">{t.year}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-electric/70">
                      [{t.type}]
                    </span>
                  </div>
                  <h3 className="mt-1 font-display text-lg font-semibold text-white">{t.title}</h3>
                  <p className="mt-1 font-mono text-xs leading-relaxed text-phosphor/60">
                    {t.description}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* CURRENTLY */}
          <Reveal>
            <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-electric">
              :: CURRENTLY
            </h2>
            <div className="space-y-3 border border-phosphor/20 bg-black/50 p-5 font-mono text-sm">
              <p className="flex items-start gap-2 text-phosphor/80">
                <span className="mt-1 inline-block h-2 w-2 animate-pulse-dot rounded-full bg-phosphor" />
                <span><span className="text-electric">BUILDING</span> :: {personal.currentlyBuilding}</span>
              </p>
              <p className="flex items-start gap-2 text-phosphor/80">
                <span className="mt-1 inline-block h-2 w-2 animate-pulse-dot rounded-full bg-phosphor" />
                <span><span className="text-electric">LEARNING</span> :: {personal.currentlyLearning}</span>
              </p>
              <p className="flex items-start gap-2 text-phosphor/80">
                <span className="mt-1 inline-block h-2 w-2 animate-pulse-dot rounded-full bg-phosphor" />
                <span><span className="text-electric">READING</span>  :: {personal.currentlyReading}</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
