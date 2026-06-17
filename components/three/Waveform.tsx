"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { waveformVert, waveformFrag } from "@/lib/shaders";

function Wave({ progress }: { progress: React.MutableRefObject<number> }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uProgress: { value: 0 } }),
    []
  );
  useFrame((_, d) => {
    if (mat.current) {
      mat.current.uniforms.uTime.value += d;
      mat.current.uniforms.uProgress.value +=
        (progress.current - mat.current.uniforms.uProgress.value) * 0.08;
    }
  });
  return (
    <mesh rotation={[-Math.PI / 3, 0, 0]}>
      <planeGeometry args={[12, 5, 120, 60]} />
      <shaderMaterial
        ref={mat}
        vertexShader={waveformVert}
        fragmentShader={waveformFrag}
        uniforms={uniforms}
        wireframe
        transparent
      />
    </mesh>
  );
}

export default function Waveform({ progress }: { progress: React.MutableRefObject<number> }) {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 2.5, 6], fov: 60 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.6]}
      aria-hidden="true"
    >
      <Wave progress={progress} />
    </Canvas>
  );
}
