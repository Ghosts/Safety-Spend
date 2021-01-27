import React from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import { TrackingCard } from "./components/TrackingCard";
import { BudgetCard } from "./components/BudgetCard";
import { IconBar } from "./components/IconBar";
import "./app.css";

function App() {
  return (
    <VStack padding="10px" spacing={2} align="center">
      <Box>
        <Text
          bgGradient="linear(to-r, blue.400,cyan.300)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
        >
          week
        </Text>
      </Box>
      <Box>
        <TrackingCard />
      </Box>
      <Box>
        <BudgetCard />
      </Box>
      <Box>
        <IconBar />
      </Box>
    </VStack>
  );
}

export default App;
