import {
  Box,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import { TransactionsList } from "./transactions/TransactionsList";
import { RecurrencesList } from "./transactions/RecurrencesList";

export const BudgetCard = () => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const handleTabsChange = (index: React.SetStateAction<number>) => {
    setTabIndex(index);
  };

  return (
    <Box w={["sm", "lg"]} padding="10px" borderWidth="1px" borderRadius="lg">
      <Tabs index={tabIndex} variant="soft-rounded" onChange={handleTabsChange}>
        <Center>
          <TabList>
            <Tab
              color="blue.400"
              _selected={{ color: "blue.700", bg: "green.200" }}
            >
              Transactions
            </Tab>
            <Tab
              color="blue.400"
              _selected={{ color: "blue.700", bg: "blue.200" }}
            >
              Recurrences
            </Tab>
          </TabList>
        </Center>
        <TabPanels>
          <TabPanel>
            <TransactionsList />
          </TabPanel>
          <TabPanel>
            <RecurrencesList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
