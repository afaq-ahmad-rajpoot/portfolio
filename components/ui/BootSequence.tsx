"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  "BIOS v2.6.1 ... OK",
  "Initializing memory ... [████████████] 100%",
  "Loading kernel modules ...",
  "  > portfolio.core       [LOADED]",
  "  > threejs.renderer     [LOADED]",
  "  > gsap.engine          [LOADED]",
  "  > identity.module      [LOADED]",
  "Mounting /home/afaq ...",
  "Full Stack Developer | Faisalabad, Pakistan",
  "Welcome. Type `help` to begin.",
];

export default function BootSequence() {
  const [done, setDone] = useState(true);
  const [shown, setShown] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("booted")) return;
    setDone(false);
    sessionStorage.setItem("booted", "1");

    let i = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const tick = () => {
      if (i >= LINES.length) {
        timers.push(setTimeout(() => setDone(true), 600));
        return;
      }
      setShown((prev) => [...prev, LINES[i]]);
      i++;
      timers.push(setTimeout(tick, 200 + Math.random() * 120));
    };
    timers.push(setTimeout(tick, 250));
    return () => timers.forEach(clearTimeout);
  }, []);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[300] flex flex-col justify-center bg-black p-6 font-mono text-sm text-phosphor sm:p-16 transition-opacity"
      onClick={() => setDone(true)}
    >
      <div className="bg-grid" />
      <div className="relative z-10 max-w-2xl">
        {shown.map((line, i) => (
          <div key={i} className="whitespace-pre glow">
            {line}
          </div>
        ))}
        <span className="inline-block h-4 w-2 animate-blink bg-phosphor align-middle" />
      </div>
      <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-widest text-phosphor/40">
        [ click to skip ]
      </div>
    </div>
  );
}
