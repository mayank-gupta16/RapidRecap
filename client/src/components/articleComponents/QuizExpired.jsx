import { Container, Heading } from "@chakra-ui/react";
import React from "react";

const QuizExpired = ({ css }) => {
  return (
    <Container css={css} margin={"20px"}>
      <Heading color={"red"}>Quiz Expired</Heading>
    </Container>
  );
};

export default QuizExpired;
