// Inlined GLSL shaders (avoids extra webpack loaders).

export const particlesVert = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uSize;
  attribute float aScale;
  varying float vDepth;

  void main() {
    vec3 pos = position;
    // gentle breathing
    float wave = sin(uTime * 0.4 + pos.x * 0.5) * 0.15
               + cos(uTime * 0.3 + pos.y * 0.5) * 0.15;
    pos += normalize(pos + 0.0001) * wave;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // magnetic push from mouse (in view space approximation)
    vec2 toMouse = mvPosition.xy - uMouse * 6.0;
    float d = length(toMouse);
    float force = smoothstep(3.0, 0.0, d) * 0.8;
    mvPosition.xy += normalize(toMouse + 0.0001) * force;

    vDepth = -mvPosition.z;
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uSize * aScale * (1.0 / -mvPosition.z) * 90.0;
  }
`;

export const particlesFrag = /* glsl */ `
  precision mediump float;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vDepth;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, dist);
    float t = clamp(vDepth / 14.0, 0.0, 1.0);
    vec3 color = mix(uColorA, uColorB, t);
    gl_FragColor = vec4(color, alpha * 0.9);
  }
`;

export const waveformVert = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  varying float vElevation;

  void main() {
    vec3 pos = position;
    float noise = sin(pos.x * 3.0 + uTime) * cos(pos.y * 2.0 + uTime * 0.7);
    float sine = sin(pos.x * 4.0 - uTime * 1.5);
    // morph from noise -> clean sine as progress increases
    float elevation = mix(noise, sine, uProgress) * 0.6;
    pos.z += elevation;
    vElevation = elevation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const waveformFrag = /* glsl */ `
  precision mediump float;
  varying float vElevation;
  void main() {
    vec3 green = vec3(0.0, 1.0, 0.255);
    vec3 blue = vec3(0.0, 0.76, 1.0);
    vec3 color = mix(blue, green, smoothstep(-0.6, 0.6, vElevation));
    float glow = 0.4 + abs(vElevation);
    gl_FragColor = vec4(color * glow, 0.9);
  }
`;
