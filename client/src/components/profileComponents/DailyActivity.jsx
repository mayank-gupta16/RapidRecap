import React, { useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Text,
  Button,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"; // For navigation arrows

const DAYS_IN_WEEK = 7;
const MONTHS_IN_YEAR = 12;
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DailyActivity = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const getMonthDays = (year, month) => {
    const date = new Date(year, month, 1);

    // Get the date for the first day of the next month
    const nextMonth = month === 11 ? 0 : month + 1; // Handle December as a special case
    const nextDate = new Date(year, nextMonth, 1);

    // Subtract one day from the next date to get the last day of the current month
    const lastDay = new Date(nextDate.getTime() - 1);

    // Return the day of the month (which is the number of days)
    return lastDay.getDate();
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  function renderCalendarBody(month, id) {
    const currentDate = new Date(currentYear, month, 1);
    const monthDays = getMonthDays(currentYear, month);
    const firstDay = currentDate.getDay();

    // Create an empty array to store all days (including previous/next month)
    const allDays = [];

    // Fill the beginning of the calendar with days from the previous month
    let prevMonthDays = getMonthDays(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1
    ); // Get days in previous month
    for (let i = 0; i < firstDay; i++) {
      allDays.push({ isCurrentMonth: false, day: prevMonthDays - i });
    }

    // Fill the calendar with days from the current month
    for (let i = 1; i <= monthDays; i++) {
      allDays.push({ isCurrentMonth: true, day: i });
    }

    // Fill the remaining cells with days from the next month
    const remainingCells =
      DAYS_IN_WEEK - ((firstDay + monthDays) % DAYS_IN_WEEK);
    for (let i = 1; i <= remainingCells; i++) {
      allDays.push({ isCurrentMonth: false, day: i });
    }

    return (
      <Flex direction="column" width="100px" key={month}>
        <Grid
          templateColumns={`repeat(${DAYS_IN_WEEK}, 1fr)`}
          h={"80px"}
          mb={3}
        >
          {allDays.map((dayObj, index) => (
            <Box key={index} textAlign="center" m={0} p={0}>
              {dayObj.isCurrentMonth ? (
                <Flex
                  borderRadius={"2px"}
                  h={"8px"}
                  w={"8px"}
                  m={"2px"}
                  p={0}
                  backgroundColor={"#eff2f699"}
                  justifyContent={"center"}
                  alignItems={"center"}
                ></Flex>
              ) : (
                <Flex borderRadius={"2px"} h={"8px"} w={"8px"} m={"2px"} p={0}>
                  {""}
                </Flex>
              )}
            </Box>
          ))}
        </Grid>
        <Text fontSize="sm" textAlign="center">
          {MONTH_NAMES[month]}
        </Text>
      </Flex>
    );
  }

  return (
    <Box m={0} pt={3}>
      <Flex justifyContent="space-around">
        {[...Array(MONTHS_IN_YEAR).keys()].map((month, id) =>
          renderCalendarBody(month, id)
        )}
      </Flex>
    </Box>
  );
};

export default DailyActivity;
