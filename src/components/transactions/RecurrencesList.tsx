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
import { AddTransaction } from "./AddTransaction";
import { useSelector } from "react-redux";
import { TransactionEdit } from "./TransactionEdit";
import { recurrencesSelectors } from "../../slices/recurrencesSlice";

export const RecurrencesList = () => {
  const transactions = useSelector(recurrencesSelectors.list);
  const loading = useSelector(recurrencesSelectors.loading);
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
              <Tooltip label="What are recurrences?">
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
                  Recurrences
                </PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  Recurrences are how you can track scheduled, recurring
                  transactions. These include things like subscriptions, pay
                  periods from work, bills, or any transaction that occurs on a
                  schedule.
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <AddTransaction />
          </Stack>
          <Table variant="simple">
            <TableCaption>
              Track recurring transactions to determine weekly Safe-To-Spend
              amount.
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Description</Th>
                <Th>Frequency</Th>
                <Th>Type</Th>
                <Th>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((recurrence, idx) => {
                return (
                  <Tr key={idx}>
                    <Td>{recurrence.description}</Td>
                    <Td>{recurrence.frequency}</Td>
                    <Td>{recurrence.type}</Td>
                    <Td>${recurrence.amount}</Td>
                    <Td>
                      <Tooltip label="Edit transaction">
                        <IconButton
                          onClick={() => {
                            setEditingId(recurrence.id!);
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
            </Tbody>
          </Table>
        </ScaleFade>
      ) : (
        <TransactionEdit transactionId={editingId} setEditing={setEditing} />
      )}
    </SkeletonText>
  );
};
