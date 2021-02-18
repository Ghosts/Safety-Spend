import {
  Stack,
  IconButton,
  Icon,
  Tooltip,
  Box,
  Text,
  Heading,
  SlideFade,
  Button,
  useToast,
} from "@chakra-ui/react";
import { BiUndo } from "react-icons/bi";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appSelectors, setView, Views } from "../slices/appSlice";
import { PlaidLink } from "../components/settings/PlaidLink";
import { BackButton } from "../components/BackButton";

export const Settings = () => {
  const currentUser = useSelector(appSelectors.currentUser);
  const [token, setToken] = useState("");
  const toast = useToast();
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
        console.log(t.link_token);
        setToken(t.link_token);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [currentUser?.email, currentUser?.userId]);

  return (
    <>
      <SlideFade in offsetX="-50px" offsetY="0">
        <Stack mb="10px" direction={["row"]}>
          <BackButton />
          <Box>
            <Heading as="h2" size="lg">
              Settings
            </Heading>
            <Text>
              Here you can manage account settings, Plaid integration, and
              subscription to Safety Spend.
            </Text>
            <Box>
              {/* <Button disabled={!ready} onClick={() => open()}>
              Connect Accounts with Plaid
            </Button> */}
              {token !== "" ? (
                <PlaidLink token={token} />
              ) : (
                <Button disabled>Loading Plaid...</Button>
              )}
            </Box>
          </Box>
        </Stack>
      </SlideFade>
    </>
  );
};
