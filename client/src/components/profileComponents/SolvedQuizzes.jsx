import { Box, Flex, Heading, Progress, Stack, Text } from "@chakra-ui/react";
import React from "react";

const SolvedQuizzes = () => {
  return (
    <Flex
      margin="10px"
      borderRadius="10px"
      w={"100%"}
      flexDirection={"column"}
      gap={5}
    >
      <Box flexDirection={"column"} width={"100%"}>
        <Text textAlign={"left"} color={"#eff2f699"} p={0} m={0}>
          Solved Quizzes
        </Text>
      </Box>
      <Flex width={"100%"}>
        <Flex w={"80%"} justifyContent={"center"} alignItems={"center"}>
          <Flex
            borderWidth={"4px"}
            borderRadius={"50%"}
            borderColor={"green.300"}
            w={"100px"}
            h={"100px"}
          >
            <Flex
              width={"100%"}
              justifyContent={"center"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Text
                m={0}
                p={0}
                fontSize={"1.5rem"}
                marginTop={"2px"}
                fontWeight={"semibold"}
              >
                200
              </Text>
              <Text
                marginBottom={0}
                marginTop={"1px"}
                color={"#eff2f699"}
                fontWeight={"light"}
                fontSize={"0.8rem"}
              >
                Solved
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          w={"100%"}
          paddingLeft={5}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Stack spacing={5} w={"100%"}>
            <Box>
              <Flex justifyContent={"space-between"} marginBottom={"5px"}>
                <Text
                  marginBottom={0}
                  marginTop={"1px"}
                  color={"#eff2f699"}
                  fontWeight={"light"}
                  fontSize={"0.8rem"}
                  textAlign={"left"}
                >
                  Easy
                </Text>
                <Text
                  marginBottom={0}
                  marginTop={"1px"}
                  color={"#eff2f699"}
                  fontWeight={"light"}
                  fontSize={"0.8rem"}
                  textAlign={"left"}
                >
                  86 solved
                </Text>
                <Text
                  marginBottom={0}
                  marginTop={"1px"}
                  color={"#eff2f699"}
                  fontWeight={"light"}
                  fontSize={"0.8rem"}
                  textAlign={"left"}
                >
                  Beats 60%
                </Text>
              </Flex>
              <Progress
                backgroundColor={"transparent"}
                colorScheme="teal"
                size="md"
                value={40}
                borderRadius={"3px"}
              />
            </Box>
            <Box>
              <Flex justifyContent={"space-between"} marginBottom={"5px"}>
                <Text
                  textAlign={"left"}
                  marginBottom={0}
                  marginTop={"1px"}
                  color={"#eff2f699"}
                  fontWeight={"light"}
                  fontSize={"0.8rem"}
                >
                  Medium
                </Text>
                <Text
                  marginBottom={0}
                  marginTop={"1px"}
                  color={"#eff2f699"}
                  fontWeight={"light"}
                  fontSize={"0.8rem"}
                  textAlign={"left"}
                >
                  86 solved
                </Text>
                <Text
                  marginBottom={0}
                  marginTop={"1px"}
                  color={"#eff2f699"}
                  fontWeight={"light"}
                  fontSize={"0.8rem"}
                  textAlign={"left"}
                >
                  Beats 60%
                </Text>
              </Flex>
              <Progress
                colorScheme="yellow"
                size="md"
                value={60}
                borderRadius={"3px"}
                backgroundColor={"transparent"}
              />
            </Box>
            <Box>
              <Flex justifyContent={"space-between"} marginBottom={"5px"}>
                <Text
                  textAlign={"left"}
                  marginBottom={0}
                  marginTop={"1px"}
                  color={"#eff2f699"}
                  fontWeight={"light"}
                  fontSize={"0.8rem"}
                >
                  Hard
                </Text>
                <Text
                  marginBottom={0}
                  marginTop={"1px"}
                  color={"#eff2f699"}
                  fontWeight={"light"}
                  fontSize={"0.8rem"}
                  textAlign={"left"}
                >
                  86 solved
                </Text>
                <Text
                  marginBottom={0}
                  marginTop={"1px"}
                  color={"#eff2f699"}
                  fontWeight={"light"}
                  fontSize={"0.8rem"}
                  textAlign={"left"}
                >
                  Beats 60%
                </Text>
              </Flex>
              <Progress
                backgroundColor={"transparent"}
                colorScheme="red"
                size="md"
                value={20}
                borderRadius={"3px"}
              />
            </Box>
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SolvedQuizzes;
