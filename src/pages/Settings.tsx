import {
  Stack,
  Box,
  Text,
  Heading,
  SlideFade,
  Button,
  Divider,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appSelectors } from "../slices/appSlice";
import { PlaidLink } from "./settings/PlaidLink";
import { BackButton } from "../components/BackButton";

export const Settings = () => {
  const currentUser = useSelector(appSelectors.currentUser);
  const [token, setToken] = useState("");
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const onSuccess = useCallback((token, metadata) => {
    // send token to server
    console.log(token);
    console.log(metadata);
  }, []);

  useEffect(() => {
    fetch(`/api/getToken?id=${currentUser?.userId}&email=${currentUser?.email}`)
      .then((res) => res.json())
      .then((t) => {
        if (t.error) {
          setIsError(true);
        } else {
          setToken(t.link_token);
        }
      })
      .catch((e) => {
        console.log(e);
        setIsError(true);
      });
  }, [currentUser?.email, currentUser?.userId]);

  const getLoadingButton = () => {
    return isError ? (
      <Button colorScheme="red" disabled>
        Error loading Plaid
      </Button>
    ) : (
      <Button disabled>Loading Plaid...</Button>
    );
  };

  return (
    <>
      <SlideFade in offsetX="-50px" offsetY="0">
        <Stack mb="10px" direction={["row"]}>
          <BackButton />
          <Box>
            <Heading as="h2" size="lg">
              Settings
            </Heading>
          </Box>
        </Stack>
        <Text>
          Here you can manage account settings, Plaid integration, and
          subscription to Safety Spend.
        </Text>
        <Divider m="10px" />
        <Box>
          {token !== "" ? <PlaidLink token={token} /> : getLoadingButton()}
        </Box>
      </SlideFade>
    </>
  );
};
