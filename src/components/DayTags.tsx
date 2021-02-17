import { Stack, Box, Tag, Center } from "@chakra-ui/react";
import React from "react";

export const DayTags = () => {
  const days = [
    {
      display: "S",
      order: 0,
    },
    {
      display: "M",
      order: 1,
    },
    {
      display: "T",
      order: 2,
    },
    {
      display: "W",
      order: 3,
    },
    {
      display: "T",
      order: 4,
    },
    {
      display: "F",
      order: 5,
    },
    {
      display: "S",
      order: 6,
    },
  ];

  const today = new Date().getDay();
  return (
    <Center>
      <Stack direction="row">
        {days.map((day, idx) => {
          return (
            <Box key={idx}>
              <Tag
                variant={
                  today === day.order
                    ? "solid"
                    : today > day.order
                    ? "outline"
                    : "subtle"
                }
                colorScheme="messenger"
              >
                {day.display}
              </Tag>
            </Box>
          );
        })}
      </Stack>
    </Center>
  );
};
