import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { AppContext } from "../contextAPI/appContext";
import IQGraph from "../components/profileComponents/IQGraph";
import LeftProfileBox from "../components/profileComponents/LeftProfileBox";
import SolvedQuizzes from "../components/profileComponents/SolvedQuizzes";
import RankAndSociety from "../components/profileComponents/RankAndSociety";
import DailyActivity from "../components/profileComponents/DailyActivity";
export default function Profile() {
  const { state, dispatch } = useContext(AppContext);
  const [user, setUser] = useState({});
  useEffect(() => {
    //console.log(state.user);
    setUser(state.user);
  }, []);

  return (
    <Box display="flex" marginTop="20px" marginInline={"5%"}>
      <LeftProfileBox />
      <Flex
        w={"75%"}
        flexDirection="column"
        margin="20px"
        border="1px"
        borderRadius="10px"
      >
        <IQGraph />

        <Flex
          margin="10px"
          border="1px solid #ccc"
          borderRadius="10px"
          marginTop="5px"
          marginBottom="5px"
        >
          <SolvedQuizzes />
          <RankAndSociety />
        </Flex>
        <DailyActivity />
      </Flex>
    </Box>
  );
}
