import React, { useState, useEffect } from "react";
import "./Countdown.css";

const Countdown = () => {
  const [loadingPercent, setloadingPercent] = useState(0);
  const [dot, setDot] = useState(0);
  const [text, setText] = useState("00");

  useEffect(() => {
    setInterval(() => {
      const secs = new Date().getSeconds();

      const currentLoadingPercent = 440 - 440 * (secs / 60);
      setloadingPercent(currentLoadingPercent);

      const currentDot = 360 * (secs / 60);
      setDot(currentDot);

      setText(secs >= 10 ? secs : `0${secs}`);
    }, 1000);
  }, []);

  return (
    <div className="container-timer">
      <div className="text-timer">{text}</div>
      <div
        style={{ transform: `rotate(${dot}deg)` }}
        className="dot-timer"
      ></div>
      <svg>
        <circle cx="70" cy="70" r="70" />
        <circle strokeDashoffset={loadingPercent} cx="70" cy="70" r="70" />
      </svg>
    </div>
  );
};

export default Countdown;
