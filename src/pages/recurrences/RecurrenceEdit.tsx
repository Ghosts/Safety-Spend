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
import { useSelector } from "react-redux";
import {
  getTypedTransactionType,
  transactionTypes,
} from "../../models/transaction";
import {
  frequencies,
  getTypedFrequency,
  Recurrence,
} from "../../models/recurrence";
import { appSelectors, setEditing } from "../../slices/appSlice";
import {
  recurrencesSelectors,
  editRecurrence,
  deleteRecurrence,
} from "../../slices/recurrencesSlice";
import { toTitleCase } from "../../utils/string";
import { CancelEditingButton } from "../../components/CancelEditingButton";
import { useAppDispatch } from "./../../store";

export const RecurrenceEdit = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const editingId = useSelector(appSelectors.editingId);
  const recurrence = useSelector(recurrencesSelectors.byId(editingId));
  const cancelRef = useRef<HTMLButtonElement>(null);

  if (!recurrence) {
    toast({
      title: "Recurrence Error",
      description: `There was a problem loading the recurrence`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    dispatch(setEditing(false));
  }

  const removeRecurrence = () => {
    dispatch(setEditing(false));
    dispatch(deleteRecurrence(editingId));
    toast({
      title: "Recurrence Deleted",
      description: `Your Safety Spend will update shortly.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  const updateRecurrence = (r: Recurrence) => {
    dispatch(
      editRecurrence({
        id: recurrence!.id,
        type: r.type,
        amount: r.amount,
        description: r.description,
        frequency: r.frequency,
      })
    );
    toast({
      title: "Recurrence Updated",
      description: `Your Safety Spend will update shortly.`,
      status: "success",
      duration: 5000,
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
            {recurrence?.description}
          </Heading>
        </Box>
        <Spacer />
      </Stack>
      <Box>
        <Formik
          initialValues={{
            type: recurrence?.type ?? "",
            description: recurrence?.description ?? "",
            frequency: recurrence?.frequency ?? "",
            amount: recurrence?.amount ?? 0,
          }}
          onSubmit={async (values) => {
            updateRecurrence({
              id: "",
              type: getTypedTransactionType(values.type),
              description: values.description,
              frequency: getTypedFrequency(values.frequency),
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
                <Field name="frequency">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.frequency}
                      mt="10px"
                      colorScheme="green"
                      isRequired
                    >
                      <InputGroup>
                        <InputLeftAddon children="Type" />
                        <Select {...field} variant="outline">
                          <option value="" disabled>
                            Select Frequency
                          </option>
                          {frequencies.map((frequency, idx) => {
                            return (
                              <option key={idx} value={frequency}>
                                {toTitleCase(frequency)}
                              </option>
                            );
                          })}
                        </Select>

                        <FormErrorMessage>
                          {form.errors.frequency}
                        </FormErrorMessage>
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
                <Button colorScheme="red" onClick={removeRecurrence} ml={3}>
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
