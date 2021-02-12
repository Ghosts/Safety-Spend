import { Button } from "@chakra-ui/react";
import React from "react";
import { FaTwitter } from "react-icons/fa";
import firebase from "firebase/app";

type TwitterLoginProps = {
  error: (message: string) => void;
};
export const TwitterLogin = ({ error }: TwitterLoginProps) => {
  const logInWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then((result) => {})
      .catch((e) => {
        console.log(e);
        error(e.toString());
      });
  };
  return (
    <Button
      leftIcon={<FaTwitter />}
      variant="solid"
      colorScheme="twitter"
      onClick={logInWithGoogle}
    >
      Sign In With Twitter
    </Button>
  );
};
