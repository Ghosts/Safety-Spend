export type Recurrence = {
  id?: number;
  description: string;
  frequency:
    | "weekly"
    | "bi-weekly"
    | "monthly"
    | "semi-monthly"
    | "annually"
    | "semi-annually";
  type: "income" | "expense";
  amount: number;
};
