import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { setView, Views } from "../../slices/appSlice";
import { Wallet } from "akar-icons";

export const ManageRecurrences = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Tooltip label="Manage recurring transactions">
        <IconButton
          className="step6"
          variant="ghost"
          colorScheme="messenger"
          onClick={() => dispatch(setView(Views.Recurrences))}
          aria-label="Manage recurring transactions"
          icon={<Icon boxSize="1.2em" as={Wallet} />}
        />
      </Tooltip>
    </>
  );
};
