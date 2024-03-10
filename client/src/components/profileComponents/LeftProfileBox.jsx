import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const LeftProfileBox = () => {
  return (
    <Flex
      margin="20px"
      padding="20px"
      border="1px solid #ccc"
      borderRadius="10px"
      flexDirection="column"
      w={"25%"}
    >
      <Flex>
        <Image
          src="images\Subrat.jpeg"
          alt="Profile"
          borderRadius="10%"
          width="100px"
          height="100px"
          marginRight="20px"
        />
        <Box margin={"5px"}>
          <Heading as="h4" size={"md"}>
            Subart Gupta
          </Heading>
          <Heading as="h6" fontSize={"14px"}>
            syntax_terminator_2704
          </Heading>
          <Heading as="h6" fontSize={"14px"}>
            Rank : 1,21,145
          </Heading>
        </Box>
      </Flex>
      <Box marginTop={"20px"}>
        <Text>
          An ambitious student pursuing B.Tech in Communication and Computer
          Engineering, I possess a strong skill set in Data Structures and
          Algorithms (DSA), full-stack web development (MERN Stack) and
          excellent problem-solving abilities. Throughout my academic journey, I
          have gained practical experience in creating efficient and intuitive
          web applications while also honing my analytical and logical thinking
          skills.
        </Text>
        <Button
          size="md"
          height="38px"
          width="150px"
          border="3px"
          borderColor="green.200"
        >
          Edit Profile
        </Button>
      </Box>
    </Flex>
  );
};

export default LeftProfileBox;
