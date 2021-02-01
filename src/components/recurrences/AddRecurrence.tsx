import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Stack,
  Tooltip,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import React from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
  frequencies,
  getTypedFrequency,
  Recurrence,
} from "../../models/recurrence";
import { addRecurrence } from "../../slices/recurrencesSlice";
import { toTitleCase } from "../../utils/string";
import {
  getTypedTransactionType,
  transactionTypes,
} from "./../../models/common";

export const AddRecurrence = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const position = useBreakpointValue<"bottom" | "left">(["bottom", "left"]);

  const dispatch = useDispatch();

  const newRecurrence = (r: Recurrence) => {
    dispatch(
      addRecurrence({
        type: r.type,
        amount: r.amount,
        description: r.description,
        frequency: r.frequency,
      })
    );
    toast({
      title: "Recurrence added",
      description: `Your Safe-To-Spend will update shortly.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };
  return (
    <>
      <Tooltip label="Add recurrence">
        <IconButton
          variant="ghost"
          colorScheme="cyan"
          onClick={onOpen}
          aria-label="Add recurrence"
          icon={<Icon boxSize="1.5em" as={FiPlusCircle} color="cyan.400" />}
        />
      </Tooltip>

      <Drawer placement={position} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <Formik
              initialValues={{
                type: "",
                description: "",
                frequency: "",
                amount: 0.0,
              }}
              onSubmit={async (values) => {
                newRecurrence({
                  type: getTypedTransactionType(values.type),
                  description: values.description,
                  frequency: getTypedFrequency(values.frequency),
                  amount: values.amount,
                });
              }}
            >
              <Form>
                <DrawerHeader borderBottomWidth="1px">
                  Add Transaction
                </DrawerHeader>
                <DrawerBody>
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
                              placeholder="Savings Goals"
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
                            <FormErrorMessage>
                              {form.errors.type}
                            </FormErrorMessage>
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
                </DrawerBody>
                <DrawerFooter>
                  <Stack direction="row" spacing={4}>
                    <Button onClick={onClose}>Close</Button>
                    <Button type="submit" colorScheme="green">
                      Add
                    </Button>
                  </Stack>
                </DrawerFooter>
              </Form>
            </Formik>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
