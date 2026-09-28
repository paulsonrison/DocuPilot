"use client";

export type ProgressVariant = "primary" | "success" | "danger";
export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const fillVariantClass: Record<ProgressVariant, string> = {
  primary: "progress-fill",
  success: "progress-fill progress-fill-success",
  danger:  "progress-fill progress-fill-danger",
};

export default function ProgressBar({
  value,
  max = 100,
  variant = "primary",
  size = "md",
  showLabel = false,
  label,
  className = "",
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const sizeClass = size === "lg" ? "progress progress-lg" : "progress";

  return (
    <div className={className || undefined}>
      {(label || showLabel) && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
          fontSize: "var(--font-size-xs)",
          color: "var(--text-secondary)",
        }}>
          {label && <span>{label}</span>}
          {showLabel && <span style={{ color: "var(--primary)", fontWeight: 600 }}>{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        className={sizeClass}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <span
          className={fillVariantClass[variant]}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
