/**
 * usePomodoro Hook
 *
 * Custom React hook that encapsulates all Pomodoro timer logic
 * Manages state for timer countdown, step progression, pills, and stars
 *
 * Returns: {
 *   step, timeLeft, isRunning, completedSteps, completedSets,
 *   handleButtonClick, currentTimer
 * }
 */

import { useState, useEffect, useRef } from "react";
import {
  TIMER_SEQUENCE,
  MAX_SETS,
  TIMER_INTERVAL_MS,
  IMAGE_PATHS,
} from "../constants";
import { playAudio } from "../utils";

export function usePomodoro() {
  const [step, setStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SEQUENCE[0].minutes);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [completedSets, setCompletedSets] = useState(0);
  const intervalRef = useRef(null);

  /**
   * Start/stop button click handler
   * Only allows starting if not already running and workday isn't complete
   */
  const handleButtonClick = () => {
    if (!isRunning && completedSets < MAX_SETS) {
      setIsRunning(true);
    }
  };

  /**
   * Keyboard navigation - Space key to start timer
   */
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        handleButtonClick();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [completedSets]);

  /**
   * Timer countdown logic - starts/stops interval based on isRunning status
   * Only depends on isRunning to avoid cascading re-renders
   */
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, TIMER_INTERVAL_MS);
    } else {
      clearInterval(intervalRef.current);
    }

    // Cleanup interval on unmount
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  /**
   * Timer completion logic - triggered when timeLeft reaches 0
   * Uses callback pattern to access current state values
   */
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setCompletedSteps((prevCompletedSteps) => {
        // Play completion sound
        playAudio(IMAGE_PATHS.audio.chime);

        const newCompletedSteps = prevCompletedSteps + 1;

        // When all pills in current set are done, advance to next set
        if (newCompletedSteps === TIMER_SEQUENCE.length) {
          setCompletedSets((prevCompletedSets) => {
            const newCompletedSets = prevCompletedSets + 1;
            // Only reset if not at max sets
            if (newCompletedSets < MAX_SETS) {
              setStep(0);
              setTimeLeft(TIMER_SEQUENCE[0].minutes);
            }
            return newCompletedSets;
          });
          setCompletedSteps(0);
        } else {
          // Advance to next timer in current set
          setStep((prevStep) => {
            const nextStep = prevStep + 1;
            if (nextStep < TIMER_SEQUENCE.length) {
              setTimeLeft(TIMER_SEQUENCE[nextStep].minutes);
            }
            return nextStep;
          });
        }

        return newCompletedSteps;
      });
    }
  }, [timeLeft, isRunning]);

  // Get current timer configuration
  const currentTimer = TIMER_SEQUENCE[step];

  return {
    step,
    timeLeft,
    isRunning,
    completedSteps,
    completedSets,
    handleButtonClick,
    currentTimer,
  };
}
