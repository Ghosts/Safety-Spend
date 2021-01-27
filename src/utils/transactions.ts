import { Transaction } from "../models/transaction";

export const getTransactionsByDay = (d: Date, transactions: Transaction[]) => {
  return transactions.filter((t) => {
    const tDay = new Date(t.date + " ");
    return (
      d.getFullYear() === tDay.getFullYear() &&
      d.getMonth() === tDay.getMonth() &&
      d.getDate() === tDay.getDate()
    );
  });
};

/**
 *
 * @param d Any date for the week you want transactions from
 * @param transactions
 */
export const getTransactionsByWeek = (d: Date, transactions: Transaction[]) => {
  return transactions.filter((t) => {
    const tDay = new Date(t.date + " ");
    return (
      d.getFullYear() === tDay.getFullYear() &&
      d.getMonth() === tDay.getMonth() &&
      d.getDate() === tDay.getDate()
    );
  });
};
