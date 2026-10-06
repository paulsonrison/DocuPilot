"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthLayout from "@/src/components/auth/AuthLayout";
import AuthHeader from "@/src/components/auth/AuthHeader";
import Button from "@/src/components/common/Button/Button";
import Input from "@/src/components/common/Input/Input";
import Alert from "@/src/components/common/Alert/Alert";
import Icon from "@/src/components/common/Icon/Icon";
import { authService } from "@/src/services/auth.service";
import { ApiError } from "@/src/types/api";
import { validateEmailOnly } from "@/src/validators/auth.validators";

export default function VerifyEmailPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    token ? "loading" : "idle",
  );
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [resendState, setResendState] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    setStatus("loading");
    authService
      .verifyEmail(token)
      .then(() => {
        if (!cancelled) {
          setStatus("success");
          setMessage("Email verified successfully");
        }
      })
      .catch((caught) => {
        if (cancelled) return;
        setStatus("error");
        setMessage(
          caught instanceof ApiError
            ? caught.message
            : "We could not verify this email. Request a new link.",
        );
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  async function resend(event: React.FormEvent) {
    event.preventDefault();
    const validation = validateEmailOnly(email);
    if (validation) {
      setMessage(validation);
      setStatus("error");
      return;
    }
    setResendState("sending");
    try {
      await authService.resendVerification(email.trim());
      setResendState("sent");
      setStatus("idle");
      setMessage("Verification email sent successfully");
    } catch (caught) {
      setResendState("idle");
      setStatus("error");
      setMessage(caught instanceof ApiError ? caught.message : "Unable to send verification email.");
    }
  }

  return (
    <AuthLayout>
      <div className="auth-card">
        {status === "loading" && (
          <>
            <AuthHeader title="Verifying your email…" text="Please wait while we confirm your address." />
            <p role="status">Verifying your email…</p>
          </>
        )}
        {status === "success" && (
          <div className="success-card" style={{ display: "flex", flexDirection: "column", gap: 19 }}>
            <span className="success-icon" style={{ alignSelf: "center" }}>
              <Icon name="check" size={26} />
            </span>
            <AuthHeader title="Email verified successfully" text="Your account is ready. You can sign in now." />
            <Button full onClick={() => router.push("/login?verified=1")}>
              Go to Login
            </Button>
          </div>
        )}
        {(status === "error" || status === "idle") && (
          <>
            <AuthHeader
              title={token ? "Invalid verification link" : "Verify your email"}
              text={
                token
                  ? "This link may have expired. Enter your email to receive a new one."
                  : "Enter the email you registered with to resend the verification link."
              }
            />
            {message && (
              <Alert variant={resendState === "sent" || message.includes("sent") ? "success" : "error"}>
                {message}
              </Alert>
            )}
            <form onSubmit={(event) => void resend(event)} className="auth-card" style={{ padding: 0, maxWidth: "none" }}>
              <Input
                label="Email address"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={setEmail}
                autoComplete="email"
                required
              />
              <Button type="submit" full disabled={resendState === "sending" || resendState === "sent"}>
                {resendState === "sending"
                  ? "Sending verification email…"
                  : resendState === "sent"
                    ? "Verification email sent"
                    : "Resend verification"}
              </Button>
            </form>
            <Button variant="ghost" full type="button" onClick={() => router.push("/login")}>
              Back to sign in
            </Button>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
