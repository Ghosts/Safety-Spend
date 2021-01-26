import { Box } from "@chakra-ui/react";
import React from "react";
import { TransactionsList } from "./transactions/TransactionsList";

export const BudgetCard = () => {
  return (
    <Box w={["sm", "lg"]} padding="20px" borderWidth="1px" borderRadius="lg">
      <TransactionsList />
    </Box>
  );
};
