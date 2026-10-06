"use client";

import { AuthProvider } from "@/src/app/providers/AuthProvider";
import { DocumentsProvider } from "@/src/app/providers/DocumentsProvider";
import type { ReactNode } from "react";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <DocumentsProvider>{children}</DocumentsProvider>
    </AuthProvider>
  );
}
