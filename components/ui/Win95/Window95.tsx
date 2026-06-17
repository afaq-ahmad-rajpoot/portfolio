"use client";

import { useRef, useState } from "react";

export default function Window95({
  title,
  children,
  initial = { x: 80, y: 80 },
  width = 420,
  onClose,
  z,
  onFocus,
}: {
  title: string;
  children: React.ReactNode;
  initial?: { x: number; y: number };
  width?: number;
  onClose: () => void;
  z: number;
  onFocus: () => void;
}) {
  const [pos, setPos] = useState(initial);
  const [minimized, setMinimized] = useState(false);
  const dragData = useRef<{ ox: number; oy: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    onFocus();
    dragData.current = { ox: e.clientX - pos.x, oy: e.clientY - pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragData.current) return;
    setPos({
      x: Math.max(0, e.clientX - dragData.current.ox),
      y: Math.max(0, e.clientY - dragData.current.oy),
    });
  };
  const onPointerUp = () => {
    dragData.current = null;
  };

  if (minimized) return null;

  return (
    <div
      onMouseDown={onFocus}
      className="absolute select-none border-2 border-[#dfdfdf] bg-[#c0c0c0] shadow-[2px_2px_0_#000]"
      style={{
        left: pos.x,
        top: pos.y,
        width,
        zIndex: z,
        borderRightColor: "#000",
        borderBottomColor: "#000",
      }}
    >
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="flex cursor-move items-center justify-between bg-gradient-to-r from-[#000080] to-[#1084d0] px-1.5 py-1"
      >
        <span className="font-mono text-xs font-bold text-white">{title}</span>
        <div className="flex gap-0.5">
          <button
            onClick={() => setMinimized(true)}
            className="h-4 w-4 border border-[#000] bg-[#c0c0c0] text-[10px] font-bold leading-none"
          >
            _
          </button>
          <button
            onClick={onClose}
            className="h-4 w-4 border border-[#000] bg-[#c0c0c0] text-[10px] font-bold leading-none"
          >
            ×
          </button>
        </div>
      </div>
      <div className="bg-[#c0c0c0] p-1 text-black">{children}</div>
    </div>
  );
}
