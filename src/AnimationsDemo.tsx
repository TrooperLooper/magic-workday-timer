import React, { useEffect, useState, useRef } from "react";
import { animate } from "motion";
import CountdownNumber from "./components/CountdownNumber";
import PillRow from "./components/PillRow";
import StarsRow from "./components/StarsRow";
import { TIMER_SEQUENCE, MAX_SETS } from "./constants";
import "./AnimationsDemo.css";

/**
 * Animations Demo Page
 * Visual preview of all motion animations
 * Remove this file after verifying animations look good
 */
export default function AnimationsDemo(): React.ReactElement {
  const [currentValue, setCurrentValue] = useState<number>(25);
  const [completedSteps, setCompletedSteps] = useState<number>(0);
  const [completedSets, setCompletedSets] = useState<number>(0);
  const [demoButtonColor, setDemoButtonColor] = useState<"red" | "green">(
    "red"
  );
  const [demoButtonNumber, setDemoButtonNumber] = useState<number>(25);
  const demoButtonRef = useRef<HTMLDivElement>(null);

  // Cycle through countdown numbers continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValue((prev) => {
        if (prev === 25) return 5;
        if (prev === 5) return 20;
        return 25;
      });
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Cycle through completed steps for pills
  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedSteps((prev) =>
        prev >= TIMER_SEQUENCE.length ? 0 : prev + 1
      );
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Cycle through completed sets for stars
  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedSets((prev) => (prev >= MAX_SETS ? 0 : prev + 1));
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Cycle demo button: number and color
  useEffect(() => {
    const interval = setInterval(() => {
      setDemoButtonNumber((prev) => {
        if (prev === 25) {
          setDemoButtonColor("green");
          return 5;
        } else if (prev === 5) {
          setDemoButtonColor("red");
          return 20;
        } else {
          setDemoButtonColor("red");
          return 25;
        }
      });
    }, 2500); // Change every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleDemoButtonClick = (): void => {
    if (demoButtonRef.current) {
      // Animate click: scale down then back up
      animate(
        demoButtonRef.current,
        {
          scale: [1, 0.9, 1.05, 1],
        },
        {
          duration: 0.4,
          ease: "easeOut",
        }
      );
    }
  };

  return (
    <div className="animations-demo">
      <h1>🎬 Animations Demo</h1>
      <p className="demo-subtitle">
        Previewing all animations with real components. Delete this file after
        verification.
      </p>

      <div className="demo-grid">
        {/* Number Bounce Animation */}
        <div className="demo-card">
          <h2>1. Number Bounce Fade</h2>
          <p className="demo-label">Cycles: 25 → 5 → 20</p>
          <div className="demo-showcase">
            <div className="countdown-container">
              <CountdownNumber value={currentValue} />
            </div>
          </div>
          <p className="demo-description">
            Old number fades out, new number bounces in with scale animation
          </p>
        </div>

        {/* Pills Spring Pop Animation */}
        <div className="demo-card">
          <h2>2. Pills Spring Pop</h2>
          <p className="demo-label">Completed steps: {completedSteps}/8</p>
          <div className="demo-showcase">
            <PillRow completedSteps={completedSteps} />
          </div>
          <p className="demo-description">
            Pills fill with color and pop simultaneously when completed
          </p>
        </div>

        {/* Stars Rotation Animation */}
        <div className="demo-card">
          <h2>3. Stars Spin & Scale</h2>
          <p className="demo-label">Completed sets: {completedSets}/3</p>
          <div className="demo-showcase">
            <StarsRow completedSets={completedSets} />
          </div>
          <p className="demo-description">
            Stars fill with color and spin 360° with scale effect simultaneously
          </p>
        </div>

        {/* Button Combined Animations */}
        <div className="demo-card">
          <h2>4. Button Combined Effects</h2>
          <p className="demo-label">
            Cycles: {demoButtonColor === "red" ? "Work" : "Break"} | Number:{" "}
            {demoButtonNumber}
          </p>
          <div className="demo-showcase demo-button-showcase">
            <div
              ref={demoButtonRef}
              onClick={handleDemoButtonClick}
              className={`demo-big-button demo-button-${demoButtonColor}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleDemoButtonClick();
                }
              }}
              aria-label="Demo button showing combined animations"
            >
              <svg
                width="140"
                height="140"
                viewBox="0 0 140 140"
                xmlns="http://www.w3.org/2000/svg"
                className="demo-button-svg"
              >
                <circle
                  cx="70"
                  cy="70"
                  r="65"
                  fill="currentColor"
                  opacity="0.7"
                />
                <circle cx="70" cy="70" r="60" fill="currentColor" />
              </svg>
              <span className="demo-button-number">{demoButtonNumber}</span>
            </div>
          </div>
          <p className="demo-description">
            Combines: color change, number transition, and click scale animation
          </p>
        </div>
      </div>

      <div className="demo-footer">
        <p>
          💡 Tip: Open DevTools → Slow down animations (Settings → Rendering →
          Animation frame rate) to see the details better
        </p>
      </div>
    </div>
  );
}
