"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Ico() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15;
      ref.current.rotation.y += delta * 0.2;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2.4, 1]} />
      <meshBasicMaterial color="#00FF41" wireframe transparent opacity={0.6} />
    </mesh>
  );
}

export default function Wireframe() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 7], fov: 55 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.6]}
      aria-hidden="true"
    >
      <Ico />
    </Canvas>
  );
}
