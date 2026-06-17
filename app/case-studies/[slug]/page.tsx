"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/data";

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const project = PORTFOLIO_DATA.projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  const blocks: { label: string; text: string }[] = [
    { label: "PROBLEM", text: project.problem },
    { label: "SOLUTION", text: project.solution },
    { label: "OUTCOME", text: project.outcome },
  ];

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen bg-bg pt-14"
    >
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/case-studies"
          className="link-underline font-mono text-xs uppercase tracking-widest text-phosphor/60"
        >
          ← BACK TO CORRIDOR
        </Link>

        <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-electric">
          {project.company} · {project.period}
        </p>
        <h1 className="mt-3 font-display text-5xl font-extrabold text-white glow sm:text-7xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl font-mono text-sm text-phosphor/70">{project.tagline}</p>

        {/* Tech badges */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="border border-phosphor/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-phosphor/80"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Narrative */}
        <div className="mt-12 space-y-10">
          {blocks.map((b) => (
            <div key={b.label} className="border-l-2 border-phosphor/40 pl-5">
              <h2 className="font-mono text-sm uppercase tracking-widest text-electric">
                :: {b.label}
              </h2>
              <p className="mt-2 font-mono text-sm leading-relaxed text-phosphor/75">{b.text}</p>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="mt-12 flex flex-wrap gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-flicker px-6 py-3 font-mono text-xs uppercase tracking-widest interactive"
            >
              VISIT LIVE ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-flicker px-6 py-3 font-mono text-xs uppercase tracking-widest interactive"
            >
              SOURCE CODE
            </a>
          )}
        </div>

        {/* Prev/next */}
        <div className="mt-16 flex justify-between font-mono text-xs">
          {PORTFOLIO_DATA.projects.map((p, i) =>
            p.slug === slug ? (
              <span key="nav" className="contents">
                {i > 0 && (
                  <Link
                    href={`/case-studies/${PORTFOLIO_DATA.projects[i - 1].slug}`}
                    className="link-underline text-phosphor/60"
                  >
                    ← {PORTFOLIO_DATA.projects[i - 1].title}
                  </Link>
                )}
                <span className="flex-1" />
                {i < PORTFOLIO_DATA.projects.length - 1 && (
                  <Link
                    href={`/case-studies/${PORTFOLIO_DATA.projects[i + 1].slug}`}
                    className="link-underline text-phosphor/60"
                  >
                    {PORTFOLIO_DATA.projects[i + 1].title} →
                  </Link>
                )}
              </span>
            ) : null
          )}
        </div>
      </div>
    </motion.div>
  );
}
