import "firebase/firestore";
import { db } from "../firestore";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  QueryDocumentSnapshot,
  setDoc,
} from "firebase/firestore";
import { Recurrence } from "../models/recurrence";
import { RootState } from "../store";

const recurrenceConverter = {
  toFirestore: (recurrence: Recurrence) => {
    return { ...recurrence };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot) =>
    snapshot.data() as Recurrence,
};

const getRecurrence = async (
  recurrenceId: string,
  getState: () => RootState
) => {
  const userId = getState().app.currentUser?.userId ?? "";
  const recurrenceRef = doc(
    db,
    "users",
    userId,
    "recurrences",
    recurrenceId
  ).withConverter(recurrenceConverter);

  const recurrenceSnapshot = await getDoc(recurrenceRef);

  if (recurrenceSnapshot.exists()) {
    return recurrenceSnapshot.data();
  } else {
    return null;
  }
};

const getRecurrences = async (getState: () => RootState) => {
  const userId = getState().app.currentUser?.userId ?? "";
  const recurrencesQuerySnapshot = await getDocs(
    collection(db, "users", userId, "recurrences")?.withConverter(
      recurrenceConverter
    )
  );
  return recurrencesQuerySnapshot.docs.map((recurrence) => recurrence.data());
};

const setRecurrence = async (
  recurrence: Recurrence,
  getState: () => RootState
) => {
  const userId = getState().app.currentUser?.userId ?? "";
  const recurrenceRef = doc(
    db,
    "users",
    userId,
    "recurrences",
    recurrence.id
  ).withConverter(recurrenceConverter);

  await setDoc(recurrenceRef, {
    ...recurrence,
  });
};

const deleteRecurrence = async (
  recurrenceId: string,
  getState: () => RootState
) => {
  const userId = getState().app.currentUser?.userId ?? "";
  const recurrenceRef = doc(
    db,
    "users",
    userId,
    "recurrences",
    recurrenceId
  ).withConverter(recurrenceConverter);

  await deleteDoc(recurrenceRef);
};

export const RecurrencesApi = {
  getRecurrence,
  getRecurrences,
  setRecurrence,
  deleteRecurrence,
};
