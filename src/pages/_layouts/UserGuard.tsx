import React, { ReactNode, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useToast } from "@chakra-ui/react";
import { doc, onSnapshot } from "firebase/firestore";
import { userConverter } from "../../api/users";
import { setCurrentUser } from "../../slices/appSlice";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAppDispatch } from "./../../store";
import { db } from "../../firestore";

interface UserGuardProps {
  children: ReactNode;
}
export const UserGuard = ({ children }: UserGuardProps) => {
  const [user, loading, error] = useAuthState(getAuth());
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const unsubFn = onSnapshot(
      doc(db, "users", user?.uid ?? "-1").withConverter(userConverter),
      (snapshot) => {
        const user = snapshot.data();
        if (user) {
          dispatch(setCurrentUser(user));
        }
      }
    );
    return () => unsubFn();
  }, [dispatch, user]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (error) {
      toast({
        title: "User Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, navigate, toast, user]);
  return <>{loading ? <h1>Hang on a sec!</h1> : <> {children}</>}</>;
};
