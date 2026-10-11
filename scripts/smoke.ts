import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { chromium, _electron, expect, type Page } from '@playwright/test';
import { viteServer, stop, terminal } from './smoke-process';

const label = 'Shared TypeScript: 314';
await mkdir('artifacts', { recursive: true });
const results: object[] = [];
function captureErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => {
    errors.push(error.message);
  });
  page.on('requestfailed', (request) => {
    errors.push(
      `${request.url()}: ${request.failure()?.errorText ?? 'failed'}`,
    );
  });
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}
async function browserSmoke() {
  const browser = await chromium.launch({ timeout: 30_000 });
  try {
    for (const [app, preview, port] of [
      ['web', false, 4311],
      ['web', true, 4312],
      ['scene', false, 4313],
      ['scene', true, 4314],
    ] as const) {
      if (process.argv.includes('--web-only') && app !== 'web') continue;
      if (process.argv.includes('--scene-only') && app !== 'scene') continue;
      const server = await viteServer(app, preview, port);
      const page = await browser.newPage();
      const errors = captureErrors(page);
      let rendering: object | undefined;
      try {
        await page.goto(server.url, { timeout: 30_000 });
        await expect(page.getByRole('heading', { name: label })).toBeVisible();
        if (app === 'scene') {
          const canvas = page.locator('canvas');
          await expect(canvas).toHaveAttribute('data-shared-side', '1.5');
          await expect
            .poll(async () => Number(await canvas.getAttribute('data-frame')))
            .toBeGreaterThan(1);
          const webgl = await canvas.evaluate((element) => {
            const canvas = element as HTMLCanvasElement;
            const gl = canvas.getContext('webgl2');
            return gl !== null && !gl.isContextLost();
          });
          assert.ok(webgl, 'Fiber WebGL context is absent or lost');
          rendering = {
            webgl,
            geometryWidth: Number(
              await canvas.getAttribute('data-shared-side'),
            ),
            frames: Number(await canvas.getAttribute('data-frame')),
          };
          await page.screenshot({
            path: `artifacts/scene-${preview ? 'built' : 'dev'}.png`,
          });
        }
        assert.deepEqual(errors, [], `${app} browser errors`);
        results.push({ app, preview, sharedText: true, rendering, errors });
      } finally {
        await page.close();
        await stop(server.child);
      }
    }
  } finally {
    await browser.close();
  }
}
async function desktopSmoke() {
  const require = createRequire(resolve('apps/desktop/package.json'));
  const executable: unknown = require('electron');
  assert.equal(typeof executable, 'string');
  assert.ok(typeof executable === 'string');
  const desktop = await _electron.launch({
    executablePath: executable,
    chromiumSandbox: true,
    args: [
      `--user-data-dir=${resolve('artifacts/electron-profile')}`,
      resolve('apps/desktop/dist/main.cjs'),
    ],
    timeout: 30_000,
  });
  let stderr = '';
  desktop.process().stderr?.on('data', (chunk: Buffer) => {
    stderr += chunk.toString();
  });
  try {
    const page = await desktop.firstWindow({ timeout: 30_000 });
    const errors = captureErrors(page);
    await expect(page.getByRole('heading', { name: label })).toBeVisible();
    assert.equal(page.url(), 'app://fixture/');
    const main = await desktop.evaluate(({ BrowserWindow, app }) => {
      const window = BrowserWindow.getAllWindows()[0];
      if (!window) throw new Error('Electron main window missing');
      const renderer = app
        .getAppMetrics()
        .find((metric) => metric.pid === window.webContents.getOSProcessId());
      return { title: window.getTitle(), sandboxed: renderer?.sandboxed };
    });
    assert.deepEqual(main, { title: label, sandboxed: true });
    const nodeGlobals = await page.evaluate(() => ({
      require: typeof Reflect.get(globalThis, 'require'),
      process: typeof Reflect.get(globalThis, 'process'),
    }));
    assert.deepEqual(nodeGlobals, {
      require: 'undefined',
      process: 'undefined',
    });
    errors.push(...(await page.pageErrors()).map((error) => error.message));
    assert.deepEqual(errors, [], 'Electron renderer errors');
    await page.screenshot({ path: 'artifacts/desktop.png' });
    results.push({
      app: 'desktop',
      main,
      nodeGlobals,
      origin: page.url(),
      errors,
    });
  } finally {
    await writeFile('artifacts/electron-stderr.log', stderr);
    await desktop.close();
  }
}
try {
  if (!process.argv.includes('--desktop-only')) {
    if (!process.argv.includes('--terminal-only')) await browserSmoke();
    for (const built of [false, true])
      for (const ci of [false, true]) {
        results.push({ app: 'terminal', ...(await terminal(built, ci)) });
      }
  }
  if (
    !process.argv.some((argument) =>
      [
        '--browser-terminal-only',
        '--web-only',
        '--scene-only',
        '--terminal-only',
      ].includes(argument),
    )
  )
    await desktopSmoke();
  console.log(JSON.stringify(results, null, 2));
} finally {
  await writeFile(
    'artifacts/smoke-results.json',
    JSON.stringify(results, null, 2) + '\n',
  );
}
