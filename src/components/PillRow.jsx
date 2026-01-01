import React, { useEffect, useRef } from "react";
import { animate } from "motion";
import { TIMER_SEQUENCE, PILL_CONFIG, IMAGE_PATHS } from "../constants";
import { handleImageError } from "../imageErrorHandler";

const pillSvgs = [
  {
    done: IMAGE_PATHS.pills.workLong.done,
    next: IMAGE_PATHS.pills.workLong.next,
  },
  {
    done: IMAGE_PATHS.pills.breakShort.done,
    next: IMAGE_PATHS.pills.breakShort.next,
  },
  {
    done: IMAGE_PATHS.pills.workLong.done,
    next: IMAGE_PATHS.pills.workLong.next,
  },
  {
    done: IMAGE_PATHS.pills.breakShort.done,
    next: IMAGE_PATHS.pills.breakShort.next,
  },
  {
    done: IMAGE_PATHS.pills.workLong.done,
    next: IMAGE_PATHS.pills.workLong.next,
  },
  {
    done: IMAGE_PATHS.pills.breakShort.done,
    next: IMAGE_PATHS.pills.breakShort.next,
  },
  {
    done: IMAGE_PATHS.pills.workLong.done,
    next: IMAGE_PATHS.pills.workLong.next,
  },
  {
    done: IMAGE_PATHS.pills.breakLong.done,
    next: IMAGE_PATHS.pills.breakLong.next,
  },
];

export default function PillRow({ completedSteps }) {
  const pillRefs = useRef([]);
  const previousCompletedStepsRef = useRef(completedSteps);

  const isShortBreak = (index) => TIMER_SEQUENCE[index].minutes === 5;

  useEffect(() => {
    // When a new pill is completed, animate it with pop and fade
    if (completedSteps > previousCompletedStepsRef.current) {
      const newPillIndex = completedSteps - 1;
      const pillElement = pillRefs.current[newPillIndex];

      if (pillElement) {
        // Pop animation: image fill and scale happen simultaneously
        animate(
          pillElement,
          {
            scale: [1, 1.25, 1],
          },
          {
            duration: 0.3,
            ease: "easeOut",
          }
        );
      }
    }

    previousCompletedStepsRef.current = completedSteps;
  }, [completedSteps]);

  return (
    <div
      className="pill-row"
      role="progressbar"
      aria-label={`Timer steps progress: ${completedSteps} of ${TIMER_SEQUENCE.length} completed`}
      aria-valuenow={completedSteps}
      aria-valuemin={0}
      aria-valuemax={TIMER_SEQUENCE.length}
    >
      {pillSvgs.map((pill, i) => (
        <img
          key={i}
          ref={(el) => (pillRefs.current[i] = el)}
          src={i < completedSteps ? pill.done : pill.next}
          alt={`${i < completedSteps ? "Completed" : "Upcoming"} timer block ${
            i + 1
          }`}
          aria-hidden="true"
          onError={handleImageError}
          style={{
            width: isShortBreak(i)
              ? PILL_CONFIG.SHORT_BREAK_SIZE
              : PILL_CONFIG.STANDARD_SIZE,
            height: isShortBreak(i)
              ? PILL_CONFIG.SHORT_BREAK_SIZE
              : PILL_CONFIG.STANDARD_SIZE,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
