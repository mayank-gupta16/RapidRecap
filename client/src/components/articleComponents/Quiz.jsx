import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contextAPI/appContext";
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
  SlideFade,
  Heading,
  Skeleton,
  SkeletonCircle,
  useToast,
} from "@chakra-ui/react";
import "./Quiz.css";
import Countdown from "./Countdown";
import axios from "axios";
import ConfirmationModal from "./customQuizModal/ConfirmationModal";

const Quiz = ({ article, isOpen, onClose, ofShowQuiz }) => {
  const { state, dispatch } = useContext(AppContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizData, setQuizData] = useState(null);
  const [load, setLoad] = useState(true);
  const toast = useToast();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const totalQuestions = quizData ? quizData.questions.length : 0;

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleAnswer = (selectedOption) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedOption]);
  };

  const handleSubmitQuiz = async () => {
    // For example, you can calculate the score here
    // You can add your own logic here
    console.log("Submitting Quiz");
    try {
      const userId = state.user._id;
      const articleId = article._id;
      const userResponses = [...userAnswers];
      // let marks = 0;
      // quizData.questions.forEach((question, index) => {
      //   if (question.answer === userAnswers[index]) {
      //     marks++;
      //   }
      // });
      // setScore(marks);
      // console.log("User Answers:", userAnswers);
      // console.log(quizData.questions);
      const response = await axios.post(`/api/quiz/attempt`, {
        userId,
        articleId,
        userResponses,
        quizData,
      });
      setScore(response.data.score);
      setCurrentQuestionIndex(quizData.questions.length);
      setSubmitted(true);
      toast({
        title: "Quiz submitted Successfully!",
        description: "You can now view your score.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.log(error.response.data.error);
      toast({
        title: "Quiz submission failed!",
        description: error.response.data.error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const fetchQuiz = async () => {
    //fetch quiz data from api
    try {
      //console.log(article._id);
      const articleId = article._id;
      const response = await axios.put(`/api/articles/genQuiz/${articleId}`);
      //console.log(response.data);
      setQuizData(response.data);
      setLoad(false);
      toast({
        title: "Quiz generated Successfully!",
        description: "You can now take the quiz.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Quiz generation failed!",
        description:
          "Please try again (Close the quiz and Try refreshing the page)",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const showConfirmation = () => {
    setShowConfirmationModal(true);
  };
  const handleClose = () => {
    if (!submitted && currentQuestionIndex < totalQuestions) {
      showConfirmation();
    } else {
      ofShowQuiz();
      onClose();
    }
  };
  const handleConfirmClose = async () => {
    // Close the confirmation modal
    setShowConfirmationModal(false);
    await handleSubmitQuiz();
    // Perform additional actions if needed
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
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
            <SkeletonCircle
              isLoaded={!load}
              marginTop={load ? "10px" : "0"} // remove this when skeleton isLoaded
              size={load ? "20" : "auto"} // make it auto when skeleton isLoaded
              marginBottom={load ? "10px" : "0"} // remove this when skeleton isLoaded
            >
              <Countdown
                initialTimer={3000}
                onTimerExhausted={() => submitted && handleSubmitQuiz()}
                submitted={currentQuestionIndex === totalQuestions}
              />
            </SkeletonCircle>
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
            {!submitted ? (
              <>
                <Skeleton w={"100%"} borderRadius={"10px"} isLoaded={!load}>
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
                </Skeleton>
                <Skeleton
                  isLoaded={!load}
                  display={!load ? "none" : "flex"}
                  marginBottom={load ? "10px" : "0"} // remove this when skeleton isLoaded
                  marginTop={load ? "10px" : "0"} // remove this when skeleton isLoaded
                  borderRadius={"10px"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  minHeight={"300px"}
                  width={"100%"}
                />
                {quizData !== null && (
                  <>
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
                      color={"white"}
                      fontSize={"20px"}
                    >
                      {quizData.questions.length > 0
                        ? quizData.questions[currentQuestionIndex].question
                        : ""}
                    </Text>
                    <Grid templateColumns={{ md: "1fr 1fr" }} gap="20px">
                      {Object.entries(
                        quizData.questions.length > 0
                          ? quizData.questions[currentQuestionIndex].options
                          : {}
                      ).map(([optionKey, optionText]) => (
                        <GridItem key={optionKey} display={"flex"}>
                          <Box
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems={"center"}
                            marginRight={2}
                            color={"white"}
                            minW={"20px"}
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
                )}
              </>
            ) : (
              <SlideFade
                direction="bottom"
                in={isOpen}
                offsetY="20px"
                style={{ zIndex: 10 }}
              >
                <Heading
                  as="h3"
                  size="lg"
                  color="white"
                  position="absolute"
                  top="20%"
                  width="75%"
                  left="50%"
                  transform="translateX(-50%)"
                  textAlign="center"
                >
                  Quiz completed. Thank you for participating!
                </Heading>
                <Text
                  color="white"
                  fontSize="30px"
                  textAlign="center"
                  marginTop="2"
                >
                  Percentage: {`${score} %`}
                </Text>
              </SlideFade>
            )}
          </ModalBody>

          <Skeleton
            isLoaded={!load}
            borderRadius={"10px"}
            marginBottom={load ? "10px" : ""} // remove this when skeleton isLoaded
          >
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
          </Skeleton>
        </ModalContent>
      </Modal>
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirmClose}
        message="Are you sure you want to close the quiz? Your progress will be lost."
      />
    </>
  );
};

export default Quiz;
