import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";

const DailyActivity = () => {
  return (
    <Box
      margin="10px"
      padding="50px"
      border="1px solid #ccc"
      borderRadius="10px"
    >
      <Flex>
        <Heading as="h2">Daily Activity</Heading>
      </Flex>
    </Box>
  );
};

export default DailyActivity;
