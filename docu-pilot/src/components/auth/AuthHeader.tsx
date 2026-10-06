"use client";

import Logo from "@/src/components/common/Logo/Logo";

export default function AuthHeader({ title, text }: { title: string; text: string }) {
  return (
    <div className="auth-header">
      <div className="mobile-logo">
        <Logo />
      </div>
      <div className="title">{title}</div>
      <p>{text}</p>
    </div>
  );
}
