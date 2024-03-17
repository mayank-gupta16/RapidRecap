import {
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import Mavericks_Brain from "/images/Mavericks_Brain.png";
import Explorers_Brain from "/images/Explorers_Brain.png";
import Strivers_Brain from "/images/Strivers_Brain.png";
import Elites_Brain from "/images/Elites_Brain.png";
import Titans_Brain from "/images/Titans_Brain.png";
import circle from "/images/circle.png";
import Arrow from "/images/arrow.png";
import Lightning from "./RankAndSocietySubCompnents/Lightning"; // Import the Lightning component

const AnimatedAvatar = motion(Avatar);

const RankAndSociety = () => {
  return (
    <Flex margin="10px" w={"100%"} flexDirection={"column"} position="relative">
      <Box flexDirection={"column"} width={"100%"}>
        <Text textAlign={"left"} color={"#eff2f699"} p={0} m={0}>
          Society and Circle
        </Text>
      </Box>
      <Flex mt={5} flexDirection={"column"} w={"100%"}>
        <Flex width={"100%"}>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            w={"100%"}
            position="relative"
          >
            <motion.img
              src={Mavericks_Brain}
              alt="Brain"
              style={{
                width: "80px",
                height: "80px",
                background: "transparent",
              }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            {/* Position the Lightning component over the Avatar */}
            <Lightning />
          </Flex>
          <Flex
            width={"80%"}
            alignItems={"center"}
            justifyContent={"center"}
            marginTop={"2rem"}
          >
            <Image
              w={"70px"}
              h={"70px"}
              background={"transparent"}
              src={Arrow}
            />
          </Flex>
          <Flex w={"100%"} position={"relative"}>
            <Flex
              w={"100%"}
              position={"absolute"}
              flexDirection={"column"}
              gap={0}
              zIndex={1}
              top={"2.7rem"}
              right={"0.5rem"}
            >
              <Text color={"#eff2f699"} fontSize={"0.8rem"} p={0} m={0}>
                120
              </Text>
              <Text color={"#eff2f699"} fontSize={"0.8rem"} p={0} m={0}>
                to
              </Text>
              <Text color={"#eff2f699"} fontSize={"0.8rem"} p={0} m={0}>
                130 IQ
              </Text>
            </Flex>
            <Flex w={"100%"}>
              <Image
                background={"transparent"}
                p={0}
                m={0}
                w={"140px"}
                h={"140px"}
                src={circle}
                zIndex={0} // Set a lower z-index value for the image
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex
          mt={5}
          w={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
          paddingLeft={5}
          paddingRight={9}
        >
          <Text
            textAlign="center"
            fontSize="lg"
            fontWeight="bold"
            color="#48BB78"
            textShadow="2px 2px 4px rgba(0,0,0,0.4)" // Add text shadow for depth
          >
            Mavericks Society
          </Text>
          <Text
            textAlign="center"
            fontSize="lg"
            fontWeight="bold"
            color="#48BB78"
            textShadow="2px 2px 4px rgba(0,0,0,0.4)" // Add text shadow for depth
          >
            Scholars Circle
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RankAndSociety;
