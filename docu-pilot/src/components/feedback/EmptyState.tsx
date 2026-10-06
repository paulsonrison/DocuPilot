"use client";

import type { ReactNode } from "react";
import Icon from "@/src/components/common/Icon/Icon";
import Button from "@/src/components/common/Button/Button";

export default function EmptyState({
  title,
  text,
  actionLabel,
  onAction,
}: {
  title: string;
  text: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="empty-state">
      <span className="empty-state-icon">
        <Icon name="file" size={28} />
      </span>
      <div className="section-title">{title}</div>
      <p>{text}</p>
      {actionLabel && onAction && (
        <Button icon="upload" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
