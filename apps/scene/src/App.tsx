import { Canvas, useFrame } from '@react-three/fiber';
import { trialValue } from '@trial/shared';
import { dimensions } from './geometry';
function Cube() {
  useFrame(({ gl }) => {
    gl.domElement.dataset.sharedSide = String(trialValue().side);
    gl.domElement.dataset.frame = String(
      Number(gl.domElement.dataset.frame ?? '0') + 1,
    );
  });
  return (
    <mesh>
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
