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
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { RiHeartPulseFill } from "react-icons/ri";
import { useHistory } from "react-router-dom";

export const Privacy = () => {
  const history = useHistory();

  return (
    <SlideFade in offsetX="0" offsetY="50px">
      <VStack padding="10px" spacing={2} align="center">
        <Box>
          <Flex direction="row">
            <Icon
              alignSelf="center"
              w={30}
              h={30}
              p={0}
              m={0}
              as={RiHeartPulseFill}
            />
            <Text fontSize="6xl" fontWeight="extrabold">
              safety
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
              Privacy Policy
            </Heading>
            <Box>
              <Text>
                Going to be short and sweet because this is an open-sourced
                project with no intention to monetize your data.
              </Text>
              <Heading p="10px" as="h2" size="md" color="blue.500">
                What we gather
              </Heading>
              <UnorderedList>
                <ListItem>Your email.</ListItem>
                <ListItem>
                  A unique ID to track your data <b>within</b> week.
                </ListItem>
                <ListItem>
                  Any data you directly enter into week (transactions /
                  recurrences / etc.)
                </ListItem>
                <ListItem>
                  Any data from third-parties that you authorize week to access
                  (Plaid, OAuth, etc.)
                </ListItem>
              </UnorderedList>
              <Heading p="10px" as="h2" size="md" color="blue.500">
                How we use it
              </Heading>
              <Text>
                Week does <b>not</b> sell, monetize, share, or otherwise
                distribute the data we have with third-parties outside of our
                immediate business needs (such as storing data on a database).
              </Text>
              <br />
              <Text>
                Third-parties that Week utilizes to offer the services may
                gather additional information that we do not (IP address,
                geolocation, browser info, etc.). We have no control over this
                practice and recommend using Ad-Blockers to mitigate unwanted
                data sharing with third-parties.
              </Text>
            </Box>
            <br />
            <Button
              onClick={() => history.push("/app")}
              colorScheme="messenger"
            >
              Back to week
            </Button>
          </Flex>
        </Box>
      </VStack>
    </SlideFade>
  );
};
