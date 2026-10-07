"use client";

export default function AuthPageFallback({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="app-loading" role="status" aria-live="polite" aria-label={label}>
      <span className="app-loading-spinner" aria-hidden="true" />
    </div>
  );
}
