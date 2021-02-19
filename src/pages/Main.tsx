import { Box } from "@chakra-ui/react";
import React from "react";
import { BudgetCard } from "./BudgetCard";
import { TrackingCard } from "./TrackingCard";
import { BaseLayout } from "./_layouts/BaseLayout";

export const Main = () => {
  return (
    <BaseLayout showIconBar>
      <Box>
        <TrackingCard />
      </Box>
      <Box>
        <BudgetCard />
      </Box>
    </BaseLayout>
  );
};
