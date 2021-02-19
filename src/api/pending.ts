import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "../firestore";
import { Transaction } from "../models/transaction";
import { RootState } from "../store";

const db = initFirebase.firestore();

const transactionConverter = {
  toFirestore: (transaction: Transaction) => {
    return { ...transaction };
  },
  fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot) => {
    const transaction = snapshot.data() as Transaction;
    transaction.date = snapshot.data().date.toDate();
    return transaction;
  },
};

const getPendingTransaction = (
  transactionId: string,
  getState: () => RootState
) => {
  const userId = getState().app.currentUser?.userId ?? "";
  return db
    .collection("users")
    .doc(userId)
    .collection("pending")
    .withConverter(transactionConverter)
    .doc(transactionId)
    .get();
};

const getPendingTransactions = (
  weekStart: Date,
  weekEnd: Date,
  getState: () => RootState
) => {
  const userId = getState().app.currentUser?.userId ?? "";
  weekStart.setHours(0, 0, 0, 0);
  weekEnd.setHours(23, 59, 59, 0);
  return db
    .collection("users")
    .doc(userId)
    .collection("pending")
    .withConverter(transactionConverter)
    .where("date", ">=", weekStart)
    .where("date", "<=", weekEnd)
    .get();
};

const deletePendingTransaction = (
  transactionId: string,
  getState: () => RootState
) => {
  const userId = getState().app.currentUser?.userId ?? "";
  return db
    .collection("users")
    .doc(userId)
    .collection("pending")
    .withConverter(transactionConverter)
    .doc(transactionId)
    .delete();
};

export const PendingApi = {
  getPendingTransaction,
  getPendingTransactions,
  deletePendingTransaction,
};
