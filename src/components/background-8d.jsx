/**
 * PITLANE — Cinematic 8D Background Engine
 * ==========================================
 * Layer 1 of the hero stack.
 *
 * Combines Three.js WebGL with layered CSS effects:
 *  - 1500 microscopic Telemetry Green heat-haze particles
 *  - Horizontal speed streaks (CSS animated)
 *  - Diagonal racing line sweeps (CSS animated)
 *  - Volumetric radial glow core
 *  - Carbon-fiber noise texture
 *
 * ARCHITECTURE NOTE:
 *  All Three.js logic is isolated here. Parent components stay pure React.
 */

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const GREEN  = new THREE.Color('#39FF88')
const YELLOW = new THREE.Color('#FFD60A')
const COUNT  = 1800

function HeatHazeParticles() {
  const ref = useRef()

  const { positions, colors, speeds, wobbles } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const colors    = new Float32Array(COUNT * 3)
    const speeds    = new Float32Array(COUNT)
    const wobbles   = new Float32Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      positions[i3]     = (Math.random() - 0.5) * 70
      positions[i3 + 1] = (Math.random() - 0.5) * 40
      positions[i3 + 2] = (Math.random() - 0.5) * 25 - 5

      // 85% green, 15% yellow
      const col = Math.random() > 0.15 ? GREEN : YELLOW
      colors[i3] = col.r; colors[i3+1] = col.g; colors[i3+2] = col.b

      speeds[i]  = 0.008 + Math.random() * 0.025
      wobbles[i] = Math.random() * Math.PI * 2
    }
    return { positions, colors, speeds, wobbles }
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position
    const t   = clock.getElapsedTime()

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      pos.array[i3 + 1] += speeds[i]
      pos.array[i3]     += Math.sin(t * 1.8 + wobbles[i]) * 0.003

      if (pos.array[i3 + 1] > 22) {
        pos.array[i3 + 1] = -22
        pos.array[i3]     = (Math.random() - 0.5) * 70
      }
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={COUNT} array={colors}    itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

export default function Background8D() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">

      {/* Deep racing black base */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Carbon fiber noise */}
      <div className="noise-bg carbon-fiber" />

      {/* Volumetric green glow — Midnight Pitlane */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_30%,rgba(57,255,136,0.07)_0%,transparent_70%)]" />

      {/* Heavy vignette crush to corners */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(2,2,2,0.92)_100%)]" />

      {/* Bottom gradient crush — blends into content */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#050505] to-transparent" />

      {/* WebGL heat-haze particle field */}
      <div className="absolute inset-0 opacity-85">
        <Canvas camera={{ position: [0, 0, 10], fov: 70 }} gl={{ antialias: false, alpha: true }}>
          <HeatHazeParticles />
        </Canvas>
      </div>

      {/* Speed streaks — anamorphic horizontal light flares */}
      <div className="animate-speed-streak absolute top-[33%] left-0 h-[1px] w-[55%] bg-gradient-to-r from-transparent via-[#39FF88] to-transparent opacity-30" />
      <div className="animate-speed-streak absolute top-[67%] left-0 h-[1px] w-[40%] bg-gradient-to-r from-transparent via-[#FFD60A] to-transparent opacity-20" style={{ animationDelay: '1.3s' }} />
      <div className="animate-speed-streak absolute top-[50%] left-0 h-[1px] w-[70%] bg-gradient-to-r from-transparent via-[#39FF88] to-transparent opacity-15" style={{ animationDelay: '2.1s' }} />

      {/* Diagonal racing lines */}
      <div className="animate-racing-line absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#39FF88]/10 to-transparent" style={{ animationDelay: '0.5s' }} />
      <div className="animate-racing-line absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#FFD60A]/08 to-transparent" style={{ animationDelay: '1.8s' }} />

    </div>
  )
}
