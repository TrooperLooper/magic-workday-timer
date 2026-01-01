import React, { useEffect, useRef } from "react";
import { animate } from "motion";

/**
 * Animated Countdown Number Component
 * Uses a simple bouncy fade animation: fade out -> change -> bounce fade in
 */
export default function CountdownNumber({ value }) {
  const containerRef = useRef(null);

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

    // Step 2: After fade out, update the number and bounce in with scale
    setTimeout(() => {
      // Animate bounce scale and fade in
      animate(
        container,
        {
          opacity: 1,
          scale: [0.8, 1.15, 1], // Bouncy effect: small -> big -> normal
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
        willChange: "opacity, transform",
      }}
    >
      {value}
    </div>
  );
}
