"use client";

import Icon from "../Icon/Icon";

export interface SearchBoxProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  width?: number | string;
  className?: string;
}

export default function SearchBox({
  value,
  defaultValue,
  placeholder = "Search…",
  onChange,
  onClear,
  width,
  className = "",
}: SearchBoxProps) {
  return (
    <div
      className={`search-box${className ? ` ${className}` : ""}`}
      style={width ? { width } : undefined}
    >
      <Icon name="search" size={16} />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        aria-label={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {onClear && value && (
        <button
          type="button"
          className="icon-btn"
          style={{ width: 22, height: 22 }}
          aria-label="Clear search"
          onClick={onClear}
        >
          <Icon name="close" size={13} />
        </button>
      )}
    </div>
  );
}
