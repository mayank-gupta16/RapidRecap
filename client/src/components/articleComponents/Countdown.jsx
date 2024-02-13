import React, { useState, useEffect } from "react";
import "./Countdown.css";
import { Box, Heading, Text } from "@chakra-ui/react";

const Countdown = ({
  initialTimer,
  onTimerExhausted,
  submitted,
  start,
  setTimeTaken,
}) => {
  const [timer, setTimer] = useState(initialTimer);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [dot, setDot] = useState(360);
  const [text, setText] = useState(timer >= 10 ? timer : `0${timer}`);
  const [isPulsating, setPulsating] = useState(false);

  useEffect(() => {
    if (!start) return;
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        const newTimer = prevTimer - 1;
        const currentLoadingPercent = calculateLoadingPercent(newTimer);
        setLoadingPercent(currentLoadingPercent);
        setDot(calculateDot(newTimer));
        setText(newTimer >= 10 ? newTimer : `0${newTimer}`);

        // Enable pulsating effect when less than 10 seconds
        setPulsating(newTimer <= 10);
        setTimeTaken((prevTimeTaken) => prevTimeTaken + 1);
        return newTimer;
      });
    }, 1000);

    if (timer === 0) {
      onTimerExhausted();
      clearInterval(intervalId);
    }
    if (submitted) {
      clearInterval(intervalId);
    }
    // Clear the interval when the component unmounts or when the timer reaches 0
    return () => clearInterval(intervalId);
  }, [timer, start, submitted, onTimerExhausted]);

  const calculateLoadingPercent = (secs) => {
    return 440 - 440 * (secs / initialTimer);
  };

  const calculateDot = (secs) => {
    return 360 * (secs / initialTimer);
  };

  return (
    <>
      {timer && !submitted ? (
        <div className={`container-timer ${isPulsating ? "pulsate" : ""}`}>
          <div className={`text-timer ${isPulsating ? "pulsate" : ""}`}>
            {text}
          </div>
          <div
            style={{ transform: `rotate(${dot}deg)` }}
            className={`dot-timer ${isPulsating ? "pulsate" : ""}`}
          ></div>
          <svg>
            <circle cx="70" cy="70" r="70" />
            <circle strokeDashoffset={loadingPercent} cx="70" cy="70" r="70" />
          </svg>
        </div>
      ) : timer === 0 ? (
        <Text fontWeight={"50px"} fontSize={"25px"} color={"red"}>
          Time's Up
        </Text>
      ) : (
        <Box marginTop={"20px"}>
          <Heading as="h6" fontSize={"30px"} color={"green"}>
            Submitted in {`${60 - timer} Secs`}
          </Heading>
        </Box>
      )}
    </>
  );
};

export default Countdown;
