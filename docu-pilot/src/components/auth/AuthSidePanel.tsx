"use client";

import { usePathname } from "next/navigation";
import Logo from "../common/Logo/Logo";
import Icon from "../common/Icon/Icon";

const config = {
  "/login": {
    eyebrow: "Secure AI document workspace",
    heading: "Secure document intelligence, built for focused work.",
    description:
      "Upload, understand, and ask questions about your documents—with answers grounded in your content.",
  },
  "/register": {
    eyebrow: "Secure AI document workspace",
    heading: "Put every document to work, securely.",
    description:
      "Upload, understand, and ask questions about your documents—with answers grounded in your content.",
  },
  "/forgot-password": {
    eyebrow: "Account recovery",
    heading: "Reset access without exposing your account details.",
    description: "We'll send a reset link if an account exists for the email you enter.",
  },
  "/reset-password": {
    eyebrow: "Account recovery",
    heading: "Choose a strong password you haven't used before.",
    description: "Password resets expire quickly so unused links cannot be reused.",
  },
  "/verify-email": {
    eyebrow: "Secure AI document workspace",
    heading: "Verify your email to unlock your workspace.",
    description: "Email verification is required before you can sign in.",
  },
} as const;

type PanelPath = keyof typeof config;

export default function AuthSidePanel() {
  const pathname = usePathname();
  const { eyebrow, heading, description } =
    config[pathname as PanelPath] ?? config["/login"];

  return (
    <section className="auth-story">
      <Logo light />
      <div className="auth-copy">
        <span className="eyebrow">{eyebrow}</span>
        <div className="display">{heading}</div>
        <p>{description}</p>
      </div>
      <div className="document-visual">
        <div className="visual-file">
          <Icon name="file" size={28} />
          <span />
          <span />
          <span className="short" />
        </div>
        <div className="visual-connector">
          <span />
          <Icon name="spark" size={20} />
        </div>
        <div className="visual-answer">
          <span className="mini-label">AI analysis</span>
          <strong>Key information found</strong>
          <span className="answer-line" />
          <span className="answer-line short" />
        </div>
      </div>
      <div className="trust-note">
        <Icon name="shield" size={17} />
        Your documents are private and securely processed.
      </div>
    </section>
  );
}
