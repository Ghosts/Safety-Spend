import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Center,
  Divider,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import firebase from "firebase";
import { Field, Form, Formik } from "formik";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export const EmailMagicLink = () => {
  const [emailed, setEmailed] = useState(false);
  const [cookies, setCookie] = useCookies(["login-email"]);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [, loading] = useAuthState(firebase.auth());

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();

  const signInWithEmail = useCallback(() => {
    firebase
      .auth()
      .signInWithEmailLink(cookies["login-email"], window.location.href)
      .then((result) => {})
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
  }, [cookies, toast]);

  useEffect(() => {
    if (
      !loading &&
      firebase.auth().isSignInWithEmailLink(window.location.href)
    ) {
      if (!cookies["login-email"]) {
        onOpen();
      } else {
        if (!loading) {
          signInWithEmail();
        }
      }
    }
  }, [cookies, email, loading, onOpen, query, signInWithEmail]);

  return (
    <>
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
        <Formik
          onSubmit={(values) => {
            firebase
              .auth()
              .sendSignInLinkToEmail(values.email, {
                url: "https://weekb.netlify.app",
                handleCodeInApp: true,
              })
              .then(() => {
                setCookie("login-email", values.email, {
                  expires: new Date(
                    new Date().setTime(new Date().getTime() + 1 * 3600 * 1000)
                  ),
                });
              })
              .catch((error) => {
                console.error(error);
              });
            toast({
              title: "Magic Link sent!",
              description: `Check your email for a link to log in.`,
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            setEmailed(true);
          }}
          initialValues={{ email: "" }}
        >
          <Form>
            <Field name="email">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.name}
                  mt="10px"
                  colorScheme="green"
                  isRequired
                >
                  <InputGroup>
                    <InputLeftAddon children="Email" />
                    <Input
                      {...field}
                      variant="outline"
                      type="email"
                      placeholder="test@test.com"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </InputGroup>
                </FormControl>
              )}
            </Field>
            <Divider mt="10px" mb="10px" />
            <Center>
              <Button
                type="submit"
                size="lg"
                variant="outline"
                colorScheme="green"
              >
                Send Magic Link
              </Button>
            </Center>
          </Form>
        </Formik>
      )}
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
            <Text textAlign="center">
              Welcome back! Looks like you may have came from another device or
              we lost your email in the log-in process. Re-Enter here &amp;
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
    </>
  );
};
