"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AuthLayout from "@/src/components/auth/AuthLayout";
import AuthHeader from "@/src/components/auth/AuthHeader";
import Button from "@/src/components/common/Button/Button";
import Input from "@/src/components/common/Input/Input";
import Icon from "@/src/components/common/Icon/Icon";
import Alert from "@/src/components/common/Alert/Alert";
import { useAuth } from "@/src/app/providers/AuthProvider";
import { authService } from "@/src/services/auth.service";
import { ApiError, fieldErrorMap } from "@/src/types/api";
import { validateLogin, isValidEmail } from "@/src/validators/auth.validators";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSession } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [unverified, setUnverified] = useState(false);
  const [resendState, setResendState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const expired = searchParams.get("reason") === "expired";
  const verified = searchParams.get("verified") === "1";

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const validation = validateLogin(email, password);
    if (validation) {
      setError(validation);
      setUnverified(false);
      return;
    }
    setError("");
    setFieldErrors({});
    setUnverified(false);
    setLoading(true);
    try {
      const result = await authService.login({ email: email.trim(), password });
      setSession(result.accessToken, result.user);
      router.replace("/dashboard");
    } catch (caught) {
      if (caught instanceof ApiError) {
        setFieldErrors(fieldErrorMap(caught));
        if (caught.status === 403) {
          setUnverified(true);
        }
        setError(caught.message);
      } else {
        setError("Unable to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function resend() {
    if (!isValidEmail(email)) {
      setError("Enter the email address for your account to resend verification.");
      return;
    }
    setResendState("sending");
    try {
      await authService.resendVerification(email.trim());
      setResendState("sent");
    } catch (caught) {
      setResendState("error");
      if (caught instanceof ApiError) {
        setError(caught.message);
      }
    }
  }

  return (
    <AuthLayout>
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <AuthHeader title="Welcome back" text="Sign in to continue to your secure workspace." />
        {expired && (
          <Alert variant="warning" title="Session expired">
            Your session ended. Please sign in again.
          </Alert>
        )}
        {verified && (
          <Alert variant="success" title="Email verified">
            Your email is verified. You can sign in now.
          </Alert>
        )}
        {error && (
          <Alert variant="error" title="Unable to sign in">
            {error}
          </Alert>
        )}
        {unverified && (
          <div>
            <Button
              type="button"
              variant="secondary"
              full
              disabled={resendState === "sending" || resendState === "sent"}
              onClick={() => void resend()}
            >
              {resendState === "sending"
                ? "Sending verification email…"
                : resendState === "sent"
                  ? "Verification email sent"
                  : "Resend verification email"}
            </Button>
          </div>
        )}
        <Input
          label="Email address"
          placeholder="you@company.com"
          type="email"
          value={email}
          onChange={setEmail}
          error={fieldErrors.email}
          autoComplete="email"
          required
        />
        <div>
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={setPassword}
            error={fieldErrors.password}
            autoComplete="current-password"
            required
          />
          <Link href="/forgot-password" className="text-link forgot">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" full disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
        <div className="divider">
          <span>New to DocuPilot?</span>
        </div>
        <Button variant="secondary" full type="button" onClick={() => router.push("/register")}>
          Create account
        </Button>
        <div className="auth-security">
          <Icon name="lock" size={15} />
          Protected with enterprise-grade security
        </div>
      </form>
    </AuthLayout>
  );
}
