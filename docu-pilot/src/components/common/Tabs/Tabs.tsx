"use client";

import { useState, type ReactNode } from "react";
import Icon, { type IconName } from "../Icon/Icon";

export type TabsVariant = "underline" | "pill";

export interface TabItem {
  key: string;
  label: string;
  icon?: IconName;
  count?: number;
  content?: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  variant?: TabsVariant;
  defaultTab?: string;
  activeTab?: string;
  onChange?: (key: string) => void;
  className?: string;
}

export default function Tabs({
  items,
  variant = "underline",
  defaultTab,
  activeTab: controlledActive,
  onChange,
  className = "",
}: TabsProps) {
  const [internalActive, setInternalActive] = useState(defaultTab ?? items[0]?.key ?? "");
  const active = controlledActive ?? internalActive;

  function handleSelect(key: string) {
    setInternalActive(key);
    onChange?.(key);
  }

  const activeItem = items.find((t) => t.key === active);

  return (
    <div className={className || undefined}>
      <div className={`tabs-${variant}`} role="tablist">
        {items.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active === tab.key}
            className={active === tab.key ? "tab-active" : ""}
            onClick={() => handleSelect(tab.key)}
          >
            {tab.icon && <Icon name={tab.icon} size={14} />}
            {tab.label}
            {tab.count !== undefined && (
              <span style={{ color: "var(--text-light)" }}>{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {activeItem?.content && (
        <div style={{ paddingTop: 4 }}>{activeItem.content}</div>
      )}
    </div>
  );
}
