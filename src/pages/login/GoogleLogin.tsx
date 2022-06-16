import { Button } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

type TwitterLoginProps = {
  error: (message: string) => void;
};
export const GoogleLogin = ({ error }: TwitterLoginProps) => {
  const logInWithGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, new GoogleAuthProvider())
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
