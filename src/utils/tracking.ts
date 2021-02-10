import { Recurrence } from "../models/recurrence";
import { Transaction } from "../models/transaction";

const getWeeklyFromSchedule = (recurrence: Recurrence) => {
  switch (recurrence.frequency) {
    case "annually":
      return recurrence.amount / 52;
    case "semi-annually":
      return (recurrence.amount * 2) / 52;
    case "monthly":
      return (recurrence.amount * 12) / 52;
    case "semi-monthly":
      return (recurrence.amount * 24) / 52;
    case "weekly":
      return recurrence.amount;
    case "bi-weekly":
      return (recurrence.amount * 26) / 52;
  }
};

export const getSafeToSpend = (recurrences: Recurrence[]) => {
  const recurrenceExpenses =
    recurrences.length > 0
      ? recurrences
          .map((r) => (r.type === "expense" ? getWeeklyFromSchedule(r) : 0))
          .reduce((prev, next) => prev + next)
      : 0;
  const recurrenceIncome =
    recurrences.length > 0
      ? recurrences
          .map((r) => (r.type === "income" ? getWeeklyFromSchedule(r) : 0))
          .reduce((prev, next) => prev + next)
      : 0;
  return recurrenceIncome - recurrenceExpenses;
};

export const getWeeklyExpenses = (recurrences: Recurrence[]) => {
  return recurrences.length > 0
    ? recurrences
        .map((r) => (r.type === "expense" ? getWeeklyFromSchedule(r) : 0))
        .reduce((prev, next) => prev + next)
    : 0;
};

export const getWeeklyIncome = (recurrences: Recurrence[]) => {
  return recurrences.length > 0
    ? recurrences
        .map((r) => (r.type === "income" ? getWeeklyFromSchedule(r) : 0))
        .reduce((prev, next) => prev + next)
    : 0;
};

export const getCurrentSafeToSpend = (
  recurrences: Recurrence[],
  transactions: Transaction[]
) => {
  const recurrenceExpenses =
    recurrences.length > 0
      ? recurrences
          .map((r) => (r.type === "expense" ? getWeeklyFromSchedule(r) : 0))
          .reduce((prev, next) => prev + next)
      : 0;
  const recurrenceIncome =
    recurrences.length > 0
      ? recurrences
          .map((r) => (r.type === "income" ? getWeeklyFromSchedule(r) : 0))
          .reduce((prev, next) => prev + next)
      : 0;
  const transactionExpenses =
    transactions.length > 0
      ? transactions
          .map((r) => (r.type === "expense" ? r.amount : 0))
          .reduce((prev, next) => prev + next)
      : 0;
  const transactionIncome =
    transactions.length > 0
      ? transactions
          .map((r) => (r.type === "income" ? r.amount : 0))
          .reduce((prev, next) => prev + next)
      : 0;

  return (
    recurrenceIncome -
    recurrenceExpenses +
    (transactionIncome - transactionExpenses)
  );
};
