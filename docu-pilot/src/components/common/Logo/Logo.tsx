"use client";

import Icon from "../Icon/Icon";

export type LogoSize = "sm" | "md" | "lg";

export interface LogoProps {
  compact?: boolean;
  size?: LogoSize;
  light?: boolean;
  className?: string;
}

const markSizes: Record<LogoSize, number> = { sm: 28, md: 36, lg: 44 };
const iconSizes: Record<LogoSize, number> = { sm: 18, md: 23, lg: 28 };

export default function Logo({
  compact = false,
  size = "md",
  light = false,
  className = "",
}: LogoProps) {
  const markClass = size === "md" ? "brand-mark" : `brand-mark brand-mark-${size}`;

  return (
    <div
      className={`brand${className ? ` ${className}` : ""}`}
      style={light ? { color: "#ffffff" } : undefined}
    >
      <span
        className={markClass}
        style={{ width: markSizes[size], height: markSizes[size] }}
      >
        <Icon name="logo" size={iconSizes[size]} />
      </span>
      {!compact && <span>DocuPilot</span>}
    </div>
  );
}
