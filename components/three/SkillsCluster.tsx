"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PORTFOLIO_DATA } from "@/lib/data";

const GEOMS = ["box", "tetra", "octa", "dodeca"] as const;

function Shape({ position, geom, active }: { position: [number, number, number]; geom: string; active: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const target = useRef(new THREE.Vector3(...position));
  target.current.set(...position);

  useFrame((_, d) => {
    if (!ref.current) return;
    ref.current.position.lerp(target.current, 0.06);
    ref.current.rotation.x += d * 0.3;
    ref.current.rotation.y += d * 0.4;
  });

  return (
    <mesh ref={ref} position={position} scale={active ? 1 : 0.5}>
      {geom === "box" && <boxGeometry args={[0.6, 0.6, 0.6]} />}
      {geom === "tetra" && <tetrahedronGeometry args={[0.5]} />}
      {geom === "octa" && <octahedronGeometry args={[0.5]} />}
      {geom === "dodeca" && <dodecahedronGeometry args={[0.5]} />}
      <meshBasicMaterial
        color={active ? "#00FF41" : "#00C2FF"}
        wireframe
        transparent
        opacity={active ? 0.8 : 0.3}
      />
    </mesh>
  );
}

function Cluster({ activeCategory }: { activeCategory: string }) {
  const group = useRef<THREE.Group>(null);
  const skills = useMemo(() => {
    const flat: { name: string; category: string }[] = [];
    PORTFOLIO_DATA.skills.forEach((c) =>
      c.items.forEach((it) => flat.push({ name: it.name, category: c.category }))
    );
    return flat;
  }, []);

  useFrame((_, d) => {
    if (group.current) group.current.rotation.y += d * 0.08;
  });

  return (
    <group ref={group}>
      {skills.map((s, i) => {
        const active = s.category === activeCategory;
        const phi = Math.acos(-1 + (2 * i) / skills.length);
        const theta = Math.sqrt(skills.length * Math.PI) * phi;
        const r = active ? 3.6 : 2.4;
        const pos: [number, number, number] = [
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi),
        ];
        return <Shape key={s.name} position={pos} geom={GEOMS[i % GEOMS.length]} active={active} />;
      })}
    </group>
  );
}

export default function SkillsCluster({ activeCategory }: { activeCategory: string }) {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.6]}
      aria-hidden="true"
    >
      <Cluster activeCategory={activeCategory} />
    </Canvas>
  );
}
