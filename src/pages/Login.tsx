import {
  Box,
  Button,
  Text,
  SlideFade,
  Heading,
  VStack,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  Input,
  useDisclosure,
  Stack,
  useToast,
  InputLeftAddon,
  InputGroup,
} from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [emailed, setEmailed] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, , error] = useAuthState(firebase.auth());
  const toast = useToast();
  const history = useHistory();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();

  const signInWithEmail = useCallback(() => {
    firebase
      .auth()
      .signInWithEmailLink(email, window.location.href)
      .then((result) => {
        window.localStorage.removeItem("emailForSignIn");
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "User rror",
          description: error.toString(),
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, [email, toast]);

  useEffect(() => {
    if (user) {
      history.push("/");
    } else if (error) {
      toast({
        title: "User error",
        description: error.toString(),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, history, toast, user]);

  useEffect(() => {
    if (window.localStorage.getItem("emailForSignIn")) {
      setEmail(window.localStorage.getItem("emailForSignIn")!);
    }
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      if (!email) {
        onOpen();
      } else {
        signInWithEmail();
      }
    }
  }, [email, onOpen, query, signInWithEmail]);

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
          <VStack padding="10px" spacing={2} align="center">
            <Heading as="h2" size="xl" color="blue.400">
              {query.get("code") ? "Welcome Back!" : "Welcome,"}
            </Heading>
            <Text textAlign="center">
              Week uses
              <Text
                as="span"
                d="inline-block"
                bgGradient="linear(to-r, red.400,orange.400,yellow.500,green.400,blue.400,purple.300)"
                bgClip="text"
                fontWeight="extrabold"
              >
                &nbsp;magic links&nbsp;
              </Text>
              to handle accounts without requiring passwords.
            </Text>

            {emailed ? (
              <Heading as="h3" size="md" color="cyan.400">
                Check your email!
              </Heading>
            ) : (
              <>
                <FormControl mt="10px" colorScheme="green" isRequired>
                  <InputGroup>
                    <InputLeftAddon children="Email" />
                    <Input
                      onChange={(event) => setEmail(event.target.value)}
                      variant="outline"
                      type="email"
                      defaultValue={email}
                      placeholder="test@test.com"
                    />
                  </InputGroup>
                </FormControl>
                <Divider />
                <Button
                  size="lg"
                  variant="outline"
                  colorScheme="green"
                  onClick={() => {
                    firebase
                      .auth()
                      .sendSignInLinkToEmail(email, {
                        url: "https://weekb.netlify.com",
                        handleCodeInApp: true,
                      })
                      .then(() => {
                        window.localStorage.setItem("emailForSignIn", email);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                    toast({
                      title: "Magic Link sent!",
                      description: `Check your email for a link to log in.`,
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                    setEmailed(true);
                    onClose();
                  }}
                >
                  Log In / Sign Up
                </Button>
              </>
            )}
          </VStack>
        </Box>
        <Modal
          closeOnOverlayClick={false}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                Welcome back! Looks like you may have came from another device
                or we lost your email in the log-in process. Re-Enter here &amp;
                we'll get you back on track in no time.
              </Text>
              <Divider mt="15px" mb="5px" />
              <FormControl mt="10px" colorScheme="green" isRequired>
                <InputGroup>
                  <InputLeftAddon children="Email" />
                  <Input
                    onChange={(event) => setEmail(event.target.value)}
                    variant="outline"
                    placeholder="test@test.com"
                  />
                </InputGroup>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Stack direction="row" spacing={3}>
                <Button
                  variant="solid"
                  colorScheme="green"
                  onClick={() => {
                    signInWithEmail();
                    onClose();
                  }}
                >
                  Continue
                </Button>
                <Button onClick={onClose}>Close</Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </SlideFade>
  );
};
