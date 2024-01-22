import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";

const GenerateQuizButton = ({ onClick, css }) => {
  return (
    <Box
      css={css}
      style={{
        border: "1px solid black",
        padding: "1rem",
      }}
      borderRadius="md"
      bg="red.100"
      marginBottom="2rem"
    >
      <Text
        fontSize="18px"
        fontWeight="bold"
        marginBottom="1rem"
        letterSpacing={1}
        color="blue.500" // Change the color here
      >
        Play Quiz to get to the LeaderBoard
      </Text>
      <Button
        height="48px"
        width="200px"
        colorScheme="whiteAlpha"
        borderRadius="xl"
        _hover={{ opacity: 0.8 }}
        color="red.800"
        bg="whiteAlpha.900"
        onClick={() => {
          onClick();
        }}
      >
        Generate Quiz
      </Button>
    </Box>
  );
};

export default GenerateQuizButton;
