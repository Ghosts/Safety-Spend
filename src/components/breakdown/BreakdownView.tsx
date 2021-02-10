import {
  Box,
  Center,
  Heading,
  Icon,
  IconButton,
  SlideFade,
  Spacer,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import {
  FiArrowLeftCircle,
  FiTrendingDown,
  FiTrendingUp,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setView, Views } from "../../slices/appSlice";
import { recurrencesSelectors } from "../../slices/recurrencesSlice";
import { getWeeklyIncome, getWeeklyExpenses } from "../../utils/tracking";

export const BreakdownView = () => {
  const dispatch = useDispatch();
  const recurrences = useSelector(recurrencesSelectors.list);
  const weeklyIncome = getWeeklyIncome(recurrences);
  const weeklyExpenses = getWeeklyExpenses(recurrences);
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "light" ? "gray.100" : "gray.700";

  return (
    <SlideFade in offsetX="-50px" offsetY="0">
      <Stack mb="10px" direction={["row"]}>
        <Tooltip label="Go back">
          <IconButton
            onClick={() => dispatch(setView(Views.Default))}
            variant="ghost"
            colorScheme="blue"
            aria-label="Go back"
            icon={
              <Icon boxSize="1.5em" as={FiArrowLeftCircle} color="blue.400" />
            }
          />
        </Tooltip>
        <Box>
          <Heading as="h2" size="xl" color="blue.400">
            Budget Breakdown
          </Heading>
        </Box>
        <Spacer />
      </Stack>
      <Stack justifyContent="center" direction={["column", "row"]} spacing={5}>
        <Box borderRadius="lg" bg={bgColor}>
          <Stat m="5px" textAlign="center">
            <StatLabel>Weekly Income</StatLabel>
            <StatNumber>
              <Icon m="5px" color="green.400" as={FiTrendingUp} />$
              {weeklyIncome.toFixed(2)}
            </StatNumber>
          </Stat>
        </Box>
        <Box borderRadius="lg" bg={bgColor}>
          <Stat m="5px" textAlign="center">
            <StatLabel>Weekly Expenses</StatLabel>
            <StatNumber>
              <Icon m="5px" color="red.400" as={FiTrendingDown} />$
              {weeklyExpenses.toFixed(2)}
            </StatNumber>
          </Stat>
        </Box>
      </Stack>
    </SlideFade>
  );
};
