"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { particlesVert, particlesFrag } from "@/lib/shaders";

function ParticleField({ count = 9000 }: { count?: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));

  const { positions, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // distribute in a sphere shell for a "data cloud" feel
      const r = 4 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      scales[i] = 0.5 + Math.random();
    }
    return { positions, scales };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uSize: { value: 1.2 },
      uColorA: { value: new THREE.Color("#00FF41") },
      uColorB: { value: new THREE.Color("#00C2FF") },
    }),
    []
  );

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      mouse.current.lerp(state.pointer, 0.05);
      materialRef.current.uniforms.uMouse.value.copy(mouse.current);
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particlesVert}
        fragmentShader={particlesFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroParticles({ count }: { count?: number }) {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 11], fov: 60 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.8]}
      aria-hidden="true"
    >
      <ParticleField count={count} />
    </Canvas>
  );
}
