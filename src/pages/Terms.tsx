import {
  Box,
  Text,
  SlideFade,
  Heading,
  VStack,
  useColorMode,
  ListItem,
  UnorderedList,
  Flex,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";

export const Terms = () => {
  const { colorMode } = useColorMode();
  const history = useHistory();
  const color = colorMode === "light" ? "black" : "white";

  return (
    <SlideFade in offsetX="0" offsetY="50px">
      <VStack padding="10px" spacing={2} align="center">
        <Box>
          <Text color={color} fontSize="6xl" fontWeight="extrabold">
            week
          </Text>
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
              color="blue.400"
            >
              Terms
            </Heading>
            <Box>
              <Text>
                Not sure what to write here to be honest so let's just lay out
                some groundwork:
              </Text>
              <Heading p="10px" as="h2" size="md" color="blue.400">
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
              <Heading p="10px" as="h2" size="md" color="blue.400">
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
            <Button onClick={() => history.push("/app")} colorScheme="twitter">
              Back to week
            </Button>
          </Flex>
        </Box>
      </VStack>
    </SlideFade>
  );
};
