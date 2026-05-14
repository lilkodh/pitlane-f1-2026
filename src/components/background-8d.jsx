import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

// Simple flying particles to simulate speed and 8D depth
function SpeedParticles() {
  const points = useRef()
  const count = 300
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 50
  }

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.05
      points.current.position.z += delta * 5
      if (points.current.position.z > 20) {
        points.current.position.z = -20
      }
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#39FF88" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export default function Background8D() {
  return (
    <div className="fixed inset-0 z-0 bg-[#050505] overflow-hidden pointer-events-none">
      {/* Dark noise texture layer */}
      <div className="noise-bg mix-blend-overlay"></div>
      
      {/* Radial glow layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[rgba(57,255,136,0.05)] via-transparent to-transparent"></div>

      {/* 3D Motion particles layer */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <fog attach="fog" args={['#050505', 5, 20]} />
          <ambientLight intensity={0.5} />
          <SpeedParticles />
        </Canvas>
      </div>
    </div>
  )
}
