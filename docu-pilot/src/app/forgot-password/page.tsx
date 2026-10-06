"use client";

import GuestGuard from "@/src/components/auth/GuestGuard";
import ForgotPasswordForm from "@/src/features/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <GuestGuard>
      <ForgotPasswordForm />
    </GuestGuard>
  );
}
