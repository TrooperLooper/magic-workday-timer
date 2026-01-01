/**
 * Magic Timer - Utility Functions
 * Helper functions used across the application
 */

import type { TimerType } from "./types";
import { TIMER_TYPES } from "./constants";

/**
 * Determines the timer type based on duration in minutes
 * @param minutes - Duration in minutes (5, 20, or 25)
 * @returns Timer type: "long" (25min), "short" (5min), or "medium" (20min)
 */
export function getTimerType(minutes: number): TimerType {
  if (minutes === 25) {
    return TIMER_TYPES.LONG as TimerType;
  } else if (minutes === 5) {
    return TIMER_TYPES.SHORT as TimerType;
  } else if (minutes === 20) {
    return TIMER_TYPES.MEDIUM as TimerType;
  }
  // Fallback for custom timer lengths
  return TIMER_TYPES.LONG as TimerType;
}

/**
 * Safely plays audio with comprehensive error handling
 * Handles network errors, browser autoplay restrictions, and missing files
 * @param audioPath - Path to audio file (e.g., "/chime.mp3")
 */
export function playAudio(audioPath: string): void {
  try {
    const audio = new Audio(audioPath);

    // Attempt to play - don't wait for it
    const playPromise = audio.play();

    // Handle promise if browser supports it
    if (playPromise !== undefined && typeof playPromise.catch === "function") {
      playPromise.catch((error: DOMException) => {
        if (error.name === "NotAllowedError") {
          console.warn("Audio playback blocked by browser autoplay policy");
        } else if (error.name === "NotSupportedError") {
          console.warn(`Audio format not supported: ${audioPath}`);
        } else {
          console.warn(`Failed to play audio: ${error.message}`);
        }
      });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.warn(`Error creating audio element: ${errorMessage}`);
  }
}

/**
 * Checks if all sets (workday) is complete
 * @param completedSets - Number of completed sets
 * @param maxSets - Maximum number of sets for a full workday
 * @returns True if workday is complete
 */
export function isWorkdayComplete(
  completedSets: number,
  maxSets: number
): boolean {
  return completedSets >= maxSets;
}

/**
 * Calculates total minutes elapsed for a workday
 * Each set is approximately 2 hours 15 minutes (135 minutes)
 * @param completedSets - Number of completed sets
 * @returns Total minutes elapsed
 */
export function calculateElapsedMinutes(completedSets: number): number {
  const MINUTES_PER_SET = 135; // 25+5+25+5+25+5+25+20 = 135 minutes
  return completedSets * MINUTES_PER_SET;
}

/**
 * Formats elapsed time into readable format
 * @param minutes - Total minutes
 * @returns Formatted time (e.g., "2h 15m")
 */
export function formatElapsedTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins}m`;
  }

  return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
}

/**
 * Determines if a timer is a work or break session
 * @param color - Timer color ("red" for work, "green" for break)
 * @returns True if timer is a work session
 */
export function isWorkSession(color: string): boolean {
  return color === "red";
}

/**
 * Determines if a timer is a break session
 * @param color - Timer color
 * @returns True if timer is a break session
 */
export function isBreakSession(color: string): boolean {
  return color === "green";
}
