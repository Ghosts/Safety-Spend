import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setView, Views } from "../../slices/appSlice";

export const ManageSettings = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Tooltip label="Manage recurring transactions">
        <IconButton
          className="step4"
          variant="ghost"
          colorScheme="messenger"
          onClick={() => dispatch(setView(Views.Recurrences))}
          aria-label="Manage recurring transactions"
          icon={<Icon boxSize="1.5em" as={IoSettingsOutline} />}
        />
      </Tooltip>
    </>
  );
};
