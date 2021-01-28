import {
  Box,
  Button,
  Text,
  SlideFade,
  Heading,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BaseLayout } from "./_layouts/BaseLayout";
import { useLocation } from "react-router-dom";

export const Login = () => {
  const { loginWithPopup } = useAuth0();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();

  return (
    <BaseLayout redirectLogin={true} showIconBar={false}>
      <SlideFade in offsetX="0" offsetY="50px">
        <Box
          w={["sm", "md"]}
          padding="10px"
          borderWidth="1px"
          borderRadius="lg"
        >
          <VStack padding="10px" spacing={2} align="center">
            <Heading as="h2" size="xl" color="blue.400">
              {query.get("code") ? "Welcome Back!" : "Welcome!"}
            </Heading>
            <Text>Week is a weekly budgeting app.</Text>
            <Button
              size="lg"
              variant="outline"
              colorScheme="green"
              onClick={() => loginWithPopup()}
            >
              {query.get("code") ? "Continue to Week" : "Log In"}
            </Button>
          </VStack>
        </Box>
      </SlideFade>
    </BaseLayout>
  );
};
