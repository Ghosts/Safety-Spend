import { BiHeart } from "react-icons/bi";
import { Icon, IconButton, SlideFade, Stack, Tooltip } from "@chakra-ui/react";
import React from "react";
import { InfoModal } from "./iconBar/InfoModal";
import { SignOut } from "./iconBar/SignOut";
import { LearnModal } from "./iconBar/LearnModal";
import { ThemeSwitch } from "./iconBar/ThemeSwitch";

export const IconBar = () => {
  return (
    <SlideFade in offsetX="0" offsetY="50px">
      <Stack direction="row" spacing={1}>
        <ThemeSwitch />
        <LearnModal />
        <Tooltip label="Support" fontSize="sm">
          <IconButton
            colorScheme="red"
            variant="ghost"
            aria-label="Support"
            icon={<Icon boxSize="1.5em" as={BiHeart} />}
          />
        </Tooltip>
        <InfoModal />
        <SignOut />
      </Stack>
    </SlideFade>
  );
};
