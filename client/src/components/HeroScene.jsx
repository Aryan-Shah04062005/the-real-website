import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { useRef } from 'react';

const AnimatedSphere = () => {
  const sphereRef = useRef();

  useFrame((state) => {
    const { clock } = state;
    sphereRef.current.rotation.x = clock.getElapsedTime() * 0.2;
    sphereRef.current.rotation.y = clock.getElapsedTime() * 0.3;
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={sphereRef} args={[1, 100, 200]} scale={2.4}>
        <MeshDistortMaterial
          color="#1a1a1a"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0}
        />
      </Sphere>
    </Float>
  );
};

const HeroScene = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        
        <AnimatedSphere />
        
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  );
};

export default HeroScene;
