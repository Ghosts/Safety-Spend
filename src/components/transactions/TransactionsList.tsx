import {
  Spacer,
  Stack,
  Text,
  IconButton,
  Icon,
  Box,
  ScaleFade,
  Heading,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  Tooltip,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiRepeat } from "react-icons/fi";
import React from "react";
import { transactionsSelectors } from "../../slices/transactionsSlice";
import { AddTransaction } from "./AddTransaction";
import { useDispatch, useSelector } from "react-redux";
import { TransactionEdit } from "./TransactionEdit";
import { getWeekByDate } from "../../utils/dates";
import { getTransactionsByDay } from "../../utils/transactions";

import {
  appSelectors,
  setTransactionEditing,
  setTransactionEditingId,
  toggleOpenDays,
} from "./../../slices/appSlice";

export const TransactionsList = () => {
  const transactions = useSelector(transactionsSelectors.list);
  const dispatch = useDispatch();
  const isEditing = useSelector(appSelectors.editingTransaction);
  const week = getWeekByDate(new Date());
  const color = useColorModeValue("gray.600", "gray.200");
  const openDays = useSelector(appSelectors.openDays);

  return (
    <>
      {!isEditing ? (
        <ScaleFade initialScale={0.9} in>
          <Stack mb="10px" direction={["row"]} spacing={0}>
            <Box>
              <Heading as="h2" size="xl" color="blue.400">
                Activity
              </Heading>
              <Text size="sm" fontWeight="bold">
                $
                {transactions.length > 0
                  ? transactions
                      .map((item) => item.amount)
                      .reduce((prev, next) => prev + next)
                      .toFixed(2)
                  : 0}
                &nbsp;spent this week
              </Text>
            </Box>
            <Spacer />

            <Tooltip label="Manage recurring transactions">
              <IconButton
                variant="ghost"
                colorScheme="purple"
                aria-label="Add recurring transaction"
                icon={<Icon boxSize="1.5em" as={FiRepeat} color="purple.400" />}
              />
            </Tooltip>
            <AddTransaction />
          </Stack>

          <Accordion
            onChange={(days) => dispatch(toggleOpenDays(days))}
            defaultIndex={openDays}
            allowMultiple
          >
            {week.map((day, idx) => {
              return (
                <AccordionItem key={idx}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text float="left">{day.toDateString()}</Text>
                      <Text float="right" fontWeight="bold">
                        $
                        {getTransactionsByDay(day, transactions).length > 0
                          ? getTransactionsByDay(day, transactions)
                              .map((t) => t.amount)
                              .reduce((prev, next) => prev + next)
                              .toFixed(2)
                          : 0}
                        &nbsp; spent
                      </Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Flex wrap="wrap">
                      {getTransactionsByDay(day, transactions).map(
                        (transaction, idx) => {
                          return (
                            <Button
                              onClick={() => {
                                dispatch(
                                  setTransactionEditingId(transaction.id!)
                                );
                                dispatch(setTransactionEditing(true));
                              }}
                              key={idx}
                              variant="ghost"
                              colorScheme="gray"
                              color={color}
                              h="auto"
                              m="5px"
                              maxW="150px"
                              padding="10px"
                              borderWidth="1px"
                              borderRadius="lg"
                            >
                              <Stat>
                                <StatLabel>
                                  <Text maxW="150px" isTruncated>
                                    {transaction.description}
                                  </Text>
                                </StatLabel>
                                <StatNumber>
                                  <Text
                                    fontWeight="800"
                                    color={
                                      transaction.type === "expense"
                                        ? "red.400"
                                        : "green.400"
                                    }
                                    float="left"
                                  >
                                    {transaction.type === "expense" ? "-" : "+"}
                                  </Text>
                                  ${transaction.amount}
                                </StatNumber>
                              </Stat>
                            </Button>
                          );
                        }
                      )}
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </ScaleFade>
      ) : (
        <TransactionEdit />
      )}
    </>
  );
};
