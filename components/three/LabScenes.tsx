"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ---------- Noise Field ---------- */
function NoisePoints() {
  const ref = useRef<THREE.Points>(null);
  const count = 2500;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const geo = ref.current?.geometry;
    if (!geo) return;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const turb = state.pointer.x * 2 + 1;
      pos.setZ(i, Math.sin(x * 0.5 + t) * Math.cos(y * 0.5 + t) * turb);
    }
    pos.needsUpdate = true;
    ref.current.rotation.z = t * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#00FF41" transparent opacity={0.8} />
    </points>
  );
}

/* ---------- Ray Marcher ---------- */
const rmFrag = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uRes;
  float sdSphere(vec3 p, float r){ return length(p)-r; }
  float map(vec3 p){
    p.xz = mat2(cos(uTime*0.3),-sin(uTime*0.3),sin(uTime*0.3),cos(uTime*0.3))*p.xz;
    float d = 1e9;
    for(int i=0;i<3;i++){
      vec3 q = p - vec3(sin(uTime+float(i))*1.2, cos(uTime*0.7+float(i))*1.2, 0.0);
      d = min(d, sdSphere(q, 0.6));
    }
    return d;
  }
  void main(){
    vec2 uv = (gl_FragCoord.xy - 0.5*uRes)/uRes.y;
    vec3 ro = vec3(0.0,0.0,4.0);
    vec3 rd = normalize(vec3(uv, -1.0));
    float t=0.0; float glow=0.0;
    for(int i=0;i<60;i++){
      vec3 p = ro + rd*t;
      float d = map(p);
      glow += 0.015/(abs(d)+0.05);
      if(d<0.001||t>10.0) break;
      t += d;
    }
    vec3 col = mix(vec3(0.0,0.76,1.0), vec3(0.0,1.0,0.255), glow*0.4)*glow;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function RayMarchPlane() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uRes: { value: new THREE.Vector2(1, 1) } }),
    []
  );
  useFrame((state, d) => {
    if (mat.current) {
      mat.current.uniforms.uTime.value += d;
      mat.current.uniforms.uRes.value.set(state.size.width, state.size.height);
    }
  });
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={mat} fragmentShader={rmFrag} uniforms={uniforms} />
    </mesh>
  );
}

/* ---------- Physics Sim (spring-driven) ---------- */
function Balls() {
  const group = useRef<THREE.Group>(null);
  const balls = useMemo(
    () =>
      Array.from({ length: 8 }, () => ({
        pos: new THREE.Vector3((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, 0),
        vel: new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, 0),
      })),
    []
  );
  useFrame((state, d) => {
    const dt = Math.min(d, 0.05);
    balls.forEach((b, i) => {
      // attraction to mouse
      const target = new THREE.Vector3(state.pointer.x * 4, state.pointer.y * 4, 0);
      const force = target.clone().sub(b.pos).multiplyScalar(2.0);
      b.vel.add(force.multiplyScalar(dt));
      b.vel.multiplyScalar(0.98);
      b.pos.add(b.vel.clone().multiplyScalar(dt));
      // bounds
      ["x", "y"].forEach((ax) => {
        const a = ax as "x" | "y";
        if (Math.abs(b.pos[a]) > 4) {
          b.pos[a] = Math.sign(b.pos[a]) * 4;
          b.vel[a] *= -0.8;
        }
      });
      const child = group.current?.children[i];
      if (child) child.position.copy(b.pos);
    });
  });
  return (
    <group ref={group}>
      {balls.map((_, i) => (
        <mesh key={i}>
          <icosahedronGeometry args={[0.4, 1]} />
          <meshBasicMaterial color={i % 2 ? "#00C2FF" : "#00FF41"} wireframe />
        </mesh>
      ))}
    </group>
  );
}

export default function LabScene({ kind }: { kind: string }) {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 8], fov: 55 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.6]}
      aria-hidden="true"
    >
      {kind === "NoiseField" && <NoisePoints />}
      {kind === "RayMarcher" && <RayMarchPlane />}
      {kind === "PhysicsSim" && <Balls />}
      {kind === "TypoGlitch" && <NoisePoints />}
    </Canvas>
  );
}
