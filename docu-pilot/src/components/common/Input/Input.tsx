"use client";

import type { ReactNode } from "react";
import Icon, { type IconName } from "../Icon/Icon";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  error?: string;
  hint?: string;
  readOnly?: boolean;
  disabled?: boolean;
  icon?: IconName;
  iconPosition?: "left" | "right";
  size?: InputSize;
  prefix?: ReactNode;
  suffix?: ReactNode;
  id?: string;
  name?: string;
  required?: boolean;
  className?: string;
  autoComplete?: string;
  autoFocus?: boolean;
}

const sizeClass: Record<InputSize, string> = {
  sm: "input-wrap input-wrap-sm",
  md: "input-wrap",
  lg: "input-wrap input-wrap-lg",
};

export default function Input({
  label,
  placeholder,
  type = "text",
  value,
  defaultValue,
  onChange,
  error,
  hint,
  readOnly = false,
  disabled = false,
  icon,
  iconPosition = "left",
  size = "md",
  prefix,
  suffix,
  id,
  name,
  required = false,
  className = "",
  autoComplete,
  autoFocus = false,
}: InputProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={`field${className ? ` ${className}` : ""}`}>
      {label && (
        <label className="field-label" htmlFor={inputId}>
          {label}
        </label>
      )}

      <div className={`${sizeClass[size]}${error ? " input-error" : ""}`}>
        {prefix}
        {icon && iconPosition === "left" && <Icon name={icon} size={16} />}
        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          readOnly={readOnly}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          onChange={(e) => onChange?.(e.target.value)}
        />
        {icon && iconPosition === "right" && <Icon name={icon} size={16} />}
        {suffix}
      </div>

      {error && (
        <span id={`${inputId}-error`} className="field-error">
          <Icon name="alert" size={13} />
          {error}
        </span>
      )}
      {!error && hint && (
        <span id={`${inputId}-hint`} style={{ fontSize: "var(--font-size-xs)", color: "var(--text-light)" }}>
          {hint}
        </span>
      )}
    </div>
  );
}
