import { Button } from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import { getAuth, signInAnonymously } from "firebase/auth";

type AnonymousLoginProps = {
  error: (message: string) => void;
};
export const AnonymousLogin = ({ error }: AnonymousLoginProps) => {
  const logInAnonymously = () => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {})
      .catch((e) => {
        console.log(e);
        error(e.toString());
      });
  };
  return (
    <Button
      leftIcon={<FaLock />}
      variant="solid"
      colorScheme="gray"
      onClick={logInAnonymously}
    >
      Sign In Anonymously
    </Button>
  );
};
