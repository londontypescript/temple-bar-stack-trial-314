import { expect, test } from 'vitest';
import { trialValue } from './index';
test('shared values are deterministic and separate per call', () => {
  expect(trialValue()).toEqual({ label: 'Shared TypeScript: 314', side: 1.5 });
  expect(trialValue()).not.toBe(trialValue());
});
