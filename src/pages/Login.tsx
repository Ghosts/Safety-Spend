import {
  Box,
  Text,
  SlideFade,
  Heading,
  VStack,
  useToast,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { EmailMagicLink } from "./login/EmailMagicLink";
import { FaGoogle } from "react-icons/fa";

export const Login = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const toast = useToast();
  const history = useHistory();

  const logInWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        toast({
          title: "Logged In!",
          description: `Welcome to Week.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (user) {
      history.push("/app");
    } else if (error) {
      toast({
        title: "User error",
        description: error.toString(),
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [error, history, toast, user]);

  return (
    <SlideFade in offsetX="0" offsetY="50px">
      <VStack padding="10px" spacing={2} align="center">
        <Box>
          <Text
            bgGradient="linear(to-r, blue.400,cyan.300)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
          >
            week
          </Text>
        </Box>
        <Box
          w={["sm", "md"]}
          padding="10px"
          borderWidth="1px"
          borderRadius="lg"
        >
          {loading ? (
            <>
              <Heading textAlign="center" as="h2" size="xl" color="blue.400">
                Hang tight!
                <br />
              </Heading>
              <Heading textAlign="center" as="h2" size="sm" color="blue.300">
                (loading...)
              </Heading>
            </>
          ) : (
            <VStack padding="10px" spacing={2} align="center">
              <Heading as="h2" size="xl" color="blue.400">
                Welcome!
              </Heading>
              <EmailMagicLink />
              <Accordion w="100%" allowToggle>
                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="center">
                      Other ways to log in
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Flex justifyContent="center">
                      <Button
                        leftIcon={<FaGoogle />}
                        variant="solid"
                        colorScheme="blue"
                        onClick={logInWithGoogle}
                      >
                        Sign In With Google
                      </Button>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </VStack>
          )}
        </Box>
      </VStack>
    </SlideFade>
  );
};
