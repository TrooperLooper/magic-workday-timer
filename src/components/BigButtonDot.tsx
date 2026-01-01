import React from "react";
import type { BigButtonDotProps } from "../types";
import { BUTTON_CONFIG, IMAGE_PATHS } from "../constants";
import { handleImageError } from "../imageErrorHandler";

export default function BigButtonDot({
  color = "red",
  isRunning,
  onClick,
  children,
}: BigButtonDotProps): React.ReactElement {
  const buttonImg =
    color === "red" ? IMAGE_PATHS.buttons.work : IMAGE_PATHS.buttons.break;

  const handleClick = (): void => {
    if (!isRunning) {
      onClick();
    }
  };

  return (
    <div
      className={`center-button${isRunning ? " pulse" : ""}${isRunning ? " disabled" : ""}`}
      onClick={handleClick}
    >
      <img
        src={buttonImg}
        alt="A big button that activates the timer"
        onError={handleImageError}
        style={{ width: BUTTON_CONFIG.WIDTH, height: BUTTON_CONFIG.HEIGHT }}
      />
      {children}
    </div>
  );
}
