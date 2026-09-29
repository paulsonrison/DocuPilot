"use client";

import { useState } from "react";
import Link from "next/link";
import AuthSidePanel from "../../components/auth/AuthSidePanel";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import Logo from "../../components/common/Logo/Logo";
import Icon from "../../components/common/Icon/Icon";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Enter a valid work email address.");
      return;
    }
    if (!password) {
      setError("Enter your password to continue.");
      return;
    }
    setError("");
    setLoading(true);
  }

  return (
    <main className="auth-layout">
      <AuthSidePanel />

      <section className="auth-panel">
        <form className="auth-card" onSubmit={handleSubmit} noValidate>

          <div style={{ marginBottom: 10 }}>
            <div style={{ display: "none" }} className="mobile-logo">
              <Logo />
            </div>
            <div className="title">Welcome back</div>
            <p style={{ marginTop: 9 }}>Sign in to continue to your secure workspace.</p>
          </div>

          {error && (
            <div
              style={{
                padding: "12px 14px",
                borderRadius: "var(--radius)",
                display: "flex",
                gap: 10,
                fontSize: 12,
                lineHeight: 1.4,
                color: "var(--danger)",
                background: "var(--danger-soft)",
                border: "1px solid #f4d3d5",
                alignItems: "flex-start",
              }}
            >
              <Icon name="alert" size={18} />
              <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <strong>Unable to sign in</strong>
                {error}
              </span>
            </div>
          )}

          <Input
            label="Email address"
            placeholder="you@company.com"
            type="email"
            value={email}
            onChange={setEmail}
            required
          />

          <div>
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={setPassword}
              required
            />
            <Link
              href="/forgot-password"
              className="text-link"
              style={{ float: "right", marginTop: 9, fontSize: "var(--font-size-small)" }}
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" full disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>

          <div className="divider">
            <span>New to DocuPilot?</span>
          </div>

          <Link href="/register" style={{ display: "contents" }}>
            <Button variant="secondary" full type="button">
              Create account
            </Button>
          </Link>

          <div
            style={{
              alignSelf: "center",
              display: "flex",
              gap: 6,
              color: "var(--text-light)",
              fontSize: 11,
              alignItems: "center",
            }}
          >
            <Icon name="lock" size={15} />
            Protected with enterprise-grade security
          </div>

        </form>
      </section>
    </main>
  );
}
