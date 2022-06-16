import "firebase/firestore";
import { db } from "../firestore";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  setDoc,
  where,
} from "firebase/firestore";
import { Transaction } from "../models/transaction";
import { RootState } from "../store";

const transactionConverter = {
  toFirestore: (transaction: Transaction) => {
    return { ...transaction };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot) => {
    const transaction = snapshot.data() as Transaction;
    transaction.date = snapshot.data().date.toDate();
    return transaction;
  },
};

const getTransaction = async (
  transactionId: string,
  getState: () => RootState
) => {
  const userId = getState().app.currentUser?.userId ?? "";
  const transactionRef = doc(
    db,
    "users",
    userId,
    "transactions",
    transactionId
  ).withConverter(transactionConverter);

  const transactionSnapshot = await getDoc(transactionRef);
  if (transactionSnapshot.exists()) {
    return transactionSnapshot.data();
  } else {
    return null;
  }
};

const getTransactions = async (
  weekStart: Date,
  weekEnd: Date,
  getState: () => RootState
) => {
  const userId = getState().app.currentUser?.userId ?? "";
  weekStart.setHours(0, 0, 0, 0);
  weekEnd.setHours(23, 59, 59, 0);

  const transactionsRef = collection(
    db,
    "users",
    userId,
    "transactions"
  ).withConverter(transactionConverter);

  const transactionsQuery = query(
    transactionsRef,
    where("date", ">=", weekStart),
    where("date", "<=", weekEnd)
  );

  const querySnapshot = await getDocs(transactionsQuery);
  return querySnapshot.docs.map((transaction) => transaction.data());
};

const setTransaction = async (
  transaction: Transaction,
  getState: () => RootState
) => {
  const userId = getState().app.currentUser?.userId ?? "";
  transaction.date.setHours(12, 0, 0, 0);

  const docRef = doc(
    db,
    "users",
    userId,
    "transactions",
    transaction.id
  ).withConverter(transactionConverter);

  await setDoc(docRef, {
    ...transaction,
  });
};

const deleteTransaction = async (
  transactionId: string,
  getState: () => RootState
) => {
  const userId = getState().app.currentUser?.userId ?? "";
  const transactionRef = doc(
    db,
    "users",
    userId,
    "transactions",
    transactionId
  ).withConverter(transactionConverter);

  await deleteDoc(transactionRef);
};

export const TransactionsApi = {
  getTransaction,
  setTransaction,
  getTransactions,
  deleteTransaction,
};
