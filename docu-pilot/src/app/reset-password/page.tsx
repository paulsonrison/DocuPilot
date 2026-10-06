"use client";

import { Suspense } from "react";
import AuthPageFallback from "@/src/components/auth/AuthPageFallback";
import ResetPasswordForm from "@/src/features/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<AuthPageFallback label="Loading reset form" />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
