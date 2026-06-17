"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#0123456789ABCDEFXYZ";

function useScramble(text: string) {
  const [output, setOutput] = useState(text);
  const frame = useRef(0);
  const raf = useRef(0);

  const run = useCallback(() => {
    cancelAnimationFrame(raf.current);
    frame.current = 0;
    const total = 18;
    const animate = () => {
      const progress = frame.current / total;
      const out = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i / text.length < progress) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setOutput(out);
      frame.current++;
      if (frame.current <= total) {
        raf.current = requestAnimationFrame(animate);
      } else {
        setOutput(text);
      }
    };
    animate();
  }, [text]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  return { output, run };
}

export function ScrambleText({
  text,
  className,
  autoOnMount = false,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  autoOnMount?: boolean;
  as?: React.ElementType;
}) {
  const { output, run } = useScramble(text);
  useEffect(() => {
    if (autoOnMount) run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoOnMount]);

  return (
    <Tag className={className} onMouseEnter={run}>
      {output}
    </Tag>
  );
}
