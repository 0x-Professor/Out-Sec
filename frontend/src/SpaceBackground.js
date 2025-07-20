import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sphere, Ring } from '@react-three/drei';
import * as THREE from 'three';

// Animated Moon Component
function Moon({ position }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial 
        color="#e6e6e6" 
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

// Animated Planet Component
function Planet({ position, size, color, ringColor = null }) {
  const meshRef = useRef();
  const ringRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2;
      ringRef.current.rotation.z += 0.005;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>
      {ringColor && (
        <mesh ref={ringRef}>
          <ringGeometry args={[size * 1.5, size * 2, 64]} />
          <meshBasicMaterial 
            color={ringColor} 
            side={THREE.DoubleSide}
            transparent
            opacity={0.6}
          />
        </mesh>
      )}
    </group>
  );
}

// Floating Particles Component
function FloatingParticles() {
  const particlesRef = useRef();
  
  const particleCount = 100;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#00d4ff" 
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// Nebula Effect Component
function Nebula() {
  const nebulaRef = useRef();
  
  useFrame((state) => {
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y += 0.0005;
      nebulaRef.current.rotation.z += 0.0003;
    }
  });

  return (
    <mesh ref={nebulaRef} position={[0, 0, -20]}>
      <sphereGeometry args={[15, 32, 32]} />
      <meshBasicMaterial 
        color="#16213e"
        transparent
        opacity={0.3}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

// Main Space Scene Component
function SpaceScene() {
  return (
    <>
      {/* Ambient and directional lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00d4ff" />
      
      {/* Stars background */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.5}
      />
      
      {/* Nebula effect */}
      <Nebula />
      
      {/* Moon */}
      <Moon position={[8, 2, -5]} />
      
      {/* Planets */}
      <Planet 
        position={[-12, -3, -8]} 
        size={1.2} 
        color="#0f3460" 
      />
      <Planet 
        position={[15, 4, -12]} 
        size={0.8} 
        color="#c792ea" 
      />
      <Planet 
        position={[-8, 6, -15]} 
        size={1.5} 
        color="#f78c6c" 
        ringColor="#64ffda"
      />
      <Planet 
        position={[20, -2, -20]} 
        size={0.6} 
        color="#00d4ff" 
      />
      
      {/* Floating particles */}
      <FloatingParticles />
    </>
  );
}

// Main Space Background Component
const SpaceBackground = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)'
    }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
      >
        <SpaceScene />
      </Canvas>
      
      {/* Additional CSS stars overlay */}
      <div className="stars" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
          radial-gradient(2px 2px at 20px 30px, #ffffff, transparent),
          radial-gradient(2px 2px at 40px 70px, #00d4ff, transparent),
          radial-gradient(1px 1px at 90px 40px, #ffffff, transparent),
          radial-gradient(1px 1px at 130px 80px, #64ffda, transparent),
          radial-gradient(2px 2px at 160px 30px, #ffffff, transparent),
          radial-gradient(1px 1px at 200px 50px, #c792ea, transparent),
          radial-gradient(2px 2px at 240px 90px, #ffffff, transparent),
          radial-gradient(1px 1px at 280px 20px, #00d4ff, transparent)
        `,
        backgroundRepeat: 'repeat',
        backgroundSize: '300px 200px',
        animation: 'twinkle 4s ease-in-out infinite alternate',
        opacity: 0.8
      }} />
    </div>
  );
};

export default SpaceBackground;