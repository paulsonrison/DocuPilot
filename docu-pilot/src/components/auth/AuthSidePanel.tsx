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
} as const;

type PanelPath = keyof typeof config;

const defaultConfig = config["/login"];

export default function AuthSidePanel() {
  const pathname = usePathname();
  const { eyebrow, heading, description } =
    config[pathname as PanelPath] ?? defaultConfig;

  return (
    <section className="auth-story">
      <Logo light />

      {/* ── Copy block ── */}
      <div
        style={{
          maxWidth: 570,
          margin: "auto 0 38px",
          position: "relative",
        }}
      >
        <span
          className="eyebrow"
          style={{ color: "var(--auth-copy-eyebrow)", display: "block", marginBottom: 18 }}
        >
          {eyebrow}
        </span>
        <div className="display">{heading}</div>
        <p
          style={{
            color: "var(--auth-copy-p)",
            fontSize: 16,
            maxWidth: 530,
            marginTop: 22,
          }}
        >
          {description}
        </p>
      </div>

      {/* ── Decorative document → AI visual ── */}
      <div
        style={{
          height: 190,
          maxWidth: 570,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginBottom: "auto",
        }}
      >
        {/* File card */}
        <div
          style={{
            position: "relative",
            width: 170,
            height: 145,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "var(--radius-lg)",
            padding: 22,
            backdropFilter: "blur(5px)",
            transform: "rotate(-3deg)",
            color: "#a7bbff",
            display: "flex",
            flexDirection: "column",
            gap: 11,
          }}
        >
          <Icon name="file" size={28} />
          <span style={{ display: "block", height: 6, borderRadius: 4, background: "rgba(255,255,255,0.14)" }} />
          <span style={{ display: "block", height: 6, borderRadius: 4, background: "rgba(255,255,255,0.14)" }} />
          <span style={{ display: "block", height: 6, borderRadius: 4, background: "rgba(255,255,255,0.14)", width: "60%" }} />
        </div>

        {/* Connector */}
        <div
          style={{
            width: 90,
            color: "#adc0ff",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ flex: 1, height: 1, background: "var(--auth-connector-line)" }} />
          <span
            style={{
              background: "var(--auth-connector-icon-bg)",
              padding: 5,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="spark" size={20} />
          </span>
        </div>

        {/* Answer card */}
        <div
          style={{
            position: "relative",
            width: 195,
            height: 145,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "var(--radius-lg)",
            padding: 22,
            backdropFilter: "blur(5px)",
            transform: "rotate(2deg)",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            color: "white",
          }}
        >
          <span
            style={{
              color: "var(--auth-visual-mini-label)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            AI analysis
          </span>
          <strong style={{ fontSize: 13 }}>Key information found</strong>
          <span style={{ display: "block", height: 6, borderRadius: 4, background: "rgba(255,255,255,0.14)" }} />
          <span style={{ display: "block", height: 6, borderRadius: 4, background: "rgba(255,255,255,0.14)", width: "60%" }} />
        </div>
      </div>

      {/* ── Trust note ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: "#9eabba",
          fontSize: 12,
          marginTop: 44,
        }}
      >
        <Icon name="shield" size={17} />
        Your documents are private and securely processed.
      </div>
    </section>
  );
}
