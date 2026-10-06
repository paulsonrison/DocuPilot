"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/app/providers/AuthProvider";

export default function GuestGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { ready, isAuthenticated } = useAuth();

  useEffect(() => {
    if (ready && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [ready, isAuthenticated, router]);

  if (!ready || isAuthenticated) {
    return (
      <div className="app-loading" role="status" aria-live="polite" aria-label="Loading">
        <span className="app-loading-spinner" aria-hidden="true" />
      </div>
    );
  }

  return children;
}
