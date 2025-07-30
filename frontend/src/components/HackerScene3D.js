import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { TextureLoader } from 'three';
import * as THREE from 'three';

// 3D Model Component
const HackerModel = () => {
  const modelRef = useRef();
  const fbx = useLoader(FBXLoader, '/hack/source/hack.fbx');
  
  // Load essential textures only
  const textures = {
    trollBodyDiffuse: useLoader(TextureLoader, '/hack/textures/troll_Body_Diffuse.png'),
    trollBodyNormal: useLoader(TextureLoader, '/hack/textures/troll_Body_Normal.png'),
    trollHairDiffuse: useLoader(TextureLoader, '/hack/textures/troll_Hair_Diffuse.png'),
    trollTopDiffuse: useLoader(TextureLoader, '/hack/textures/troll_Top_Diffuse.png'),
    trollBottomDiffuse: useLoader(TextureLoader, '/hack/textures/troll_Bottom_Diffuse.png'),
    trollEyewearDiffuse: useLoader(TextureLoader, '/hack/textures/troll_Eyewear_Diffuse.png'),
    monitorTexture: useLoader(TextureLoader, '/hack/textures/monitor1.jpeg'),
    deskTexture: useLoader(TextureLoader, '/hack/textures/directordesk.jpeg'),
    chairTexture: useLoader(TextureLoader, '/hack/textures/sandali-1_COLOR.png'),
  };

  useEffect(() => {
    if (fbx && modelRef.current) {
      // Scale down the model significantly for professional look
      modelRef.current.scale.set(0.015, 0.015, 0.015);
      modelRef.current.position.set(0, -1.5, 0);
      modelRef.current.rotation.set(0, Math.PI * 0.15, 0);

      // Apply improved materials with professional colors
      fbx.traverse((child) => {
        if (child.isMesh) {
          const meshName = child.name.toLowerCase();

          // Apply professional color scheme
          if (meshName.includes('body') || meshName.includes('troll')) {
            const bodyMaterial = new THREE.MeshStandardMaterial({
              map: textures.trollBodyDiffuse,
              normalMap: textures.trollBodyNormal,
              color: new THREE.Color(0.9, 0.85, 0.8), // Professional skin tone
              roughness: 0.7,
              metalness: 0.1,
            });
            child.material = bodyMaterial;
          } else if (meshName.includes('hair')) {
            const hairMaterial = new THREE.MeshStandardMaterial({
              map: textures.trollHairDiffuse,
              color: new THREE.Color(0.2, 0.15, 0.1), // Professional dark hair
              roughness: 0.8,
              metalness: 0.0,
            });
            child.material = hairMaterial;
          } else if (meshName.includes('top') || meshName.includes('shirt')) {
            const topMaterial = new THREE.MeshStandardMaterial({
              map: textures.trollTopDiffuse,
              color: new THREE.Color(0.1, 0.2, 0.4), // Professional dark blue shirt
              roughness: 0.6,
              metalness: 0.0,
            });
            child.material = topMaterial;
          } else if (meshName.includes('bottom') || meshName.includes('pants')) {
            const bottomMaterial = new THREE.MeshStandardMaterial({
              map: textures.trollBottomDiffuse,
              color: new THREE.Color(0.15, 0.15, 0.15), // Professional dark pants
              roughness: 0.7,
              metalness: 0.0,
            });
            child.material = bottomMaterial;
          } else if (meshName.includes('eyewear') || meshName.includes('glasses')) {
            const eyewearMaterial = new THREE.MeshStandardMaterial({
              map: textures.trollEyewearDiffuse,
              color: new THREE.Color(0.1, 0.1, 0.1), // Dark professional glasses
              roughness: 0.2,
              metalness: 0.8,
              transparent: true,
              opacity: 0.9,
            });
            child.material = eyewearMaterial;
          } else if (meshName.includes('monitor') || meshName.includes('screen')) {
            const monitorMaterial = new THREE.MeshStandardMaterial({
              map: textures.monitorTexture,
              color: new THREE.Color(0.8, 0.8, 0.8),
              emissive: new THREE.Color(0.05, 0.1, 0.2),
              emissiveIntensity: 0.2,
              roughness: 0.3,
              metalness: 0.7,
            });
            child.material = monitorMaterial;
          } else if (meshName.includes('desk') || meshName.includes('table')) {
            const deskMaterial = new THREE.MeshStandardMaterial({
              map: textures.deskTexture,
              color: new THREE.Color(0.4, 0.3, 0.2), // Professional wood tone
              roughness: 0.8,
              metalness: 0.0,
            });
            child.material = deskMaterial;
          } else if (meshName.includes('chair') || meshName.includes('seat')) {
            const chairMaterial = new THREE.MeshStandardMaterial({
              map: textures.chairTexture,
              color: new THREE.Color(0.2, 0.2, 0.2), // Professional dark chair
              roughness: 0.6,
              metalness: 0.1,
            });
            child.material = chairMaterial;
          }

          // Enable shadows for better depth
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [fbx, textures]);

  // Minimal subtle animation
  useFrame((state) => {
    if (modelRef.current) {
      // Very subtle breathing animation
      modelRef.current.position.y = -1.5 + Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
      // Minimal rotation for dynamic feel
      modelRef.current.rotation.y = Math.PI * 0.15 + Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
    }
  });

  return <primitive ref={modelRef} object={fbx} />;
};

// Simple loading fallback
const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[0.8, 0.8, 0.8]} />
    <meshStandardMaterial color="#2563eb" wireframe />
  </mesh>
);

// Clean Professional 3D Scene Component
const HackerScene3D = () => {
  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [3, 1, 4], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Professional lighting setup */}
        <ambientLight intensity={0.4} color="#ffffff" />
        <directionalLight
          position={[5, 8, 5]}
          intensity={0.8}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={20}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
        />
        <pointLight position={[-3, 2, 3]} intensity={0.3} color="#4f46e5" />
        <pointLight position={[3, 2, -3]} intensity={0.2} color="#06b6d4" />

        {/* Clean orbit controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={1}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 6}
          maxAzimuthAngle={Math.PI / 3}
          minAzimuthAngle={-Math.PI / 3}
        />

        {/* Simple ground plane */}
        <mesh receiveShadow position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial 
            color="#1e293b" 
            transparent 
            opacity={0.3}
            roughness={0.8}
          />
        </mesh>

        {/* 3D Model */}
        <Suspense fallback={<LoadingFallback />}>
          <HackerModel />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HackerScene3D;