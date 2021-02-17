import { Button, Icon } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";
import { BiLink } from "react-icons/bi";

export const PlaidLink = ({ token }: { token: string }) => {
  const onSuccess = useCallback((token, metadata) => {
    // send token to server
  }, []);

  const config = {
    token: token,
    onSuccess,
  };
  const { open, ready, error } = usePlaidLink(config);

  return (
    <Button
      size="sm"
      leftIcon={<Icon as={BiLink} />}
      colorScheme="messenger"
      disabled={!ready}
      onClick={() => open()}
    >
      Connect a bank account
    </Button>
  );
};
