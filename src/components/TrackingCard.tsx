import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Icon,
  IconButton,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  ScaleFade,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { FiHelpCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import { transactionsSelectors } from "../slices/transactionsSlice";
import { DayTags } from "./DayTags";

export const TrackingCard = () => {
  const totalTransactions = useSelector(transactionsSelectors.total);
  const totalIncome = 100;
  const safeToSpendTotal = 100;
  const safeToSpend = () => {
    return totalIncome - totalTransactions;
  };

  return (
    <Box>
      <ScaleFade initialScale={0.9} in>
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
                  Safe-To-Spend
                  <Popover closeOnBlur={true}>
                    <PopoverTrigger>
                      <Icon
                        ml="5px"
                        verticalAlign="baseline"
                        color="orange.400"
                        as={FiHelpCircle}
                        _hover={{ cursor: "pointer" }}
                      />
                    </PopoverTrigger>
                    <PopoverContent
                      color="white"
                      bg="blue.800"
                      borderColor="blue.800"
                    >
                      <PopoverHeader pt={4} fontWeight="bold" border="0">
                        Safe-To-Spend
                      </PopoverHeader>
                      <PopoverCloseButton />
                      <PopoverBody>
                        The weekly Safe-To-Spend value is calculated by taking
                        your average weekly income, and subtracting the average
                        weekly expenses based on their frequency schedules. The
                        result is an average value that can be spent without
                        worrying about needing funds for bills or other
                        expenses.
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                  <br /> 1/12-1/19
                </StatLabel>
                <StatNumber>
                  <Center>
                    <CircularProgress
                      capIsRound={true}
                      max={100}
                      trackColor="gray.100"
                      color={safeToSpend() > 0 ? "green.300" : "red.300"}
                      value={safeToSpend()}
                      size="124px"
                      thickness="10px"
                    >
                      <CircularProgressLabel fontSize="18px">
                        ${safeToSpend().toFixed(2)}
                      </CircularProgressLabel>
                    </CircularProgress>
                  </Center>
                </StatNumber>
                <StatHelpText textAlign="center">
                  of ${safeToSpendTotal}
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
      </ScaleFade>
    </Box>
  );
};
