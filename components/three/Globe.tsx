"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GlobeMesh({ firing }: { firing: boolean }) {
  const group = useRef<THREE.Group>(null);

  const dots = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const n = 600;
    for (let i = 0; i < n; i++) {
      const phi = Math.acos(-1 + (2 * i) / n);
      const theta = Math.sqrt(n * Math.PI) * phi;
      pts.push(new THREE.Vector3().setFromSphericalCoords(2.2, phi, theta));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    return geo;
  }, []);

  const arcGeo = useMemo(() => {
    const start = new THREE.Vector3().setFromSphericalCoords(2.2, 1.0, 2.0);
    const end = new THREE.Vector3().setFromSphericalCoords(2.2, 1.4, 4.2);
    const mid = start.clone().add(end).multiplyScalar(0.5).setLength(3.4);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));
  }, []);

  useFrame((_, d) => {
    if (group.current) group.current.rotation.y += d * 0.1;
  });

  return (
    <group ref={group}>
      <points geometry={dots}>
        <pointsMaterial size={0.045} color="#00FF41" transparent opacity={0.7} />
      </points>
      <mesh>
        <sphereGeometry args={[2.18, 32, 32]} />
        <meshBasicMaterial color="#001a08" transparent opacity={0.5} />
      </mesh>
      <primitive
        object={new THREE.Line(
          arcGeo,
          new THREE.LineBasicMaterial({ color: firing ? "#00C2FF" : "#00FF41", transparent: true, opacity: firing ? 1 : 0.4 })
        )}
      />
    </group>
  );
}

export default function Globe({ firing }: { firing: boolean }) {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.6]}
      aria-hidden="true"
    >
      <GlobeMesh firing={firing} />
    </Canvas>
  );
}
