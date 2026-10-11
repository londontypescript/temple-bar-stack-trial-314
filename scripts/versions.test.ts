import { createRequire } from 'node:module';
import { expect, test } from 'vitest';
const web = createRequire(new URL('../apps/web/package.json', import.meta.url));
const version = (value: unknown): string => {
  if (
    !value ||
    typeof value !== 'object' ||
    !('version' in value) ||
    typeof value.version !== 'string'
  )
    throw new Error('Missing package version');
  return value.version;
};
test('installed React and React DOM versions match', () => {
  expect(version(web('react/package.json') as unknown)).toBe(
    version(web('react-dom/package.json') as unknown),
  );
});
