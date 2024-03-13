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
        color={"black"}
        
      >
        <Heading as="h1" size={"xl"} mb={4}>
          Instructions
        </Heading>

        <VStack spacing={1} alignItems="start" textAlign="left">
          <Box>
            <Text>1. Quiz will contain five questions.</Text>
          </Box>
          <Box>
            <Text>3. All the questions will be from the given article only.</Text>
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
