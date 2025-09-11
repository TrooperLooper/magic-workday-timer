import React from "react";

export default function MinutesCircle({
  totalSeconds,
  secondsLeft,
  isRunning,
  timerType,
}) {
  const numDots = 25;
  const radius = 100;
  const center = 200;
  const rotationOffset = -Math.PI / 2; // Rotate so top dot is at index 0

  // For long timer, expire from left of top dot (index 24), then 0, 1, ..., 23
  const firstDotIndex = numDots - 1; // Index just left of top dot

  function getLogicalIndex(i) {
    if (timerType === "long") {
      // Left-to-right, starting at 24, ending at 0
      return (24 - i + numDots) % numDots;
    } else if (timerType === "short") {
      // Start at 4, end at 0 (indices 4,3,2,1,0)
      return (4 - i + numDots) % numDots;
    } else if (timerType === "medium") {
      // Start at 19, end at 0 (indices 19,18,...,0)
      return (19 - i + numDots) % numDots;
    }
    return i;
  }

  return (
    <div
      className="minute-dots"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "100%",
        height: "100%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {Array.from({ length: numDots }).map((_, i) => {
        const logicalIndex = getLogicalIndex(i);
        const angle = (2 * Math.PI * logicalIndex) / numDots + rotationOffset;
        const x = center + radius * Math.cos(angle) - 9;
        const y = center + radius * Math.sin(angle) - 9;

        // Only show blue for the first N dots
        const isActiveDot = i < totalSeconds;
        const expired = isActiveDot && i < totalSeconds - secondsLeft;
        const current = isActiveDot && i === totalSeconds - secondsLeft;

        let dotSrc = "/images/minute_expired.svg";
        let zIndex = 1;

        if (isActiveDot) dotSrc = "/images/minute_left.svg";
        if (expired) dotSrc = "/images/minute_expired.svg";
        if (current && isRunning) {
          dotSrc = "/images/minute_current.svg";
          zIndex = 99;
        }

        return (
          <img
            key={i}
            src={dotSrc}
            alt="minute dot in a timer circle"
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 18,
              height: 18,
              zIndex: zIndex,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </div>
  );
}

function App() {
  const currentTimer = { minutes: 60 }; // Example timer
  const timeLeft = 30; // Example time left
  const isRunning = true; // Example running state
  const timerType = "long"; // Example timer type

  return (
    <MinutesCircle
      totalSeconds={currentTimer.minutes}
      secondsLeft={timeLeft}
      isRunning={isRunning}
      timerType={timerType}
    />
  );
}
