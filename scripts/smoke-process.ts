import assert from 'node:assert/strict';
import { spawn, type ChildProcess } from 'node:child_process';
import { once } from 'node:events';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

export async function viteServer(app: string, preview: boolean, port: number) {
  const cwd = resolve('apps', app);
  const require = createRequire(resolve(cwd, 'package.json'));
  const cli = resolve(require.resolve('vite/package.json'), '../bin/vite.js');
  const child = spawn(
    process.execPath,
    [
      cli,
      ...(preview ? ['preview'] : []),
      '--host',
      '127.0.0.1',
      '--port',
      String(port),
      '--strictPort',
    ],
    {
      cwd,
      detached: process.platform !== 'win32',
      stdio: ['ignore', 'pipe', 'pipe'],
    },
  );
  let output = '';
  child.stdout.on('data', (chunk: Buffer) => {
    output += chunk.toString();
  });
  child.stderr.on('data', (chunk: Buffer) => {
    output += chunk.toString();
  });
  const url = `http://127.0.0.1:${String(port)}`;
  try {
    const deadline = Date.now() + 30_000;
    while (Date.now() < deadline) {
      assert.equal(child.exitCode, null, `Vite exited: ${output}`);
      try {
        const response = await fetch(url, {
          signal: AbortSignal.timeout(1000),
        });
        if (response.ok) return { child, url };
      } catch {
        /* The listener is not ready yet; the deadline bounds retries. */
      }
      await delay(100);
    }
    throw new Error(`Vite readiness timeout: ${output}`);
  } catch (error) {
    await stop(child);
    throw error;
  }
}

export async function stop(child: ChildProcess) {
  if (child.exitCode !== null || child.signalCode !== null) return;
  const closed = once(child, 'close');
  function signalTree(signal: NodeJS.Signals) {
    if (process.platform !== 'win32' && child.pid !== undefined) {
      try {
        process.kill(-child.pid, signal);
      } catch (error) {
        if (!(
          error instanceof Error &&
          'code' in error &&
          error.code === 'ESRCH'
        ))
          throw error;
      }
    } else {
      child.kill(signal);
    }
  }
  signalTree('SIGTERM');
  const outcome = await Promise.race([
    closed.then(() => 'closed'),
    delay(5000, undefined, { ref: false }).then(() => 'timeout'),
  ]);
  if (outcome === 'timeout') {
    signalTree('SIGKILL');
    await closed;
  }
}

export async function terminal(built: boolean, ci: boolean) {
  const cwd = resolve('apps/terminal');
  const require = createRequire(resolve(cwd, 'package.json'));
  const args = built
    ? ['dist/main.js']
    : [require.resolve('tsx/cli'), 'src/main.tsx'];
  const env = { ...process.env };
  if (ci) env.CI = 'true';
  else delete env.CI;
  const child = spawn(process.execPath, args, {
    cwd,
    detached: process.platform !== 'win32',
    env,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let output = '';
  child.stdout.on('data', (chunk: Buffer) => {
    output += chunk.toString();
  });
  child.stderr.on('data', (chunk: Buffer) => {
    output += chunk.toString();
  });
  try {
    const outcome = await Promise.race([
      once(child, 'close'),
      delay(30_000, undefined, { ref: false }).then(() => null),
    ]);
    assert.ok(outcome, 'Ink exit timeout');
    assert.equal(outcome[0], 0, output);
    assert.match(output, /Shared TypeScript: 314/, 'Ink shared output missing');
    return { built, ci, exit: outcome[0], sharedText: true };
  } finally {
    await stop(child);
  }
}
