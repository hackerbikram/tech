'use client'
import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, useTexture, Text } from '@react-three/drei'
import * as THREE from 'three'

const SpaceScene = ({ isMobile }) => {
  const scaleFactor = isMobile ? 0.8 : 1
  const cameraDistance = isMobile ? 4 : 3

  return (
    <Canvas
      camera={{
        position: [0, 0, cameraDistance],
        fov: isMobile ? 55 : 45,
        near: 0.1,
        far: 1000
      }}
      gl={{ antialias: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      
      <Earth scale={scaleFactor} />
      <Moon scale={scaleFactor} isMobile={isMobile} />
      
      <Stars 
        radius={100} 
        depth={50} 
        count={2000} 
        factor={isMobile ? 3 : 4} 
        fade 
      />
      
      <OrbitControls
        enableZoom={!isMobile}
        enablePan={false}
        minDistance={isMobile ? 3 : 2.5}
        maxDistance={isMobile ? 12 : 10}
        rotateSpeed={0.4}
      />
    </Canvas>
  )
}

const Earth = ({ scale }) => {
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
      texture.anisotropy = 8
    })
  }, [textures])

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    earthRef.current.rotation.y = elapsedTime / 6
    cloudsRef.current.rotation.y = elapsedTime / 5
  })

  return (
    <group scale={[scale, scale, scale]}>
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
          transparent={true}
          opacity={0.6}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

const Moon = ({ scale, isMobile }) => {
  const moonRef = useRef()
  const moonTexture = useTexture('/textures/moon_map.jpg')
  const moonOrbitRadius = isMobile ? 3.5 : 4

  useEffect(() => {
    moonTexture.wrapS = moonTexture.wrapT = THREE.RepeatWrapping
    moonTexture.anisotropy = 8
  }, [moonTexture])

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    moonRef.current.position.x = Math.sin(elapsedTime / 6) * moonOrbitRadius
    moonRef.current.position.z = Math.cos(elapsedTime / 6) * moonOrbitRadius
    moonRef.current.rotation.y = elapsedTime / 8
  })

  return (
    <mesh ref={moonRef} scale={[scale * 0.27, scale * 0.27, scale * 0.27]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial 
        map={moonTexture}
        roughness={0.8}
        metalness={0.05}
      />
    </mesh>
  )
}

export default function SpaceComponent() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)'
    }}>
      <SpaceScene isMobile={isMobile} />
      
      {/* Optional overlay text */}
      <div style={{
        position: 'absolute',
        bottom: '5%',
        width: '100%',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'sans-serif',
        pointerEvents: 'none'
      }}>
        <h1 style={{ fontSize: isMobile ? '1.5rem' : '2.5rem' }}>Explore Our Solar System</h1>
        <p style={{ fontSize: isMobile ? '0.8rem' : '1rem' }}>
          {isMobile ? 'Pinch to zoom' : 'Scroll to zoom • Drag to rotate'}
        </p>
      </div>
    </div>
  )
}