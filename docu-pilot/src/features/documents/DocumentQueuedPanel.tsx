"use client";

import Icon from "@/src/components/common/Icon/Icon";

const steps = [
  { label: "Upload validated", state: "complete" as const },
  { label: "Stored on this device", state: "complete" as const },
  { label: "Waiting for document API", state: "active" as const },
  { label: "Text extracted", state: "" as const },
  { label: "Generating AI analysis", state: "" as const },
  { label: "Ready", state: "" as const },
];

export default function DocumentQueuedPanel({ name }: { name: string }) {
  return (
    <div className="processing-card">
      <span className="processing-icon">
        <Icon name="spark" size={25} />
      </span>
      <div className="page-title">Document saved, analysis not started</div>
      <p>
        {name} passed client-side validation and is stored on this device. OCR, AI analysis, and
        searchable knowledge are waiting for document APIs on the server.
      </p>
      <div className="processing-progress">
        <span style={{ width: "28%" }} />
      </div>
      <div className="processing-steps">
        {steps.map((step) => (
          <div className={step.state} key={step.label}>
            <span>
              {step.state === "complete" ? (
                <Icon name="check" size={14} />
              ) : step.state === "active" ? (
                <i />
              ) : null}
            </span>
            <strong>{step.label}</strong>
            {step.state === "active" && <small>Blocked</small>}
          </div>
        ))}
      </div>
      <div className="processing-note">
        <Icon name="clock" size={16} />
        This is not a simulated analysis. Processing will begin when the backend exposes document
        endpoints.
      </div>
    </div>
  );
}
