import { Button } from "@chakra-ui/react";
import { FaTwitter } from "react-icons/fa";
import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";

type TwitterLoginProps = {
  error: (message: string) => void;
};
export const TwitterLogin = ({ error }: TwitterLoginProps) => {
  const logInWithTwitter = () => {
    const auth = getAuth();
    signInWithPopup(auth, new TwitterAuthProvider())
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
      onClick={logInWithTwitter}
    >
      Sign In With Twitter
    </Button>
  );
};
