import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
  Grid,
  GridItem,
  Text,
  Box,
  Image,
  Progress,
  Flex,
  ModalHeader,
} from "@chakra-ui/react";
import "./Quiz.css";
import quizData from "../../assets/dummyQuizAPI";

const Quiz = ({ article }) => {
  const { onClose } = useDisclosure();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  const totalQuestions = quizData.questions.length;

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleAnswer = (selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedOption,
    }));
    handleNextQuestion();
  };

  const handleSubmitQuiz = () => {
    // You can handle the submission logic here using userAnswers state
    quizData.questions.forEach((question, index) => {
      if (question.answer === userAnswers[index]) {
        console.log(`question ${index + 1} : Correct Answer`);
      } else {
        console.log(`question ${index + 1} : Wrong Answer`);
      }
    });

    console.log("User Answers:", userAnswers);
    onClose();
  };

  return (
    <>
      <Modal isOpen={true} onClose={onClose} size={{ base: "full", md: "3xl" }}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />

        <ModalContent
          background={
            "linear-gradient(-45deg, #2c022b, #5f025f, #2c022b, #660066)"
          }
          backgroundSize="400% 400%"
          className="animated-gradient"
          minHeight={"75%"}
          borderRadius={{ md: "30px" }}
        >
          <ModalHeader color={"white"}>2:50</ModalHeader>
          <ModalCloseButton left={"10px"} right={"10px"} color={"white"} />
          <ModalBody
            p={"15px"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
          >
            {currentQuestionIndex < totalQuestions ? (
              <>
                <Flex
                  width={"100%"}
                  justifyContent={"center"}
                  gap={"10px"}
                  alignItems={"center"}
                >
                  <Progress
                    hasStripe
                    value={64}
                    width={{ base: "100%", md: "75%" }}
                    marginBottom={"20px"}
                    marginTop={"20px"}
                    borderRadius={"50px"}
                    colorScheme="purple"
                  />
                  <Text marginY={"auto"} color={"white"} textAlign={"center"}>
                    3/5
                  </Text>
                </Flex>
                <Image
                  src={article.imgURL}
                  alt="Article Image"
                  borderRadius="md"
                  marginBottom="2"
                  width={{ base: "100%", md: "50%" }}
                  height="auto"
                />
                <Text
                  p={1}
                  letterSpacing={1}
                  marginBottom={"50px"}
                  overflowWrap="break-word"
                  maxWidth={"75%"}
                  color={"white"}
                  fontSize={"20px"}
                >
                  {quizData.questions[currentQuestionIndex].question}
                </Text>

                <Grid templateColumns={{ md: "1fr 1fr" }} gap="10px">
                  {Object.entries(
                    quizData.questions[currentQuestionIndex].options
                  ).map(([optionKey, optionText]) => (
                    <GridItem key={optionKey} display={"flex"}>
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        marginRight={2}
                        color={"white"}
                      >{`${optionKey.toLocaleUpperCase()} :`}</Box>
                      <Button
                        border={"1px solid lightgray"}
                        overflowWrap="break-word"
                        display={"flex"}
                        whiteSpace="normal"
                        justifyContent={"flex-start"}
                        onClick={() => handleAnswer(optionKey)}
                        bg="black"
                        variant={"outline"}
                        width={"80%"}
                        maxWidth={"400px"}
                        textAlign={"left"}
                        height={"auto"}
                        px={2}
                        py={2}
                        color={"white"}
                        _hover={{ color: "black", bg: "white" }}
                      >
                        {`${optionText}`}
                      </Button>
                    </GridItem>
                  ))}
                </Grid>
              </>
            ) : (
              <p>Quiz completed. Submit your answers!</p>
            )}
          </ModalBody>

          <ModalFooter>
            {currentQuestionIndex < totalQuestions - 1 && (
              <Button colorScheme="blue" mr={3} onClick={handleNextQuestion}>
                Next
              </Button>
            )}
            {currentQuestionIndex === totalQuestions - 1 && (
              <Button colorScheme="blue" mr={3} onClick={handleSubmitQuiz}>
                Submit
              </Button>
            )}
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Quiz;
