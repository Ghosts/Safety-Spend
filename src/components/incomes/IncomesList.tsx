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
} from "@chakra-ui/react";
import React from "react";

export const IncomesList = () => {
  const incomes = [
    {
      source: "Work",
      schedule: "Bi-Weekly",
      amount: 2000,
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
              Income
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              Add any income you regularly receive, most commonly this would be
              a paycheck. The schedule of when you receive income is important
              for calculating the Safe-To-Spend amount.
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <IconButton
          variant="ghost"
          colorScheme="green"
          aria-label="Add manual income"
          icon={<AddIcon color="green.400" />}
        />
      </Stack>
      <Table variant="simple">
        <TableCaption>
          Track incoming funds to calculate Safe-To-Spend amounts for each
          spending period.
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Source</Th>
            <Th>Schedule</Th>
            <Th>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {incomes.map((income, idx) => {
            return (
              <Tr key={idx}>
                <Td>{income.source}</Td>
                <Td>{income.schedule}</Td>
                <Td>${income.amount}</Td>
              </Tr>
            );
          })}
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td>
              Total: $
              {incomes
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
