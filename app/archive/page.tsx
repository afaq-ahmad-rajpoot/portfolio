"use client";

import { useEffect, useState } from "react";
import { PORTFOLIO_DATA } from "@/lib/data";
import Window95 from "@/components/ui/Win95/Window95";

type WinId = "portfolio" | "readme" | "projects" | "ie" | "error";

const ICONS: { id: WinId; label: string; icon: string }[] = [
  { id: "portfolio", label: "My Portfolio.exe", icon: "🖥️" },
  { id: "readme", label: "README.txt", icon: "📄" },
  { id: "projects", label: "projects", icon: "📁" },
  { id: "ie", label: "Internet Explorer", icon: "🌐" },
];

export default function ArchivePage() {
  const { personal, projects } = PORTFOLIO_DATA;
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState<WinId[]>(["readme"]);
  const [zMap, setZMap] = useState<Record<string, number>>({});
  const [topZ, setTopZ] = useState(10);
  const [clock, setClock] = useState("--:--");

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return p + 8;
      });
    }, 120);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setClock(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })),
      1000
    );
    return () => clearInterval(id);
  }, []);

  // Random fake error dialog
  useEffect(() => {
    if (loading) return;
    const id = setInterval(() => {
      if (Math.random() > 0.6) {
        setOpen((o) => (o.includes("error") ? o : [...o, "error"]));
        focus("error");
      }
    }, 18000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const focus = (id: string) => {
    setTopZ((z) => z + 1);
    setZMap((m) => ({ ...m, [id]: topZ + 1 }));
  };
  const openWin = (id: WinId) => {
    setOpen((o) => (o.includes(id) ? o : [...o, id]));
    focus(id);
  };
  const closeWin = (id: WinId) => setOpen((o) => o.filter((w) => w !== id));

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#008080]">
        <div className="w-80 border-2 border-[#dfdfdf] bg-[#c0c0c0] p-4 shadow-[3px_3px_0_#000]">
          <p className="mb-3 font-mono text-xs text-black">Loading legacy systems...</p>
          <div className="h-5 border border-[#808080] bg-white p-0.5">
            <div className="h-full bg-[#000080]" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-right font-mono text-[10px] text-black">{progress}%</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-30 overflow-hidden bg-[#008080] pt-14" style={{ cursor: "default" }}>
      {/* Desktop icons */}
      <div className="flex flex-col flex-wrap gap-4 p-4" style={{ height: "calc(100vh - 100px)" }}>
        {ICONS.map((icon) => (
          <button
            key={icon.id}
            onDoubleClick={() => openWin(icon.id)}
            onClick={() => openWin(icon.id)}
            className="flex w-20 flex-col items-center gap-1 text-white"
          >
            <span className="text-3xl">{icon.icon}</span>
            <span className="bg-[#008080] px-1 text-center font-mono text-[10px] leading-tight">
              {icon.label}
            </span>
          </button>
        ))}
      </div>

      {/* Windows */}
      {open.includes("readme") && (
        <Window95 title="README.txt - Notepad" onClose={() => closeWin("readme")} z={zMap.readme ?? 10} onFocus={() => focus("readme")} initial={{ x: 120, y: 90 }}>
          <div className="border border-[#808080] bg-white p-3 font-mono text-xs leading-relaxed text-black">
            <p>{">"} I used to center divs with tables.</p>
            <p>{">"} We don&apos;t talk about that era.</p>
            <br />
            <p>{">"} This is the original portfolio — preserved as a time capsule.</p>
            <p>{">"} Double-click &quot;My Portfolio.exe&quot; to load it.</p>
            <br />
            <p>-- Afaq, {new Date().getFullYear()}</p>
          </div>
        </Window95>
      )}

      {open.includes("portfolio") && (
        <Window95 title="My Portfolio.exe" width={640} onClose={() => closeWin("portfolio")} z={zMap.portfolio ?? 10} onFocus={() => focus("portfolio")} initial={{ x: 200, y: 120 }}>
          <div className="border border-[#808080] bg-white">
            <div className="flex items-center gap-1 border-b border-[#808080] bg-[#c0c0c0] p-1 font-mono text-[10px]">
              <span>Address:</span>
              <span className="flex-1 border border-[#808080] bg-white px-1">{personal.oldPortfolioUrl}</span>
            </div>
            <iframe
              src={personal.oldPortfolioUrl}
              title="Old portfolio"
              className="h-80 w-full"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </Window95>
      )}

      {open.includes("projects") && (
        <Window95 title="projects - Explorer" onClose={() => closeWin("projects")} z={zMap.projects ?? 10} onFocus={() => focus("projects")} initial={{ x: 160, y: 150 }}>
          <div className="border border-[#808080] bg-white p-2">
            <div className="grid grid-cols-3 gap-3">
              {projects.map((p) => (
                <a
                  key={p.slug}
                  href={p.liveUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1 p-1 font-mono text-[10px] text-black hover:bg-[#000080] hover:text-white"
                >
                  <span className="text-2xl">📦</span>
                  <span className="text-center">{p.title}.lnk</span>
                </a>
              ))}
            </div>
          </div>
        </Window95>
      )}

      {open.includes("ie") && (
        <Window95 title="Internet Explorer" width={460} onClose={() => closeWin("ie")} z={zMap.ie ?? 10} onFocus={() => focus("ie")} initial={{ x: 240, y: 100 }}>
          <div className="border border-[#808080] bg-black p-4 text-center font-mono text-xs text-[#00FF41]">
            <p className="text-lg font-bold text-yellow-300 blink">★ WELCOME 2 MY HOMEPAGE ★</p>
            <p className="mt-2">You are visitor #000420</p>
            <div className="my-2 overflow-hidden whitespace-nowrap text-cyan-400">
              <span className="marquee inline-block">★彡 Under Construction 彡★ Best viewed in 800x600 ★彡</span>
            </div>
            <p>Sign my guestbook! ✍️</p>
            <p className="mt-2 text-white">[ Powered by GeoCities nostalgia ]</p>
          </div>
        </Window95>
      )}

      {open.includes("error") && (
        <Window95 title="Error" width={300} onClose={() => closeWin("error")} z={zMap.error ?? 99} onFocus={() => focus("error")} initial={{ x: 320, y: 220 }}>
          <div className="bg-[#c0c0c0] p-3 text-black">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <p className="font-mono text-xs">This program has performed an illegal operation and will be shut down.</p>
            </div>
            <div className="mt-4 flex justify-center gap-2">
              <button onClick={() => closeWin("error")} className="border border-[#000] bg-[#c0c0c0] px-4 py-1 font-mono text-xs shadow-[1px_1px_0_#fff_inset]">OK</button>
              <button onClick={() => closeWin("error")} className="border border-[#000] bg-[#c0c0c0] px-4 py-1 font-mono text-xs shadow-[1px_1px_0_#fff_inset]">Cancel</button>
            </div>
          </div>
        </Window95>
      )}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 z-[100] flex h-10 w-full items-center gap-1 border-t-2 border-[#dfdfdf] bg-[#c0c0c0] px-1">
        <button className="flex items-center gap-1 border border-[#000] bg-[#c0c0c0] px-2 py-1 font-mono text-xs font-bold shadow-[1px_1px_0_#fff_inset] text-black">
          <span>🪟</span> Start
        </button>
        <div className="flex flex-1 gap-1 overflow-hidden">
          {open.map((id) => (
            <button
              key={id}
              onClick={() => focus(id)}
              className="truncate border border-[#808080] bg-[#c0c0c0] px-2 py-1 font-mono text-[10px] text-black"
            >
              {ICONS.find((i) => i.id === id)?.label ?? id}
            </button>
          ))}
        </div>
        <div className="border border-[#808080] px-2 py-1 font-mono text-[10px] text-black">{clock}</div>
      </div>

      <style jsx>{`
        .blink { animation: blink95 1s steps(2) infinite; }
        @keyframes blink95 { 50% { opacity: 0.3; } }
        .marquee { animation: marquee95 10s linear infinite; }
        @keyframes marquee95 {
          from { transform: translateX(100%); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
