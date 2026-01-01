import React, { useState } from "react";
import MinutesCircle from "./components/MinutesCircle";
import BigButtonDot from "./components/BigButtonDot";
import CountdownNumber from "./components/CountdownNumber";
import PillRow from "./components/PillRow";
import StarsRow from "./components/StarsRow";
import AnimationsDemo from "./AnimationsDemo";
import { getTimerType } from "./utils";
import { usePomodoro } from "./hooks/usePomodoro";
import "./App.css";

export default function App(): React.ReactElement {
  const [showDemo, setShowDemo] = useState<boolean>(false);

  const {
    step,
    timeLeft,
    isRunning,
    completedSteps,
    completedSets,
    handleButtonClick,
    currentTimer,
  } = usePomodoro();

  if (showDemo) {
    return (
      <>
        <AnimationsDemo />
        <button
          onClick={() => setShowDemo(false)}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            padding: "10px 20px",
            background: "#333",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          ← Back to Timer
        </button>
      </>
    );
  }

  return (
    <div>
      <div className="timer-container">
        <MinutesCircle
          totalSeconds={currentTimer.minutes}
          secondsLeft={timeLeft}
          isRunning={isRunning}
          timerType={getTimerType(currentTimer.minutes)}
        />
        <BigButtonDot
          color={currentTimer.color}
          isRunning={isRunning}
          onClick={handleButtonClick}
        >
          <CountdownNumber value={timeLeft} />
        </BigButtonDot>
      </div>
      <PillRow completedSteps={completedSteps} />
      <StarsRow completedSets={completedSets} />
      <button
        onClick={() => setShowDemo(true)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          padding: "10px 20px",
          background: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        🎬 Animations Demo →
      </button>
    </div>
  );
}
