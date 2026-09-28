"use client";

import type { ReactNode } from "react";
import Icon, { type IconName } from "../Icon/Icon";

export type BadgeVariant = "primary" | "success" | "info" | "warning" | "danger" | "neutral";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  icon?: IconName;
  className?: string;
}

export default function Badge({
  children,
  variant = "neutral",
  icon,
  className = "",
}: BadgeProps) {
  return (
    <span className={`badge badge-${variant}${className ? ` ${className}` : ""}`}>
      {icon && <Icon name={icon} size={11} />}
      {children}
    </span>
  );
}
