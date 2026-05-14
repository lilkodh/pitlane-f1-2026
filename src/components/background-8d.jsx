/**
 * PITLANE — Cinematic WebGL Background
 * ======================================
 * Layer 1 of the 8D Hero Stack.
 * Microscopic Telemetry Green (#39FF88) particles floating like track heat haze.
 */

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const GREEN = new THREE.Color('#39FF88')

function HeatHazeParticles() {
  const meshRef = useRef()
  const PARTICLE_COUNT = 1500

  const { positions, colors, speeds, sizes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors    = new Float32Array(PARTICLE_COUNT * 3)
    const speeds    = new Float32Array(PARTICLE_COUNT)
    const sizes     = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      positions[i3]     = (Math.random() - 0.5) * 60  // X spread
      positions[i3 + 1] = (Math.random() - 0.5) * 40  // Y spread
      positions[i3 + 2] = (Math.random() - 0.5) * 20 - 5  // Z depth

      // Telemetry Green
      colors[i3]     = GREEN.r
      colors[i3 + 1] = GREEN.g
      colors[i3 + 2] = GREEN.b

      speeds[i] = 0.01 + Math.random() * 0.03
      sizes[i]  = 0.5 + Math.random() * 2.5
    }
    return { positions, colors, speeds, sizes }
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const pos = meshRef.current.geometry.attributes.position
    const time = clock.getElapsedTime()

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      
      // Float upwards like heat haze
      pos.array[i3 + 1] += speeds[i]
      
      // Micro-shimmer (wobble on X)
      pos.array[i3] += Math.sin(time * 2 + i) * 0.005

      // Wrap around top to bottom
      if (pos.array[i3 + 1] > 20) {
        pos.array[i3 + 1] = -20
        pos.array[i3] = (Math.random() - 0.5) * 60
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
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.65} blending={THREE.AdditiveBlending} depthWrite={false} sizeAttenuation />
    </points>
  )
}

export default function Background8D() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">

      <div className="absolute inset-0 bg-[#050505]" />
      <div className="noise-bg mix-blend-overlay opacity-60" />

      {/* Volumetric Midnight Pitlane lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(57,255,136,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(2,2,2,0.95)_100%)]" />

      {/* WebGL Particle Canvas — Heat Haze */}
      <div className="absolute inset-0 opacity-80">
        <Canvas camera={{ position: [0, 0, 10], fov: 70 }} gl={{ antialias: false, alpha: true }}>
          <HeatHazeParticles />
        </Canvas>
      </div>

    </div>
  )
}
