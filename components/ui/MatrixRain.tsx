"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain({ onDone }: { onDone?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const fontSize = 16;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);
    const chars = "アイウエオカキクケコ0123456789ABCDEF";

    let raf = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(5,5,5,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00FF41";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const timeout = setTimeout(() => {
      cancelAnimationFrame(raf);
      onDone?.();
    }, 3200);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [onDone]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[200] bg-black/80"
      aria-hidden="true"
    />
  );
}
