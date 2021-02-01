import {
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
  SlideFade,
  Stack,
  Stat,
  Text,
  StatHelpText,
  Button,
  StatLabel,
  StatNumber,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { transactionsSelectors } from "../slices/transactionsSlice";
import { DayTags } from "./DayTags";
import { recurrencesSelectors } from "./../slices/recurrencesSlice";
import { getSafeToSpend, getCurrentSafeToSpend } from "../utils/tracking";
import { getLastSunday } from "../utils/dates";

export const TrackingCard = () => {
  const recurrences = useSelector(recurrencesSelectors.list);
  const transactions = useSelector(transactionsSelectors.byWeek(new Date()));
  const safeToSpend = getSafeToSpend(recurrences);
  const currentSafeToSpend = getCurrentSafeToSpend(recurrences, transactions);
  const orientation = useBreakpointValue<"vertical" | "horizontal">([
    "vertical",
    "horizontal",
  ]);
  const currentDate = new Date();

  const getWeekOfText = () => {
    const lastSunday = getLastSunday(currentDate);
    const nextSunday = new Date();
    nextSunday.setDate(lastSunday.getDate() + 6);

    return `${lastSunday.getMonth() + 1}/${lastSunday.getDate()} - ${
      nextSunday.getMonth() + 1
    }/${nextSunday.getDate()}`;
  };

  return (
    <SlideFade in offsetX="0" offsetY="50px">
      <Box w={["sm", "md"]} alignItems="center">
        <Stack w={["sm", "md"]} direction={["column", "row"]} spacing={2}>
          <Button
            size="lg"
            colorScheme="gray"
            variant="outline"
            verticalAlign="middle"
            aria-label="Next week"
            p="25px"
          >
            <Box>
              <Text fontSize="sm">Last week</Text>
              <Divider mb="5px" mt="5px" orientation={orientation} />
              <Text fontSize="sm">$0.0</Text>
            </Box>
          </Button>
          <Box w={["sm"]} padding="10px" borderWidth="1px" borderRadius="lg">
            <Stack mb="10px" direction={["column"]}>
              <Stack direction="row" spacing={1}>
                <Stat>
                  <StatLabel textAlign="center">
                    <b>Safe-To-Spend</b>
                    <br /> {getWeekOfText()}
                  </StatLabel>
                  <StatNumber>
                    <Center>
                      <CircularProgress
                        capIsRound={true}
                        max={safeToSpend}
                        trackColor="gray.100"
                        color={currentSafeToSpend > 0 ? "green.300" : "red.300"}
                        value={currentSafeToSpend}
                        size="124px"
                        thickness="10px"
                      >
                        <CircularProgressLabel fontSize="18px">
                          ${currentSafeToSpend.toFixed(2)}
                        </CircularProgressLabel>
                      </CircularProgress>
                    </Center>
                  </StatNumber>
                  <StatHelpText textAlign="center">
                    of ${safeToSpend.toFixed(2)}
                  </StatHelpText>
                </Stat>
              </Stack>
              <DayTags />
            </Stack>
          </Box>
          <Button
            size="lg"
            colorScheme="gray"
            variant="outline"
            verticalAlign="middle"
            aria-label="Next week"
            p="25px"
          >
            <Box>
              <Text fontSize="sm">Last week</Text>
              <Divider mb="5px" mt="5px" orientation={orientation} />
              <Text fontSize="sm">$0.0</Text>
            </Box>
          </Button>
        </Stack>
      </Box>
    </SlideFade>
  );
};
