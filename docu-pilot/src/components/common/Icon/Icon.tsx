"use client";

import type { ReactNode } from "react";

export type IconName =
  | "logo"
  | "grid"
  | "file"
  | "upload"
  | "user"
  | "shield"
  | "bell"
  | "search"
  | "plus"
  | "arrow"
  | "more"
  | "spark"
  | "check"
  | "clock"
  | "alert"
  | "trash"
  | "download"
  | "eye"
  | "menu"
  | "close"
  | "logout"
  | "copy"
  | "refresh"
  | "lock"
  | "chevron"
  | "star"
  | "info"
  | "send"
  | "edit"
  | "filter";

const paths: Record<IconName, ReactNode> = {
  logo:     <><path d="M8 3.5h8l4 4v13H8z" /><path d="M16 3.5v4h4M11.5 12h5M11.5 16h3.5" /></>,
  grid:     <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  file:     <><path d="M6 2.5h8l4 4v15H6z" /><path d="M14 2.5v4h4M9 11h6M9 15h6M9 19h4" /></>,
  upload:   <><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 15v5h16v-5" /></>,
  user:     <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0116 0" /></>,
  shield:   <><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" /><path d="M9 12l2 2 4-5" /></>,
  bell:     <><path d="M18 9a6 6 0 00-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  search:   <><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></>,
  plus:     <path d="M12 5v14M5 12h14" />,
  arrow:    <><path d="M5 12h14M14 7l5 5-5 5" /></>,
  more:     <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
  spark:    <><path d="M12 2l1.4 5.1L18 9l-4.6 1.9L12 16l-1.4-5.1L6 9l4.6-1.9z" /><path d="M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7z" /></>,
  check:    <path d="M5 12l4 4L19 6" />,
  clock:    <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  alert:    <><path d="M12 3L2.5 20h19z" /><path d="M12 9v5M12 17.5v.1" /></>,
  trash:    <><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6" /></>,
  download: <><path d="M12 3v12M7 10l5 5 5-5" /><path d="M4 19v2h16v-2" /></>,
  eye:      <><path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z" /><circle cx="12" cy="12" r="2.5" /></>,
  menu:     <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  close:    <path d="M5 5l14 14M19 5L5 19" />,
  logout:   <><path d="M10 4H4v16h6M14 8l4 4-4 4M8 12h10" /></>,
  copy:     <><rect x="8" y="8" width="11" height="12" rx="2" /><path d="M16 8V4H5a2 2 0 00-2 2v10h5" /></>,
  refresh:  <><path d="M20 7v5h-5M4 17v-5h5" /><path d="M6.1 8a7 7 0 0111.7-2l2.2 2M17.9 16a7 7 0 01-11.7 2L4 16" /></>,
  lock:     <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></>,
  chevron:  <path d="M9 6l6 6-6 6" />,
  star:     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  info:     <><circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16v.1" /></>,
  send:     <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />,
  edit:     <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></>,
  filter:   <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />,
};

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export default function Icon({ name, size = 20, className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={`icon${className ? ` ${className}` : ""}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
