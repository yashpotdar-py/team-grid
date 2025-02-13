"use client";

import React, { useEffect, useState } from "react";

const Timer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return (
      <>
        {hrs.toString().padStart(2, "0")}:{mins.toString().padStart(2, "0")}:
        <span className="seconds">{secs.toString().padStart(2, "0")}</span>
      </>
    );
  };

  return (
    <div className="timer">
      <p>Time left for the hackathon:</p>
      <p>{formatTime(timeLeft)}</p>
      <button
        onClick={() => setIsRunning(true)}
        className="ominous-button"
        style={{ marginRight: "10px" }}
      >
        Start Timer
      </button>
      <button
        onClick={() => setTimeLeft(24 * 60 * 60)}
        className="ominous-button"
        style={{ marginRight: "10px" }}
      >
        Reset Timer
      </button>
      <button onClick={() => setIsRunning(false)} className="ominous-button">
        Stop Timer
      </button>
    </div>
  );
};

export default Timer;
