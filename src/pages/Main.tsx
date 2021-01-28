import { Box } from "@chakra-ui/react";
import React from "react";
import { BudgetCard } from "../components/BudgetCard";
import { TrackingCard } from "../components/TrackingCard";
import { BaseLayout } from "./_layouts/BaseLayout";

export const Main = () => {
  return (
    <BaseLayout redirectLogin={false} showIconBar>
      <Box>
        <TrackingCard />
      </Box>
      <Box>
        <BudgetCard />
      </Box>
    </BaseLayout>
  );
};
