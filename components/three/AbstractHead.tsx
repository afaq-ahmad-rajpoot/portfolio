"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Head() {
  const ref = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  useFrame((state, d) => {
    const scroll = typeof window !== "undefined"
      ? window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1)
      : 0;
    if (ref.current) {
      ref.current.rotation.y = scroll * Math.PI * 2 + state.clock.elapsedTime * 0.1;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
    if (inner.current) inner.current.rotation.y -= d * 0.4;
  });
  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[2.2, 4]} />
        <meshStandardMaterial
          color="#00FF41"
          wireframe
          emissive="#00FF41"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshBasicMaterial color="#00C2FF" wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export default function AbstractHead() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.6]}
      aria-hidden="true"
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#00FF41" />
      <Head />
    </Canvas>
  );
}
