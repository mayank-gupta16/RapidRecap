// InstructionModal.js
import React from "react";
import { ModalBody, Heading, Text, VStack, Box } from "@chakra-ui/react";

const InstructionModal = () => {
  return (
    <>
      <ModalBody
        p={"15px"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        color={"white"}
      >
        <Heading as="h2" size={"xl"} mb={4}>
          Instructions
        </Heading>

        <VStack spacing={4} alignItems="start" textAlign="left">
          <Box>
            <Text>1. Quiz will contain some questions.</Text>
          </Box>
          <Box>
            <Text>2. You have 9 seconds per question.</Text>
          </Box>
          <Box>
            <Text>3. All the questions will be from the given article.</Text>
          </Box>
          <Box>
            <Text>4. All questions are compulsory to attempt.</Text>
          </Box>
          <Box>
            <Text>
              5. At last, you will get your score and your percentile.
            </Text>
          </Box>
          <Box>
            <Text>6. You can't leave the quiz in between.</Text>
          </Box>
          <Box>
            <Text>7. Attempting the quiz will affect your IQ score.</Text>
          </Box>
        </VStack>
      </ModalBody>
    </>
  );
};

export default InstructionModal;
