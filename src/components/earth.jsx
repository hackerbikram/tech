'use client'
import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, useTexture } from '@react-three/drei'
import * as THREE from 'three'

function Earth() {
  const earthRef = useRef()
  const cloudsRef = useRef()
  
  // Load textures with error handling
  const textures = useTexture({
    map: '/textures/earth_map.jpg',
    bumpMap: '/textures/earth_bump.jpg',
    specularMap: '/textures/earth_specular.jpg',
    cloudsMap: '/textures/earth_clouds.png'
  })

  // Configure textures properly
  useEffect(() => {
    Object.values(textures).forEach(texture => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      texture.anisotropy = 16
      texture.encoding = THREE.SRGBColorSpace
    })
  }, [textures])

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    earthRef.current.rotation.y = elapsedTime / 6
    cloudsRef.current.rotation.y = elapsedTime / 5
  })

  return (
    <group>
      {/* Earth with enhanced lighting */}
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
      
      {/* Clouds with better visibility */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.01, 64, 64]} />
        <meshPhongMaterial
          map={textures.cloudsMap}
          transparent={true}
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
  
  // Configure moon texture
  useEffect(() => {
    moonTexture.wrapS = moonTexture.wrapT = THREE.RepeatWrapping
    moonTexture.anisotropy = 16
    moonTexture.encoding = THREE.SRGBColorSpace
  }, [moonTexture])

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    moonRef.current.position.x = Math.sin(elapsedTime / 6) * 4
    moonRef.current.position.z = Math.cos(elapsedTime / 6) * 4
    moonRef.current.rotation.y = elapsedTime / 8
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
    <div style={{ 
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden',
      background: 'black'
    }}>
      <Canvas
        camera={{
          position: [0, 0, 3],
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Enhanced lighting setup */}
        <ambientLight intensity={0.3} color="#ffffff" />
        <directionalLight
          position={[5, 3, 5]}
          intensity={1.5}
          color="#ffffff"
          castShadow
        />
        <pointLight
          position={[-5, -5, 5]}
          intensity={0.5}
          color="#ffffff"
        />
        
        {/* Scene contents */}
        <Earth />
        <Moon />
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2.5}
          maxDistance={8}
          rotateSpeed={0.4}
        />
      </Canvas>
    </div>
  )
}