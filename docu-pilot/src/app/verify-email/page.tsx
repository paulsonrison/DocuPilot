"use client";

import { Suspense } from "react";
import AuthPageFallback from "@/src/components/auth/AuthPageFallback";
import VerifyEmailPanel from "@/src/features/auth/VerifyEmailPanel";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<AuthPageFallback label="Verifying your email…" />}>
      <VerifyEmailPanel />
    </Suspense>
  );
}
