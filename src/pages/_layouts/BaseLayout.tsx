import { VStack, Box, Text } from "@chakra-ui/react";
import React, { ReactChild, ReactChildren } from "react";
import { IconBar } from "../../components/IconBar";
import { UserGuard } from "./UserGuard";

interface BaseLayoutProps {
  showIconBar: boolean;
  redirectLogin: boolean;
  children: ReactChild | ReactChildren | ReactChildren[] | ReactChild[];
}
export const BaseLayout = ({
  children,
  showIconBar,
  redirectLogin,
}: BaseLayoutProps) => {
  return (
    <UserGuard redirect={redirectLogin}>
      <VStack padding="10px" spacing={2} align="center">
        <Box>
          <Text
            bgGradient="linear(to-r, blue.400,cyan.300)"
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
      </VStack>
    </UserGuard>
  );
};
