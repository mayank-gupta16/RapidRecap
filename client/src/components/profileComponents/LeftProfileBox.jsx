import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../../contextAPI/appContext";

const LeftProfileBox = () => {
  const { state, dispatch } = useContext(AppContext);
  useEffect(() => {
    console.log(state.user);
  }, []);
  return (
    <>
      <Flex>
        <Image
          src={state.user.pic}
          alt="Profile"
          borderRadius="10%"
          width="100px"
          height="100px"
          marginRight="20px"
        />
        <Box margin={"5px"}>
          <Heading as="h4" size={"md"}>
            {state.user.firstName} {state.user.lastName}
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
    </>
  );
};

export default LeftProfileBox;
