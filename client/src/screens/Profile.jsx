import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { AppContext } from "../contextAPI/appContext";
import IQLineGraph from "../components/profileComponents/IQLineGraph";
import IQBarGraph from "../components/profileComponents/IQBarGraph";
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
      <Flex
        margin="20px"
        padding="20px"
        borderRadius="10px"
        flexDirection="column"
        w={"25%"}
        style={{
          backgroundColor: "#0f0d15",
          backgroundImage:
            "linear-gradient(-180deg, #1a1527, #0e0c16 88%, #0e0c16 99%)",
          boxShadow:
            "0px 4px 8px rgba(0, 0, 0, 0.3), 0px 8px 16px rgba(0, 0, 0, 0.3), 0px 12px 24px rgba(0, 0, 0, 0.3)", // Increased intensity of the shadow
        }}
      >
        <LeftProfileBox />
      </Flex>
      <Flex w={"75%"} flexDirection="column" margin="20px" borderRadius="10px">
        <Box
          margin="10px"
          padding="15px"
          borderRadius="10px"
          display={"flex"}
          flexDirection={"row"}
          style={{
            backgroundColor: "#0f0d15",
            backgroundImage:
              "linear-gradient(-180deg, #1a1527, #0e0c16 88%, #0e0c16 99%)",
            boxShadow:
              "0px 4px 8px rgba(0, 0, 0, 0.3), 0px 8px 16px rgba(0, 0, 0, 0.3), 0px 12px 24px rgba(0, 0, 0, 0.3)", // Increased intensity of the shadow
          }}
        >
          <IQLineGraph />
          <IQBarGraph />
        </Box>

        <Flex
          margin="10px"
          borderRadius="10px"
          marginTop="5px"
          marginBottom="5px"
          flexDirection="row"
          justifyContent="space-between"
          gap={5}
        >
          <Flex
            width={"100%"}
            style={{
              backgroundColor: "#0f0d15",
              backgroundImage:
                "linear-gradient(-180deg, #1a1527, #0e0c16 88%, #0e0c16 99%)",
              boxShadow:
                "0px 4px 8px rgba(0, 0, 0, 0.3), 0px 8px 16px rgba(0, 0, 0, 0.3), 0px 12px 24px rgba(0, 0, 0, 0.3)", // Increased intensity of the shadow
            }}
          >
            <SolvedQuizzes />
          </Flex>
          <Flex
            width={"100%"}
            style={{
              backgroundColor: "#0f0d15",
              backgroundImage:
                "linear-gradient(-180deg, #1a1527, #0e0c16 88%, #0e0c16 99%)",
              boxShadow:
                "0px 4px 8px rgba(0, 0, 0, 0.3), 0px 8px 16px rgba(0, 0, 0, 0.3), 0px 12px 24px rgba(0, 0, 0, 0.3)", // Increased intensity of the shadow
            }}
          >
            <RankAndSociety />
          </Flex>
        </Flex>
        <Box
          margin="10px"
          padding="50px"
          borderRadius="10px"
          style={{
            backgroundColor: "#0f0d15",
            backgroundImage:
              "linear-gradient(-180deg, #1a1527, #0e0c16 88%, #0e0c16 99%)",
            boxShadow:
              "0px 4px 8px rgba(0, 0, 0, 0.3), 0px 8px 16px rgba(0, 0, 0, 0.3), 0px 12px 24px rgba(0, 0, 0, 0.3)", // Increased intensity of the shadow
          }}
        >
          <DailyActivity />
        </Box>
      </Flex>
    </Box>
  );
}
