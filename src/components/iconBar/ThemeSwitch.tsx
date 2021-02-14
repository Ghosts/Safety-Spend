import { Tooltip, IconButton, Icon, useColorMode } from "@chakra-ui/react";
import React from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

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
            <Icon boxSize="1.5em" as={IoMoonOutline} color="purple.500" />
          ) : (
            <Icon boxSize="1.5em" as={IoSunnyOutline} color="orange.500" />
          )
        }
      />
    </Tooltip>
  );
};
