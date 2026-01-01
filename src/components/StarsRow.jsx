import React, { useEffect, useRef } from "react";
import { animate } from "motion";
import { MAX_SETS, IMAGE_PATHS } from "../constants";
import { handleImageError } from "../imageErrorHandler";

export default function StarsRow({ completedSets }) {
  const starRefs = useRef([]);
  const previousCompletedSetsRef = useRef(completedSets);

  useEffect(() => {
    // If a new star was completed, animate it
    if (completedSets > previousCompletedSetsRef.current) {
      const newStarIndex = completedSets - 1;
      const starElement = starRefs.current[newStarIndex];

      if (starElement) {
        // Animate: rotate 360 degrees with scale up then down
        // The image source is already changed (from next to done) via conditional
        // This animation is just the visual spin and scale feedback
        animate(
          starElement,
          {
            rotateZ: 360,
            scale: [1, 1.2, 1],
          },
          {
            duration: 0.8,
            ease: "easeOut",
          }
        );
      }
    }

    previousCompletedSetsRef.current = completedSets;
  }, [completedSets]);
  return (
    <div
      className="stars-row"
      role="progressbar"
      aria-label={`Workday progress: ${completedSets} of ${MAX_SETS} sets completed`}
      aria-valuenow={completedSets}
      aria-valuemin={0}
      aria-valuemax={MAX_SETS}
    >
      {[...Array(MAX_SETS)].map((_, i) => (
        <img
          key={i}
          ref={(el) => (starRefs.current[i] = el)}
          src={
            i < completedSets ? IMAGE_PATHS.stars.done : IMAGE_PATHS.stars.next
          }
          onError={handleImageError}
          alt={`${i < completedSets ? "Completed" : "Upcoming"} workday set ${
            i + 1
          }`}
          aria-hidden="true"
          style={{
            width: 35,
            height: 35,
            willChange: "transform",
            transformOrigin: "center center",
          }}
        />
      ))}
    </div>
  );
}
