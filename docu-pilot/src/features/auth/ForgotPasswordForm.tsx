"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/src/components/auth/AuthLayout";
import AuthHeader from "@/src/components/auth/AuthHeader";
import Button from "@/src/components/common/Button/Button";
import Input from "@/src/components/common/Input/Input";
import Alert from "@/src/components/common/Alert/Alert";
import Icon from "@/src/components/common/Icon/Icon";
import { authService } from "@/src/services/auth.service";
import { ApiError } from "@/src/types/api";
import { validateEmailOnly } from "@/src/validators/auth.validators";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const validation = validateEmailOnly(email);
    if (validation) {
      setError(validation);
      return;
    }
    setError("");
    setLoading(true);
    try {
      await authService.forgotPassword(email.trim());
      setSent(true);
    } catch (caught) {
      if (caught instanceof ApiError) setError(caught.message);
      else setError("Unable to send a reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <AuthLayout>
        <div className="auth-card success-card">
          <span className="success-icon">
            <Icon name="check" size={26} />
          </span>
          <AuthHeader
            title="Check your email"
            text="If an account exists for this email, a password reset link has been sent. It expires in 1 hour."
          />
          <Button full onClick={() => router.push("/login")}>
            Return to sign in
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <AuthHeader
          title="Forgot your password?"
          text="Enter your email and we'll send you a secure password reset link."
        />
        {error && <Alert variant="error">{error}</Alert>}
        <Input
          label="Email address"
          placeholder="you@company.com"
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          required
        />
        <Button type="submit" full disabled={loading}>
          {loading ? "Sending reset link…" : "Send reset link"}
        </Button>
        <Button variant="ghost" full type="button" onClick={() => router.push("/login")}>
          Back to sign in
        </Button>
      </form>
    </AuthLayout>
  );
}
