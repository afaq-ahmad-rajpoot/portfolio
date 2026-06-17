"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import { PORTFOLIO_DATA } from "@/lib/data";

const SPACING = 7;

function Panel({
  index,
  title,
  tagline,
  slug,
}: {
  index: number;
  title: string;
  tagline: string;
  slug: string;
}) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const z = -index * SPACING - 4;
  const side = index % 2 === 0 ? -1 : 1;
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(() => {
    if (matRef.current) {
      const target = hovered ? 0.7 : 0.18;
      matRef.current.opacity += (target - matRef.current.opacity) * 0.1;
    }
  });

  return (
    <group position={[side * 3.2, 0, z]} rotation={[0, side * -0.5, 0]}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => router.push(`/case-studies/${slug}`)}
      >
        <planeGeometry args={[4.5, 3]} />
        <meshBasicMaterial ref={matRef} color="#00FF41" transparent opacity={0.18} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(4.5, 3)]} />
        <lineBasicMaterial color="#00FF41" />
      </lineSegments>
      <Text
        position={[0, 0.4, 0.05]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        maxWidth={4}
      >
        {title}
      </Text>
      <Text
        position={[0, -0.5, 0.05]}
        fontSize={0.18}
        color="#00C2FF"
        anchorX="center"
        maxWidth={4}
        textAlign="center"
      >
        {tagline}
      </Text>
      <Text position={[0, 1.7, 0.05]} fontSize={0.6} color="#00FF41" anchorX="center">
        {String(index + 1).padStart(2, "0")}
      </Text>
    </group>
  );
}

function Corridor() {
  const { camera } = useFrameCamera();
  return (
    <group>
      {PORTFOLIO_DATA.projects.map((p, i) => (
        <Panel key={p.slug} index={i} title={p.title} tagline={p.tagline} slug={p.slug} />
      ))}
      {/* floor grid lines for depth */}
      {Array.from({ length: 30 }).map((_, i) => (
        <lineSegments key={i} position={[0, -3, -i * 3]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(10, 0.01)]} />
          <lineBasicMaterial color="#003c10" />
        </lineSegments>
      ))}
      {camera}
    </group>
  );
}

function useFrameCamera() {
  const target = useRef(0);
  useFrame((state) => {
    const scroll =
      typeof window !== "undefined"
        ? window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1)
        : 0;
    const maxZ = -(PORTFOLIO_DATA.projects.length - 1) * SPACING - 2;
    target.current = scroll * maxZ;
    state.camera.position.z += (target.current + 6 - state.camera.position.z) * 0.06;
    state.camera.position.x = Math.sin(scroll * Math.PI * 2) * 0.5;
    state.camera.lookAt(0, 0, state.camera.position.z - 6);
  });
  return { camera: null };
}

export default function ProjectRoom() {
  return (
    <Canvas
      className="!fixed inset-0"
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.6]}
    >
      <fog attach="fog" args={["#050505", 6, 30]} />
      <Corridor />
    </Canvas>
  );
}
