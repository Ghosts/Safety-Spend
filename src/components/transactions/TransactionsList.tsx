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
  Spacer,
  SlideFade,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import {
  loadTransactions,
  transactionsSelectors,
} from "../../slices/transactionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { TransactionEdit } from "./TransactionEdit";
import { getWeekByDate } from "../../utils/dates";
import { getTransactionsByDay } from "../../utils/transactions";

import {
  appSelectors,
  setEditing,
  setEditingId,
  toggleOpenDays,
} from "./../../slices/appSlice";
import { useEffect } from "react";

export const TransactionsList = () => {
  const transactions = useSelector(transactionsSelectors.list);
  const dispatch = useDispatch();
  const isEditing = useSelector(appSelectors.isEditing);
  const currentDay = useSelector(appSelectors.currentDay);
  const openDays = useSelector(appSelectors.openDays);
  const error = useSelector(transactionsSelectors.error);
  const toast = useToast();

  useEffect(() => {
    dispatch(loadTransactions(new Date(currentDay)));
  }, [currentDay, dispatch]);

  useEffect(() => {
    if (error !== "") {
      toast({
        title: "Transactions Error",
        description: "Please try again...",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error, toast]);

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
                    ?.toFixed(2)
                : 0}
              &nbsp;spent this week
            </Text>
          </Flex>
          <Accordion
            onChange={(days) => dispatch(toggleOpenDays(days))}
            defaultIndex={openDays}
            allowMultiple
          >
            {getWeekByDate(currentDay).map((day, idx) => {
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
                              ?.toFixed(2)
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
                              boxShadow="sm"
                              onClick={() => {
                                dispatch(setEditingId("" + transaction.id!));
                                dispatch(setEditing(true));
                              }}
                              key={idx}
                              variant="ghost"
                              colorScheme="gray"
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
