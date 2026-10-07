"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/src/components/layout/AppShell";
import PageHeader from "@/src/components/layout/PageHeader";
import Button from "@/src/components/common/Button/Button";
import SearchBox from "@/src/components/common/SearchBox/SearchBox";
import Tabs from "@/src/components/common/Tabs/Tabs";
import DocumentTable from "@/src/components/documents/DocumentTable";
import EmptyState from "@/src/components/feedback/EmptyState";
import Alert from "@/src/components/common/Alert/Alert";
import { useDocuments } from "@/src/app/providers/DocumentsProvider";
import { documentApi } from "@/src/lib/api/document.api";
import type { DocumentFilter } from "@/src/types/document";

export default function DocumentsPage() {
  const router = useRouter();
  const { documents } = useDocuments();
  const [filter, setFilter] = useState<DocumentFilter>("All");
  const [query, setQuery] = useState("");

  const counts = useMemo(
    () => ({
      Queued: documents.filter((doc) => doc.status === "Queued").length,
      Analyzed: documents.filter((doc) => doc.status === "Analyzed").length,
      Failed: documents.filter((doc) => doc.status === "Failed").length,
    }),
    [documents],
  );

  const filtered = documents.filter((doc) => {
    const matchesFilter = filter === "All" || doc.status === filter;
    const matchesQuery = doc.name.toLowerCase().includes(query.trim().toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <AppShell>
      <PageHeader
        title="Documents"
        description="Search, review, and manage your uploaded documents."
        action={
          <Button icon="upload" onClick={() => router.push("/documents/upload")}>
            Upload document
          </Button>
        }
      />
      <Alert variant="info" title="Local workspace">
        {documentApi.unavailableReason}
      </Alert>
      <section className="section-card">
        <div className="document-tools">
          <SearchBox
            value={query}
            onChange={setQuery}
            onClear={() => setQuery("")}
            placeholder="Search documents..."
            width={290}
          />
          <Tabs
            variant="pill"
            activeTab={filter}
            onChange={(key) => setFilter(key as DocumentFilter)}
            items={[
              { key: "All", label: "All" },
              { key: "Queued", label: "Queued", count: counts.Queued },
              { key: "Analyzed", label: "Analyzed", count: counts.Analyzed },
              { key: "Failed", label: "Failed", count: counts.Failed },
            ]}
          />
        </div>
        {filtered.length ? (
          <DocumentTable items={filtered} />
        ) : (
          <EmptyState
            title="No documents found"
            text="Try a different search, or upload a new document."
            actionLabel="Upload document"
            onAction={() => router.push("/documents/upload")}
          />
        )}
        <div className="table-footer">
          Showing {filtered.length} of {documents.length} documents
        </div>
      </section>
    </AppShell>
  );
}
