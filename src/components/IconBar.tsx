import { Icon, IconButton, SlideFade, Stack, Tooltip } from "@chakra-ui/react";
import React from "react";
import { InfoModal } from "./iconBar/InfoModal";
import { SignOut } from "./iconBar/SignOut";
import { ThemeSwitch } from "./iconBar/ThemeSwitch";
import { Heart } from "akar-icons";
export const IconBar = () => {
  return (
    <SlideFade in offsetX="0" offsetY="50px">
      <Stack direction="row" spacing={1}>
        <ThemeSwitch />
        <Tooltip label="Support" fontSize="sm">
          <IconButton
            colorScheme="red"
            variant="ghost"
            aria-label="Support"
            icon={<Icon boxSize="1.5em" as={Heart} />}
          />
        </Tooltip>
        <InfoModal />
        <SignOut />
      </Stack>
    </SlideFade>
  );
};
