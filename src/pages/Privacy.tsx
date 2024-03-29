import { Box, Text, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import React from "react";
import { SimpleLayout } from "./_layouts/SimpleLayout";

export const Privacy = () => {
  return (
    <SimpleLayout>
      <Heading p="10px" textAlign="center" as="h1" size="xl" color="blue.500">
        Privacy Policy
      </Heading>
      <Box>
        <Text>
          Going to be short and sweet because this is an open-sourced project
          with no intention to monetize your data.
        </Text>
        <Heading p="10px" as="h2" size="md" color="blue.500">
          What we gather
        </Heading>
        <UnorderedList>
          <ListItem>Your email.</ListItem>
          <ListItem>
            A unique ID to track your data <b>within</b> Safety Spend.
          </ListItem>
          <ListItem>
            Any data you directly enter into Safety Spend (transactions /
            recurrences / etc.)
          </ListItem>
          <ListItem>
            Any data from third-parties that you authorize Safety Spend to
            access (Plaid, OAuth, etc.)
          </ListItem>
        </UnorderedList>
        <Heading p="10px" as="h2" size="md" color="blue.500">
          How we use it
        </Heading>
        <Text>
          Safety Spend does <b>not</b> sell, monetize, share, or otherwise
          distribute the data we have with third-parties outside of our
          immediate business needs (such as storing data on a database).
        </Text>
        <br />
        <Text>
          Third-parties that Safety Spend utilizes to offer the services may
          gather additional information that we do not (IP address, geolocation,
          browser info, etc.). We have no control over this practice and
          recommend using Ad-Blockers to mitigate unwanted data sharing with
          third-parties.
        </Text>
      </Box>
    </SimpleLayout>
  );
};
