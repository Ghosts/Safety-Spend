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
import { FiHelpCircle } from "react-icons/fi";
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
                  Examples of transactions would include buying coffee, or
                  getting paid by a friend for movie tickets. Anything that
                  isn't pre-planned or on a schedule.
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
                <Th>Type</Th>
                <Th>Date</Th>
                <Th>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transaction, idx) => {
                return (
                  <Tr key={idx}>
                    <Td>{transaction.merchant}</Td>
                    <Td>{transaction.type}</Td>
                    <Td>{new Date(transaction.date).toLocaleDateString()}</Td>
                    <Td>${transaction.amount}</Td>
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
