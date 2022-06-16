import React, { useState } from "react";
import {
  Stack,
  Box,
  Text,
  Heading,
  SlideFade,
  Button,
  Divider,
  Table,
  Tbody,
  Td,
  TableContainer,
  Th,
  Thead,
  Tr,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { appSelectors } from "../slices/appSlice";
import { PlaidLink } from "./settings/PlaidLink";
import { BackButton } from "../components/BackButton";
import { getAuth } from "firebase/auth";

export const Settings = () => {
  const currentUser = useSelector(appSelectors.currentUser);
  const [token] = useState("");
  const [isError] = useState(false);
  const auth = getAuth();
  // const dispatch = useAppDispatch();
  // const auth = firebase.auth();

  // const onSuccess = useCallback((token, metadata) => {
  //   // send token to server
  //   console.log(token);
  //   console.log(metadata);
  // }, []);

  // useEffect(() => {
  //   fetch(`/api/getToken?id=${currentUser?.userId}&email=${currentUser?.email}`)
  //     .then((res) => res.json())
  //     .then((t) => {
  //       if (t.error) {
  //         setIsError(true);
  //       } else {
  //         setToken(t.link_token);
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       setIsError(true);
  //     });
  // }, [currentUser?.email, currentUser?.userId]);

  const getLoadingButton = () => {
    return isError ? (
      <Button colorScheme="red" disabled>
        Error loading Plaid
      </Button>
    ) : (
      <Button disabled>Loading Plaid...</Button>
    );
  };

  return (
    <>
      <SlideFade in offsetX="-50px" offsetY="0">
        <Stack mb="10px" direction={["row"]}>
          <BackButton />
          <Box>
            <Heading as="h2" size="lg">
              Settings
            </Heading>
          </Box>
        </Stack>
        <Text>
          Here you can manage account settings, Plaid integration, and
          subscription to Safety Spend.
        </Text>
        <Divider m="10px" />
        <Heading as="h3" size="lg">
          User Details
        </Heading>
        <Text>
          Below is all the information we know about you (aside from the data
          you've provided in Safety Spend itself). Some of this is stored in our
          database, and some is provided by third-parties such as Google.
        </Text>
        <br />
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  User Data Table
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <TableContainer>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Data</Th>
                      <Th>Value</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Email</Td>
                      <Td>{currentUser?.email}</Td>
                    </Tr>
                    <Tr>
                      <Td>User ID</Td>
                      <Td>{currentUser?.userId}</Td>
                    </Tr>
                    <Tr>
                      <Td>Attributes</Td>
                      <Td>{currentUser?.attributes?.toLocaleString()}</Td>
                    </Tr>
                    <Tr>
                      <Td>Subscription ID</Td>
                      <Td>{currentUser?.subscriptionId}</Td>
                    </Tr>
                    <Tr>
                      <Td>Subscription Active</Td>
                      <Td>{currentUser?.subscriptionActive}</Td>
                    </Tr>
                    <Tr>
                      <Td>Bank Auth ID</Td>
                      <Td>{currentUser?.bankAuthId}</Td>
                    </Tr>
                    <Tr>
                      <Td>Display Name</Td>
                      <Td>{auth.currentUser?.displayName}</Td>
                    </Tr>
                    <Tr>
                      <Td>Photo URL</Td>
                      <Td>{auth.currentUser?.photoURL}</Td>
                    </Tr>
                    <Tr>
                      <Td>Creation Time</Td>
                      <Td>{auth.currentUser?.metadata.creationTime}</Td>
                    </Tr>
                    <Tr>
                      <Td>Last SignIn Time</Td>
                      <Td>{auth.currentUser?.metadata.lastSignInTime}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <br />
        <Box>
          {token !== "" ? <PlaidLink token={token} /> : getLoadingButton()}
        </Box>
      </SlideFade>
    </>
  );
};
