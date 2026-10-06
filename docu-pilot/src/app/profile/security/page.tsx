"use client";

import AppShell from "@/src/components/layout/AppShell";
import ChangePasswordForm from "@/src/features/profile/ChangePasswordForm";

export default function SecurityPage() {
  return (
    <AppShell>
      <ChangePasswordForm />
    </AppShell>
  );
}
