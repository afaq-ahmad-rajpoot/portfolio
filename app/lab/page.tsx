"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PORTFOLIO_DATA } from "@/lib/data";
import Reveal from "@/components/sections/Reveal";
import { ScrambleText } from "@/components/ui/Scramble";

const LabScene = dynamic(() => import("@/components/three/LabScenes"), { ssr: false });

export default function LabPage() {
  const { lab } = PORTFOLIO_DATA;
  const [fullscreen, setFullscreen] = useState<string | null>(null);
  const active = lab.find((l) => l.component === fullscreen);

  return (
    <div className="relative min-h-screen pt-14">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-phosphor/60">
            // EXPERIMENTAL SANDBOX
          </p>
          <h1 className="mt-3 font-display text-5xl font-extrabold text-white glow sm:text-7xl">
            <ScrambleText text="LAB" autoOnMount />
          </h1>
          <p className="mt-4 max-w-xl font-mono text-sm text-phosphor/60">
            Live WebGL / shader experiments. Hover a card to interact — click to run fullscreen.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {lab.map((exp) => (
            <div
              key={exp.component}
              className="group relative h-72 overflow-hidden border border-phosphor/20 bg-black/50 interactive"
            >
              {exp.component === "TypoGlitch" ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-5xl font-extrabold text-phosphor transition-all duration-150 group-hover:rgb-split">
                    GL1TCH
                  </span>
                </div>
              ) : (
                <LabScene kind={exp.component} />
              )}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent p-5">
                <h3 className="font-display text-xl font-bold text-white">{exp.title}</h3>
                <p className="font-mono text-xs text-phosphor/60">{exp.description}</p>
                <button
                  onClick={() => setFullscreen(exp.component)}
                  className="mt-3 w-fit btn-flicker px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest opacity-0 transition-opacity group-hover:opacity-100"
                >
                  [ OPEN EXPERIMENT ]
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen takeover */}
      {fullscreen && (
        <div className="fixed inset-0 z-[150] bg-black">
          {fullscreen === "TypoGlitch" ? (
            <div className="flex h-full items-center justify-center">
              <span className="rgb-split font-display text-[12vw] font-extrabold text-phosphor">
                GL1TCH
              </span>
            </div>
          ) : (
            <LabScene kind={fullscreen} />
          )}
          <div className="pointer-events-none absolute left-6 top-20 font-mono text-xs text-phosphor/70">
            RUNNING :: {active?.title}
          </div>
          <button
            onClick={() => setFullscreen(null)}
            className="absolute right-6 top-20 btn-flicker px-4 py-2 font-mono text-xs uppercase tracking-widest interactive"
          >
            [ ESC / CLOSE ]
          </button>
        </div>
      )}
    </div>
  );
}
