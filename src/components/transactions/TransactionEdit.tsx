import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  SlideFade,
  Select,
  Spacer,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { appSelectors, setTransactionEditing } from "../../slices/appSlice";
import {
  editTransaction,
  transactionsSelectors,
} from "../../slices/transactionsSlice";

export const TransactionEdit = () => {
  const editingId = useSelector(appSelectors.editingTransactionId);
  const transaction = useSelector(transactionsSelectors.byId(editingId));
  const [description, setDescription] = useState(transaction?.description);
  const [amount, setAmount] = useState(transaction?.amount);
  const [type, setType] = useState<string | undefined>(transaction?.type);
  const [date, setDate] = useState(transaction?.date);
  const dispatch = useDispatch();

  const updateTransaction = () => {
    if (type === "expense" || type === "income") {
      console.log(date);
      dispatch(
        editTransaction({
          id: transaction?.id,
          type: type,
          amount: amount!,
          description: description!,
          date: date!,
        })
      );
    }
  };

  return (
    <SlideFade in offsetX="-50px" offsetY="0">
      <Stack mb="10px" direction={["column", "row"]}>
        <Tooltip label="Go back">
          <IconButton
            onClick={() => dispatch(setTransactionEditing(false))}
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
            {transaction?.description}
          </Heading>
        </Box>
        <Spacer />
      </Stack>

      <Box>
        <form>
          <Stack spacing={3}>
            <InputGroup>
              <InputLeftAddon children="Description" />
              <FormControl isRequired>
                <Input
                  defaultValue={transaction?.description}
                  onChange={(event) => setDescription(event.target.value)}
                  variant="outline"
                />
              </FormControl>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Type" />
              <Select
                defaultValue={transaction?.type}
                onChange={(event) => setType(event.target.value)}
                variant="outline"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </Select>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Date" />
              <Input
                defaultValue={transaction?.date}
                onChange={(event) => setDate(event.target.value)}
                type="date"
                variant="outline"
                placeholder="Today!"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Amount" />
              <NumberInput
                defaultValue={transaction?.amount}
                variant="outline"
                onChange={(v, n) => setAmount(n)}
                precision={2}
              >
                <NumberInputField />
              </NumberInput>
            </InputGroup>
          </Stack>
          <Divider mt="15px" mb="15px" />
          <Flex>
            <Spacer />
            <Button
              colorScheme="blue"
              onClick={updateTransaction}
              type="submit"
            >
              Update
            </Button>
          </Flex>
        </form>
      </Box>
    </SlideFade>
  );
};
