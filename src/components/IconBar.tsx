import {
  FiHeart,
  FiLoader,
  FiMessageCircle,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import {
  Icon,
  IconButton,
  Stack,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";

export const IconBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Stack direction="row" spacing={1}>
      <Tooltip label="Switch theme" fontSize="sm">
        <IconButton
          colorScheme={colorMode === "light" ? "purple" : "orange"}
          onClick={toggleColorMode}
          variant="ghost"
          aria-label="Switch theme"
          icon={
            colorMode === "light" ? (
              <Icon boxSize="1.5em" as={FiMoon} color="purple.500" />
            ) : (
              <Icon boxSize="1.5em" as={FiSun} color="orange.500" />
            )
          }
        />
      </Tooltip>
      <Tooltip label="Start tutorial" fontSize="sm">
        <IconButton
          colorScheme="green"
          onClick={toggleColorMode}
          variant="ghost"
          aria-label="Start tutorial"
          icon={<Icon boxSize="1.5em" as={FiLoader} color="green.500" />}
        />
      </Tooltip>
      <Tooltip label="Send feedback" fontSize="sm">
        <IconButton
          colorScheme="blue"
          onClick={toggleColorMode}
          variant="ghost"
          aria-label="Send feedback"
          icon={<Icon boxSize="1.5em" as={FiMessageCircle} color="blue.500" />}
        />
      </Tooltip>
      <Tooltip label="Support" fontSize="sm">
        <IconButton
          colorScheme="red"
          onClick={toggleColorMode}
          variant="ghost"
          aria-label="Support"
          icon={<Icon boxSize="1.5em" as={FiHeart} color="red.500" />}
        />
      </Tooltip>
    </Stack>
  );
};
