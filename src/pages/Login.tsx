import {
  Box,
  Text,
  SlideFade,
  Heading,
  VStack,
  Link,
  useToast,
  useColorModeValue,
  Divider,
  Flex,
  Icon,
} from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { UsersApi } from "../api/users";
import { appSelectors, updateCurrentUesr } from "./../slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../models/user";
import { GoogleLogin } from "./login/GoogleLogin";
import { TwitterLogin } from "./login/TwitterLogin";
import { ImLifebuoy } from "react-icons/im";

export const Login = () => {
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(firebase.auth());
  const toast = useToast();
  const history = useHistory();
  const currentUser = useSelector(appSelectors.currentUser);
  const bgColor = useColorModeValue("#fcfcfc", "#171c26");

  const logInError = useCallback(
    (error?: string) => {
      toast({
        title: "Login Error",
        description:
          error !== undefined
            ? error
            : "There was a problem... please try logging in again!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
    [toast]
  );

  useEffect(() => {
    if (user && currentUser) {
      history.push("/app");
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
          <Flex direction="row">
            <Icon
              alignSelf="center"
              color="blue.400"
              w={30}
              h={30}
              p={0}
              m={0}
              as={ImLifebuoy}
            />
            <Text
              bgGradient={`linear(to-r, blue.400,cyan.400)`}
              bgClip="text"
              fontSize="6xl"
              fontWeight="extrabold"
            >
              safety
            </Text>
          </Flex>
        </Box>
        <Box
          bg={bgColor}
          w={["sm", "md"]}
          padding="10px"
          borderWidth="1px"
          borderRadius="lg"
        >
          {loading ? (
            <>
              <Heading textAlign="center" as="h2" size="xl">
                Hang tight!
                <br />
              </Heading>
              <Heading textAlign="center" as="h2" size="sm">
                (loading...)
              </Heading>
            </>
          ) : (
            <VStack padding="10px" spacing={2} align="center">
              <Heading as="h2" size="lg">
                Welcome,
              </Heading>
              <Text>Safety Spend is a weekly-based budgeting app.</Text>
              <Divider pt="10px" mb="10px" w="50%" />
              <VStack justifyContent="center">
                <GoogleLogin error={logInError} />
                <TwitterLogin error={logInError} />
              </VStack>
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
        <Box textAlign="center">
          <Link color="blue.400" href="/privacy">
            <small>Privacy Policy</small>
          </Link>
          &nbsp;&amp;&nbsp;
          <Link color="blue.400" href="/terms">
            <small>Terms</small>
          </Link>
        </Box>
      </VStack>
    </SlideFade>
  );
};
