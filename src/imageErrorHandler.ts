/**
 * Image Error Handler
 * Graceful fallback for missing SVG files
 */

// Placeholder SVG for fallback (small circle)
const FALLBACK_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'%3E%3Ccircle cx='9' cy='9' r='8' fill='%23ccc' /%3E%3C/svg%3E";

/**
 * Handles image load errors with graceful fallback
 * @param event - Image error event
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>
): void {
  console.warn(`Failed to load image: ${event.currentTarget.src}`);
  event.currentTarget.src = FALLBACK_SVG;
  event.currentTarget.style.opacity = "0.5"; // Visual indicator that image failed
}

/**
 * Creates an img element with error handling
 * @param src - Image source path
 * @param alt - Alt text
 * @param style - Inline styles
 * @returns Props for img element
 */
export function createSafeImageProps(
  src: string,
  alt: string,
  style: React.CSSProperties = {}
): {
  src: string;
  alt: string;
  style: React.CSSProperties;
  onError: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onLoad: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
} {
  return {
    src,
    alt,
    style,
    onError: handleImageError,
    onLoad: (event): void => {
      // Reset opacity on successful load
      event.currentTarget.style.opacity = "1";
    },
  };
}
