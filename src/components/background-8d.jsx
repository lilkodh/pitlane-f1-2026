import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

// Blurred anamorphic track lights and glowing heat haze
function TrackAtmosphere() {
  const points = useRef()
  const count = 400
  const positions = new Float32Array(count * 3)
  const opacities = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 80
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20 - 5
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10
    opacities[i] = Math.random()
  }

  useFrame((state, delta) => {
    if (points.current) {
      points.current.position.x += delta * 15
      if (points.current.position.x > 40) {
        points.current.position.x = -40
      }
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-opacity" count={count} array={opacities} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial size={0.3} color="#39FF88" transparent opacity={0.3} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}

export default function Background8D() {
  return (
    <div className="fixed inset-0 z-0 bg-[#020202] overflow-hidden pointer-events-none">
      {/* Dark noise texture layer */}
      <div className="noise-bg mix-blend-overlay opacity-50"></div>
      
      {/* Deep volumetric dark gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#112a1c] via-[#050505] to-[#020202] opacity-80"></div>

      {/* Heat haze glow */}
      <div className="absolute top-1/2 left-0 w-full h-1/2 bg-gradient-to-t from-[#39FF88]/5 to-transparent blur-[100px] transform -translate-y-1/2"></div>

      {/* 3D Motion track lights layer */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <fog attach="fog" args={['#020202', 5, 25]} />
          <ambientLight intensity={0.2} />
          <TrackAtmosphere />
        </Canvas>
      </div>
    </div>
  )
}
