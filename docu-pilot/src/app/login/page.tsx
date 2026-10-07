"use client";

import { Suspense } from "react";
import GuestGuard from "@/src/components/auth/GuestGuard";
import AuthPageFallback from "@/src/components/auth/AuthPageFallback";
import LoginForm from "@/src/features/auth/LoginForm";

export default function LoginPage() {
  return (
    <GuestGuard>
      <Suspense fallback={<AuthPageFallback label="Loading sign in" />}>
        <LoginForm />
      </Suspense>
    </GuestGuard>
  );
}
