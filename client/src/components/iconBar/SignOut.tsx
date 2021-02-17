import { Tooltip, IconButton, Icon } from "@chakra-ui/react";
import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import firebase from "firebase/app";

export const SignOut = () => {
  return (
    <Tooltip label="Sign Out" fontSize="sm">
      <IconButton
        onClick={() => {
          firebase.auth().signOut();
        }}
        colorScheme="messenger"
        variant="ghost"
        aria-label="Sign Out"
        icon={<Icon boxSize="1.5em" as={BiLogOutCircle} />}
      />
    </Tooltip>
  );
};
