"use client";

import { useRouter } from "next/navigation";
import Icon from "@/src/components/common/Icon/Icon";
import DocumentStatusBadge from "@/src/components/documents/DocumentStatusBadge";
import { formatRelativeUploaded } from "@/src/lib/utils/user";
import type { WorkspaceDocument } from "@/src/types/document";

export default function DocumentTable({ items }: { items: WorkspaceDocument[] }) {
  const router = useRouter();

  return (
    <div className="table-wrap">
      <div className="doc-table table-head">
        <span>Document</span>
        <span>Type</span>
        <span>Uploaded</span>
        <span>Status</span>
        <span />
      </div>
      {items.map((doc) => (
        <button
          key={doc.id}
          type="button"
          className="doc-table table-row"
          onClick={() => router.push(`/documents/${doc.id}`)}
        >
          <span className="doc-name">
            <span className="file-icon">
              <Icon name="file" size={20} />
            </span>
            <span>
              <strong>{doc.name}</strong>
              <small>{doc.sizeLabel}</small>
            </span>
          </span>
          <span className="muted-cell">{doc.type}</span>
          <span className="muted-cell">{formatRelativeUploaded(doc.uploadedAt)}</span>
          <span>
            <DocumentStatusBadge value={doc.status} />
          </span>
          <span className="icon-btn" aria-hidden="true">
            <Icon name="more" size={19} />
          </span>
        </button>
      ))}
    </div>
  );
}
