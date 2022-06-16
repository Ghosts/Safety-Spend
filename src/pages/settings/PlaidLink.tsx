import React, { useCallback } from "react";
import { Button, Icon } from "@chakra-ui/react";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOnSuccessMetadata,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { LinkChain, Block } from "akar-icons";
import { appSelectors } from "../../slices/appSlice";
import { useSelector } from "react-redux";
import { UsersApi } from "./../../api/users";

export const PlaidLink = ({ token }: { token: string }) => {
  const currentUser = useSelector(appSelectors.currentUser);
  const onSuccess: PlaidLinkOnSuccess = useCallback(
    (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      // send token to server
      console.log(public_token);
      console.log(metadata);
      UsersApi.setBankAuthId(token, currentUser?.userId!)
        .then(() => {})
        .catch((e) => {});
    },
    [currentUser?.userId, token]
  );

  const disconnectPlaid = () => {
    UsersApi.setBankAuthId("", currentUser?.userId!);
  };

  const config: PlaidLinkOptions = {
    token: token,
    webhook: "",
    onSuccess,
  };
  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {currentUser?.bankAuthId ? (
        <Button
          size="sm"
          leftIcon={<Icon boxSize="1.2em" as={Block} />}
          colorScheme="red"
          onClick={disconnectPlaid}
        >
          Disconnect Plaid
        </Button>
      ) : (
        <Button
          size="sm"
          leftIcon={<Icon boxSize="1.2em" as={LinkChain} />}
          colorScheme="messenger"
          disabled={!ready}
          onClick={() => open()}
        >
          Connect a bank account
        </Button>
      )}
    </>
  );
};
