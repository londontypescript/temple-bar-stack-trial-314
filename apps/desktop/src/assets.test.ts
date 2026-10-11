import { expect, test } from 'vitest';
import { resolve } from 'node:path';
import { assetPath } from './assets';
test('desktop maps built web assets while containing paths and origins', () => {
  const root = resolve('web-output');
  expect(assetPath('app://fixture/', root)).toBe(resolve(root, 'index.html'));
  expect(assetPath('app://fixture/assets/main.js', root)).toBe(
    resolve(root, 'assets/main.js'),
  );
  expect(() => assetPath('https://other/', root)).toThrow(
    'Unexpected asset origin',
  );
  expect(() => assetPath('app://fixture/%2e%2e%2fsecret', root)).toThrow(
    'Asset path leaves web output',
  );
});
