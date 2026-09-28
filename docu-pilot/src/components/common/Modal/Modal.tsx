"use client";

import type { ReactNode } from "react";
import Icon, { type IconName } from "../Icon/Icon";

export type ModalSize = "sm" | "md" | "lg";
export type ModalIconVariant = "primary" | "danger" | "success";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: ModalSize;
  icon?: IconName;
  iconVariant?: ModalIconVariant;
  children?: ReactNode;
  actions?: ReactNode;
}

const sizeClass: Record<ModalSize, string> = {
  sm: "modal modal-sm",
  md: "modal",
  lg: "modal modal-lg",
};

const iconVariantClass: Record<ModalIconVariant, string> = {
  primary: "modal-icon",
  danger:  "modal-icon modal-icon-danger",
  success: "modal-icon modal-icon-success",
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  size = "md",
  icon,
  iconVariant = "primary",
  children,
  actions,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className={sizeClass[size]}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {icon && (
          <div className={iconVariantClass[iconVariant]}>
            <Icon name={icon} size={20} />
          </div>
        )}

        <div id="modal-title" className="section-title">{title}</div>
        {description && <p>{description}</p>}

        {children && <div style={{ marginTop: 16 }}>{children}</div>}

        {actions && <div className="modal-actions">{actions}</div>}
      </div>
    </div>
  );
}
