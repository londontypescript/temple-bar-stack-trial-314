import { expect, test } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { App } from './App';
test('the DOM target renders the shared source value', () => {
  expect(renderToStaticMarkup(<App />)).toContain(
    '<h1>Shared TypeScript: 314</h1>',
  );
});
