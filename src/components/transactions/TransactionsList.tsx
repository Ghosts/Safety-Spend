import {
  Spacer,
  Stack,
  Text,
  SkeletonText,
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
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import { FiRepeat } from "react-icons/fi";
import React, { useState } from "react";
import { transactionsSelectors } from "../../slices/transactionsSlice";
import { AddTransaction } from "./AddTransaction";
import { useSelector } from "react-redux";
import { TransactionEdit } from "./TransactionEdit";
import { getWeekByDate } from "./utils";

export const TransactionsList = () => {
  const transactions = useSelector(transactionsSelectors.list);
  const loading = useSelector(transactionsSelectors.loading);
  const [isEditing, setEditing] = useState(false);
  const [editingId] = useState(0);
  const week = getWeekByDate(new Date());

  const getTransactionsByDay = (d: Date) => {
    return transactions.filter((t) => {
      const tDay = new Date(t.date);
      return (
        d.getFullYear() === tDay.getFullYear() &&
        d.getMonth() === tDay.getMonth() &&
        d.getDate() === tDay.getDate()
      );
    });
  };

  // const merchantEdit = (newMerchant: string, transaction: Transaction) => {
  //   const newTransaction = { ...transaction, merchant: newMerchant };
  //   dispatch(editTransaction(newTransaction));
  // };

  // const amountEdit = (newAmount: number, transaction: Transaction) => {
  //   const newTransaction = { ...transaction, amount: newAmount };
  //   dispatch(editTransaction(newTransaction));
  // };

  return (
    <SkeletonText spacing={4} noOfLines={5} isLoaded={!loading}>
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
            {/* <Popover placement="bottom" closeOnBlur={true}>
              <Box>
                <PopoverTrigger>
                  <IconButton
                    variant="ghost"
                    colorScheme="orange"
                    aria-label="Add manual expense"
                    icon={
                      <Icon
                        boxSize="1.5em"
                        as={FiHelpCircle}
                        color="orange.400"
                      />
                    }
                  />
                </PopoverTrigger>
              </Box>
              <PopoverContent
                color="white"
                bg="blue.800"
                borderColor="blue.800"
              >
                <PopoverHeader pt={4} fontWeight="bold" border="0">
                  Transactions
                </PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  Examples of transactions would include buying coffee, or
                  getting paid by a friend for movie tickets. Anything that
                  isn't pre-planned or on a schedule.
                </PopoverBody>
              </PopoverContent>
            </Popover> */}
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

          <Accordion defaultIndex={[new Date().getDay()]} allowMultiple>
            {week.map((day, idx) => {
              return (
                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text float="left">{day.toDateString()}</Text>
                      <Text float="right" fontWeight="bold">
                        $
                        {getTransactionsByDay(day).length > 0
                          ? getTransactionsByDay(day)
                              .map((t) => t.amount)
                              .reduce((prev, next) => prev + next)
                              .toFixed(2)
                          : 0}{" "}
                        spent
                      </Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Flex wrap="wrap">
                      {getTransactionsByDay(day).map((transaction, idx) => {
                        return (
                          <Box
                            style={{ margin: "0 auto", marginTop: "5px" }}
                            maxW="150px"
                            m="5px"
                            padding="10px"
                            borderWidth="1px"
                            borderRadius="lg"
                          >
                            <Stat>
                              <StatLabel>
                                <Text maxW="150px" isTruncated>
                                  {transaction.merchant}
                                </Text>
                              </StatLabel>
                              <StatNumber>
                                <StatArrow
                                  type={
                                    transaction.type === "expense"
                                      ? "decrease"
                                      : "increase"
                                  }
                                />
                                ${transaction.amount}
                              </StatNumber>
                              <StatHelpText>
                                <Text>edit</Text>
                              </StatHelpText>
                            </Stat>
                          </Box>
                        );
                      })}
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
          {/* 
          <Table>
            <TableCaption>
              Track transactions manually or automatically to stay on top of
              spending.
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Merchant</Th>
                <Th>Type</Th>
                <Th>Date</Th>
                <Th>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transaction, idx) => {
                return (
                  <Tr key={idx}>
                    <Td>
                      <Text isTruncated>{transaction.merchant}</Text>
                    </Td>
                    <Td>{transaction.type}</Td>
                    <Td>{new Date(transaction.date).toLocaleDateString()}</Td>
                    <Td>
                      <Text
                        color={
                          transaction.type === "expense"
                            ? "red.500"
                            : "green.500"
                        }
                      >
                        ${transaction.amount}
                      </Text>
                    </Td>
                  </Tr>
                );
              })}
              <Tr>
                <Td></Td>
                <Td></Td>
                <Td>
                  Total: $
                  {transactions.length > 0
                    ? transactions
                        .map((item) => item.amount)
                        .reduce((prev, next) => prev + next)
                        .toFixed(2)
                    : 0}
                </Td>
              </Tr>
            </Tbody>
          </Table> */}
        </ScaleFade>
      ) : (
        <TransactionEdit transactionId={editingId} setEditing={setEditing} />
      )}
    </SkeletonText>
  );
};
