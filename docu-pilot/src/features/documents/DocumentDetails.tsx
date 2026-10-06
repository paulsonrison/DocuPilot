"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/src/components/layout/PageHeader";
import Button from "@/src/components/common/Button/Button";
import Icon from "@/src/components/common/Icon/Icon";
import AuthPageFallback from "@/src/components/auth/AuthPageFallback";
import Tabs from "@/src/components/common/Tabs/Tabs";
import Modal from "@/src/components/common/Modal/Modal";
import Alert from "@/src/components/common/Alert/Alert";
import ErrorState from "@/src/components/feedback/ErrorState";
import DocumentStatusBadge from "@/src/components/documents/DocumentStatusBadge";
import DocumentQueuedPanel from "@/src/features/documents/DocumentQueuedPanel";
import DocumentAskPanel from "@/src/features/documents/DocumentAskPanel";
import { useDocuments } from "@/src/app/providers/DocumentsProvider";
import { documentApi } from "@/src/lib/api/document.api";
import { formatRelativeUploaded } from "@/src/lib/utils/user";

export default function DocumentDetails({ id }: { id: string }) {
  const router = useRouter();
  const { ready, getDocument, removeDocument, getFile } = useDocuments();
  const document = getDocument(id);
  const [tab, setTab] = useState("analysis");
  const [deleting, setDeleting] = useState(false);
  const file = document ? getFile(document.id) : undefined;

  if (!ready) {
    return <AuthPageFallback label="Loading document" />;
  }

  if (!document) {
    return (
      <ErrorState
        title="Document not found"
        text="This document is not in your local workspace."
        onAction={() => router.push("/documents")}
        actionLabel="Back to documents"
      />
    );
  }

  function download() {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const link = window.document.createElement("a");
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (document.status === "Queued") {
    return (
      <>
        <PageHeader
          title={document.name}
          description={`Uploaded ${formatRelativeUploaded(document.uploadedAt).toLowerCase()}`}
          action={<DocumentStatusBadge value={document.status} />}
        />
        <DocumentQueuedPanel name={document.name} />
        <div className="header-actions" style={{ justifyContent: "flex-end", marginTop: 16 }}>
          <Button variant="ghost" icon="trash" onClick={() => setDeleting(true)}>
            Delete
          </Button>
        </div>
        <DeleteModal
          open={deleting}
          onClose={() => setDeleting(false)}
          onConfirm={() => {
            removeDocument(document.id);
            router.push("/documents");
          }}
        />
      </>
    );
  }

  if (document.status === "Failed") {
    return (
      <>
        <PageHeader
          title={document.name}
          description={`Uploaded ${formatRelativeUploaded(document.uploadedAt)}`}
        />
        <ErrorState
          title="Analysis failed"
          text="We couldn't process this document. The file may be damaged, or the document API is not available yet."
          onAction={() => router.push("/documents/upload")}
          actionLabel="Upload another document"
        />
        <DeleteModal
          open={deleting}
          onClose={() => setDeleting(false)}
          onConfirm={() => {
            removeDocument(document.id);
            router.push("/documents");
          }}
        />
      </>
    );
  }

  return (
    <>
      <div className="detail-header">
        <button type="button" className="back-link" onClick={() => router.push("/documents")}>
          <span>Documents</span>
          <Icon name="chevron" size={14} />
          <strong>{document.name}</strong>
        </button>
        <div className="page-header">
          <div>
            <div className="doc-title-row">
              <span className="detail-file">
                <Icon name="file" size={24} />
              </span>
              <div>
                <div className="page-title">{document.name}</div>
                <span className="detail-sub">
                  {document.sizeLabel} · Uploaded {formatRelativeUploaded(document.uploadedAt).toLowerCase()}
                </span>
              </div>
              <DocumentStatusBadge value={document.status} />
            </div>
          </div>
          <div className="header-actions">
            <Button variant="secondary" icon="download" disabled={!file} onClick={download}>
              Download
            </Button>
            <Button variant="ghost" icon="trash" onClick={() => setDeleting(true)}>
              Delete
            </Button>
            <Button icon="spark" onClick={() => setTab("ask")}>
              Ask AI
            </Button>
          </div>
        </div>
      </div>
      <Tabs
        variant="underline"
        activeTab={tab}
        onChange={setTab}
        items={[
          { key: "analysis", label: "AI analysis" },
          { key: "ask", label: "Ask AI" },
        ]}
      />
      {tab === "analysis" ? (
        <div className="analysis-layout">
          <aside className="info-card">
            <div className="section-title">Document information</div>
            {[
              ["File type", `${document.type} document`],
              ["File size", document.sizeLabel],
              ["Uploaded", formatRelativeUploaded(document.uploadedAt)],
              ["Status", document.status],
              ["Storage", "This device"],
            ].map(([key, value]) => (
              <div className="info-row" key={key}>
                <span>{key}</span>
                <strong>{value}</strong>
              </div>
            ))}
            <div className="ownership">
              <Icon name="lock" size={15} />
              Only this signed-in account can see this local record
            </div>
          </aside>
          <div className="analysis-content">
            <div className="analysis-banner">
              <span>
                <Icon name="spark" size={21} />
              </span>
              <div>
                <strong>AI analysis is not available yet</strong>
                <p>{documentApi.unavailableReason}</p>
              </div>
            </div>
            <section className="analysis-section">
              <span className="section-kicker">Summary</span>
              <div className="section-title">Waiting for document processing</div>
              <p>
                This file passed client-side validation and was stored locally. OCR, structured
                analysis, and RAG answers will appear here when the backend exposes those APIs.
              </p>
            </section>
            <Alert variant="info" title="No generated results">
              Placeholder document insights are intentionally omitted so this screen never pretends
              analysis has run.
            </Alert>
          </div>
        </div>
      ) : (
        <DocumentAskPanel name={document.name} />
      )}
      <DeleteModal
        open={deleting}
        onClose={() => setDeleting(false)}
        onConfirm={() => {
          removeDocument(document.id);
          router.push("/documents");
        }}
      />
    </>
  );
}

function DeleteModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete document?"
      description="This will permanently remove the local document record. This action cannot be undone."
      icon="trash"
      iconVariant="danger"
      actions={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete document
          </Button>
        </>
      }
    />
  );
}
