import { AddIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Spacer,
  Stack,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React from "react";

export const ExpensesList = () => {
  const expenses = [
    {
      name: "Electricity",
      schedule: "Weekly",
      amount: 25.61,
    },
    {
      name: "Water",
      schedule: "Weekly",
      amount: 52.2,
    },
    {
      name: "Car Insurance",
      schedule: "Bi-Annually",
      amount: 600.51,
    },
  ];
  return (
    <>
      <Stack mb="10px" direction={["column", "row"]}>
        <Spacer />
        <Popover placement="bottom" closeOnBlur={true}>
          <PopoverTrigger>
            <IconButton
              variant="ghost"
              colorScheme="green"
              aria-label="Add manual expense"
              icon={<QuestionOutlineIcon color="orange.400" />}
            />
          </PopoverTrigger>
          <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
            <PopoverHeader pt={4} fontWeight="bold" border="0">
              Expenses
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              Expenses are any recurring payments that are set aside from your
              income. These include bills, insurance, savings, subscriptions,
              etc. In order to accurately calculate a weekly Safe-To-Spend
              value, any and all expenses should be recorded.
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <IconButton
          variant="ghost"
          colorScheme="green"
          aria-label="Add manual expense"
          icon={<AddIcon color="green.400" />}
        />
      </Stack>
      <Table variant="simple">
        <TableCaption>
          Add any recurring expenses along with their schedule to calculate your
          Safe-To-Spend balance.
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Expense</Th>
            <Th>Schedule</Th>
            <Th>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {expenses.map((expense, idx) => {
            return (
              <Tr key={idx}>
                <Td>{expense.name}</Td>
                <Td>{expense.schedule}</Td>
                <Td>${expense.amount}</Td>
              </Tr>
            );
          })}
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td>
              Total: $
              {expenses
                .map((item) => item.amount)
                .reduce((prev, next) => prev + next)
                .toFixed(2)}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
};
