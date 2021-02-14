import { Icon, IconButton, Tooltip, useToast } from "@chakra-ui/react";
import React from "react";
import { FiRefreshCw } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { loadRecurrences } from "../slices/recurrencesSlice";
import { loadTransactions } from "../slices/transactionsSlice";

export const RefreshButton = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const refreshData = () => {
    dispatch(loadRecurrences());
    dispatch(loadTransactions());
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
          icon={<Icon boxSize="1.5em" as={FiRefreshCw} />}
        />
      </Tooltip>
    </>
  );
};
