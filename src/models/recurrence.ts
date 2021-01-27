import { TransactionType } from "./common";

export type Recurrence = {
  id?: number;
  description: string;
  frequency: Frequencies;
  type: TransactionType;
  amount: number;
};

export const frequencies = [
  "weekly",
  "bi-weekly",
  "monthly",
  "semi-monthly",
  "annually",
  "semi-annually",
] as const;
export type Frequencies = typeof frequencies[number];

export function getTypedFrequency(maybeFrequency: string): Frequencies {
  const frequency = frequencies.find(
    (validFrequency) => validFrequency === maybeFrequency
  );
  if (frequency) {
    return frequency;
  }
  throw new Error(
    `String "${maybeFrequency}" is not a valid transaction type.`
  );
}
