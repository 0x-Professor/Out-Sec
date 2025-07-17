import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus, Text, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Animated Security Shield
const SecurityShield = ({ position = [0, 0, 0] }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={hovered ? '#00ffff' : '#0ea5e9'}
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

// Floating Data Cubes
const DataCubes = () => {
  const cubes = [];
  for (let i = 0; i < 20; i++) {
    const position = [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    ];
    cubes.push(
      <Box
        key={i}
        position={position}
        args={[0.1, 0.1, 0.1]}
      >
        <meshStandardMaterial
          color="#06b6d4"
          transparent
          opacity={0.6}
          emissive="#006064"
          emissiveIntensity={0.2}
        />
      </Box>
    );
  }
  return <>{cubes}</>;
};

// Cyber Network Lines
const NetworkLines = () => {
  const linesRef = useRef();
  
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y += 0.005;
    }
  });

  const points = [];
  for (let i = 0; i < 50; i++) {
    const angle = (i / 50) * Math.PI * 2;
    const radius = 3 + Math.sin(i * 0.5) * 0.5;
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(i * 0.3) * 2,
        Math.sin(angle) * radius
      )
    );
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#00ffff" opacity={0.6} transparent />
    </line>
  );
};

// Main 3D Scene Component
const Scene3D = ({ className = "" }) => {
  return (
    <div className={`${className} relative`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00ffff" intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#ff0080" intensity={0.5} />
        
        {/* Main Security Shield */}
        <SecurityShield position={[0, 0, 0]} />
        
        {/* Floating Data Cubes */}
        <DataCubes />
        
        {/* Network Lines */}
        <NetworkLines />
        
        {/* Rotating Rings */}
        <Float speed={2} rotationIntensity={2} floatIntensity={1}>
          <Torus args={[2, 0.1, 16, 100]} rotation={[0, 0, Math.PI / 2]}>
            <meshStandardMaterial color="#06b6d4" transparent opacity={0.3} />
          </Torus>
        </Float>
        
        <Float speed={1.5} rotationIntensity={1.5} floatIntensity={0.8}>
          <Torus args={[2.5, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#00ffff" transparent opacity={0.2} />
          </Torus>
        </Float>
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;