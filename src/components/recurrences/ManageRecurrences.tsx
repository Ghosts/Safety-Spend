import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import React from "react";
import { FiCalendar } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setManagingRecurrences } from "../../slices/appSlice";

export const ManageRecurrences = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Tooltip label="Manage recurring transactions">
        <IconButton
          variant="ghost"
          colorScheme="cyan"
          onClick={() => dispatch(setManagingRecurrences(true))}
          aria-label="Add manual transaction"
          icon={<Icon boxSize="1.5em" as={FiCalendar} color="cyan.400" />}
        />
      </Tooltip>
    </>
  );
};
