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
import { Field, Form, Formik } from "formik";
import moment from "moment";
import React from "react";
import { BiPlus } from "react-icons/bi";
import { useDispatch } from "react-redux";

import {
  Transaction,
  getTypedTransactionType,
  transactionTypes,
} from "../../models/transaction";
import { createTransaction } from "../../slices/transactionsSlice";
import { toTitleCase } from "../../utils/string";

export const AddTransaction = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const position = useBreakpointValue<"bottom" | "left">(["bottom", "left"]);

  const dispatch = useDispatch();

  const newTransaction = (t: Transaction) => {
    dispatch(
      createTransaction({
        id: "",
        type: t.type,
        amount: t.amount,
        description: t.description,
        date: t.date,
      })
    );
    toast({
      title: "Transaction Added",
      description: `Your Safety Spend will update shortly.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };
  return (
    <>
      <Tooltip label="Add manual transaction">
        <IconButton
          className="step5"
          variant="ghost"
          colorScheme="messenger"
          onClick={onOpen}
          aria-label="Add manual transaction"
          icon={<Icon boxSize="1.5em" as={BiPlus} />}
        />
      </Tooltip>
      <Drawer
        autoFocus={false}
        placement={position}
        onClose={onClose}
        isOpen={isOpen}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Add Transaction</DrawerHeader>
            <Formik
              initialValues={{
                type: "",
                description: "",
                date: "",
                amount: 0.0,
              }}
              onSubmit={async (values) => {
                newTransaction({
                  id: "",
                  type: getTypedTransactionType(values.type),
                  description: values.description,
                  date: moment(values.date).toDate(),
                  amount: values.amount,
                });
              }}
            >
              <Form>
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

                            <FormErrorMessage>
                              {form.errors.type}
                            </FormErrorMessage>
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

                            <Input {...field} type="date" variant="outline" />
                            <FormErrorMessage>
                              {form.errors.date}
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
