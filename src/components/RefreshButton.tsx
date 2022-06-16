import React from "react";
import { Icon, IconButton, Tooltip, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { appSelectors } from "../slices/appSlice";
import { loadRecurrences } from "../slices/recurrencesSlice";
import { loadTransactions } from "../slices/transactionsSlice";
import { ArrowClockwise } from "akar-icons";
import { useAppDispatch } from "./../store";

export const RefreshButton = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const currentDay = useSelector(appSelectors.currentDay);

  const refreshData = () => {
    dispatch(loadRecurrences());
    dispatch(loadTransactions(new Date(currentDay)));
    toast({
      title: "Data Refreshed",
      description: `Any updates will be reflected shortly.`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Tooltip label="Refresh data">
        <IconButton
          variant="ghost"
          colorScheme="messenger"
          onClick={refreshData}
          aria-label="Add manual transaction"
          icon={<Icon boxSize="1.2em" as={ArrowClockwise} />}
        />
      </Tooltip>
    </>
  );
};
