'use client'
import { useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

function Planet({ textureUrl, size, distance, speed, children }) {
  const orbitRef = useRef()
  const planetRef = useRef()
  const angle = useRef(Math.random() * Math.PI * 2)
  const texture = useLoader(THREE.TextureLoader, textureUrl)

  useFrame((_, delta) => {
    angle.current += speed * delta
    const x = Math.cos(angle.current) * distance
    const z = Math.sin(angle.current) * distance
    orbitRef.current.position.set(x, 0, z)
    planetRef.current.rotation.y += 0.01
  })

  return (
    <group ref={orbitRef}>
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {children}
    </group>
  )
}

function EarthWithMoon() {
  const moonRef = useRef()
  const moonTexture = useLoader(THREE.TextureLoader, '/textures/moon.jpg')

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const radius = 2
    moonRef.current.position.set(Math.cos(t * 2) * radius, 0, Math.sin(t * 2) * radius)
  })

  return (
    <Planet textureUrl="/textures/earth.jpg" size={1.3} distance={12} speed={1}>
      <mesh ref={moonRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          map={moonTexture}
          emissive={new THREE.Color('white')}
          emissiveIntensity={0.4}
        />
      </mesh>
    </Planet>
  )
}

function Sun() {
  const texture = useLoader(THREE.TextureLoader, '/textures/sun.jpg')
  const sunRef = useRef()

  useFrame(() => {
    sunRef.current.rotation.y += 0.001
  })

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[3, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        emissive={new THREE.Color('orange')}
        emissiveIntensity={2}
      />
    </mesh>
  )
}

export default function SolarSystem() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 25, 40], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight intensity={2} position={[0, 0, 0]} />
        <Stars radius={200} depth={60} count={10000} factor={7} fade />

        <Sun />
        <Planet textureUrl="/textures/mercury.jpg" size={0.8} distance={6} speed={1.6} />
        <Planet textureUrl="/textures/venus.jpg" size={1.2} distance={9} speed={1.2} />
        <EarthWithMoon />
        <Planet textureUrl="/textures/mars.jpg" size={1.1} distance={15} speed={0.8} />
        <Planet textureUrl="/textures/jupiter.jpg" size={2.5} distance={20} speed={0.5} />
        <Planet textureUrl="/textures/saturn.jpg" size={2.2} distance={25} speed={0.4} />
        <Planet textureUrl="/textures/uranus.jpg" size={1.8} distance={30} speed={0.3} />
        <Planet textureUrl="/textures/neptune.jpg" size={1.7} distance={35} speed={0.25} />

        <OrbitControls />
      </Canvas>
    </div>
  )
}