"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/src/components/layout/AppShell";
import PageHeader from "@/src/components/layout/PageHeader";
import Button from "@/src/components/common/Button/Button";
import Icon, { type IconName } from "@/src/components/common/Icon/Icon";
import DocumentTable from "@/src/components/documents/DocumentTable";
import { useAuth } from "@/src/app/providers/AuthProvider";
import { useDocuments } from "@/src/app/providers/DocumentsProvider";
import { displayName, greetingForNow } from "@/src/lib/utils/user";

const steps: { n: string; title: string; text: string; icon: IconName }[] = [
  {
    n: "01",
    title: "Upload securely",
    text: "Files are checked for type, size, and integrity before they are stored.",
    icon: "upload",
  },
  {
    n: "02",
    title: "AI analyzes",
    text: "When the document API is available, DocuPilot will extract key information.",
    icon: "spark",
  },
  {
    n: "03",
    title: "Ask with confidence",
    text: "Answers will be grounded in your document once server analysis ships.",
    icon: "search",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { documents } = useDocuments();

  const summary = useMemo(() => {
    const queued = documents.filter((doc) => doc.status === "Queued").length;
    const failed = documents.filter((doc) => doc.status === "Failed").length;
    const analyzed = documents.filter((doc) => doc.status === "Analyzed").length;
    return [
      { label: "Total documents", value: String(documents.length), icon: "file" as const, tone: "neutral" },
      { label: "Queued", value: String(queued), icon: "clock" as const, tone: "info" },
      { label: "Analyzed", value: String(analyzed), icon: "check" as const, tone: "success" },
      { label: "Failed", value: String(failed), icon: "alert" as const, tone: "danger" },
    ];
  }, [documents]);

  return (
    <AppShell>
      <PageHeader
        title={`${greetingForNow()}, ${displayName(user)}`}
        description="Manage and analyze your documents with AI."
        action={
          <Button icon="upload" onClick={() => router.push("/documents/upload")}>
            Upload document
          </Button>
        }
      />
      <div className="summary-grid">
        {summary.map((item) => (
          <div className="stat-card" key={item.label}>
            <span className={`stat-icon stat-icon-${item.tone}`}>
              <Icon name={item.icon} size={20} />
            </span>
            <span>
              <small>{item.label}</small>
              <strong>{item.value}</strong>
            </span>
          </div>
        ))}
      </div>
      <section className="section-card">
        <div className="section-heading">
          <div>
            <div className="section-title">Recent documents</div>
            <p>Your latest uploads stored on this device.</p>
          </div>
          <Button variant="ghost" icon="arrow" iconPosition="right" onClick={() => router.push("/documents")}>
            View all
          </Button>
        </div>
        {documents.length ? (
          <DocumentTable items={documents.slice(0, 4)} />
        ) : (
          <div className="empty-state">
            <span className="empty-state-icon">
              <Icon name="file" size={28} />
            </span>
            <div className="section-title">No documents yet</div>
            <p>Upload a PDF, DOCX, or TXT file to start your workspace.</p>
            <Button icon="upload" onClick={() => router.push("/documents/upload")}>
              Upload document
            </Button>
          </div>
        )}
      </section>
      <section className="workflow">
        <div className="section-heading">
          <div>
            <div className="section-title">How DocuPilot works</div>
            <p>A simple, secure workflow from upload to answers.</p>
          </div>
        </div>
        <div className="steps">
          {steps.map((step) => (
            <div className="step" key={step.n}>
              <span className="step-icon">
                <Icon name={step.icon} />
              </span>
              <span className="step-number">{step.n}</span>
              <strong>{step.title}</strong>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
