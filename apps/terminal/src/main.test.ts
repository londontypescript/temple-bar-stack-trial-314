import { spawnSync } from 'node:child_process';
import { expect, test } from 'vitest';
test('the real CLI renders shared source under CI and exits', () => {
  const result = spawnSync(
    process.execPath,
    ['--import', 'tsx', 'src/main.tsx'],
    {
      cwd: process.cwd(),
      env: { ...process.env, CI: 'true' },
      encoding: 'utf8',
      timeout: 10000,
    },
  );
  expect(result.error).toBeUndefined();
  expect(result.status).toBe(0);
  expect(result.stdout).toContain('Shared TypeScript: 314');
});
