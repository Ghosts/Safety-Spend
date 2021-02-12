import { Button } from "@chakra-ui/react";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import firebase from "firebase/app";

type TwitterLoginProps = {
  error: (message: string) => void;
};
export const GoogleLogin = ({ error }: TwitterLoginProps) => {
  const logInWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {})
      .catch((e) => {
        console.log(e);
        error(e.toString());
      });
  };

  return (
    <Button
      leftIcon={<FaGoogle />}
      variant="solid"
      colorScheme="red"
      onClick={logInWithGoogle}
    >
      Sign In With Google
    </Button>
  );
};
