import { Box, Heading, SlideFade, Spacer, Stack } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { appSelectors } from "../slices/appSlice";
import { ManageRecurrences } from "./recurrences/ManageRecurrences";
import { RecurrencesList } from "./recurrences/RecurrencesList";
import { AddTransaction } from "./transactions/AddTransaction";
import { TransactionsList } from "./transactions/TransactionsList";

export const BudgetCard = () => {
  const transactionEditing = useSelector(appSelectors.editingTransaction);
  const managingRecurrences = useSelector(appSelectors.areManagingRecurrences);

  return (
    <SlideFade in offsetX="0" offsetY="400px">
      <Box w={["sm", "lg"]} padding="20px" borderWidth="1px" borderRadius="lg">
        {transactionEditing || managingRecurrences ? (
          <></>
        ) : (
          <Stack mb="10px" direction={["row"]} spacing={0}>
            <Box>
              <Heading as="h2" size="xl" color="blue.400">
                Activity
              </Heading>
            </Box>
            <Spacer />
            <ManageRecurrences />
            <AddTransaction />
          </Stack>
        )}
        {managingRecurrences ? <RecurrencesList /> : <TransactionsList />}
      </Box>
    </SlideFade>
  );
};
