import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { TextureLoader } from 'three';
import * as THREE from 'three';

// 3D Model Component
const HackerModel = () => {
  const modelRef = useRef();
  const fbx = useLoader(FBXLoader, '/hack/source/hack.fbx');
  
  // Load textures
  const textures = {
    trollBodyDiffuse: useLoader(TextureLoader, '/hack/textures/troll_Body_Diffuse.png'),
    trollBodyNormal: useLoader(TextureLoader, '/hack/textures/troll_Body_Normal.png'),
    trollBodySpecular: useLoader(TextureLoader, '/hack/textures/troll_Body_Specular.png'),
    trollBodyOpacity: useLoader(TextureLoader, '/hack/textures/troll_Body_Opacity.png'),
    trollHairDiffuse: useLoader(TextureLoader, '/hack/textures/troll_Hair_Diffuse.png'),
    trollHairNormal: useLoader(TextureLoader, '/hack/textures/troll_Hair_Normal.png'),
    trollHairSpecular: useLoader(TextureLoader, '/hack/textures/troll_Hair_Specular.png'),
    trollTopDiffuse: useLoader(TextureLoader, '/hack/textures/troll_Top_Diffuse.png'),
    trollTopNormal: useLoader(TextureLoader, '/hack/textures/troll_Top_Normal.png'),
    trollBottomDiffuse: useLoader(TextureLoader, '/hack/textures/troll_Bottom_Diffuse.png'),
    trollEyewearDiffuse: useLoader(TextureLoader, '/hack/textures/troll_Eyewear_Diffuse.png'),
    monitorTexture: useLoader(TextureLoader, '/hack/textures/monitor1.jpeg'),
    deskTexture: useLoader(TextureLoader, '/hack/textures/directordesk.jpeg'),
    chairTexture: useLoader(TextureLoader, '/hack/textures/sandali-1_COLOR.png'),
  };

  useEffect(() => {
    if (fbx && modelRef.current) {
      // Scale and position the model
      modelRef.current.scale.set(0.02, 0.02, 0.02);
      modelRef.current.position.set(0, -2, 0);
      modelRef.current.rotation.set(0, Math.PI * 0.1, 0);

      // Apply textures to model parts
      fbx.traverse((child) => {
        if (child.isMesh) {
          const material = child.material;
          const meshName = child.name.toLowerCase();

          // Apply appropriate textures based on mesh names
          if (meshName.includes('body') || meshName.includes('troll')) {
            const bodyMaterial = new THREE.MeshStandardMaterial({
              map: textures.trollBodyDiffuse,
              normalMap: textures.trollBodyNormal,
              roughnessMap: textures.trollBodySpecular,
              transparent: true,
              alphaMap: textures.trollBodyOpacity,
            });
            child.material = bodyMaterial;
          } else if (meshName.includes('hair')) {
            const hairMaterial = new THREE.MeshStandardMaterial({
              map: textures.trollHairDiffuse,
              normalMap: textures.trollHairNormal,
              roughnessMap: textures.trollHairSpecular,
            });
            child.material = hairMaterial;
          } else if (meshName.includes('top') || meshName.includes('shirt')) {
            const topMaterial = new THREE.MeshStandardMaterial({
              map: textures.trollTopDiffuse,
              normalMap: textures.trollTopNormal,
            });
            child.material = topMaterial;
          } else if (meshName.includes('bottom') || meshName.includes('pants')) {
            const bottomMaterial = new THREE.MeshStandardMaterial({
              map: textures.trollBottomDiffuse,
            });
            child.material = bottomMaterial;
          } else if (meshName.includes('eyewear') || meshName.includes('glasses')) {
            const eyewearMaterial = new THREE.MeshStandardMaterial({
              map: textures.trollEyewearDiffuse,
              transparent: true,
            });
            child.material = eyewearMaterial;
          } else if (meshName.includes('monitor') || meshName.includes('screen')) {
            const monitorMaterial = new THREE.MeshStandardMaterial({
              map: textures.monitorTexture,
              emissive: new THREE.Color(0x001133),
              emissiveIntensity: 0.3,
            });
            child.material = monitorMaterial;
          } else if (meshName.includes('desk') || meshName.includes('table')) {
            const deskMaterial = new THREE.MeshStandardMaterial({
              map: textures.deskTexture,
            });
            child.material = deskMaterial;
          } else if (meshName.includes('chair') || meshName.includes('seat')) {
            const chairMaterial = new THREE.MeshStandardMaterial({
              map: textures.chairTexture,
            });
            child.material = chairMaterial;
          }

          // Enable shadows
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [fbx, textures]);

  // Subtle animation
  useFrame((state) => {
    if (modelRef.current) {
      // Gentle floating animation
      modelRef.current.position.y = -2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      // Subtle rotation
      modelRef.current.rotation.y = Math.PI * 0.1 + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return <primitive ref={modelRef} object={fbx} />;
};

// Loading fallback
const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#4a90e2" wireframe />
  </mesh>
);

// Main 3D Scene Component
const HackerScene3D = () => {
  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [2, 0, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Lighting Setup */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0066ff" />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#ff6600" />

        {/* Environment and Controls */}
        <Environment preset="night" />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />

        {/* Contact Shadows */}
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.4}
          scale={20}
          blur={2}
          far={4}
        />

        {/* 3D Model */}
        <Suspense fallback={<LoadingFallback />}>
          <HackerModel />
        </Suspense>

        {/* Fog for atmosphere */}
        <fog attach="fog" args={['#0a0a0a', 8, 20]} />
      </Canvas>

      {/* Loading overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-blue-900/20 pointer-events-none" />
      
      {/* Cyberpunk grid overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};

export default HackerScene3D;