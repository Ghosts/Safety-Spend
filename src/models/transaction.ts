import { TransactionType } from "./common";

export type Transaction = {
  id?: number;
  description: string;
  date: string; // converted as Date.toString() - back with new Date(string)
  type: TransactionType;
  amount: number;
};
