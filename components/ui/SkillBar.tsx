"use client";

import { useEffect, useRef, useState } from "react";

const FILLED = "█";
const EMPTY = "░";

export default function SkillBar({ name, level }: { name: string; level: number }) {
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / 1000, 1);
            setShown(Math.round(level * p));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [level]);

  const cells = Math.round(shown / 10);
  const bar = FILLED.repeat(cells) + EMPTY.repeat(10 - cells);

  return (
    <div ref={ref} className="flex items-center gap-3 font-mono text-xs sm:text-sm">
      <span className="w-44 shrink-0 text-phosphor/70">{name}</span>
      <span className="text-phosphor glow">[{bar}]</span>
      <span className="w-10 text-right text-electric">{shown}%</span>
    </div>
  );
}
