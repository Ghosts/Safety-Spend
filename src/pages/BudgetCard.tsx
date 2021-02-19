import {
  Box,
  Heading,
  SlideFade,
  Spacer,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { appSelectors, Views } from "../slices/appSlice";
import { ManageRecurrences } from "./recurrences/ManageRecurrences";
import { RecurrencesList } from "./recurrences/RecurrencesList";
import { RefreshButton } from "../components/RefreshButton";
import { ManageSettings } from "./settings/ManageSettings";
import { Settings } from "./Settings";
import { AddTransaction } from "./transactions/AddTransaction";
import { TransactionsList } from "./transactions/TransactionsList";

export const BudgetCard = () => {
  const currentView = useSelector(appSelectors.currentView);
  const isEditing = useSelector(appSelectors.isEditing);
  const bgColor = useColorModeValue("white", "#171c26");

  const getCurrentView = () => {
    switch (currentView) {
      case Views.Recurrences:
        return <RecurrencesList />;
      case Views.Settings:
        return <Settings />;
      case Views.Transactions:
      case Views.Default:
      default:
        return <TransactionsList />;
    }
  };

  return (
    <SlideFade in offsetX="0" offsetY="50px">
      <Box
        bgColor={bgColor}
        borderWidth="1px"
        w={["sm", "xl"]}
        padding="20px"
        borderRadius="lg"
        boxShadow="inner"
        className="step3 step7"
      >
        {currentView !== Views.Default || isEditing ? (
          <></>
        ) : (
          <Stack mb="10px" direction={["row"]} spacing={0}>
            <Box>
              <Heading as="h2" size="lg">
                Transactions
              </Heading>
            </Box>
            <Spacer />
            <Box boxShadow="base" borderWidth="1px" borderRadius="lg">
              <ManageSettings />
              <ManageRecurrences />
              <AddTransaction />
              <RefreshButton />
            </Box>
          </Stack>
        )}
        {getCurrentView()}
      </Box>
    </SlideFade>
  );
};
