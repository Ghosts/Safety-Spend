import {
  Button,
  FormControl,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
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
  const [merchant, setMerchant] = useState("Starbucks");
  const [amount, setAmount] = useState(1.53);
  const dispatch = useDispatch();

  const newTransaction = () => {
    dispatch(
      addTransaction({
        amount: amount,
        merchant: merchant,
        date: new Date(Date.now()).toString(),
      })
    );
    onClose();
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
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>Add Transaction</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={3}>
                <InputGroup>
                  <InputLeftAddon children="Merchant" />
                  <FormControl isRequired>
                    <Input
                      onChange={(event) => setMerchant(event.target.value)}
                      variant="outline"
                      placeholder="Starbucks"
                    />
                  </FormControl>
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon children="Date" />
                  <Input variant="outline" placeholder="Today!" />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon children="Amount" />
                  <NumberInput
                    variant="outline"
                    placeholder="1.50"
                    onChange={(v, n) => setAmount(n)}
                    precision={2}
                  >
                    <NumberInputField />
                  </NumberInput>
                </InputGroup>
              </Stack>
            </ModalBody>
            <ModalFooter>
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
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
