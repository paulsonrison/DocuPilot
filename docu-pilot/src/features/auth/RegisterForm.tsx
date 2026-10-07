"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "@/src/components/auth/AuthLayout";
import AuthHeader from "@/src/components/auth/AuthHeader";
import PasswordRules from "@/src/components/auth/PasswordRules";
import Button from "@/src/components/common/Button/Button";
import Input from "@/src/components/common/Input/Input";
import Alert from "@/src/components/common/Alert/Alert";
import Icon from "@/src/components/common/Icon/Icon";
import { authService } from "@/src/services/auth.service";
import { ApiError, fieldErrorMap } from "@/src/types/api";
import { validateRegister } from "@/src/validators/auth.validators";

export default function RegisterForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successEmail, setSuccessEmail] = useState("");
  const [resendState, setResendState] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const errors = validateRegister({ username, email, password, confirmPassword });
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      setError("");
      return;
    }
    setFieldErrors({});
    setError("");
    setLoading(true);
    try {
      await authService.register({
        username: username.trim(),
        email: email.trim(),
        password,
      });
      setSuccessEmail(email.trim());
    } catch (caught) {
      if (caught instanceof ApiError) {
        setFieldErrors(fieldErrorMap(caught));
        setError(caught.message);
      } else {
        setError("Unable to create your account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function resend() {
    setResendState("sending");
    try {
      await authService.resendVerification(successEmail);
      setResendState("sent");
    } catch (caught) {
      setResendState("idle");
      if (caught instanceof ApiError) setError(caught.message);
    }
  }

  if (successEmail) {
    return (
      <AuthLayout>
        <div className="auth-card success-card">
          <span className="success-icon">
            <Icon name="check" size={26} />
          </span>
          <AuthHeader
            title="Check your email"
            text={`We created your account. Verify ${successEmail} before signing in. The link expires in 24 hours.`}
          />
          {error && <Alert variant="error">{error}</Alert>}
          <Button
            full
            variant="secondary"
            disabled={resendState !== "idle"}
            onClick={() => void resend()}
          >
            {resendState === "sending"
              ? "Sending verification email…"
              : resendState === "sent"
                ? "Verification email sent"
                : "Resend verification email"}
          </Button>
          <Button full onClick={() => router.push("/login")}>
            Go to sign in
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <AuthHeader title="Create your account" text="Start analyzing your documents in minutes." />
        {error && (
          <Alert variant="error" title="Unable to create account">
            {error}
          </Alert>
        )}
        <Input
          label="Username"
          placeholder="paulanderson"
          value={username}
          onChange={setUsername}
          error={fieldErrors.username}
          autoComplete="username"
          required
        />
        <Input
          label="Work email"
          placeholder="paul@company.com"
          type="email"
          value={email}
          onChange={setEmail}
          error={fieldErrors.email}
          autoComplete="email"
          required
        />
        <Input
          label="Password"
          placeholder="Create a strong password"
          type="password"
          value={password}
          onChange={setPassword}
          error={fieldErrors.password}
          autoComplete="new-password"
          required
        />
        <PasswordRules password={password} />
        <Input
          label="Confirm password"
          placeholder="Repeat your password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={fieldErrors.confirmPassword}
          autoComplete="new-password"
          required
        />
        <Button type="submit" full disabled={loading}>
          {loading ? "Creating account…" : "Create account"}
        </Button>
        <p className="switch-auth">
          Already have an account?{" "}
          <Link href="/login" className="text-link">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
