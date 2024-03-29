import React, { useEffect } from "react";
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
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "akar-icons";
import { useSelector } from "react-redux";
import { transactionsSelectors } from "../slices/transactionsSlice";
import { DayTags } from "../components/DayTags";
import {
  loadRecurrences,
  recurrencesSelectors,
} from "../slices/recurrencesSlice";
import { getSafeToSpend, getCurrentSafeToSpend } from "../utils/tracking";
import { getLastSunday } from "../utils/dates";
import { useAppDispatch } from "./../store";
import {
  appSelectors,
  goLastWeek,
  goNextWeek,
  setCurrentDay,
} from "../slices/appSlice";

export const TrackingCard = () => {
  const dispatch = useAppDispatch();
  const recurrences = useSelector(recurrencesSelectors.list);
  const transactions = useSelector(transactionsSelectors.list);
  const safeToSpend = getSafeToSpend(recurrences);
  const currentSafeToSpend = getCurrentSafeToSpend(recurrences, transactions);
  const currentDay = useSelector(appSelectors.currentDay);
  const bgColor = useColorModeValue("#fcfcfc", "#171c26");
  const trackBg = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    dispatch(loadRecurrences());
  }, [dispatch]);

  const lastWeek = async () => {
    dispatch(goLastWeek());
  };

  const nextWeek = async () => {
    dispatch(goNextWeek());
  };

  const getWeekOfText = () => {
    const lastSunday = getLastSunday(new Date(currentDay));
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
            borderWidth="1px"
            colorScheme="messenger"
            variant="ghost"
            onClick={lastWeek}
            size="lg"
            bg={bgColor}
            verticalAlign="middle"
            aria-label="Next week"
            p="25px"
          >
            <Box>
              <Text fontSize="sm">Last week</Text>
              <Icon as={ArrowLeft} />
            </Box>
          </Button>
          <Box
            bgColor={bgColor}
            w={["sm"]}
            padding="10px"
            borderWidth="1px"
            borderRadius="lg"
          >
            <Stack mb="10px" direction={["column"]}>
              <Stack direction="row" spacing={1}>
                <Stat>
                  <StatLabel textAlign="center">
                    <b>Safety Spend</b>
                    <br /> {getWeekOfText()}
                  </StatLabel>
                  <StatNumber>
                    <Center>
                      <CircularProgress
                        capIsRound={true}
                        max={safeToSpend}
                        trackColor={trackBg}
                        color={currentSafeToSpend > 0 ? "green.400" : "red.400"}
                        value={currentSafeToSpend}
                        size="124px"
                        thickness="8px"
                        className="step2"
                      >
                        <CircularProgressLabel fontSize="18px">
                          ${currentSafeToSpend.toFixed(2)}
                        </CircularProgressLabel>
                      </CircularProgress>
                    </Center>
                  </StatNumber>
                  <StatHelpText className="step1" textAlign="center">
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
                colorScheme="messenger"
                onClick={() =>
                  dispatch(setCurrentDay(new Date().toISOString()))
                }
              >
                <small>Go to Today</small>
              </Button>
            </Center>
          </Box>
          <Button
            boxShadow="sm"
            borderWidth="1px"
            colorScheme="messenger"
            variant="ghost"
            onClick={nextWeek}
            size="lg"
            bg={bgColor}
            verticalAlign="middle"
            aria-label="Next week"
            p="25px"
          >
            <Box>
              <Text fontSize="sm">Next week</Text>
              <Icon as={ArrowRight} />
            </Box>
          </Button>
        </Stack>
      </Box>
    </SlideFade>
  );
};
