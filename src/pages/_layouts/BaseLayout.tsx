import { VStack, Box, Text, Link } from "@chakra-ui/react";
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
          <Text
            bgGradient={`linear(to-r, blue,cyan.400)`}
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
          >
            week
          </Text>
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
