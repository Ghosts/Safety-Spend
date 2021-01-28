import { Tooltip, IconButton, Icon } from "@chakra-ui/react";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";

export const SignOut = () => {
  const { logout } = useAuth0();

  return (
    <Tooltip label="Sign Out" fontSize="sm">
      <IconButton
        onClick={() => logout({ returnTo: window.location.origin })}
        colorScheme="cyan"
        variant="ghost"
        aria-label="Sign Out"
        icon={<Icon boxSize="1.5em" as={FiLogOut} color="cyan.500" />}
      />
    </Tooltip>
  );
};
