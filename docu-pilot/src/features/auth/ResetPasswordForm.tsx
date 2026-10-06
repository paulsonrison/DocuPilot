"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthLayout from "@/src/components/auth/AuthLayout";
import AuthHeader from "@/src/components/auth/AuthHeader";
import PasswordRules from "@/src/components/auth/PasswordRules";
import Button from "@/src/components/common/Button/Button";
import Input from "@/src/components/common/Input/Input";
import Alert from "@/src/components/common/Alert/Alert";
import Icon from "@/src/components/common/Icon/Icon";
import { authService } from "@/src/services/auth.service";
import { ApiError, fieldErrorMap } from "@/src/types/api";
import { passwordStrengthLabel, validateResetPassword } from "@/src/validators/auth.validators";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const strength = passwordStrengthLabel(password);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!token) {
      setError("This reset link is missing a token. Request a new password reset email.");
      return;
    }
    const errors = validateResetPassword(password, confirmPassword);
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setError("");
    setLoading(true);
    try {
      await authService.resetPassword(token, password);
      setSuccess(true);
    } catch (caught) {
      if (caught instanceof ApiError) {
        setFieldErrors(fieldErrorMap(caught));
        setError(caught.message);
      } else {
        setError("Unable to reset your password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <AuthLayout>
        <div className="auth-card">
          <AuthHeader title="Invalid reset link" text="This password reset link is incomplete or expired." />
          <Alert variant="error" title="Expired reset link">
            Request a new reset email and try again.
          </Alert>
          <Button full onClick={() => router.push("/forgot-password")}>
            Request a new link
          </Button>
        </div>
      </AuthLayout>
    );
  }

  if (success) {
    return (
      <AuthLayout>
        <div className="auth-card success-card">
          <span className="success-icon">
            <Icon name="check" size={26} />
          </span>
          <AuthHeader title="Password updated" text="Your password has been updated successfully." />
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
          title="Set a new password"
          text="Choose a strong password you haven't used before."
        />
        {error && <Alert variant="error">{error}</Alert>}
        <Input
          label="New password"
          type="password"
          placeholder="Enter a new password"
          value={password}
          onChange={setPassword}
          error={fieldErrors.password}
          autoComplete="new-password"
          required
        />
        <div className="strength">
          <span>
            <i className={password.length > 0 ? "active" : ""} />
            <i className={password.length > 5 ? "active" : ""} />
            <i className={password.length > 7 ? "active" : ""} />
            <i className={strength === "Strong" ? "active" : ""} />
          </span>
          <small>{password.length > 7 ? strength : "Password strength"}</small>
        </div>
        <PasswordRules password={password} />
        <Input
          label="Confirm new password"
          type="password"
          placeholder="Repeat your new password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={fieldErrors.confirmPassword}
          autoComplete="new-password"
          required
        />
        <Button type="submit" full disabled={loading}>
          {loading ? "Resetting password…" : "Reset password"}
        </Button>
        <Button variant="ghost" full type="button" onClick={() => router.push("/login")}>
          Back to sign in
        </Button>
      </form>
    </AuthLayout>
  );
}
