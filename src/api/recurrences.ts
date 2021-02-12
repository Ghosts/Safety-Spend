import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "../firestore";
import { Recurrence } from "../models/recurrence";
import { RootState } from "../store";

const db = initFirebase.firestore();

const recurrenceConverter = {
  toFirestore: (recurrence: Recurrence) => {
    return { ...recurrence };
  },
  fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot) =>
    snapshot.data() as Recurrence,
};

const getRecurrence = (recurrenceId: string, getState: () => RootState) => {
  const userId = getState().app.currentUser?.userId ?? "";
  return db
    .collection("users")
    .doc(userId)
    .collection("recurrences")
    .withConverter(recurrenceConverter)
    .doc(recurrenceId)
    .get();
};

const getRecurrences = (getState: () => RootState) => {
  const userId = getState().app.currentUser?.userId ?? "";
  return db
    .collection("users")
    .doc(userId)
    .collection("recurrences")
    .withConverter(recurrenceConverter)
    .get();
};

const setRecurrence = (recurrence: Recurrence, getState: () => RootState) => {
  const userId = getState().app.currentUser?.userId ?? "";
  return db
    .collection("users")
    .doc(userId)
    .collection("recurrences")
    .withConverter(recurrenceConverter)
    .doc(recurrence.id)
    .set(recurrence);
};

const deleteRecurrence = (recurrenceId: string, getState: () => RootState) => {
  const userId = getState().app.currentUser?.userId ?? "";
  return db
    .collection("users")
    .doc(userId)
    .collection("recurrences")
    .withConverter(recurrenceConverter)
    .doc(recurrenceId)
    .delete();
};

export const RecurrencesApi = {
  getRecurrence,
  getRecurrences,
  setRecurrence,
  deleteRecurrence,
};
