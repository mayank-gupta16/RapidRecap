import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalCloseButton,
  Grid,
  GridItem,
  Text,
  Box,
  Image,
  Progress,
  Flex,
  ModalHeader,
  Slide,
  SlideFade,
  Heading,
} from "@chakra-ui/react";
import "./Quiz.css";
import quizData from "../../assets/dummyQuizAPI";
import Countdown from "./Countdown";

const Quiz = ({ article, isOpen, onClose }) => {
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
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleTimerExhausted = () => {
    console.log("Timer Exhausted!");
    // Handle your logic when the timer is exhausted
    // For example, submit the quiz or show a message
    // You can add your own logic here
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", md: "3xl" }}
      >
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
          <ModalHeader
            maxHeight={"100px"}
            p={0}
            color={"white"}
            display={"flex"}
            alignItems={"center"}
          >
            <Countdown
              initialTimer={60}
              onTimerExhausted={handleTimerExhausted}
              submitted={currentQuestionIndex === totalQuestions}
            />
          </ModalHeader>
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
                  marginBottom={"20px"}
                >
                  <Progress
                    hasStripe
                    value={(currentQuestionIndex / totalQuestions) * 100}
                    width={{ base: "100%", md: "75%" }}
                    height={"10px"}
                    marginBottom={"20px"}
                    borderRadius={"50px"}
                    colorScheme="purple"
                    marginY={"auto"}
                  />
                  <Text marginY={"auto"} color={"white"} textAlign={"center"}>
                    {`${currentQuestionIndex} / ${totalQuestions}`}
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
                        bg={
                          userAnswers[currentQuestionIndex] === optionKey
                            ? "white"
                            : "black"
                        }
                        variant={"outline"}
                        width={"80%"}
                        maxWidth={"400px"}
                        textAlign={"left"}
                        height={"auto"}
                        px={2}
                        py={2}
                        color={
                          userAnswers[currentQuestionIndex] === optionKey
                            ? "black"
                            : "white"
                        }
                        _hover={{ color: "black", bg: "white" }}
                      >
                        {`${optionText}`}
                      </Button>
                    </GridItem>
                  ))}
                </Grid>
              </>
            ) : (
              <SlideFade
                direction="bottom"
                in={isOpen}
                offsetY="100px"
                style={{ zIndex: 10 }}
              >
                <Heading
                  as="h3"
                  size="lg"
                  color={"white"}
                  position={"absolute"}
                  top={"20%"}
                  width={"75%"}
                  left={"13%"}
                >
                  Quiz completed. Thank you for participating!
                </Heading>
                <Text color={"white"} fontSize={"30px"}>
                  Score :
                </Text>
              </SlideFade>
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Quiz;
