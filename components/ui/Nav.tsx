"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PORTFOLIO_DATA } from "@/lib/data";
import { ScrambleText } from "./Scramble";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full border-b border-phosphor/20 bg-black/40 backdrop-blur-sm">
        <nav className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 sm:px-6">
          <Link href="/" className="font-mono text-sm font-bold tracking-widest text-phosphor glow">
            <span className="animate-blink">█</span> AFAQ.DEV
          </Link>

          <ul className="hidden items-center gap-6 md:flex">
            {PORTFOLIO_DATA.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`link-underline font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
                      active ? "text-phosphor glow" : "text-phosphor/60 hover:text-phosphor"
                    }`}
                  >
                    <ScrambleText text={item.label} />
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            onClick={() => setOpen((v) => !v)}
            className="font-mono text-xs uppercase tracking-widest text-phosphor md:hidden interactive"
            aria-label="Toggle navigation"
          >
            {open ? "[ X ]" : "[ MENU ]"}
          </button>
        </nav>
      </header>

      {/* Mobile takeover */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-black/95 transition-all duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="bg-grid" />
        {PORTFOLIO_DATA.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="relative z-10 font-mono text-2xl uppercase tracking-[0.3em] text-phosphor glow"
          >
            <ScrambleText text={item.label} />
          </Link>
        ))}
      </div>
    </>
  );
}
