import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../contextAPI/appContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowBackIcon, TriangleDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Highlight,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Loading from "../components/miscellaneous/Loading";
import Quiz from "../components/articleComponents/Quiz";
import GenerateQuizButton from "../components/articleComponents/GenerateQuizButton";

const Article = () => {
  const { state, dispatch } = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [load, setLoad] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [textHeight, setTextHeight] = useState(0);
  const [articleHeight, setArticleHeight] = useState(0);
  const [givenQuiz, setGivenQuiz] = useState(false);
  const textRef = useRef();
  const articleRef = useRef();
  const [percentile, setPercentile] = useState(null);
  const [score, setScore] = useState(null);

  const fetchArticle = async () => {
    try {
      const response = await axios.get(`/api/articles/article/${id}`);
      const news = await axios.get(`/api/articles?page=1&pageSize=9`);
      //console.log(response.data);
      setLatestNews(news.data);
      //console.log(news.data);
      setArticle(response.data);
    } catch (error) {
      // Handle errors
      console.log(error.message);
    } finally {
      setLoad(false);
    }
  };

  const isQuizGiven = async () => {
    const userId = state.user._id;
    const articleId = id;
    try {
      const response = await axios.get(
        `/api/quiz/given/${articleId}/${userId}`
      );
      if (response.data.given) {
        setPercentile(response.data.percentile);
        setScore(response.data.score);
        setGivenQuiz(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, []);
  useEffect(() => {
    isQuizGiven();
  }, [givenQuiz]);
  useEffect(() => {
    if (textRef.current) {
      //console.log(textRef.current.getBoundingClientRect().height);
      setTextHeight(textRef.current.getBoundingClientRect().height);
    }
    if (articleRef.current) {
      setArticleHeight(articleRef.current.getBoundingClientRect().height);
    }
  }, [article]);
  return (
    <>
      {showQuiz && !givenQuiz ? (
        <Quiz
          article={article}
          isOpen={isOpen}
          onClose={onClose}
          ofShowQuiz={() => {
            setShowQuiz(false);
            setGivenQuiz(true);
          }}
        />
      ) : null}
      {load ? (
        <Loading />
      ) : (
        <>
          <Grid
            templateColumns={
              window.innerWidth > 820 ? "minmax(0, 9fr) 5fr" : "1fr"
            }
            gap={10}
            minH={"85vh"}
            p={{ base: "20px", md: "80px" }}
            marginTop={{ base: "50px", md: "0px" }}
          >
            {article && (
              <GridItem w="100%">
                <Box
                  position={"absolute"}
                  top={"6rem"}
                  border={"solid"}
                  p={1}
                  borderRadius="5px"
                  boxShadow="md"
                  cursor="pointer"
                  _hover={{ bg: "gray.200", color: "red.500" }}
                  onClick={() => navigate(-1)}
                >
                  <ArrowBackIcon />
                </Box>
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
                  <Box marginTop={8} ref={articleRef}>
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
                        css={{
                          "@media screen and (max-width: 1366px)": {
                            display: "none",
                          },
                        }}
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
                  <Box marginTop={8} ref={articleRef}>
                    <Image
                      css={{
                        "@media screen and (max-width: 1366px)": {
                          display: "none",
                        },
                      }}
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
            <GridItem
              w="100%"
              css={{
                "@media screen and (max-width: 821px)": {
                  display: "none",
                },
              }}
            >
              {givenQuiz ? (
                <>
                  <Flex
                    flexDirection="column"
                    alignItems="center"
                    bgGradient="linear-gradient(-180deg, #1a1527, #0e0c16 88%, #0e0c16 99%)"
                    color="white"
                    borderRadius="lg"
                    p={6}
                    boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
                    marginBottom={5}
                  >
                    <Heading
                      as="h6"
                      size="lg"
                      textAlign="center"
                      mb={4}
                      color="cyan.400"
                    >
                      Explore Your Quiz Performance
                    </Heading>
                    <Flex flexDirection="column" alignItems="center">
                      <Heading
                        textAlign={"left"}
                        as="h6"
                        fontSize="20px"
                        mb={2}
                        color="green.300"
                      >
                        Current Percentile: {percentile}%
                      </Heading>
                      <Heading
                        textAlign={"left"}
                        as="h6"
                        fontSize="20px"
                        mb={4}
                        color="green.300"
                      >
                        Score: {score}%
                      </Heading>
                    </Flex>
                  </Flex>
                </>
              ) : (
                <GenerateQuizButton
                  onClick={() => {
                    setShowQuiz(!showQuiz);
                    onOpen();
                  }}
                />
              )}
              <Box
                boxShadow={"0 100px 200px rgba(0, 0, 0, 1.1)"}
                borderRadius={"15px"}
                p={1}
              >
                <Heading
                  as="h3"
                  fontSize="23px"
                  color="white"
                  letterSpacing={1}
                >
                  <TriangleDownIcon color="red.500" /> Latest Articles
                </Heading>

                <SimpleGrid
                  columns={1}
                  marginTop={5}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  {latestNews
                    .filter(
                      (_, idx) =>
                        idx < Math.floor(articleHeight / 100) &&
                        _._id !== article._id
                    )
                    .map((item) => {
                      return (
                        <Box
                          minHeight="100px"
                          key={item._id}
                          onClick={() => {
                            window.location.href = `/article/${item._id}`;
                          }}
                          style={{ cursor: "pointer" }}
                          borderTop={"1px solid lightblue"}
                          p={2}
                          w={"90%"}
                          display={"flex"}
                          alignItems={"center"}
                        >
                          <Image
                            width="80px"
                            height={"100%"}
                            float="left"
                            src={item.imgURL}
                            alt="Article img"
                          />
                          <Text>{item.title}</Text>
                        </Box>
                      );
                    })}
                </SimpleGrid>
              </Box>
            </GridItem>
            {givenQuiz ? (
              <>
                <Flex
                  css={{
                    "@media screen and (min-width: 821px)": {
                      display: "none",
                    },
                  }}
                  flexDirection="column"
                  alignItems="center"
                  bgGradient="linear-gradient(-180deg, #1a1527, #0e0c16 88%, #0e0c16 99%)"
                  color="white"
                  borderRadius="lg"
                  p={6}
                  boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
                  marginBottom={5}
                >
                  <Heading
                    as="h6"
                    size="lg"
                    textAlign="center"
                    mb={4}
                    color="cyan.400"
                  >
                    Explore Your Quiz Performance
                  </Heading>
                  <Flex flexDirection="column" alignItems="center">
                    <Heading
                      textAlign={"left"}
                      as="h6"
                      fontSize="20px"
                      mb={2}
                      color="green.300"
                    >
                      Current Percentile: 90%
                    </Heading>
                    <Heading
                      textAlign={"left"}
                      as="h6"
                      fontSize="20px"
                      mb={4}
                      color="green.300"
                    >
                      Percentage: 80%
                    </Heading>
                  </Flex>
                </Flex>
              </>
            ) : (
              <GenerateQuizButton
                css={{
                  "@media screen and (min-width: 821px)": {
                    display: "none",
                  },
                }}
                onClick={() => {
                  setShowQuiz(!showQuiz);
                  onOpen();
                }}
              />
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default Article;
