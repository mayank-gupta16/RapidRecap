import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";

const GenerateQuizButton = ({ onClick, css }) => {
  return (
    <Box
      css={css}
      style={{
        border: "2px",
        padding: "1rem",
      }}
      borderRadius="md"
      backgroundColor="#E4D0D0"
      marginBottom="2rem"
    >
      <Text
        fontSize="18px"
        fontWeight="bold"
        marginBottom="1rem"
        letterSpacing={1}
        color="#6C3428" // Change the color here
      >
        Compete in the quiz for a chance at the LeaderBoard
      </Text>
      <Button
        height="40px"
        width="120px"
        borderRadius="xl"
        _hover={{ opacity: 0.8 }}
        color="#EDE4E0"
        backgroundColor="#594545"
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
