import { Tooltip, IconButton, Icon } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { setEditing } from "../slices/appSlice";
import { ArrowBackThick } from "akar-icons";

export const CancelEditingButton = () => {
  const dispatch = useDispatch();
  return (
    <Tooltip label="Go back">
      <IconButton
        onClick={() => dispatch(setEditing(false))}
        variant="ghost"
        colorScheme="messenger"
        aria-label="Go back"
        icon={<Icon boxSize="1.5em" as={ArrowBackThick} />}
      />
    </Tooltip>
  );
};
