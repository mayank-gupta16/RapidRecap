import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { set } from "lodash";
const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [latestNews, setLatestNews] = useState([]);

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
    }
  };
  useEffect(() => {
    fetchArticle();
  }, []);
  return (
    <>
      <Grid templateColumns="2fr 1fr" gap={10} minH={"70vh"} p="80px">
        {article && (
          <GridItem w="100%">
            <Heading align="left" letterSpacing={1} as="h3" fontSize="23px">
              {article.title}
            </Heading>
            <Heading align="left" letterSpacing={1} as="h4" fontSize="15px">
              Author: {article.author}
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
                  />
                  <Text align="left" letterSpacing={1}>
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
                />
                <Text align="left" letterSpacing={1}>
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
  );
};

export default Article;
