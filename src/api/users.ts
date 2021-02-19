import firebase from "firebase/app";
import "firebase/firestore";
import initFirebase from "../firestore";
import { User } from "../models/user";

const db = initFirebase.firestore();

export const userConverter = {
  toFirestore: (user: User) => {
    return { ...user };
  },
  fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot) =>
    snapshot.data() as User,
};

const getUser = (userId: string) => {
  return db.collection("users").withConverter(userConverter).doc(userId).get();
};

const setBankAuthId = (bankAuthid: string, userId: string) => {
  return db
    .collection("users")
    .withConverter(userConverter)
    .doc(userId)
    .update({ bankAuthId: bankAuthid });
};

const addUser = (user: User) => {
  return db
    .collection("users")
    .withConverter(userConverter)
    .doc(user.userId)
    .set(user);
};

export const UsersApi = { getUser, addUser, setBankAuthId };
