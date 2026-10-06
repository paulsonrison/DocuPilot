"use client";

import type { ReactNode } from "react";
import Icon, { type IconName } from "../Icon/Icon";

export type AlertVariant = "error" | "success" | "warning" | "info";

const defaultIcons: Record<AlertVariant, IconName> = {
  error:   "alert",
  success: "check",
  warning: "alert",
  info:    "info",
};

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  icon?: IconName;
  className?: string;
}

export default function Alert({
  variant = "info",
  title,
  children,
  icon,
  className = "",
}: AlertProps) {
  const resolvedIcon = icon ?? defaultIcons[variant];

  return (
    <div
      role="alert"
      className={`alert alert-${variant}${className ? ` ${className}` : ""}`}
    >
      <Icon name={resolvedIcon} size={18} />
      <span>
        {title && <strong>{title}</strong>}
        {children}
      </span>
    </div>
  );
}
