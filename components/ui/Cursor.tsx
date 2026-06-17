"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ghost = ghostRef.current;
    if (!dot || !ghost) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ghostX = mouseX;
    let ghostY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

      const el = e.target as HTMLElement;
      const interactive = el.closest("a, button, input, textarea, [role='button'], .interactive");
      dot.dataset.hover = interactive ? "true" : "false";
    };

    const loop = () => {
      ghostX += (mouseX - ghostX) * 0.18;
      ghostY += (mouseY - ghostY) * 0.18;
      ghost.style.transform = `translate(${ghostX}px, ${ghostY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot text-phosphor font-mono text-base leading-none data-[hover=true]:text-electric"
        data-hover="false"
        aria-hidden="true"
      >
        <span className="block data-[hover=true]:hidden">+</span>
      </div>
      <div
        ref={ghostRef}
        className="cursor-ghost text-phosphor/40 font-mono text-base leading-none"
        aria-hidden="true"
      >
        +
      </div>
    </>
  );
}
