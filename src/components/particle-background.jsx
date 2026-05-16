import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useThemeStore } from '../stores/theme-store.js';

// ============================================================
// ParticleField — WebGL particle system using React Three Fiber
// Renders glowing F1 telemetry-style particles (heat haze effect)
// ============================================================

const PARTICLE_COUNT = 600;

// Inner component — lives inside the R3F Canvas
function Particles() {
  const meshRef = useRef(null);
  const timeRef = useRef(0);
  const currentTheme = useThemeStore((s) => s.currentTheme);

  // Generate random particle positions, sizes, speeds once
  const { positions, sizes, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 12;
      positions[i3 + 2] = (Math.random() - 0.5) * 8;

      sizes[i] = Math.random() * 4 + 1;
      speeds[i] = Math.random() * 0.003 + 0.001;
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, sizes, speeds, phases };
  }, []);

  // Update colors when theme changes
  const colors = useMemo(() => {
    const colorsArr = new Float32Array(PARTICLE_COUNT * 3);
    const color = new THREE.Color(currentTheme.color);
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Slight variation in brightness/hue
      const variation = 0.8 + Math.random() * 0.4;
      colorsArr[i3] = color.r * variation;
      colorsArr[i3 + 1] = color.g * variation;
      colorsArr[i3 + 2] = color.b * variation;
    }
    return colorsArr;
  }, [currentTheme]);

  // Animate particles each frame
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    timeRef.current += delta;

    const posAttr = meshRef.current.geometry.attributes.position;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Drift upward
      posAttr.array[i3 + 1] += speeds[i];

      // Gentle horizontal sway using sine wave
      posAttr.array[i3] += Math.sin(timeRef.current * 0.5 + phases[i]) * 0.002;

      // Reset to bottom when particle exits top
      if (posAttr.array[i3 + 1] > 6) {
        posAttr.array[i3 + 1] = -6;
        posAttr.array[i3] = (Math.random() - 0.5) * 20;
      }
    }

    posAttr.needsUpdate = true;

    // Slowly rotate the whole field for subtle depth
    meshRef.current.rotation.z += delta * 0.01;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Exported wrapper — the Canvas that holds the entire WebGL scene
export default function ParticleBackground() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
