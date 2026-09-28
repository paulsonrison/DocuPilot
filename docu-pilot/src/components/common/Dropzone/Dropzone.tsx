"use client";

import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import Icon from "../Icon/Icon";

export interface DropzoneProps {
  accept?: string;
  maxSizeMB?: number;
  label?: string;
  sublabel?: string;
  onFile?: (file: File) => void;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function Dropzone({
  accept = ".pdf,.doc,.docx",
  maxSizeMB = 50,
  label = "Drop your file here or browse",
  sublabel = "PDF, DOC, DOCX supported",
  onFile,
  className = "",
}: DropzoneProps) {
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState<File | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File exceeds ${maxSizeMB} MB limit.`);
      return;
    }
    setError("");
    setSelected(file);
    onFile?.(file);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className={className || undefined}>
      <div
        className={`dropzone${dragging ? " dropzone-dragging" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="File upload area"
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          style={{ display: "none" }}
          onChange={onInputChange}
        />
        <div style={{
          width: 54, height: 54, borderRadius: 12,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--primary)", background: "var(--primary-soft)", marginBottom: 16,
        }}>
          <Icon name="upload" size={26} />
        </div>
        <strong style={{ fontSize: "var(--font-size-drop)" }}>{label}</strong>
        <p style={{ fontSize: "var(--font-size-small)", margin: "6px 0 16px" }}>{sublabel}</p>
        <div style={{
          display: "flex", alignItems: "center", gap: 9,
          color: "var(--text-light)", fontSize: "var(--font-size-2xs)", marginTop: 18,
        }}>
          <span>{accept.toUpperCase().replace(/\./g, "").replace(/,/g, " · ")}</span>
          <i style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--border-strong)", display: "inline-block" }} />
          <span>Max {maxSizeMB} MB</span>
        </div>
      </div>

      {selected && (
        <div style={{
          marginTop: 12, padding: 17, border: "1px solid var(--border)",
          borderRadius: "var(--radius)", display: "flex", alignItems: "center", gap: 13,
        }}>
          <div style={{
            width: 46, height: 50, borderRadius: 8,
            color: "var(--primary)", background: "var(--primary-soft)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="file" size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <strong style={{ display: "block", fontSize: "var(--font-size-small)" }}>{selected.name}</strong>
            <small style={{ color: "var(--text-light)", fontSize: "var(--font-size-xs)", marginTop: 4, display: "block" }}>
              {formatBytes(selected.size)}
            </small>
          </div>
          <button
            type="button"
            className="icon-btn"
            aria-label="Remove file"
            onClick={(e) => { e.stopPropagation(); setSelected(null); setError(""); }}
          >
            <Icon name="close" size={15} />
          </button>
        </div>
      )}

      {error && (
        <div style={{
          marginTop: 8, color: "var(--danger)", fontSize: "var(--font-size-small)",
          display: "flex", gap: 5, alignItems: "center",
        }}>
          <Icon name="alert" size={13} />
          {error}
        </div>
      )}
    </div>
  );
}
