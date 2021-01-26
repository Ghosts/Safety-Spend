export type Transaction = {
  id?: number;
  description: string;
  date: string; // converted as Date.toString() - back with new Date(string)
  type: "income" | "expense";
  amount: number;
};
