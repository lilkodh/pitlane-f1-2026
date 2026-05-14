/**
 * PITLANE — Cinematic WebGL Background
 * ======================================
 * Layer 1 of the 8D Hero Stack.
 *
 * Sustainable Energy Flow:
 *  - WebGL particle field that flows horizontally, simulating air
 *    moving rapidly over a 2026 aerodynamic wing inside a wind tunnel.
 */

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const GREEN  = new THREE.Color('#39FF88')
const YELLOW = new THREE.Color('#FFD60A')
const PARTICLE_COUNT = 1200

function AeroFlowParticles() {
  const meshRef = useRef()

  const { positions, colors, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors    = new Float32Array(PARTICLE_COUNT * 3)
    const speeds    = new Float32Array(PARTICLE_COUNT)
    const offsets   = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      positions[i3]     = (Math.random() - 0.5) * 80  // Wide X spread
      positions[i3 + 1] = (Math.random() - 0.5) * 30  // Y spread
      positions[i3 + 2] = (Math.random() - 0.5) * 20 - 5  // Z depth

      // 80% Green (Telemetry), 20% Yellow (Championship/Sprint)
      const col = Math.random() > 0.2 ? GREEN : YELLOW
      colors[i3]     = col.r
      colors[i3 + 1] = col.g
      colors[i3 + 2] = col.b

      speeds[i] = 0.1 + Math.random() * 0.2
      offsets[i] = Math.random() * Math.PI * 2
    }
    return { positions, colors, speeds, offsets }
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const pos = meshRef.current.geometry.attributes.position
    const time = clock.getElapsedTime()

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      // Fast horizontal flow (left to right)
      pos.array[i3] += speeds[i]
      
      // Aerodynamic curve: rises rapidly over the middle, then drops (like a wing profile)
      const x = pos.array[i3]
      const wingProfile = Math.sin(x * 0.1) * Math.cos(x * 0.05)
      
      // Add turbulent micro-vibrations
      const turbulence = Math.sin(time * 5 + offsets[i]) * 0.02
      
      pos.array[i3 + 1] += (wingProfile * 0.05) + turbulence

      // Wrap around wind tunnel
      if (pos.array[i3] > 40) {
        pos.array[i3] = -40
        pos.array[i3 + 1] = (Math.random() - 0.5) * 20
      }
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={PARTICLE_COUNT} array={colors}    itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.65} blending={THREE.AdditiveBlending} depthWrite={false} sizeAttenuation />
    </points>
  )
}

export default function Background8D() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">

      <div className="absolute inset-0 bg-[#050505]" />
      <div className="noise-bg mix-blend-overlay opacity-60" />

      {/* Volumetric spot lighting mimicking a wind tunnel / Midnight Pitlane */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,rgba(57,255,136,0.06)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(2,2,2,0.95)_100%)]" />

      {/* WebGL Particle Canvas — Active Aero Flow */}
      <div className="absolute inset-0 opacity-90">
        <Canvas camera={{ position: [0, 0, 10], fov: 70 }} gl={{ antialias: false, alpha: true }}>
          <AeroFlowParticles />
        </Canvas>
      </div>

    </div>
  )
}
