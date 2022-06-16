import "firebase/firestore";
import { db } from "../firestore";
import {
  doc,
  getDoc,
  QueryDocumentSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { User } from "../models/user";

export const userConverter = {
  toFirestore: (user: User) => {
    return { ...user };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as User,
};

const getUser = async (userId: string) => {
  const userRef = doc(db, "users", userId).withConverter(userConverter);

  const userSnapshot = await getDoc(userRef);

  if (userSnapshot.exists()) {
    return userSnapshot.data();
  } else {
    return null;
  }
};

const setBankAuthId = async (bankAuthId: string, userId: string) => {
  const userRef = doc(db, "users", userId).withConverter(userConverter);

  await updateDoc(userRef, { bankAuthId });
};

const addUser = async (user: User) => {
  const userRef = doc(db, "users", user.userId).withConverter(userConverter);
  await setDoc(userRef, user);
};

export const UsersApi = { getUser, addUser, setBankAuthId };
