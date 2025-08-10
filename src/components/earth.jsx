'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, useTexture } from '@react-three/drei'
import * as THREE from 'three'

function Earth() {
  const earthRef = useRef()
  const cloudsRef = useRef()

  const textures = useTexture({
    map: '/textures/earth_map.jpg',
    bumpMap: '/textures/earth_bump.jpg',
    specularMap: '/textures/earth_specular.jpg',
    cloudsMap: '/textures/earth_clouds.png'
  })

  useEffect(() => {
    Object.values(textures).forEach(texture => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      texture.anisotropy = 16
      texture.encoding = THREE.sRGBEncoding
    })
  }, [textures])

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime()
    if (earthRef.current) earthRef.current.rotation.y = elapsed / 6
    if (cloudsRef.current) cloudsRef.current.rotation.y = elapsed / 5
  })

  return (
    <group>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={textures.map}
          bumpMap={textures.bumpMap}
          bumpScale={0.1}
          specularMap={textures.specularMap}
          specular={new THREE.Color(0x333333)}
          shininess={10}
        />
      </mesh>
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.01, 64, 64]} />
        <meshPhongMaterial
          map={textures.cloudsMap}
          transparent
          opacity={0.6}
          depthWrite={false}
          specular={new THREE.Color(0x111111)}
          shininess={2}
        />
      </mesh>
    </group>
  )
}

function Moon() {
  const moonRef = useRef()
  const moonTexture = useTexture('/textures/moon_map.jpg')

  useEffect(() => {
    moonTexture.wrapS = moonTexture.wrapT = THREE.RepeatWrapping
    moonTexture.anisotropy = 16
    moonTexture.encoding = THREE.sRGBEncoding
  }, [moonTexture])

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime()
    if (moonRef.current) {
      moonRef.current.position.x = Math.sin(elapsed / 6) * 4
      moonRef.current.position.z = Math.cos(elapsed / 6) * 4
      moonRef.current.rotation.y = elapsed / 8
    }
  })

  return (
    <mesh ref={moonRef} scale={[0.27, 0.27, 0.27]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial 
        map={moonTexture}
        roughness={0.8}
        metalness={0.05}
      />
    </mesh>
  )
}

export default function EarthGlobe() {
  return (
    <div
      className="fixed inset-0 z-0 bg-black overflow-hidden"
      style={{
        width: '100vw',
        height: '100vh',
        touchAction: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45, near: 0.1, far: 1000 }}
        gl={{ antialias: true, powerPreference: "high-performance", outputEncoding: THREE.sRGBEncoding }}
        resize={{ scroll: false }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} castShadow />
        <pointLight position={[-5, -5, 5]} intensity={0.5} />

        {/* Scene */}
        <Earth />
        <Moon />
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />

        {/* Controls */}
        <OrbitControls
          enableZoom
          enablePan={false}
          minDistance={2.5}
          maxDistance={8}
          rotateSpeed={0.4}
        />
      </Canvas>
    </div>
  )
}