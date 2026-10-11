import { expect, test } from 'vitest';
import { BoxGeometry } from 'three';
import { dimensions } from './geometry';
test('shared dimensions reach actual Three geometry', () => {
  const geometry = new BoxGeometry(...dimensions());
  expect(geometry.parameters.width).toBe(1.5);
  expect(geometry.parameters.height).toBe(1.5);
  geometry.dispose();
});
