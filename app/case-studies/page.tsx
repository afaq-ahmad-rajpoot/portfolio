"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/lib/data";

const ProjectRoom = dynamic(() => import("@/components/three/ProjectRoom"), { ssr: false });

export default function CaseStudiesPage() {
  return (
    <div className="relative">
      <ProjectRoom />

      {/* Fixed HUD */}
      <div className="pointer-events-none fixed left-6 top-20 z-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-phosphor/60">
          // PROJECT ARCHIVE — SERVER ROOM
        </p>
        <h1 className="mt-2 font-display text-4xl font-extrabold text-white glow sm:text-6xl">
          CASE STUDIES
        </h1>
        <p className="mt-2 font-mono text-xs text-phosphor/50">
          Scroll to travel the corridor · click a panel to open
        </p>
      </div>

      {/* Scroll spacer to drive the camera */}
      <div style={{ height: `${PORTFOLIO_DATA.projects.length * 100}vh` }} />

      {/* Fallback text list (accessible / no-WebGL) */}
      <nav className="pointer-events-auto fixed bottom-10 left-1/2 z-10 hidden -translate-x-1/2 gap-3 md:flex">
        {PORTFOLIO_DATA.projects.map((p) => (
          <Link
            key={p.slug}
            href={`/case-studies/${p.slug}`}
            className="btn-flicker px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest interactive"
          >
            {p.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
