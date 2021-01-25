import {
  Heading,
  Icon,
  IconButton,
  ScaleFade,
  Spacer,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import { transactionsSelectors } from "../../slices/transactionsSlice";
interface TransactionEditProps {
  setEditing: (isEditing: boolean) => void;
  transactionId: number;
}
export const TransactionEdit = ({
  setEditing,
  transactionId,
}: TransactionEditProps) => {
  const transaction = useSelector(transactionsSelectors.byId(transactionId));
  return (
    <ScaleFade initialScale={0.9} in>
      <Stack mb="10px" direction={["column", "row"]}>
        <Tooltip label="Go back">
          <IconButton
            onClick={() => setEditing(false)}
            variant="ghost"
            colorScheme="blue"
            aria-label="Go back"
            icon={
              <Icon boxSize="1.5em" as={FiArrowLeftCircle} color="blue.400" />
            }
          />
        </Tooltip>
        <Spacer />
      </Stack>
      <Heading>
        {transaction?.merchant} - ${transaction?.amount}
      </Heading>
    </ScaleFade>
  );
};
