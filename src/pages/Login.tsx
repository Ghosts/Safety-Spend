import {
  Box,
  Text,
  SlideFade,
  Heading,
  VStack,
  useToast,
  Button,
  Flex,
} from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaGoogle } from "react-icons/fa";
import { UsersApi } from "../api/users";
import { appSelectors, updateCurrentUesr } from "./../slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../models/user";

export const Login = () => {
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(firebase.auth());
  const toast = useToast();
  const history = useHistory();
  const currentUser = useSelector(appSelectors.currentUser);

  const logInWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {})
      .catch((error) => {
        logInError();
      });
  };

  const logInError = useCallback(() => {
    toast({
      title: "Login error",
      description: "There was a problem... please try logging in again!",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }, [toast]);

  useEffect(() => {
    if (user && currentUser) {
      history.push("/app");
      toast({
        title: "Logged In!",
        status: "success",
        duration: 700,
        isClosable: true,
      });
    }
  });

  useEffect(() => {
    if (user) {
      UsersApi.getUser(user.uid)
        .then((u) => {
          if (!u.exists) {
            UsersApi.addUser(
              new User(user.email, user.uid, "", false, user.photoUrl, [])
            ).catch((e) => {
              logInError();
            });
          } else {
            dispatch(updateCurrentUesr(u.data()!));
          }
        })
        .catch((e) => {
          logInError();
        });
    }
  }, [dispatch, error, history, logInError, toast, user]);

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
              <Text>Week is a weekly-based budgeting app.</Text>
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
              {/* <Accordion w="100%" allowToggle>
                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="center">
                      Other ways to log in
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <EmailMagicLink />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion> */}
            </VStack>
          )}
        </Box>
      </VStack>
    </SlideFade>
  );
};
