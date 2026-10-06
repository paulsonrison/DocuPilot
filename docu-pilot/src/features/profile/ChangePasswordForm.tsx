"use client";

import { useState } from "react";
import PageHeader from "@/src/components/layout/PageHeader";
import ProfileTabs from "@/src/components/layout/ProfileTabs";
import Input from "@/src/components/common/Input/Input";
import Button from "@/src/components/common/Button/Button";
import Alert from "@/src/components/common/Alert/Alert";
import Icon from "@/src/components/common/Icon/Icon";
import PasswordRules from "@/src/components/auth/PasswordRules";
import Badge from "@/src/components/common/Badge/Badge";
import { profileService } from "@/src/services/profile.service";
import { ApiError, fieldErrorMap } from "@/src/types/api";
import { validateChangePassword } from "@/src/validators/auth.validators";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const errors = validateChangePassword({ currentPassword, newPassword, confirmPassword });
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      setSuccess("");
      return;
    }
    setFieldErrors({});
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const response = await profileService.changePassword({ currentPassword, newPassword });
      setSuccess(response.message || "Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (caught) {
      if (caught instanceof ApiError) {
        setFieldErrors(fieldErrorMap(caught));
        setError(caught.message);
      } else {
        setError("Unable to change password.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Security"
        description="Manage your password, sessions, and account security."
      />
      <ProfileTabs />
      <div className="settings-stack">
        <form className="settings-card" onSubmit={(event) => void handleSubmit(event)} noValidate>
          <div className="section-title">Change password</div>
          <p className="settings-description">Use a unique password you don&apos;t use elsewhere.</p>
          {error && <Alert variant="error">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <div className="form-stack">
            <Input
              label="Current password"
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={setCurrentPassword}
              error={fieldErrors.currentPassword}
              autoComplete="current-password"
              required
            />
            <Input
              label="New password"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={setNewPassword}
              error={fieldErrors.newPassword}
              autoComplete="new-password"
              required
            />
            <PasswordRules password={newPassword} />
            <Input
              label="Confirm new password"
              type="password"
              placeholder="Repeat new password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              error={fieldErrors.confirmPassword}
              autoComplete="new-password"
              required
            />
          </div>
          <div className="settings-actions">
            <Button type="submit" disabled={loading}>
              {loading ? "Changing password…" : "Update password"}
            </Button>
          </div>
        </form>
        <section className="settings-card">
          <div className="section-heading">
            <div>
              <div className="section-title">Active sessions</div>
              <p>Devices currently signed in to your account.</p>
            </div>
          </div>
          <div className="session-row">
            <span className="device-icon">
              <Icon name="grid" size={20} />
            </span>
            <div>
              <strong>This browser</strong>
              <small>Session is stored until you sign out or close the tab.</small>
            </div>
            <Badge variant="success" icon="check">
              Active
            </Badge>
          </div>
          <div className="form-note">
            <Icon name="info" size={14} />
            The backend does not expose session management yet.
          </div>
        </section>
        <section className="settings-card">
          <div className="section-title">Account security</div>
          <div className="security-list">
            <div>
              <span className="indicator indicator-success">
                <Icon name="check" size={15} />
              </span>
              <span>
                <strong>Password requirements</strong>
                <small>New passwords must be at least 8 characters.</small>
              </span>
            </div>
            <div>
              <span className="indicator indicator-info">
                <Icon name="shield" size={15} />
              </span>
              <span>
                <strong>Your data is protected</strong>
                <small>Authenticated requests use your access token for this session only.</small>
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
