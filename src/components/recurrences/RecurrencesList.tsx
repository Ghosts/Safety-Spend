import {
  Spacer,
  Stack,
  IconButton,
  Icon,
  Tooltip,
  Text,
  Box,
  Heading,
  Button,
  color,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SlideFade,
} from "@chakra-ui/react";
import { FiArrowLeftCircle } from "react-icons/fi";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { recurrencesSelectors } from "../../slices/recurrencesSlice";
import { setManagingRecurrences } from "../../slices/appSlice";
import { AddRecurrence } from "./AddRecurrence";

export const RecurrencesList = () => {
  const dispatch = useDispatch();
  const recurrences = useSelector(recurrencesSelectors.list);

  return (
    <SlideFade in offsetX="-50px" offsetY="0">
      <Stack mb="10px" direction={["column", "row"]}>
        <Tooltip label="Go back">
          <IconButton
            onClick={() => dispatch(setManagingRecurrences(false))}
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
            Recurrences
          </Heading>
        </Box>
        <Spacer />
        <AddRecurrence />
      </Stack>
      <Flex justifyContent="space-evenly" wrap="wrap">
        {recurrences.map((recurrence, idx) => {
          return (
            <Button
              onClick={() => {
                // dispatch(setTransactionEditingId(transaction.id!));
                // dispatch(setTransactionEditing(true));
              }}
              key={idx}
              variant="ghost"
              colorScheme="gray"
              color={color}
              h="auto"
              m="5px"
              minW="125px"
              maxW="125px"
              padding="10px"
              borderWidth="1px"
              borderRadius="lg"
            >
              <Stat>
                <StatLabel>
                  <Text maxW="125px" isTruncated>
                    {recurrence.description}
                  </Text>
                </StatLabel>
                <StatNumber>
                  <Flex>
                    <Spacer />
                    <Text
                      fontWeight="800"
                      color={
                        recurrence.type === "expense" ? "red.400" : "green.400"
                      }
                      float="left"
                    >
                      {recurrence.type === "expense" ? "-" : "+"}
                    </Text>
                    ${recurrence.amount}
                    <Spacer />
                  </Flex>
                  <StatHelpText>
                    <Text fontWeight="normal">{recurrence.frequency}</Text>
                  </StatHelpText>
                </StatNumber>
              </Stat>
            </Button>
          );
        })}
      </Flex>
    </SlideFade>
  );
};
