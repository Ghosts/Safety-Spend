import React, { useEffect } from "react";
import {
  Spacer,
  Stack,
  Text,
  Box,
  Heading,
  Image,
  Button,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SlideFade,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  loadRecurrences,
  recurrencesSelectors,
} from "../../slices/recurrencesSlice";
import { appSelectors, setEditing, setEditingId } from "../../slices/appSlice";
import { AddRecurrence } from "./AddRecurrence";
import { RecurrenceEdit } from "./RecurrenceEdit";
import { WeeklyBreakdown } from "./WeeklyBreakdown";
import { RefreshButton } from "../../components/RefreshButton";
import { BackButton } from "../../components/BackButton";
import { useAppDispatch } from "./../../store";

export const RecurrencesList = () => {
  const dispatch = useAppDispatch();
  const recurrences = useSelector(recurrencesSelectors.list);
  const isEditing = useSelector(appSelectors.isEditing);
  const error = useSelector(recurrencesSelectors.error);
  const toast = useToast();

  useEffect(() => {
    dispatch(loadRecurrences());
  }, [dispatch]);

  useEffect(() => {
    if (error !== "") {
      console.log(error);
      toast({
        title: "Recurrences Error",
        description: "Please try again...",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  return (
    <>
      {!isEditing ? (
        <SlideFade in offsetX="-50px" offsetY="0">
          <Stack mb="10px" direction={["row"]}>
            <BackButton />
            <Box>
              <Heading as="h2" size="lg">
                Recurrences
              </Heading>
            </Box>
            <Spacer />
            <Box boxShadow="base" borderWidth="1px" borderRadius="lg">
              <AddRecurrence />
              <RefreshButton />
            </Box>
          </Stack>

          <WeeklyBreakdown />
          <Divider m="15px" />
          <Flex className="step10" justifyContent="space-evenly" wrap="wrap">
            {recurrences.length <= 0 ? (
              <>
                <Flex direction="column">
                  <Image
                    width="250px"
                    m="0 auto"
                    mb="10px"
                    src="./illustrations/noRecurrences.svg"
                    alt="No recurring transaction"
                  />
                  <Text>
                    Looks like there's no recurrences yet... add some to get
                    started!
                  </Text>
                </Flex>
              </>
            ) : (
              recurrences.map((recurrence, idx) => {
                return (
                  <Button
                    boxShadow="sm"
                    onClick={() => {
                      dispatch(setEditingId("" + recurrence.id!));
                      dispatch(setEditing(true));
                    }}
                    key={idx}
                    variant="ghost"
                    colorScheme="gray"
                    h="auto"
                    m="5px"
                    minW="125px"
                    maxW="125px"
                    padding="10px"
                    borderWidth="1px"
                    borderRadius="lg"
                  >
                    <Stat>
                      <StatLabel>
                        <Text maxW="125px" noOfLines={[1, 2, 3]}>
                          {recurrence.description}
                        </Text>
                      </StatLabel>
                      <StatNumber>
                        <Flex>
                          <Spacer />
                          <Text
                            fontWeight="800"
                            color={
                              recurrence.type === "expense"
                                ? "red.400"
                                : "green.400"
                            }
                            float="left"
                          >
                            {recurrence.type === "expense" ? "-" : "+"}
                          </Text>
                          ${recurrence.amount}
                          <Spacer />
                        </Flex>
                        <StatHelpText fontWeight="normal">
                          {recurrence.frequency}
                        </StatHelpText>
                      </StatNumber>
                    </Stat>
                  </Button>
                );
              })
            )}
          </Flex>
        </SlideFade>
      ) : (
        <RecurrenceEdit />
      )}
    </>
  );
};
