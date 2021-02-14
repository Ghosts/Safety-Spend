import {
  Spacer,
  Stack,
  IconButton,
  Icon,
  Tooltip,
  Box,
  Text,
  Heading,
  SlideFade,
} from "@chakra-ui/react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import React from "react";
import { useDispatch } from "react-redux";
import { setView, Views } from "../../slices/appSlice";

export const SettingsPage = () => {
  const dispatch = useDispatch();
  return (
    <>
      <SlideFade in offsetX="-50px" offsetY="0">
        <Stack mb="10px" direction={["row"]}>
          <Tooltip label="Go back">
            <IconButton
              onClick={() => dispatch(setView(Views.Default))}
              variant="ghost"
              colorScheme="messenger"
              aria-label="Go back"
              icon={<Icon boxSize="1.5em" as={IoArrowBackCircleOutline} />}
            />
          </Tooltip>
          <Box>
            <Heading as="h2" size="lg">
              Settings
            </Heading>
            <Text>Coming soon!</Text>
          </Box>
        </Stack>
      </SlideFade>
    </>
  );
};
