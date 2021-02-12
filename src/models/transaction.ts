export const transactionTypes = ["income", "expense"] as const;
export type TransactionType = typeof transactionTypes[number];

export class Transaction {
  id: string;
  description: string;
  date: Date; // converted as Date.toString() - back with new Date(string)
  type: TransactionType;
  amount: number;

  constructor(
    id: string,
    description: string,
    date: Date,
    type: TransactionType,
    amount: number
  ) {
    this.id = id;
    this.description = description;
    this.date = date;
    this.type = type;
    this.amount = amount;
  }
}

export function getTypedTransactionType(
  maybeTransactionType: string
): TransactionType {
  const transactionType = transactionTypes.find(
    (validTransactionType) => validTransactionType === maybeTransactionType
  );
  if (transactionType) {
    return transactionType;
  }
  throw new Error(
    `String "${maybeTransactionType}" is not a valid transaction type.`
  );
}
