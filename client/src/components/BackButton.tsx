import { Tooltip, IconButton, Icon } from "@chakra-ui/react";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setView, Views } from "../slices/appSlice";

export const BackButton = () => {
  const dispatch = useDispatch();
  return (
    <Tooltip label="Go back">
      <IconButton
        onClick={() => dispatch(setView(Views.Default))}
        variant="ghost"
        colorScheme="messenger"
        aria-label="Go back"
        icon={<Icon boxSize="1.5em" as={BiArrowBack} />}
      />
    </Tooltip>
  );
};
