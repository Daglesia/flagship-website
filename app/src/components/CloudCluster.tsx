"use client";

import { useCallback, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Galaxy from "@/components/Galaxy";
import { useLoading } from "@/components/LoadingProvider";

const Ready = ({ onReady }: { onReady: () => void }) => {
  useEffect(() => {
    const id = requestAnimationFrame(onReady);
    return () => cancelAnimationFrame(id);
  }, [onReady]);
  return null;
};

const Loader = ({ visible }: { visible: boolean }) => (
  <div
    role="status"
    aria-label="Loading"
    className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
      visible ? "opacity-100" : "opacity-0"
    }`}
  >
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
  </div>
);

const Scene = () => {
  const { ready, markReady } = useLoading();

  const handleReady = useCallback(() => {
    markReady();
  }, [markReady]);

  return (
    <>
      <Loader visible={!ready} />
      <div
        className={`h-full w-full transition-opacity duration-500 ease-out ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: false, powerPreference: "high-performance" }}
        >
          <camera position={[0, 5, 1.0]} />
          <Galaxy />
          <Ready onReady={handleReady} />
          <OrbitControls />
          <EffectComposer multisampling={0}>
            <Bloom
              kernelSize={3}
              luminanceThreshold={0}
              luminanceSmoothing={0.3}
              intensity={2}
            />
          </EffectComposer>
        </Canvas>
      </div>
    </>
  );
};

export default Scene;
