"use client";

import Badge from "@/src/components/common/Badge/Badge";
import type { DocumentStatus } from "@/src/types/document";

const map: Record<DocumentStatus, { variant: "success" | "info" | "danger"; icon: "check" | "clock" | "alert" }> = {
  Analyzed: { variant: "success", icon: "check" },
  Queued: { variant: "info", icon: "clock" },
  Failed: { variant: "danger", icon: "alert" },
};

export default function DocumentStatusBadge({ value }: { value: DocumentStatus }) {
  const config = map[value];
  return (
    <Badge variant={config.variant} icon={config.icon}>
      {value}
    </Badge>
  );
}
