/**
 * PITLANE — Cinematic WebGL Background
 * ======================================
 * Layer 1 of the 8D Hero Stack.
 *
 * Uses React Three Fiber to render:
 *  - Hundreds of glowing Telemetry Green + Championship Yellow particles
 *    that float upward slowly and streak past on scroll
 *  - Additive blending so they layer over the dark background naturally
 *  - Anamorphic horizontal light streaks (horizontal speed trails)
 *
 * ARCHITECTURE NOTE:
 *   All Three.js logic is confined here. The parent (app / hero) stays clean React.
 */

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ── Constants ──────────────────────────────────────────────── */
const GREEN  = new THREE.Color('#39FF88')
const YELLOW = new THREE.Color('#FFD60A')
const PARTICLE_COUNT = 600

/**
 * FloatingParticles
 * Renders a field of upward-drifting glowing particles.
 * Resets position at the top to create an infinite loop.
 */
function FloatingParticles() {
  const meshRef = useRef()

  // Build initial positions and per-particle metadata once
  const { positions, colors, speeds, sizes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors    = new Float32Array(PARTICLE_COUNT * 3)
    const speeds    = new Float32Array(PARTICLE_COUNT)
    const sizes     = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3

      // Random spread across the viewport
      positions[i3]     = (Math.random() - 0.5) * 40
      positions[i3 + 1] = (Math.random() - 0.5) * 30
      positions[i3 + 2] = (Math.random() - 0.5) * 10 - 5

      // ~70% green, ~30% yellow
      const col = Math.random() > 0.3 ? GREEN : YELLOW
      colors[i3]     = col.r
      colors[i3 + 1] = col.g
      colors[i3 + 2] = col.b

      speeds[i] = 0.005 + Math.random() * 0.015
      sizes[i]  = 1.5 + Math.random() * 4
    }

    return { positions, colors, speeds, sizes }
  }, [])

  // Drift each particle upward every frame; wrap at top
  useFrame(() => {
    if (!meshRef.current) return
    const pos = meshRef.current.geometry.attributes.position

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos.array[i * 3 + 1] += speeds[i]
      if (pos.array[i * 3 + 1] > 15) {
        pos.array[i * 3 + 1] = -15
      }
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={PARTICLE_COUNT} array={colors}    itemSize={3} />
        <bufferAttribute attach="attributes-size"     count={PARTICLE_COUNT} array={sizes}     itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

/**
 * Background8D — root export
 * Renders a fixed full-screen canvas + CSS dark atmosphere layers
 */
export default function Background8D() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">

      {/* ── Pure dark base ───────────────────────────────────── */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* ── Noise texture overlay ────────────────────────────── */}
      <div className="noise-bg" />

      {/* ── Radial green core glow ───────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(57,255,136,0.07)_0%,transparent_70%)]" />

      {/* ── Corner vignette crush ────────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,2,2,0.95)_100%)]" />

      {/* ── WebGL Particle Canvas ────────────────────────────── */}
      <div className="absolute inset-0 opacity-80">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 70 }}
          gl={{ antialias: false, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <FloatingParticles />
        </Canvas>
      </div>

      {/* ── Horizontal anamorphic speed streaks (CSS) ────────── */}
      <div className="absolute top-[38%] left-0 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-[#39FF88] to-transparent opacity-20 animate-streak" />
      <div className="absolute top-[62%] right-0 w-[40%] h-[1px] bg-gradient-to-l from-transparent via-[#FFD60A] to-transparent opacity-15 animate-streak" style={{ animationDelay: '1.2s' }} />

    </div>
  )
}
