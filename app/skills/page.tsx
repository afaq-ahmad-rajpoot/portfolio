"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PORTFOLIO_DATA } from "@/lib/data";
import Reveal from "@/components/sections/Reveal";
import SkillBar from "@/components/ui/SkillBar";
import RadarChart from "@/components/ui/RadarChart";
import { ScrambleText } from "@/components/ui/Scramble";

const SkillsCluster = dynamic(() => import("@/components/three/SkillsCluster"), { ssr: false });

export default function SkillsPage() {
  const { skills } = PORTFOLIO_DATA;
  const [active, setActive] = useState(skills[0].category);
  const activeGroup = skills.find((s) => s.category === active) ?? skills[0];

  return (
    <div className="relative min-h-screen pt-14">
      {/* 3D cluster background */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
        <SkillsCluster activeCategory={active} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-phosphor/60">
            // SYSTEM RESOURCE MONITOR
          </p>
          <h1 className="mt-3 font-display text-5xl font-extrabold text-white glow sm:text-7xl">
            <ScrambleText text="SKILLS" autoOnMount />
          </h1>
        </Reveal>

        {/* Category tabs */}
        <div className="mt-10 flex flex-wrap gap-2">
          {skills.map((s) => (
            <button
              key={s.category}
              onClick={() => setActive(s.category)}
              className={`btn-flicker px-4 py-2 font-mono text-xs uppercase tracking-widest interactive ${
                active === s.category ? "bg-phosphor/15 text-phosphor" : "text-phosphor/50"
              }`}
            >
              {s.category}
            </button>
          ))}
        </div>

        {/* Skill bars */}
        <div className="mt-8 border border-phosphor/20 bg-black/70 p-5 backdrop-blur-sm sm:p-8">
          <p className="mb-4 font-mono text-xs text-electric">
            afaq@skills:~$ cat {activeGroup.category.toLowerCase()}.json
          </p>
          <div className="space-y-3">
            {activeGroup.items.map((item) => (
              <SkillBar key={item.name} name={item.name} level={item.level} />
            ))}
          </div>
        </div>

        {/* Radar */}
        <Reveal>
          <div className="mt-20 text-center">
            <h2 className="mb-2 font-mono text-sm uppercase tracking-widest text-electric">
              :: CORE COMPETENCY MATRIX
            </h2>
            <div className="mt-6 border border-phosphor/20 bg-black/50 p-6 backdrop-blur-sm">
              <RadarChart />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
