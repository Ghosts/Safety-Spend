import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import React from "react";
import { FiCalendar } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setView, Views } from "../../slices/appSlice";

export const ManageRecurrences = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Tooltip label="Manage recurring transactions">
        <IconButton
          variant="ghost"
          colorScheme="messenger"
          onClick={() => dispatch(setView(Views.Recurrences))}
          aria-label="Manage recurring transactions"
          icon={<Icon boxSize="1.5em" as={FiCalendar} />}
        />
      </Tooltip>
    </>
  );
};
