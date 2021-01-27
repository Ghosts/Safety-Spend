import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
  IconButton,
  SlideFade,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { transactionsSelectors } from "../slices/transactionsSlice";
import { DayTags } from "./DayTags";
import { recurrencesSelectors } from "./../slices/recurrencesSlice";
import { getSafeToSpend, getCurrentSafeToSpend } from "../utils/tracking";

export const TrackingCard = () => {
  const recurrences = useSelector(recurrencesSelectors.list);
  const transactions = useSelector(transactionsSelectors.byWeek(new Date()));
  const safeToSpend = getSafeToSpend(recurrences);
  const currentSafeToSpend = getCurrentSafeToSpend(recurrences, transactions);

  return (
    <Box>
      <SlideFade in offsetX="0" offsetY="200px">
        <Box w="sm" padding="10px" borderWidth="1px" borderRadius="lg">
          <Stack mb="10px" direction={["column"]}>
            <Stack direction="row" spacing={1}>
              <Tooltip label="Last week">
                <IconButton
                  size="lg"
                  verticalAlign="middle"
                  aria-label="Last week"
                  icon={<ChevronLeftIcon color="blue.500" />}
                />
              </Tooltip>
              <Stat>
                <StatLabel textAlign="center">
                  <b>Safe-To-Spend</b>
                  <br /> 1/12-1/19
                </StatLabel>
                <StatNumber>
                  <Center>
                    <CircularProgress
                      capIsRound={true}
                      max={100}
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
              <Tooltip label="Next week">
                <IconButton
                  size="lg"
                  verticalAlign="middle"
                  aria-label="Next week"
                  icon={<ChevronRightIcon color="blue.500" />}
                />
              </Tooltip>
            </Stack>
            <DayTags />
          </Stack>
        </Box>
      </SlideFade>
    </Box>
  );
};
