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
} from "@chakra-ui/react";
import quizData from "../../assets/dummyQuizAPI";

const Quiz = () => {
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
      <Modal isOpen={true} onClose={onClose} size="3xl">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody
            p={"50px"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {currentQuestionIndex < totalQuestions ? (
              <>
                <Text
                  bg="red.100"
                  p={1}
                  letterSpacing={1}
                  borderRadius={10}
                  marginBottom={"50px"}
                  overflowWrap="break-word"
                  maxWidth={"75%"}
                >
                  {quizData.questions[currentQuestionIndex].question}
                </Text>
                {/* Render options as buttons */}
                <Grid templateColumns="1fr 1fr" gap="10px">
                  {Object.entries(
                    quizData.questions[currentQuestionIndex].options
                  ).map(([optionKey, optionText]) => (
                    <GridItem key={optionKey} display={"flex"}>
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        marginRight={2}
                      >{`${optionKey.toLocaleUpperCase()} :`}</Box>
                      <Button
                        overflowWrap="break-word"
                        display={"flex"}
                        whiteSpace="normal"
                        justifyContent={"flex-start"}
                        onClick={() => handleAnswer(optionKey)}
                        bg="white"
                        variant={"outline"}
                        width={"80%"}
                        maxWidth={"400px"}
                        textAlign={"left"}
                        height={"auto"}
                        px={2}
                        py={1}
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
