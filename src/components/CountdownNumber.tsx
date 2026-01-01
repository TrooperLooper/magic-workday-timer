import React from "react";
import type { CountdownNumberProps } from "../types";

export default function CountdownNumber({
  value,
}: CountdownNumberProps): React.ReactElement {
  return <div className="countdown-number">{value}</div>;
}
