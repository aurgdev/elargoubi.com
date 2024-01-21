"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { TextureLoader } from "three";
import { useTheme } from "next-themes";

export default function HeroCube() {
  return (
    <div className="h-full w-full">
      <Canvas
        style={{
          height: "400px",
          width: "100%",
        }}
      >
        <OrbitControls enableZoom={false} enablePan={false} />
        <ambientLight intensity={2} />
        <directionalLight position={[2, 2, 1]} />

        <Cube />
      </Canvas>
    </div>
  );
}

function Cube() {
  const { theme } = useTheme();
  const light = "/light.png";
  const dark = "/dark.png";
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.25;
    mesh.current.rotation.y += delta * 0.25;
    mesh.current.rotation.z += delta * 0.25;
  });

  const terxture_1 = useLoader(TextureLoader, theme === "light" ? light : dark);

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial map={terxture_1} />
    </mesh>
  );
}
