"use client";

import type { ReactNode } from "react";
import Icon, { type IconName } from "../Icon/Icon";

/* ── Base Card ── */
export interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = "", padding = false, onClick }: CardProps) {
  return (
    <div
      className={`card${padding ? " settings-card" : ""}${className ? ` ${className}` : ""}`}
      onClick={onClick}
      style={onClick ? { cursor: "pointer" } : undefined}
    >
      {children}
    </div>
  );
}

/* ── Stat Card ── */
export type StatIconTone = "neutral" | "info" | "success" | "danger" | "primary" | "warning";

export interface StatCardProps {
  label: string;
  value: string | number;
  icon: IconName;
  tone?: StatIconTone;
  className?: string;
}

export function StatCard({ label, value, icon, tone = "neutral", className = "" }: StatCardProps) {
  return (
    <div className={`stat-card${className ? ` ${className}` : ""}`}>
      <div className={`stat-icon stat-icon-${tone}`}>
        <Icon name={icon} size={20} />
      </div>
      <span>
        <small>{label}</small>
        <strong>{value}</strong>
      </span>
    </div>
  );
}

/* ── Section Card ── */
export interface SectionCardProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function SectionCard({ title, description, actions, children, className = "" }: SectionCardProps) {
  return (
    <div className={`section-card${className ? ` ${className}` : ""}`}>
      <div className="section-heading">
        <div>
          <div className="section-title">{title}</div>
          {description && <p>{description}</p>}
        </div>
        {actions && <div>{actions}</div>}
      </div>
      {children}
    </div>
  );
}

/* ── Privacy Card (dark) ── */
export interface PrivacyCardProps {
  title: string;
  description?: string;
  icon?: IconName;
  items?: string[];
  footer?: string;
  className?: string;
}

export function PrivacyCard({ title, description, icon, items, footer, className = "" }: PrivacyCardProps) {
  return (
    <div className={`privacy-card${className ? ` ${className}` : ""}`}>
      {icon && (
        <div style={{
          width: 40, height: 40, borderRadius: 9,
          background: "var(--privacy-icon-bg)",
          color: "var(--privacy-icon-color)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name={icon} size={20} />
        </div>
      )}
      <div className="section-title">{title}</div>
      {description && <p>{description}</p>}
      {items && items.length > 0 && (
        <div>
          {items.map((item) => (
            <span key={item} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: "var(--font-size-xs)", color: "var(--privacy-item)" }}>
              <span style={{ color: "var(--privacy-check)", display: "flex" }}>
                <Icon name="check" size={14} />
              </span>
              {item}
            </span>
          ))}
        </div>
      )}
      {footer && <small>{footer}</small>}
    </div>
  );
}

/* ── Insight Card ── */
export interface InsightCardProps {
  kicker: string;
  title: string;
  description: string;
  highlight?: boolean;
  className?: string;
}

export function InsightCard({ kicker, title, description, highlight = false, className = "" }: InsightCardProps) {
  return (
    <div
      className={`insight-card${className ? ` ${className}` : ""}`}
      style={highlight ? { borderLeft: "3px solid var(--primary)" } : undefined}
    >
      <span style={{ fontSize: "var(--font-size-2xs)", color: "var(--primary)", fontWeight: 700, display: "block", marginBottom: 24 }}>
        {kicker}
      </span>
      <strong style={{ display: "block", fontSize: "var(--font-size-small)", marginBottom: 7 }}>{title}</strong>
      <p style={{ fontSize: "var(--font-size-xs)" }}>{description}</p>
    </div>
  );
}

export default Card;
