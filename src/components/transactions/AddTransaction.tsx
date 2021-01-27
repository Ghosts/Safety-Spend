import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addTransaction } from "../../slices/transactionsSlice";

export const AddTransaction = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [description, setDescription] = useState("Starbucks");
  const [amount, setAmount] = useState(1.53);
  const [type, setType] = useState("expense");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const newTransaction = () => {
    if (type === "expense" || type === "income") {
      dispatch(
        addTransaction({
          type: type,
          amount: amount,
          description: description,
          date: date,
        })
      );
      onClose();
    }
  };
  return (
    <>
      <Tooltip label="Add manual transaction">
        <IconButton
          variant="ghost"
          colorScheme="green"
          onClick={onOpen}
          aria-label="Add manual transaction"
          icon={<Icon boxSize="1.5em" as={FiPlusCircle} color="green.400" />}
        />
      </Tooltip>

      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Add Transaction</DrawerHeader>
            <DrawerBody>
              <form>
                <Stack spacing={3}>
                  <InputGroup>
                    <InputLeftAddon children="Description" />
                    <FormControl isRequired>
                      <Input
                        onChange={(event) => setDescription(event.target.value)}
                        variant="outline"
                        placeholder="Starbucks"
                      />
                    </FormControl>
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon children="Type" />
                    <Select
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
                      onChange={(event) => setDate(event.target.value)}
                      type="date"
                      variant="outline"
                      placeholder="Today!"
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon children="Amount" />
                    <NumberInput
                      variant="outline"
                      onChange={(v, n) => setAmount(n)}
                      precision={2}
                    >
                      <NumberInputField />
                    </NumberInput>
                  </InputGroup>
                </Stack>
              </form>
            </DrawerBody>
            <DrawerFooter>
              <Stack direction="row" spacing={4}>
                <Button onClick={onClose}>Close</Button>
                <Button
                  type="submit"
                  colorScheme="green"
                  onClick={newTransaction}
                >
                  Add
                </Button>
              </Stack>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
