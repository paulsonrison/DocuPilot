"use client";

import { useState } from "react";
import Link from "next/link";
import AuthSidePanel from "../../components/auth/AuthSidePanel";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import Logo from "../../components/common/Logo/Logo";
import Icon from "../../components/common/Icon/Icon";

function PasswordRules({ password }: { password: string }) {
  const rules: [string, boolean][] = [
    ["At least 8 characters", password.length >= 8],
    ["Upper and lowercase letters", /[A-Z]/.test(password) && /[a-z]/.test(password)],
    ["At least one number", /\d/.test(password)],
    ["At least one special character", /[^A-Za-z0-9]/.test(password)],
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8,
        marginTop: -6,
      }}
    >
      {rules.map(([label, met]) => (
        <span
          key={label}
          style={{
            display: "flex",
            gap: 7,
            alignItems: "center",
            color: met ? "var(--success)" : "var(--text-light)",
            fontSize: 11,
          }}
        >
          <span
            style={{
              width: 16,
              height: 16,
              border: `1px solid ${met ? "var(--success)" : "var(--border-strong)"}`,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: met ? "var(--success-soft)" : "transparent",
              flexShrink: 0,
            }}
          >
            <Icon name="check" size={10} />
          </span>
          {label}
        </span>
      ))}
    </div>
  );
}

export default function RegisterPage() {
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
            <div className="title">Create your account</div>
            <p style={{ marginTop: 9 }}>Start analyzing your documents in minutes.</p>
          </div>

          <Input
            label="Full name"
            placeholder="Paul Anderson"
            required
          />

          <Input
            label="Work email"
            placeholder="paul@company.com"
            type="email"
            required
          />

          <Input
            label="Password"
            placeholder="Create a strong password"
            type="password"
            value={password}
            onChange={setPassword}
            required
          />

          <PasswordRules password={password} />

          <Input
            label="Confirm password"
            placeholder="Repeat your password"
            type="password"
            required
          />

          <Button type="submit" full>
            Create account
          </Button>

          <p
            style={{
              textAlign: "center",
              fontSize: 13,
              color: "var(--text-secondary)",
              margin: 0,
            }}
          >
            Already have an account?{" "}
            <Link href="/login" className="text-link">
              Sign in
            </Link>
          </p>

        </form>
      </section>
    </main>
  );
}
