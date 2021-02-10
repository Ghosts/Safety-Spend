import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import React from "react";
import { FiPieChart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setView, Views } from "./../../slices/appSlice";

export const ViewBreakdown = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Tooltip label="View breakdown">
        <IconButton
          variant="ghost"
          colorScheme="cyan"
          onClick={() => dispatch(setView(Views.Breakdown))}
          aria-label="View breakdown"
          icon={<Icon boxSize="1.5em" as={FiPieChart} color="cyan.400" />}
        />
      </Tooltip>
    </>
  );
};
