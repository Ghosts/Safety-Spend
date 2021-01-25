import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spacer,
  Stack,
  SkeletonText,
  IconButton,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Icon,
  Tooltip,
  Box,
  ScaleFade,
} from "@chakra-ui/react";
import { FiEdit, FiHelpCircle } from "react-icons/fi";
import React, { useState } from "react";
import { transactionsSelectors } from "../../slices/transactionsSlice";
import { AddTransaction } from "./AddTransaction";
import { useSelector } from "react-redux";
import { TransactionEdit } from "./TransactionEdit";

export const TransactionsList = () => {
  const transactions = useSelector(transactionsSelectors.list);
  const loading = useSelector(transactionsSelectors.loading);
  const [isEditing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(0);

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
          <Stack mb="10px" direction={["row"]}>
            <Spacer />
            <Popover placement="bottom" closeOnBlur={true}>
              <Tooltip label="What are transactions?">
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
              </Tooltip>
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
                  Record transactions that occured within the week being tracked
                  to adjust what is Safe-To-Spend. The Safe-To-Spend amount will
                  begin the same every week, but transactions occuring on a
                  one-time basis will reduce the amount as the week progresses.
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <AddTransaction />
          </Stack>
          <Table variant="simple">
            <TableCaption>
              Track transactions manually or automatically to stay on top of
              spending.
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Merchant</Th>
                <Th>Date</Th>
                <Th>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transaction, idx) => {
                return (
                  <Tr key={idx}>
                    <Td>{transaction.merchant}</Td>
                    <Td>{new Date(transaction.date).toLocaleDateString()}</Td>
                    <Td>${transaction.amount}</Td>
                    <Td>
                      <Tooltip label="Edit transaction">
                        <IconButton
                          onClick={() => {
                            setEditingId(transaction.id!);
                            setEditing(true);
                          }}
                          variant="ghost"
                          aria-label="Add manual expense"
                          colorScheme="gray"
                          icon={
                            <Icon
                              boxSize="1.5em"
                              as={FiEdit}
                              color="gray.200"
                            />
                          }
                        />
                      </Tooltip>
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
          </Table>
        </ScaleFade>
      ) : (
        <TransactionEdit transactionId={editingId} setEditing={setEditing} />
      )}
    </SkeletonText>
  );
};
