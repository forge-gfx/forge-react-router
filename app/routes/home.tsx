import { Canvas, useFrame } from "@react-three/fiber";
import { SplatMesh } from "~/components/spark/SplatMesh.client";
import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { SparkRenderer } from "~/components/spark/SparkRenderer.client";
import { useMemo, useRef } from "react";
import type { SplatMesh as SparkSplatMesh } from "@sparkjsdev/spark";

export function meta() {
  return [
    { title: "React Router | Spark" },
    {
      name: "description",
      content: "A basic example of Spark with React Router v7",
    },
  ];
}

export default function Home() {
  return (
    <div className="flex h-screen w-screen">
      <Canvas gl={{ antialias: false }}>
        <Scene />
      </Canvas>
    </div>
  );
}

/**
 * Separate `Scene` component to be used in the React Three Fiber `Canvas` component so that we can use React Three Fiber hooks like `useThree`
 */
const Scene = () => {
  const renderer = useThree((state) => state.gl);
  const meshRef = useRef<SparkSplatMesh>(null);

  // Memoize the elements inside the `<SparkRenderer />` `args` prop so that we don't re-create the `<SparkRenderer />` on every render
  const sparkRendererArgs = useMemo(() => {
    return { renderer };
  }, [renderer]);

  // Memoize the `SplatMesh` `args` prop so that we don't re-create the `SplatMesh` on every render
  const splatMeshArgs = useMemo(
    () =>
      ({
        url: "/assets/splats/butterfly.spz",
      }) as const,
    [],
  );

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.5 * delta;
    }
  });

  return (
    <>
      <CameraControls />
      <SparkRenderer args={[sparkRendererArgs]}>
        {/* This particular splat mesh is upside down */}
        <group rotation={[Math.PI, 0, 0]}>
          <SplatMesh ref={meshRef} args={[splatMeshArgs]} />
        </group>
      </SparkRenderer>
    </>
  );
};
