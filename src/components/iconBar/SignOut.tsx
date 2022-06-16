import React from "react";
import { Tooltip, IconButton, Icon } from "@chakra-ui/react";
import { SignOut as SignOutIcon } from "akar-icons";
import { getAuth } from "firebase/auth";

export const SignOut = () => {
  return (
    <Tooltip label="Sign Out" fontSize="sm">
      <IconButton
        onClick={async () => {
          await getAuth().signOut();
        }}
        colorScheme="messenger"
        variant="ghost"
        aria-label="Sign Out"
        icon={<Icon boxSize="1.5em" as={SignOutIcon} />}
      />
    </Tooltip>
  );
};
