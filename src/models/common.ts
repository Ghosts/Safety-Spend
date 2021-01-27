export const transactionTypes = ["income", "expense"] as const;
export type TransactionType = typeof transactionTypes[number];

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
