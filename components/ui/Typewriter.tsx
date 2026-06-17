"use client";

import { useEffect, useState } from "react";

export default function Typewriter({
  text,
  speed = 40,
  className,
  startDelay = 0,
}: {
  text: string;
  speed?: number;
  className?: string;
  startDelay?: number;
}) {
  const [out, setOut] = useState("");

  useEffect(() => {
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const start = setTimeout(() => {
      const tick = () => {
        setOut(text.slice(0, i + 1));
        i++;
        if (i < text.length) timer = setTimeout(tick, speed);
      };
      tick();
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [text, speed, startDelay]);

  return (
    <span className={className}>
      {out}
      <span className="animate-blink">▌</span>
    </span>
  );
}
