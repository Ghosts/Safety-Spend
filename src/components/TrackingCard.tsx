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
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { transactionsSelectors } from "../slices/transactionsSlice";
import { DayTags } from "./DayTags";
import { recurrencesSelectors } from "./../slices/recurrencesSlice";
import { getSafeToSpend, getCurrentSafeToSpend } from "../utils/tracking";
import { getLastSunday } from "../utils/dates";
import {
  appSelectors,
  goLastWeek,
  goNextWeek,
  setCurrentDay,
} from "./../slices/appSlice";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export const TrackingCard = () => {
  const dispatch = useDispatch();
  const recurrences = useSelector(recurrencesSelectors.list);
  const transactions = useSelector(transactionsSelectors.list);
  const safeToSpend = getSafeToSpend(recurrences);
  const currentSafeToSpend = getCurrentSafeToSpend(recurrences, transactions);
  const currentDay = useSelector(appSelectors.currentDay);

  const lastWeek = async () => {
    dispatch(goLastWeek());
  };

  const nextWeek = async () => {
    dispatch(goNextWeek());
  };

  const getWeekOfText = () => {
    const lastSunday = getLastSunday(currentDay);
    const nextSunday = new Date(lastSunday);
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
            boxShadow="sm"
            onClick={lastWeek}
            size="lg"
            colorScheme="gray"
            variant="outline"
            verticalAlign="middle"
            aria-label="Next week"
            p="25px"
          >
            <Box>
              <Text fontSize="sm">Last week</Text>
              <Icon as={FiArrowLeft} />
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
            <Center>
              <Button
                variant="ghost"
                size="sm"
                colorScheme="blue"
                onClick={() => dispatch(setCurrentDay(new Date()))}
              >
                <small>Go to Today</small>
              </Button>
            </Center>
          </Box>
          <Button
            boxShadow="sm"
            onClick={nextWeek}
            size="lg"
            colorScheme="gray"
            variant="outline"
            verticalAlign="middle"
            aria-label="Next week"
            p="25px"
          >
            <Box>
              <Text fontSize="sm">Next week</Text>
              <Icon as={FiArrowRight} />
            </Box>
          </Button>
        </Stack>
      </Box>
    </SlideFade>
  );
};
