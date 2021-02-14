import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setView, Views } from "../../slices/appSlice";

export const ManageSettings = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Tooltip label="Settings">
        <IconButton
          className="step4"
          variant="ghost"
          colorScheme="messenger"
          onClick={() => dispatch(setView(Views.Settings))}
          aria-label="Settings"
          icon={<Icon boxSize="1.5em" as={IoSettingsOutline} />}
        />
      </Tooltip>
    </>
  );
};
