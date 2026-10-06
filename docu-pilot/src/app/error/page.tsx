"use client";

import { useRouter } from "next/navigation";
import AppShell from "@/src/components/layout/AppShell";
import ErrorState from "@/src/components/feedback/ErrorState";

export default function ErrorPage() {
  const router = useRouter();
  return (
    <AppShell>
      <ErrorState
        title="Something went wrong"
        text="We couldn't load this page. Please try again."
        onAction={() => router.push("/dashboard")}
        actionLabel="Back to dashboard"
      />
    </AppShell>
  );
}
