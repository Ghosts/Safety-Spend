export type Transaction = {
  id?: number;
  merchant: string;
  date: string; // converted as Date.toString() - back with new Date(string)
  amount: number;
};
