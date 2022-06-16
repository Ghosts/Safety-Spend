import React, { useRef } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  SlideFade,
  Select,
  Spacer,
  Stack,
  FormErrorMessage,
  useToast,
  ButtonGroup,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  Transaction,
  getTypedTransactionType,
  transactionTypes,
} from "../../models/transaction";
import { appSelectors, setEditing } from "../../slices/appSlice";
import {
  editTransaction,
  transactionsSelectors,
  deleteTransaction,
} from "../../slices/transactionsSlice";
import { toTitleCase } from "../../utils/string";
import { CancelEditingButton } from "../../components/CancelEditingButton";
import { useAppDispatch } from "./../../store";

export const TransactionEdit = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const editingId = useSelector(appSelectors.editingId);
  const transaction = useSelector(transactionsSelectors.byId(editingId));
  const dispatch = useAppDispatch();
  const toast = useToast();
  const cancelRef = useRef<HTMLButtonElement>(null);

  if (!transaction) {
    toast({
      title: "Transaction Error",
      description: `There was a problem loading the transaction`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    dispatch(setEditing(false));
  }

  const removeTransaction = () => {
    dispatch(setEditing(false));
    dispatch(deleteTransaction(editingId));
    toast({
      title: "Transaction Deleted",
      description: `Your Safety Spend will update shortly.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  const updateTransaction = (t: Transaction) => {
    dispatch(
      editTransaction({
        id: transaction!.id,
        type: t.type,
        amount: t.amount,
        description: t.description,
        date: t.date,
      })
    );
    toast({
      title: "Transaction Updated",
      description: `Your Safety Spend will update shortly.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    dispatch(setEditing(false));
  };

  return (
    <SlideFade in offsetX="-50px" offsetY="0">
      <Stack mb="10px" direction={["row"]}>
        <CancelEditingButton />
        <Box>
          <Heading as="h2" size="lg">
            {transaction?.description}
          </Heading>
        </Box>
        <Spacer />
      </Stack>
      <Box>
        <Formik
          initialValues={{
            type: transaction?.type ?? "",
            description: transaction?.description ?? "",
            date:
              new Date(transaction?.date!).toISOString().split("T")[0] ?? "",
            amount: transaction?.amount ?? 0,
          }}
          onSubmit={async (values) => {
            updateTransaction({
              id: "",
              type: getTypedTransactionType(values.type),
              description: values.description,
              date: moment(values.date).toDate(),
              amount: values.amount,
            });
          }}
        >
          <Form>
            <Stack spacing={3}>
              <Stack spacing={3}>
                <Field name="description">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.description}
                      mt="10px"
                      colorScheme="green"
                      isRequired
                    >
                      <InputGroup>
                        <InputLeftAddon children="Description" />
                        <Input
                          {...field}
                          variant="outline"
                          placeholder="Coffee"
                        />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </InputGroup>
                    </FormControl>
                  )}
                </Field>
                <Field name="type">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.type}
                      mt="10px"
                      colorScheme="green"
                      isRequired
                    >
                      <InputGroup>
                        <InputLeftAddon children="Type" />
                        <Select {...field} variant="outline">
                          <option value="" disabled>
                            Select Type
                          </option>
                          {transactionTypes.map((transactionType, idx) => {
                            return (
                              <option key={idx} value={transactionType}>
                                {toTitleCase(transactionType)}
                              </option>
                            );
                          })}
                        </Select>

                        <FormErrorMessage>{form.errors.type}</FormErrorMessage>
                      </InputGroup>
                    </FormControl>
                  )}
                </Field>
                <Field name="date">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.date}
                      mt="10px"
                      colorScheme="green"
                      isRequired
                    >
                      <InputGroup>
                        <InputLeftAddon children="Date" />

                        <Input
                          {...field}
                          type="date"
                          variant="outline"
                          placeholder="Today!"
                        />
                        <FormErrorMessage>{form.errors.date}</FormErrorMessage>
                      </InputGroup>
                    </FormControl>
                  )}
                </Field>
                <Field name="amount">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.description}
                      mt="10px"
                      colorScheme="green"
                      isRequired
                    >
                      <InputGroup>
                        <InputLeftAddon children="Amount" />
                        <Input
                          type="number"
                          {...field}
                          variant="outline"
                          precision={2}
                        />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </InputGroup>
                    </FormControl>
                  )}
                </Field>
              </Stack>
            </Stack>
            <Divider mt="15px" mb="15px" />
            <Flex>
              <Spacer />
              <ButtonGroup>
                <Button variant="ghost" onClick={onOpen} colorScheme="red">
                  Delete
                </Button>
                <Button colorScheme="green" type="submit">
                  Update
                </Button>
              </ButtonGroup>
            </Flex>
          </Form>
        </Formik>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Transaction
              </AlertDialogHeader>
              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={removeTransaction} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </SlideFade>
  );
};
