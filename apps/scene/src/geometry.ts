import { trialValue } from '@trial/shared';
export function dimensions(): [number, number, number] {
  const { side } = trialValue();
  return [side, side, side];
}
