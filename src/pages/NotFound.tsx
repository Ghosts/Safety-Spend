import { Box, Heading, SlideFade, Stack } from "@chakra-ui/react";
import React from "react";
import { BaseLayout } from "./_layouts/BaseLayout";

export const NotFound = () => {
  return (
    <BaseLayout redirectLogin={false} showIconBar={false}>
      <Box>
        <SlideFade in offsetX="0" offsetY="50px">
          <Box
            w={["sm", "md"]}
            padding="10px"
            borderWidth="1px"
            borderRadius="lg"
          >
            <Stack mb="10px" direction={["column"]}>
              <Heading as="h2" size="xl" color="blue.400">
                ?
              </Heading>
            </Stack>
          </Box>
        </SlideFade>
      </Box>
    </BaseLayout>
  );
};
