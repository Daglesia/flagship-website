"use client";

import { useCallback, useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Galaxy from "@/components/Galaxy";
import { useLoading } from "@/components/LoadingProvider";

const usePageVisible = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onChange = () => setVisible(!document.hidden);
    onChange();
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  return visible;
};

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
  const [loaded, setLoaded] = useState(false);
  const { markReady } = useLoading();
  const pageVisible = usePageVisible();

  const handleReady = useCallback(() => {
    setLoaded(true);
    markReady();
  }, [markReady]);

  return (
    <>
      <Loader visible={!loaded} />
      <div
        className={`h-full w-full transition-opacity duration-500 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Canvas frameloop={pageVisible ? "always" : "never"}>
          <camera position={[0, 5, 1.0]} />
          <Galaxy />
          <Ready onReady={handleReady} />
          <OrbitControls />
          <EffectComposer multisampling={4}>
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
