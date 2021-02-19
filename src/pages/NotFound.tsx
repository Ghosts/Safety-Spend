import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { SimpleLayout } from "./_layouts/SimpleLayout";

export const NotFound = () => {
  return (
    <SimpleLayout>
      <Box>
        <Heading textAlign="center" as="h1" fontSize="6xl" color="blue.400">
          404
        </Heading>
        <Text textAlign="center">
          The page you were looking for doesn't seem to exist. If this problem
          persists please report a bug using the feedback button.
        </Text>
      </Box>
    </SimpleLayout>
  );
};
