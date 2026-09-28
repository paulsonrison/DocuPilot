"use client";

export type AvatarSize = "sm" | "md" | "lg";
export type AvatarVariant = "dark" | "primary";

export interface AvatarProps {
  initials: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  src?: string;
  alt?: string;
  className?: string;
}

export default function Avatar({
  initials,
  size = "md",
  variant = "dark",
  src,
  alt,
  className = "",
}: AvatarProps) {
  const sizeClass = `avatar-${size}`;
  const variantClass = `avatar-${variant}`;

  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? initials}
        className={`avatar ${sizeClass}${className ? ` ${className}` : ""}`}
        style={{ objectFit: "cover" }}
      />
    );
  }

  return (
    <span className={`avatar ${sizeClass} ${variantClass}${className ? ` ${className}` : ""}`}>
      {initials.slice(0, 2).toUpperCase()}
    </span>
  );
}
