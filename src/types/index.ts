/**
 * Shared TypeScript types and interfaces for Pomodoro Timer app
 */

/**
 * Timer duration classification
 */
export type TimerType = "long" | "short" | "medium";

/**
 * Individual timer configuration
 */
export interface TimerConfig {
  color: "red" | "green";
  minutes: number;
  label: string;
}

/**
 * Hook return type for usePomodoro
 */
export interface UsePomodoroReturn {
  step: number;
  timeLeft: number;
  isRunning: boolean;
  completedSteps: number;
  completedSets: number;
  handleButtonClick: () => void;
  currentTimer: TimerConfig;
}

/**
 * SVG circle configuration for minute dots
 */
export interface CircleConfig {
  NUM_DOTS: number;
  RADIUS: number;
  CENTER: number;
  DOT_SIZE: number;
  ROTATION_OFFSET: number;
}

/**
 * Button configuration
 */
export interface ButtonConfig {
  WIDTH: number;
  HEIGHT: number;
}

/**
 * Nested image path structure
 */
export interface ImagePaths {
  buttons: {
    work: string;
    break: string;
  };
  minuteDots: {
    left: string;
    expired: string;
    current: string;
  };
  pills: Record<string, { done: string; next: string }>;
  stars: {
    done: string;
    next: string;
  };
  audio: {
    chime: string;
  };
}

/**
 * Component prop types
 */
export interface MinutesCircleProps {
  totalSeconds: number;
  secondsLeft: number;
  isRunning: boolean;
  timerType: TimerType;
}

export interface BigButtonDotProps {
  color?: "red" | "green";
  isRunning: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export interface PillRowProps {
  completedSteps: number;
}

export interface StarsRowProps {
  completedSets: number;
}

export interface CountdownNumberProps {
  value: number;
}
