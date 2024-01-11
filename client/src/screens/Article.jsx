import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Highlight,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Loading from "../components/Loading";
import Quiz from "../components/Quiz";

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [load, setLoad] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [textHeight, setTextHeight] = useState(0);
  const textRef = useRef();
  const fetchArticle = async () => {
    try {
      const response = await axios.get(`/api/articles/${id}`);
      const news = await axios.get(`/api/articles?page=1&pageSize=6`);
      setLatestNews(news.data);
      //console.log(response.data);
      setArticle(response.data);
    } catch (error) {
      // Handle errors
      console.log(error.message);
    } finally {
      setLoad(false);
    }
  };
  useEffect(() => {
    fetchArticle();
  }, []);
  useEffect(() => {
    if (textRef.current) {
      //console.log(textRef.current.getBoundingClientRect().height);
      setTextHeight(textRef.current.getBoundingClientRect().height);
    }
  }, [article]);
  return (
    <>
      {showQuiz ? <Quiz /> : null}
      {load ? (
        <Loading />
      ) : (
        <>
          <Grid
            templateColumns="minmax(0, 2fr) 1fr"
            gap={10}
            minH={"70vh"}
            p={{ base: "20px", md: "80px" }}
          >
            {article && (
              <GridItem w="100%">
                <Heading
                  align="left"
                  letterSpacing={1}
                  as="h3"
                  fontSize="25px"
                  bg="teal.500"
                  p={2}
                  borderRadius="xl"
                >
                  {article.title}
                </Heading>
                <Heading
                  align="left"
                  letterSpacing={1}
                  as="h4"
                  fontSize="15px"
                  marginTop="20px"
                >
                  <Highlight
                    query="Author:"
                    styles={{
                      px: "2",
                      py: "1",
                      rounded: "full",
                      bg: "red.100",
                    }}
                  >
                    Author:
                  </Highlight>
                  <span style={{ fontSize: "20px", marginLeft: "5px" }}>
                    {article.author}
                  </span>
                </Heading>
                {article.mainText.length == 3 ? (
                  <Box marginTop={8}>
                    <Text align="left" letterSpacing={1}>
                      {article.mainText[0]}
                    </Text>
                    <Box
                      marginTop="5"
                      marginBottom="5"
                      marginRight="5"
                      display={"flex"}
                      alignItems={"center"}
                      height={"100%"}
                    >
                      <Image
                        src={article.imgURL}
                        alt="Article Image"
                        borderRadius="md"
                        float={"left"}
                        marginRight={"3"}
                        height={textHeight}
                      />

                      <Text ref={textRef} align="left" letterSpacing={1}>
                        {article.mainText[1]}
                      </Text>
                    </Box>
                    <Text align="left" letterSpacing={1}>
                      {article.mainText[2]}
                    </Text>
                  </Box>
                ) : (
                  <Box marginTop={8}>
                    <Image
                      src={article.imgURL}
                      alt="Article Image"
                      borderRadius="md"
                      marginBottom="5"
                      marginRight="5"
                      float={"left"}
                      height={textHeight}
                    />

                    <Text ref={textRef} align="left" letterSpacing={1}>
                      {article.mainText[0]}
                    </Text>
                    <Text align="left" letterSpacing={1}>
                      {article.mainText[1]}
                    </Text>
                  </Box>
                )}
              </GridItem>
            )}
            <GridItem w="100%">
              <Box
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
                  onClick={() => setShowQuiz(!showQuiz)}
                >
                  Generate Quiz
                </Button>
              </Box>
              <Heading as="h3" fontSize="23px" color="white" letterSpacing={1}>
                <TriangleDownIcon color="red.500" /> Latest Articles
              </Heading>
              <SimpleGrid columns={1} spacing={5} marginTop={10}>
                {latestNews
                  .filter((_, idx) => idx < 2 * article.mainText.length)
                  .map((item) => {
                    return (
                      <Box
                        height="80px"
                        key={item._id}
                        onClick={() => {
                          window.location.href = `/article/${item._id}`;
                        }}
                        style={{ cursor: "pointer" }}
                        className="border-2 border-danger"
                      >
                        <Image
                          width="80px"
                          height="78px"
                          float="left"
                          src={item.imgURL}
                          alt="Article img"
                        />
                        <Text>{item.title}</Text>
                      </Box>
                    );
                  })}
              </SimpleGrid>
            </GridItem>
          </Grid>
        </>
      )}
    </>
  );
};

export default Article;
