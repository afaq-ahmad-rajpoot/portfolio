"use client";

import { useEffect, useState } from "react";
import MatrixRain from "./MatrixRain";

const SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function Konami() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === SEQUENCE[idx]) {
        idx++;
        if (idx === SEQUENCE.length) {
          setActive(true);
          idx = 0;
        }
      } else {
        idx = key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!active) return null;
  return <MatrixRain onDone={() => setActive(false)} />;
}
