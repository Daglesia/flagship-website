"use client";

import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { randomNormalDistribution } from "@utils/math";
import {
  TextureLoader,
  Points,
  BufferGeometry,
  ShaderMaterial,
  MathUtils,
  Color,
  Group,
  Vector3,
  Euler,
} from "three";
import { useProgress } from "@react-three/drei";
import vertexShader from "@/components/shaders/galaxy.vert.glsl";
import fragmentShader from "@/components/shaders/galaxy.frag.glsl";

const CustomGeometryParticles = (props: { count: any }) => {
  const [map] = useLoader(TextureLoader, ["/disc.png"]);
  const { count } = props;
  const radius = 2;
  const { progress } = useProgress();
  console.log(progress);
  const points = useRef<Points<BufferGeometry, ShaderMaterial>>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = MathUtils.randFloatSpread(Math.PI) + Math.PI / 2;

      const aValue = 1;

      let x =
        aValue * (1 - Math.cos(theta)) * Math.cos(theta) +
        randomNormalDistribution(-0.5, 0.5, 1);
      let y =
        aValue * (1 - Math.cos(theta)) * Math.sin(theta) +
        randomNormalDistribution(-0.5, 0.5, 1);
      let z = randomNormalDistribution(0.5, 1.5, 1);

      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, [count]);

  const particlesSizes = useMemo(() => {
    const positions = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i] = randomNormalDistribution(-10, 10, 1);
    }

    return positions;
  }, [count]);

  const particlesColors = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions.set(
        [
          MathUtils.randFloat(0.5, 0.6),
          MathUtils.randFloat(0.8, 1.0),
          MathUtils.randFloat(0.8, 1.0),
        ],
        i * 3,
      );
    }

    return positions;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0.0,
      },
      uRadius: {
        value: radius,
      },
      uTexture: {
        value: map,
      },
      uGlowColor: { value: new Color(0x0099ff) },
    }),
    [],
  );

  useFrame((state) => {
    const { clock } = state;

    if (points.current) {
      points.current.material.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particlesSizes.length}
          array={particlesSizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesColors.length / 3}
          array={particlesColors}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        depthWrite={false}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        transparent
      />
    </points>
  );
};

const Galaxy = () => {
  const galaxyRef = useRef<Group>(null);
  const { size } = useThree();
  useFrame(() => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.z -= 0.0001;
    }
  });

  if (size.width <= 640) {
  }
  const galaxyPosition = size.width <= 640 ? [0.2, -1.15, 0] : [2.5, -0.4, 0];

  console.log(size);
  return (
    <group
      ref={galaxyRef}
      position={new Vector3(...galaxyPosition)}
      rotation={[-Math.PI / 5, -Math.PI / 6, Math.PI]}
      scale={Math.max(size.width / 1745, 0.5)}
    >
      <group position={[0, 0, 0]}>
        <CustomGeometryParticles count={1000} />
      </group>
      <group position={[0, 0, 0]} rotation={new Euler(0, 0, (2 * Math.PI) / 5)}>
        <CustomGeometryParticles count={1000} />
      </group>
      <group
        position={[0, 0, 0]}
        rotation={new Euler(0, 0, (2 * 2 * Math.PI) / 5)}
      >
        <CustomGeometryParticles count={1000} />
      </group>
      <group
        position={[0, 0, 0]}
        rotation={new Euler(0, 0, (2 * 3 * Math.PI) / 5)}
      >
        <CustomGeometryParticles count={1000} />
      </group>
      <group
        position={[0, 0, 0]}
        rotation={new Euler(0, 0, (2 * 4 * Math.PI) / 5)}
      >
        <CustomGeometryParticles count={1000} />
      </group>
    </group>
  );
};

export default Galaxy;
