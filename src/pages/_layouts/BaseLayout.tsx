import { VStack, Box, Text, Link, Icon, Flex } from "@chakra-ui/react";
import React, { ReactChild, ReactChildren } from "react";
import { IconBar } from "../../components/IconBar";
import { UserGuard } from "./UserGuard";

interface BaseLayoutProps {
  showIconBar: boolean;
  children: ReactChild | ReactChildren | ReactChildren[] | ReactChild[];
}
export const BaseLayout = ({ children, showIconBar }: BaseLayoutProps) => {
  return (
    <UserGuard>
      <VStack padding="10px" spacing={2} align="center">
        <Box>
          <Flex direction="column">
            <Text
              bgGradient={`linear(to-r, #2167d1,#2581F4)`}
              bgClip="text"
              fontSize="6xl"
              fontWeight="extrabold"
            >
              Safety
            </Text>
            <Text
              mt="-25px"
              fontWeight="bold"
              color="#2581F4"
              alignSelf="center"
              fontSize="md"
            >
              Spend
            </Text>
          </Flex>
        </Box>
        {children}
        {showIconBar ? (
          <Box>
            <IconBar />
          </Box>
        ) : (
          <></>
        )}
        <Box textAlign="center">
          <Link color="blue.400" href="/privacy">
            <small>Privacy Policy</small>
          </Link>
          &nbsp;&amp;&nbsp;
          <Link color="blue.400" href="/terms">
            <small>Terms</small>
          </Link>
        </Box>
        <br />
      </VStack>
    </UserGuard>
  );
};
