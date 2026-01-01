import React from "react";
import { BUTTON_CONFIG, IMAGE_PATHS } from "../constants";
import { handleImageError } from "../imageErrorHandler";

export default function BigButtonDot({
  color = "red",
  isRunning,
  onClick,
  children,
}) {
  const buttonImg =
    color === "red" ? IMAGE_PATHS.buttons.work : IMAGE_PATHS.buttons.break;

  const handleClick = () => {
    if (!isRunning) {
      onClick();
    }
  };

  const ariaLabel = isRunning
    ? `Timer running. ${
        color === "red" ? "Work" : "Break"
      } session in progress.`
    : `Start ${
        color === "red" ? "work" : "break"
      } session. Press Space to start.`;

  return (
    <button
      className={`center-button${isRunning ? " pulse" : ""}${
        isRunning ? " disabled" : ""
      }`}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-pressed={isRunning}
      disabled={isRunning}
    >
      <img
        src={buttonImg}
        alt=""
        aria-hidden="true"
        onError={handleImageError}
        style={{ width: BUTTON_CONFIG.WIDTH, height: BUTTON_CONFIG.HEIGHT }}
      />
      {children}
    </button>
  );
}
