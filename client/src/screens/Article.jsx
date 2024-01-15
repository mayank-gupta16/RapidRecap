import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowBackIcon, TriangleDownIcon } from "@chakra-ui/icons";
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
  useDisclosure,
} from "@chakra-ui/react";
import Loading from "../components/miscellaneous/Loading";
import Quiz from "../components/articleComponents/Quiz";

const Article = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [load, setLoad] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [textHeight, setTextHeight] = useState(0);
  const [articleHeight, setArticleHeight] = useState(0);
  const textRef = useRef();
  const articleRef = useRef();

  const fetchArticle = async () => {
    try {
      const response = await axios.get(`/api/articles/${id}`);
      const news = await axios.get(`/api/articles?page=1&pageSize=9`);
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
  useEffect(() => {
    fetchArticle();
  }, []);
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
      {showQuiz ? (
        <Quiz article={article} isOpen={isOpen} onClose={onClose} />
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
                  onClick={() => {
                    setShowQuiz(!showQuiz);
                    onOpen();
                  }}
                >
                  Generate Quiz
                </Button>
              </Box>
              <Heading as="h3" fontSize="23px" color="white" letterSpacing={1}>
                <TriangleDownIcon color="red.500" /> Latest Articles
              </Heading>
              <SimpleGrid columns={1} spacing={5} marginTop={10}>
                {latestNews
                  .filter((_, idx) => idx + 1 < Math.floor(articleHeight / 100))
                  .map((item) => {
                    return (
                      <Box
                        minHeight="100px"
                        key={item._id}
                        onClick={() => {
                          window.location.href = `/article/${item._id}`;
                        }}
                        style={{ cursor: "pointer" }}
                        className="border-2 border-danger"
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
            </GridItem>
            <Box
              css={{
                "@media screen and (min-width: 821px)": {
                  display: "none",
                },
              }}
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
          </Grid>
        </>
      )}
    </>
  );
};

export default Article;
