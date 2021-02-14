import React, { ReactChild, ReactChildren, useEffect } from "react";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { useToast } from "@chakra-ui/react";

interface UserGuardProps {
  children: ReactChild | ReactChildren | ReactChildren[] | ReactChild[];
}
export const UserGuard = ({ children }: UserGuardProps) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const history = useHistory();
  const toast = useToast();

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
