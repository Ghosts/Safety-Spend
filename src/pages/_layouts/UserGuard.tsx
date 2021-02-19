import React, { ReactChild, ReactChildren, useEffect } from "react";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { useToast } from "@chakra-ui/react";
import firestore from "../../firestore";
import { userConverter } from "../../api/users";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../slices/appSlice";

interface UserGuardProps {
  children: ReactChild | ReactChildren | ReactChildren[] | ReactChild[];
}
export const UserGuard = ({ children }: UserGuardProps) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();

  if (user && user.uid) {
    firestore
      .firestore()
      .collection("users")
      .doc(user.uid)
      .withConverter(userConverter)
      .onSnapshot(function (user) {
        console.log(user);
        dispatch(setCurrentUser(user.data()!));
      });
  }

  useEffect(() => {
    if (!user) {
      history.push("/");
    } else if (error) {
      toast({
        title: "User Error",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, history, toast, user]);
  return <>{loading ? <h1>Hang on a sec!</h1> : <> {children}</>}</>;
};
