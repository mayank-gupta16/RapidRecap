import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";

const SolvedQuizzes = () => {
  return (
    <Box margin="10px" borderRadius="10px" w={"100%"}>
      <Flex>
        <Heading as="h2">Solved Quizzes</Heading>
      </Flex>
    </Box>
  );
};

export default SolvedQuizzes;
