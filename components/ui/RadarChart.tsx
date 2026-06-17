"use client";

import { PORTFOLIO_DATA } from "@/lib/data";

export default function RadarChart({ size = 360 }: { size?: number }) {
  const data = PORTFOLIO_DATA.radar;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 60;
  const n = data.length;

  const point = (value: number, i: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + Math.cos(angle) * radius * value, cy + Math.sin(angle) * radius * value];
  };

  const rings = [0.25, 0.5, 0.75, 1];
  const polygon = data.map((d, i) => point(d.value, i).join(",")).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto" aria-hidden="true">
      {rings.map((r) => (
        <polygon
          key={r}
          points={data.map((_, i) => point(r, i).join(",")).join(" ")}
          fill="none"
          stroke="rgba(0,255,65,0.15)"
        />
      ))}
      {data.map((_, i) => {
        const [x, y] = point(1, i);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(0,255,65,0.15)" />;
      })}
      <polygon points={polygon} fill="rgba(0,255,65,0.18)" stroke="#00FF41" strokeWidth={2} />
      {data.map((d, i) => {
        const [x, y] = point(d.value, i);
        return <circle key={i} cx={x} cy={y} r={3} fill="#00C2FF" />;
      })}
      {data.map((d, i) => {
        const [x, y] = point(1.18, i);
        return (
          <text
            key={d.axis}
            x={x}
            y={y}
            fill="#00FF41"
            fontSize={11}
            fontFamily="monospace"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {d.axis}
          </text>
        );
      })}
    </svg>
  );
}
