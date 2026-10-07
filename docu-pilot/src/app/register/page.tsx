"use client";

import GuestGuard from "@/src/components/auth/GuestGuard";
import RegisterForm from "@/src/features/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <GuestGuard>
      <RegisterForm />
    </GuestGuard>
  );
}
