"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/src/components/layout/PageHeader";
import ProfileTabs from "@/src/components/layout/ProfileTabs";
import Input from "@/src/components/common/Input/Input";
import Button from "@/src/components/common/Button/Button";
import Alert from "@/src/components/common/Alert/Alert";
import Avatar from "@/src/components/common/Avatar/Avatar";
import Icon from "@/src/components/common/Icon/Icon";
import ErrorState from "@/src/components/feedback/ErrorState";
import { useAuth } from "@/src/app/providers/AuthProvider";
import { useDocuments } from "@/src/app/providers/DocumentsProvider";
import { profileService } from "@/src/services/profile.service";
import { ApiError, fieldErrorMap } from "@/src/types/api";
import { displayName, formatDateTime, userInitials } from "@/src/lib/utils/user";
import { validateProfile } from "@/src/validators/auth.validators";
import type { ProfileUser } from "@/src/types/auth";

export default function ProfileForm() {
  const { user, refreshProfile } = useAuth();
  const { documents } = useDocuments();
  const [profile, setProfile] = useState<ProfileUser | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function load() {
    setLoading(true);
    setError("");
    try {
      const response = await profileService.get();
      setProfile(response.user);
      setUsername(response.user.username);
      setEmail(response.user.email);
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "Unable to load profile");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const errors = validateProfile(username, email);
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setSaving(true);
    setSuccess("");
    setError("");
    try {
      const payload: { username?: string; email?: string } = {};
      if (username.trim() !== profile?.username) payload.username = username.trim();
      if (email.trim() !== profile?.email) payload.email = email.trim();
      if (!Object.keys(payload).length) {
        setError("At least one field must be provided");
        setSaving(false);
        return;
      }
      const response = await profileService.update(payload);
      setProfile(response.user);
      setUsername(response.user.username);
      setEmail(response.user.email);
      await refreshProfile();
      setSuccess(response.message || "Profile updated successfully");
      if (payload.email) {
        setSuccess(
          "Profile updated. If you changed your email, verify the new address before signing in again.",
        );
      }
    } catch (caught) {
      if (caught instanceof ApiError) {
        setFieldErrors(fieldErrorMap(caught));
        setError(caught.message);
      } else {
        setError("Unable to save profile.");
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <>
        <PageHeader title="Profile" description="Manage your personal information and account details." />
        <ProfileTabs />
        <div className="settings-stack">
          <div className="settings-card">
            <p role="status" aria-live="polite" style={{ color: "var(--text-light)", fontSize: "var(--font-size-small)" }}>
              Loading profile…
            </p>
          </div>
        </div>
      </>
    );
  }

  if (error && !profile) {
    return (
      <ErrorState
        title="Unable to load profile"
        text={error}
        onAction={() => void load()}
      />
    );
  }

  return (
    <>
      <PageHeader title="Profile" description="Manage your personal information and account details." />
      <ProfileTabs />
      <div className="settings-stack">
        <form className="settings-card" onSubmit={(event) => void handleSubmit(event)} noValidate>
          <div className="settings-head">
            <div>
              <div className="section-title">Personal information</div>
              <p>Update your username and contact details.</p>
            </div>
            <Avatar className="profile-avatar" size="lg" initials={userInitials(username || displayName(user))} />
          </div>
          {error && <Alert variant="error">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <div className="form-grid" style={{ marginTop: 16 }}>
            <Input
              label="Username"
              value={username}
              onChange={setUsername}
              error={fieldErrors.username}
              autoComplete="username"
              required
            />
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={setEmail}
              error={fieldErrors.email}
              autoComplete="email"
              required
            />
          </div>
          <div className="form-note">
            <Icon name="lock" size={14} />
            Changing your email requires verification before the next sign in.
          </div>
          <div className="settings-actions">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving profile…" : "Save changes"}
            </Button>
          </div>
        </form>
        <section className="settings-card">
          <div className="section-title">Account overview</div>
          <div className="account-grid">
            <div>
              <span>Account created</span>
              <strong>{formatDateTime(profile?.createdAt)}</strong>
            </div>
            <div>
              <span>Documents</span>
              <strong>
                {documents.length} document{documents.length === 1 ? "" : "s"}
              </strong>
            </div>
            <div>
              <span>Last updated</span>
              <strong>{formatDateTime(profile?.updatedAt)}</strong>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
