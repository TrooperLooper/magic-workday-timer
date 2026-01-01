import React, { useEffect, useRef } from "react";
import { animate } from "motion";
import type { CountdownNumberProps } from "../types";

/**
 * Animated Countdown Number Component
 * Uses a simple bouncy fade animation: fade out -> change -> bounce fade in
 */
export default function CountdownNumber({
  value,
}: CountdownNumberProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Step 1: Fade out current number
    animate(
      container,
      {
        opacity: 0,
      },
      {
        duration: 0.15,
        ease: "easeOut",
      }
    );

    // Step 2: After fade out, fade back in (no scale to avoid positioning issues)
    setTimeout(() => {
      animate(
        container,
        {
          opacity: 1,
        },
        {
          duration: 0.35,
          ease: "easeOut",
        }
      );
    }, 150);
  }, [value]);

  return (
    <div
      ref={containerRef}
      className="countdown-number"
      style={{
        willChange: "opacity",
      }}
    >
      {value}
    </div>
  );
}
