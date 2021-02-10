import { Box, Heading, SlideFade, Spacer, Stack } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { appSelectors, Views } from "../slices/appSlice";
import { BreakdownView } from "./breakdown/BreakdownView";
import { ManageRecurrences } from "./recurrences/ManageRecurrences";
import { RecurrencesList } from "./recurrences/RecurrencesList";
import { AddTransaction } from "./transactions/AddTransaction";
import { TransactionsList } from "./transactions/TransactionsList";

export const BudgetCard = () => {
  const currentView = useSelector(appSelectors.currentView);

  const getCurrentView = () => {
    switch (currentView) {
      case Views.Recurrences:
        return <RecurrencesList />;
      case Views.Breakdown:
        return <BreakdownView />;
      case Views.Transactions:
      case Views.Default:
      default:
        return <TransactionsList />;
    }
  };
  return (
    <SlideFade in offsetX="0" offsetY="50px">
      <Box w={["sm", "xl"]} padding="20px" borderWidth="1px" borderRadius="lg">
        {currentView !== Views.Default ? (
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
        {getCurrentView()}
      </Box>
    </SlideFade>
  );
};
