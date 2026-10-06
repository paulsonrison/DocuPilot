"use client";

import type { ReactNode } from "react";
import Icon, { type IconName } from "../Icon/Icon";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "primary-fg";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconPosition?: "left" | "right";
  full?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  full = false,
  disabled = false,
  loading = false,
  type = "button",
  onClick,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const variantClass = `btn-${variant === "primary-fg" ? "primary-fg" : variant}`;
  const sizeClass = `btn-${size}`;
  const fullClass = full ? " btn-full" : "";
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${sizeClass}${fullClass}${className ? ` ${className}` : ""}`}
      disabled={isDisabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
    >
      {icon && iconPosition === "left" && <Icon name={icon} size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />}
      <span>{children}</span>
      {icon && iconPosition === "right" && <Icon name={icon} size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />}
    </button>
  );
}
