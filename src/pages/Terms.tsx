import {
  Box,
  Text,
  SlideFade,
  Heading,
  VStack,
  ListItem,
  UnorderedList,
  Flex,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";

export const Terms = () => {
  const history = useHistory();

  return (
    <SlideFade in offsetX="0" offsetY="50px">
      <VStack padding="10px" spacing={2} align="center">
        <Box>
          <Flex direction="column">
            <Text fontSize="6xl" fontWeight="extrabold">
              Safety
            </Text>
            <Text mt="-25px" fontWeight="bold" alignSelf="center" fontSize="md">
              Spend
            </Text>
          </Flex>
        </Box>
        <Box
          w={["sm", "md"]}
          padding="15px"
          borderWidth="1px"
          borderRadius="lg"
        >
          <Flex direction="column">
            <Heading
              p="10px"
              textAlign="center"
              as="h1"
              size="xl"
              color="blue.500"
            >
              Terms
            </Heading>
            <Box>
              <Text>
                Not sure what to write here to be honest so let's just lay out
                some groundwork:
              </Text>
              <Heading p="10px" as="h2" size="md" color="blue.500">
                Things week lets you do
              </Heading>
              <UnorderedList>
                <ListItem>Enter transactions.</ListItem>
                <ListItem>Create recurrences.</ListItem>
                <ListItem>
                  Access stored data from any device using your account.
                </ListItem>
                <ListItem>Track spending / budgets.</ListItem>
                <ListItem>Maybe more?</ListItem>
              </UnorderedList>
              <Heading p="10px" as="h2" size="md" color="blue.500">
                Things you shouldn't do
              </Heading>
              <UnorderedList>
                <ListItem>
                  Expect your data to be 100% available / not subject to
                  accidental data loss.
                </ListItem>
                <ListItem>
                  Attempt to circumvent security measures or otherwise abuse
                  week from it's intended purposes.
                </ListItem>
                <ListItem>
                  Enter any sensitive or private information anywhere in week.
                </ListItem>
                <ListItem>
                  Blame or otherwise hold week responsible for any inconvience,
                  outage, issue, etc.
                </ListItem>
              </UnorderedList>
            </Box>
            <br />
            <Button
              onClick={() => history.push("/app")}
              colorScheme="messenger"
            >
              Back to Safety Spend
            </Button>
          </Flex>
        </Box>
      </VStack>
    </SlideFade>
  );
};
