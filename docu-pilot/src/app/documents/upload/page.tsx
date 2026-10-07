"use client";

import AppShell from "@/src/components/layout/AppShell";
import DocumentUploadForm from "@/src/features/documents/DocumentUploadForm";

export default function UploadPage() {
  return (
    <AppShell>
      <DocumentUploadForm />
    </AppShell>
  );
}
