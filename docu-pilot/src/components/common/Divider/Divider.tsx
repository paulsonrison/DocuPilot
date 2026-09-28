"use client";

import type { ReactNode } from "react";

export interface DividerProps {
  children?: ReactNode;
  className?: string;
}

export default function Divider({ children, className = "" }: DividerProps) {
  return (
    <div className={`divider${className ? ` ${className}` : ""}`}>
      {children && <span>{children}</span>}
    </div>
  );
}
