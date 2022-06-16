import React, { ReactNode } from "react";
import { VStack, Box, Text, Flex, Button, SlideFade } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface SimpleLayoutProps {
  children: ReactNode;
}
export const SimpleLayout = ({ children }: SimpleLayoutProps) => {
  const navigate = useNavigate();
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
            <Box>{children}</Box>
            <br />
            <br />
            <Button onClick={() => navigate("/app")} colorScheme="messenger">
              Back to Safety Spend
            </Button>
          </Flex>
        </Box>
      </VStack>
    </SlideFade>
  );
};
