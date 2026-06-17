"use client";

import { useEffect, useState } from "react";

export default function StatusBar() {
  const [time, setTime] = useState("--:--:--");
  const [mem, setMem] = useState(94);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour12: false }));
      setMem(88 + Math.floor(Math.random() * 10));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-phosphor/20 bg-black/70 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-phosphor/70 backdrop-blur-sm">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5">
        <span>[SYS]</span>
        <span className="hidden sm:inline">:: MEM: {mem}%</span>
        <span className="hidden sm:inline">:: UPTIME: 99.97%</span>
        <span>:: LOC: Faisalabad, PK</span>
        <span>:: TIME: {time}</span>
        <span className="ml-auto hidden md:inline text-phosphor/40">
          afaq@eprecisio:~$
        </span>
      </div>
    </div>
  );
}
