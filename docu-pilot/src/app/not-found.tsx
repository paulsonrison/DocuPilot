"use client";

import { useRouter } from "next/navigation";
import ErrorState from "@/src/components/feedback/ErrorState";
import { useAuth } from "@/src/app/providers/AuthProvider";

export default function NotFound() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  return (
    <ErrorState
      notFound
      title="Page not found"
      text="The page you're looking for doesn't exist or may have moved."
      actionLabel={isAuthenticated ? "Back to dashboard" : "Go to sign in"}
      onAction={() => router.push(isAuthenticated ? "/dashboard" : "/login")}
    />
  );
}
