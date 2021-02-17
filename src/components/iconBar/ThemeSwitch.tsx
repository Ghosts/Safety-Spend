import { Tooltip, IconButton, Icon, useColorMode } from "@chakra-ui/react";
import React from "react";
import { BiMoon, BiSun } from "react-icons/bi";

export const ThemeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip label="Switch theme" fontSize="sm">
      <IconButton
        colorScheme={colorMode === "light" ? "purple" : "orange"}
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Switch theme"
        icon={
          colorMode === "light" ? (
            <Icon boxSize="1.5em" as={BiMoon} color="purple.500" />
          ) : (
            <Icon boxSize="1.5em" as={BiSun} color="orange.500" />
          )
        }
      />
    </Tooltip>
  );
};
