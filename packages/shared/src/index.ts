export interface TrialValue {
  readonly label: string;
  readonly side: number;
}
export function trialValue(): TrialValue {
  return { label: 'Shared TypeScript: 314', side: 1.5 };
}
