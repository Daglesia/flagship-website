"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Galaxy from "@/components/Galaxy";

const Scene = () => {
  return (
    <Canvas>
      <camera position={[0, 5, 1.0]} />
      <Galaxy />
      <OrbitControls />
      <EffectComposer multisampling={8}>
        <Bloom
          kernelSize={3}
          luminanceThreshold={0}
          luminanceSmoothing={0.3}
          intensity={2}
        />
      </EffectComposer>
    </Canvas>
  );
};

export default Scene;
