import { resolve, sep } from 'node:path';
export function assetPath(request: string, root: string): string {
  const url = new URL(request);
  if (url.protocol !== 'app:' || url.hostname !== 'fixture')
    throw new Error('Unexpected asset origin');
  const path = resolve(
    root,
    '.' +
      decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname),
  );
  if (!path.startsWith(resolve(root) + sep))
    throw new Error('Asset path leaves web output');
  return path;
}
