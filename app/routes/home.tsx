import { Canvas, useFrame } from "@react-three/fiber";
import { SplatMesh } from "~/components/forge/SplatMesh.client";
import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { ForgeRenderer } from "~/components/forge/ForgeRenderer.client";
import { useRef } from "react";
import type { SplatMesh as ForgeSplatMesh } from "@worldlabsai/forge";

export function meta() {
  return [
    { title: "React Router | Forge" },
    {
      name: "description",
      content: "A basic example of Forge with React Router v7",
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
  const meshRef = useRef<ForgeSplatMesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.5 * delta;
    }
  });

  return (
    <>
      <CameraControls />
      <ForgeRenderer args={[{ renderer }]}>
        {/* This particular splat mesh is upside down */}
        <group rotation={[Math.PI, 0, 0]}>
          <SplatMesh
            ref={meshRef}
            args={[{ url: "/assets/splats/butterfly.wlg" }]}
          />
        </group>
      </ForgeRenderer>
    </>
  );
};
