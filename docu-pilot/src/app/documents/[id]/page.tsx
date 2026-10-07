"use client";

import { useParams } from "next/navigation";
import AppShell from "@/src/components/layout/AppShell";
import DocumentDetails from "@/src/features/documents/DocumentDetails";

export default function DocumentDetailsPage() {
  const params = useParams<{ id: string }>();
  return (
    <AppShell>
      <DocumentDetails id={params.id} />
    </AppShell>
  );
}
