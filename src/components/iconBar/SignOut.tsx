import { Tooltip, IconButton, Icon } from "@chakra-ui/react";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import firebase from "firebase/app";

export const SignOut = () => {

  return (
    <Tooltip label="Sign Out" fontSize="sm">
      <IconButton
        onClick={() => {
          firebase.auth().signOut();
        }}
        colorScheme="cyan"
        variant="ghost"
        aria-label="Sign Out"
        icon={<Icon boxSize="1.5em" as={FiLogOut} color="cyan.500" />}
      />
    </Tooltip>
  );
};
