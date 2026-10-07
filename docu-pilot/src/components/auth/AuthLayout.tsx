"use client";

import type { ReactNode } from "react";
import AuthSidePanel from "@/src/components/auth/AuthSidePanel";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="auth-layout">
      <AuthSidePanel />
      <section className="auth-panel">{children}</section>
    </main>
  );
}
