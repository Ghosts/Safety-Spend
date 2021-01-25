import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { ButtonGroup, IconButton } from "@chakra-ui/react";
import React from "react";

export const EditableControls = ({ isEditing, onSubmit, onCancel }: any) => {
  return isEditing ? (
    <ButtonGroup m="5px" justifyContent="center" size="sm">
      <IconButton aria-label="Submit" icon={<CheckIcon />} onClick={onSubmit} />
      <IconButton aria-label="Cancel" icon={<CloseIcon />} onClick={onCancel} />
    </ButtonGroup>
  ) : (
    <></>
  );
};
