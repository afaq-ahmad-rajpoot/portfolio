"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const BADGES = [
  "Next.js", "React", "TypeScript", "Node", "FastAPI",
  "Python", "PostgreSQL", "MongoDB", "Redis", "Docker",
  "Stripe", "AWS",
];

function Badge({ label, index, total }: { label: string; index: number; total: number }) {
  const ref = useRef<THREE.Group>(null);
  const radius = 3.4;
  const baseAngle = (index / total) * Math.PI * 2;
  const yOff = (index % 3) - 1;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.25 + baseAngle;
    ref.current.position.set(Math.cos(t) * radius, yOff * 0.9, Math.sin(t) * radius);
    ref.current.lookAt(0, ref.current.position.y, 0);
    ref.current.rotateY(Math.PI);
  });

  return (
    <group ref={ref}>
      <Text fontSize={0.34} color="#00FF41" anchorX="center" anchorY="middle">
        {label}
      </Text>
    </group>
  );
}

function Core() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.3;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#00C2FF" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

export default function TechOrbit() {
  const badges = useMemo(() => BADGES, []);
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 8], fov: 55 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.6]}
      aria-hidden="true"
    >
      <Core />
      {badges.map((b, i) => (
        <Badge key={b} label={b} index={i} total={badges.length} />
      ))}
    </Canvas>
  );
}
