import React, { useState } from "react";
import {
  Text,
  Icon,
  IconButton,
  Tooltip,
  useColorModeValue,
  Kbd,
} from "@chakra-ui/react";
import { BiBookOpen } from "react-icons/bi";
import Tour from "reactour";
import { useDispatch } from "react-redux";
import { updateView, Views } from "../../slices/appSlice";
import { updateIsEditing } from "./../../slices/appSlice";

export const LearnModal = () => {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const dispatch = useDispatch();
  const bgClass = useColorModeValue("bgLight", "bgDark");

  const startTour = () => {
    dispatch(updateView(Views.Default));
    dispatch(updateIsEditing(false));
    setIsTourOpen(true);
  };

  const steps = [
    {
      selector: ".step1",
      content: (
        <Text as="p">
          The philosophy of Safety Spend is simple: <br />
          Stay under your weekly <b>Safety Spend</b>. Everything in week is
          based on a per-week basis. &nbsp;
          <span>
            You can click, or use <Kbd>←</Kbd> and <Kbd>→</Kbd> to navigate.
          </span>
        </Text>
      ),
    },
    {
      selector: ".step2",
      content: (
        <Text as="p">
          Your weekly <b>Safety Spend</b> is automatically calculated by taking
          income <b>Recurrences</b>&nbsp;(more on this later...), subtracting
          expense <b>Recurrences</b>, and then finally subtracting
          one-time&nbsp;<b>Transactions</b>.
        </Text>
      ),
    },
    {
      selector: ".step3",
      content: (
        <Text as="p">
          <b>Transactions</b> are one-time expenses or incomes, such as getting
          paid for a split cost by a friend, or paying for coffee at a cafe.
        </Text>
      ),
    },
    {
      selector: ".step4",
      content: <Text as="p">You can manage settings here.</Text>,
    },
    {
      selector: ".step5",
      content: (
        <Text as="p">
          You can add new <b>Transactions</b> here.
        </Text>
      ),
    },
    {
      selector: ".step6",
      action: () => {
        dispatch(updateView(Views.Default));
      },
      content: (
        <Text as="p">
          Here you can view &amp; manage <b>Recurrences</b>.
        </Text>
      ),
    },
    {
      selector: ".step7",
      action: () => {
        dispatch(updateView(Views.Recurrences));
      },
      content: (
        <Text as="p">
          <b>Recurrences</b> are simply <b>Transactions</b> that have a
          schedule. They are known expenses or incomes (like pay checks or rent)
          that <i>do not count toward your Safety Spend</i>.
        </Text>
      ),
    },
    {
      selector: ".step8",
      content: (
        <Text as="p">
          You can add new <b>Recurrences</b> here. Make sure you track regular
          bills (rent, utilities, subscriptions), along with savings or
          investment goals.
        </Text>
      ),
    },
    {
      selector: ".step9",
      content: (
        <Text as="p">
          Here you can see a breakdown of your weekly income, expenses, and how
          the weekly Safety Spend is calculated.
        </Text>
      ),
    },
    {
      selector: ".step10",
      content: (
        <Text as="p">
          And here you can see what <b>Recurrences</b> you are tracking. Click
          on them to edit!
        </Text>
      ),
    },
    {
      content: (
        <Text as="p">
          That's about all there is to know! The idea is simple: as long as you
          spend less on average than you make + need for expenses, you're all
          set.
        </Text>
      ),
    },
  ];
  return (
    <>
      <Tooltip label="Start tutorial" fontSize="sm">
        <IconButton
          onClick={startTour}
          colorScheme="green"
          variant="ghost"
          aria-label="Start tutorial"
          icon={<Icon boxSize="1.5em" as={BiBookOpen} color="green.500" />}
        />
      </Tooltip>
      <Tour
        className={bgClass}
        rounded={20}
        startAt={0}
        accentColor="#277AFB"
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)}
      />
    </>
  );
};
