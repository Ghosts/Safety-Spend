import {
  Text,
  Box,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  Button,
  useColorModeValue,
  Spacer,
  SlideFade,
} from "@chakra-ui/react";
import React from "react";
import { transactionsSelectors } from "../../slices/transactionsSlice";
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
        <SlideFade in offsetX="50px" offsetY="0">
          <Flex>
            <Spacer />
            <Text size="sm">
              $
              {transactions.length > 0
                ? transactions
                    .map((item) => item.amount)
                    .reduce((prev, next) => prev + next)
                    .toFixed(2)
                : 0}
              &nbsp;spent this week
            </Text>
          </Flex>
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
                      <Text float="right">
                        $
                        {getTransactionsByDay(day, transactions).length > 0
                          ? getTransactionsByDay(day, transactions)
                              .map((t) => t.amount)
                              .reduce((prev, next) => prev + next)
                              .toFixed(2)
                          : 0}
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
                              minW="125px"
                              maxW="125px"
                              padding="10px"
                              borderWidth="1px"
                              borderRadius="lg"
                            >
                              <Stat>
                                <StatLabel>
                                  <Text maxW="125px" isTruncated>
                                    {transaction.description}
                                  </Text>
                                </StatLabel>
                                <StatNumber>
                                  <Flex>
                                    <Spacer />
                                    <Text
                                      fontWeight="800"
                                      color={
                                        transaction.type === "expense"
                                          ? "red.400"
                                          : "green.400"
                                      }
                                    >
                                      {transaction.type === "expense"
                                        ? "-"
                                        : "+"}
                                    </Text>
                                    ${transaction.amount}
                                    <Spacer />
                                  </Flex>
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
        </SlideFade>
      ) : (
        <TransactionEdit />
      )}
    </>
  );
};
