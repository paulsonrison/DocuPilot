"use client";

import Icon from "@/src/components/common/Icon/Icon";
import Button from "@/src/components/common/Button/Button";

export default function ErrorState({
  title = "Something went wrong",
  text = "We couldn't load this page. Please try again.",
  notFound = false,
  actionLabel,
  onAction,
}: {
  title?: string;
  text?: string;
  notFound?: boolean;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="error-state">
      <span className="error-state-icon">
        {notFound ? "404" : <Icon name="alert" size={27} />}
      </span>
      <div className="page-title">{title}</div>
      <p>{text}</p>
      {onAction && (
        <Button icon={notFound ? "grid" : "refresh"} onClick={onAction}>
          {actionLabel ?? (notFound ? "Back to dashboard" : "Try again")}
        </Button>
      )}
    </div>
  );
}
