import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const GREEN = new THREE.Color('#39FF88')
const YELLOW = new THREE.Color('#FFD60A')
const PARTICLE_COUNT = 1500

function HeatHazeParticles() {
  const meshRef = useRef()

  const { positions, colors, speeds } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const speeds = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      // Spread across a wide frustum
      positions[i3] = (Math.random() - 0.5) * 60     // x
      positions[i3 + 1] = (Math.random() - 0.5) * 40 // y
      positions[i3 + 2] = (Math.random() - 0.5) * 30 - 10 // z

      // 80% Green, 20% Yellow
      const color = Math.random() > 0.2 ? GREEN : YELLOW
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b

      // Upward floating speed
      speeds[i] = 0.01 + Math.random() * 0.02
    }
    return { positions, colors, speeds }
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const pos = meshRef.current.geometry.attributes.position
    const time = state.clock.getElapsedTime()

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      // Float upward
      pos.array[i3 + 1] += speeds[i]
      
      // Horizontal wobble
      pos.array[i3] += Math.sin(time * 2 + i) * 0.005

      // Reset to bottom if it goes too high
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
        <bufferAttribute attach="attributes-color" count={PARTICLE_COUNT} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.08} 
        vertexColors 
        transparent 
        opacity={0.8} 
        blending={THREE.AdditiveBlending} 
        depthWrite={false} 
      />
    </points>
  )
}

export default function Background8D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
      {/* Volumetric Green Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,136,0.08)_0%,transparent_60%)]" />
      
      {/* Three.js Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ alpha: true, antialias: false }}>
          <HeatHazeParticles />
        </Canvas>
      </div>

      {/* Heavy vignette for cinematic feel */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_100%)]" />
    </div>
  )
}
