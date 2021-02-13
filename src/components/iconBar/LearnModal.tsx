import React, { useState } from "react";
import {
  Text,
  Button,
  Box,
  ButtonGroup,
  Icon,
  IconButton,
  Tooltip,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
} from "@chakra-ui/react";
import { FiBookOpen } from "react-icons/fi";

export const LearnModal = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const steps = [
    {
      title: "Welcome to week!",
      content: (
        <Text as="p">
          The philosophy of week is simple: <br />
          <i>Stay under your weekly Safe-To-Spend.</i>
        </Text>
      ),
    },
    {
      title: "What is Safe-To-Spend?",
      content: (
        <Text as="p">
          Your weekly Safe-To-Spend is calculated by taking your income
          Recurrences and subtracting your expense Recurrences. Let's take a
          look at Recurrences...
        </Text>
      ),
    },
    {
      title: "Recurrences?",
      content: (
        <Text as="p">
          A Recurrence is any transaction that has a schedule. Think bills,
          paychecks, or savings goals / investments you want to be recurring.
          Recurrences are always known ahead of time and accounted for! You can
          add Recurrences by clicking the calendar icon on the Activity card.
        </Text>
      ),
    },
    {
      title: "What about one-time things?",
      content: (
        <Text as="p">
          Anything that's a one-off is just considered a Transaction. This means
          things like coffee purchases or getting paid by a friend will reduce
          or increase your Safe-To-Spend for that week. You can add Transactions
          to be tracked by using the plus icon on the Activity card.
        </Text>
      ),
    },
    {
      title: "... Will this work?",
      content: (
        <Text as="p">
          Yes! Week makes budgeting easy. There's no tracking spending on a
          million categories or having to adjust everything each month.
          <br />
          <br />
          The idea is simple: as long as you spend less on average than you make
          + need for expenses, you're all set.
        </Text>
      ),
    },
  ];
  return (
    <>
      <Tooltip label="Start tutorial" fontSize="sm">
        <IconButton
          onClick={onOpen}
          colorScheme="green"
          variant="ghost"
          aria-label="Start tutorial"
          icon={<Icon boxSize="1.5em" as={FiBookOpen} color="green.500" />}
        />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> {steps[currentStep].title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{steps[currentStep].content}</ModalBody>

          <ModalFooter>
            <Box fontSize="sm">
              Step {currentStep + 1} of {steps.length}
            </Box>
            <Spacer />
            <ButtonGroup size="sm">
              {currentStep > 0 && (
                <Button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  colorScheme="gray"
                >
                  Previous
                </Button>
              )}
              <Button
                colorScheme="messenger"
                disabled={!(currentStep < steps.length - 1)}
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Next
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
