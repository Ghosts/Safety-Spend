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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BaseLayout } from "./_layouts/BaseLayout";
import { useLocation } from "react-router-dom";
import firebase from "firebase/app";
import { FirebaseAuthConsumer, IfFirebaseAuthed } from "@react-firebase/auth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const actionCodeSettings = {
    url: "https://weekb.netlify.com",
    handleCodeInApp: true,
  };

  return (
    <BaseLayout redirectLogin={true} showIconBar={false}>
      <SlideFade in offsetX="0" offsetY="50px">
        <Box
          w={["sm", "md"]}
          padding="10px"
          borderWidth="1px"
          borderRadius="lg"
        >
          <VStack padding="10px" spacing={2} align="center">
            <Heading as="h2" size="xl" color="blue.400">
              {query.get("code") ? "Welcome Back!" : "Welcome!"}
            </Heading>
            <Text>Week is a weekly budgeting app.</Text>
            <Button
              size="lg"
              variant="outline"
              colorScheme="green"
              onClick={onOpen}
            >
              {query.get("code") ? "Continue to Week" : "Log In"}
            </Button>
            <FirebaseAuthConsumer>
              {({ isSignedIn, user, providerId }) => {
                return (
                  <pre style={{ height: 300, overflow: "auto" }}>
                    {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
                  </pre>
                );
              }}
            </FirebaseAuthConsumer>
            <IfFirebaseAuthed>
              {() => {
                return <div>You are authenticated</div>;
              }}
            </IfFirebaseAuthed>
          </VStack>
        </Box>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Week uses ✨Magic Links✨ to handle accounts without ever
              requiring a password. Enter your email below to log in / create an
              account.
              <FormControl mt="10px" colorScheme="green" isRequired>
                <Input
                  onChange={(event) => setEmail(event.target.value)}
                  variant="outline"
                  placeholder="test@test.com"
                />
              </FormControl>
              <Divider mt="15px" mb="5px" />
            </ModalBody>
            <ModalFooter>
              <Stack direction="row" spacing={3}>
                <Button
                  variant="solid"
                  colorScheme="green"
                  onClick={() => {
                    firebase
                      .auth()
                      .sendSignInLinkToEmail(email, actionCodeSettings)
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
      </SlideFade>
    </BaseLayout>
  );
};
