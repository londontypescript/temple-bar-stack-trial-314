import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { BoxGeometry, Mesh } from 'three';
import { trialValue } from '@trial/shared';
import { dimensions } from './geometry';
function Cube() {
  const mesh = useRef<Mesh<BoxGeometry>>(null);
  useFrame(({ gl }) => {
    if (!mesh.current) return;
    gl.domElement.dataset.sharedSide = String(
      mesh.current.geometry.parameters.width,
    );
    gl.domElement.dataset.frame = String(
      Number(gl.domElement.dataset.frame ?? '0') + 1,
    );
  });
  return (
    <mesh ref={mesh}>
      <boxGeometry args={dimensions()} />
      <meshBasicMaterial color="orange" />
    </mesh>
  );
}
export function App() {
  return (
    <main style={{ width: 640, height: 480 }}>
      <h1>{trialValue().label}</h1>
      <Canvas camera={{ position: [3, 3, 3] }}>
        <Cube />
      </Canvas>
    </main>
  );
}
