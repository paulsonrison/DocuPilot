"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/src/components/layout/PageHeader";
import Button from "@/src/components/common/Button/Button";
import Icon from "@/src/components/common/Icon/Icon";
import Alert from "@/src/components/common/Alert/Alert";
import ProgressBar from "@/src/components/common/ProgressBar/ProgressBar";
import { useDocuments } from "@/src/app/providers/DocumentsProvider";
import { documentApi } from "@/src/lib/api/document.api";
import {
  documentLimits,
  fileTypeLabel,
  formatFileSize,
  validateDocumentFile,
} from "@/src/services/document.service";
import { canSaveDocument, documentUploadError } from "@/src/validators/document.validators";

const checkLabels = [
  ["supportedType", "Supported file type"],
  ["withinSize", "Within size limit"],
  ["safeFilename", "Safe filename"],
  ["integrity", "File integrity verified"],
] as const;

export default function DocumentUploadForm() {
  const router = useRouter();
  const { addDocument } = useDocuments();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const [progress, setProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const checks = file ? validateDocumentFile(file) : null;

  function assignFile(next: File | undefined) {
    if (!next) return;
    setSavedId(null);
    setProgress(0);
    setError("");
    setFile(next);
  }

  async function save() {
    const validation = documentUploadError(file);
    if (validation || !file) {
      setError(validation ?? "Choose a document to upload.");
      return;
    }
    setSaving(true);
    setError("");
    setProgress(18);
    try {
      const timer = window.setInterval(() => {
        setProgress((value) => Math.min(90, value + 14));
      }, 120);
      await file.arrayBuffer();
      const created = addDocument(file);
      window.clearInterval(timer);
      setProgress(100);
      setSavedId(created.id);
    } catch (caught) {
      setProgress(0);
      setError(caught instanceof Error ? caught.message : "Unable to save this document.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Upload a document"
        description="Securely validate, process, and analyze your file with AI."
      />
      <div className="upload-layout">
        <section className="section-card upload-main">
          <div className="section-heading">
            <div>
              <div className="section-title">Choose a file</div>
              <p>Your file is validated before it is stored on this device.</p>
            </div>
            <span className="secure-label">
              <Icon name="shield" size={15} />
              Private & secure
            </span>
          </div>
          {!file ? (
            <div
              className={`dropzone${drag ? " dropzone-dragging" : ""}`}
              onDragOver={(event) => {
                event.preventDefault();
                setDrag(true);
              }}
              onDragLeave={() => setDrag(false)}
              onDrop={(event) => {
                event.preventDefault();
                setDrag(false);
                assignFile(event.dataTransfer.files[0]);
              }}
            >
              <input
                ref={inputRef}
                type="file"
                className="sr-only"
                accept={documentLimits.accept}
                onChange={(event) => assignFile(event.target.files?.[0])}
              />
              <span className="upload-icon">
                <Icon name="upload" size={27} />
              </span>
              <div className="drop-title">Drag and drop your document here</div>
              <p>or choose a file from your computer</p>
              <Button variant="secondary" onClick={() => inputRef.current?.click()}>
                Browse files
              </Button>
              <div className="file-limits">
                <span>PDF, DOCX, TXT</span>
                <i />
                <span>Maximum {documentLimits.maxSizeMB} MB</span>
              </div>
            </div>
          ) : (
            <>
              <div className="selected-file">
                <span className="file-icon file-icon-lg">
                  <Icon name="file" size={26} />
                </span>
                <span className="selected-meta">
                  <strong>{file.name}</strong>
                  <small>
                    {fileTypeLabel(file.name, file.type)} · {formatFileSize(file.size)}
                  </small>
                </span>
                {progress === 0 && (
                  <button
                    className="icon-btn danger-icon"
                    aria-label="Remove file"
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setError("");
                    }}
                  >
                    <Icon name="trash" size={18} />
                  </button>
                )}
                {progress > 0 && progress < 100 && <strong className="percent">{progress}%</strong>}
                {progress === 100 && (
                  <span className="complete-check">
                    <Icon name="check" size={17} />
                  </span>
                )}
              </div>
              {progress > 0 && <ProgressBar value={progress} className="progress" />}
              {checks && (
                <div className="validation">
                  <div className="section-title">Validation checks</div>
                  <div className="validation-grid">
                    {checkLabels.map(([key, label]) => (
                      <span key={key}>
                        <i className={checks[key] ? "" : "warn"}>
                          <Icon name={checks[key] ? "check" : "alert"} size={13} />
                        </i>
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {error && (
                <Alert variant="error" title="Unable to save document">
                  {error}
                </Alert>
              )}
              {savedId && (
                <Alert variant="success" title="Document saved on this device">
                  {documentApi.unavailableReason}
                </Alert>
              )}
            </>
          )}
          <div className="upload-actions">
            <Button variant="ghost" onClick={() => router.push("/documents")}>
              Cancel
            </Button>
            <Button
              icon="spark"
              disabled={!canSaveDocument(file) || saving}
              onClick={() => {
                if (savedId) {
                  router.push(`/documents/${savedId}`);
                  return;
                }
                void save();
              }}
            >
              {saving ? "Uploading document…" : savedId ? "View document" : "Upload & Analyze"}
            </Button>
          </div>
        </section>
        <aside className="privacy-card">
          <span className="privacy-icon">
            <Icon name="shield" size={22} />
          </span>
          <div className="section-title">Your documents stay yours</div>
          <p>Files are checked locally. Server storage and AI processing are not connected yet.</p>
          <div className="privacy-list">
            <span>
              <Icon name="check" size={15} />
              Secure validation
            </span>
            <span>
              <Icon name="check" size={15} />
              Private processing
            </span>
            <span>
              <Icon name="check" size={15} />
              Controlled AI access
            </span>
          </div>
          <small>AI-generated information should be verified before important decisions.</small>
        </aside>
      </div>
    </>
  );
}
