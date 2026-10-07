/**
 * Client-side document workspace.
 * There is no document API on the backend yet. This store keeps metadata
 * on the current device so the UI can be completed without inventing endpoints.
 */
import { loadDocuments, saveDocuments } from "@/src/lib/storage/document-store";
import type { WorkspaceDocument } from "@/src/types/document";

const ALLOWED_EXTENSIONS = [".pdf", ".docx", ".txt"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024;

export const documentLimits = {
  accept: ".pdf,.docx,.txt",
  maxSizeMB: 10,
  allowedExtensions: ALLOWED_EXTENSIONS,
};

export type FileValidation = {
  supportedType: boolean;
  withinSize: boolean;
  safeFilename: boolean;
  integrity: boolean;
};

export function fileExtension(name: string): string {
  const index = name.lastIndexOf(".");
  return index >= 0 ? name.slice(index).toLowerCase() : "";
}

export function fileTypeLabel(name: string, mime?: string): string {
  const ext = fileExtension(name);
  if (ext === ".pdf" || mime === "application/pdf") return "PDF";
  if (ext === ".docx") return "DOCX";
  if (ext === ".txt") return "TXT";
  return "Document";
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function isSafeFilename(name: string): boolean {
  return Boolean(name) && !/[\\/]/.test(name) && name.length <= 180;
}

export function validateDocumentFile(file: File): FileValidation {
  const ext = fileExtension(file.name);
  return {
    supportedType: ALLOWED_EXTENSIONS.includes(ext),
    withinSize: file.size > 0 && file.size <= MAX_SIZE_BYTES,
    safeFilename: isSafeFilename(file.name),
    integrity: file.size > 0,
  };
}

export function allChecksPassed(checks: FileValidation): boolean {
  return checks.supportedType && checks.withinSize && checks.safeFilename && checks.integrity;
}

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `doc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export const documentService = {
  list(userId: string): WorkspaceDocument[] {
    return loadDocuments(userId);
  },

  get(userId: string, id: string): WorkspaceDocument | undefined {
    return loadDocuments(userId).find((doc) => doc.id === id);
  },

  add(userId: string, file: File): WorkspaceDocument {
    const checks = validateDocumentFile(file);
    if (!allChecksPassed(checks)) {
      throw new Error("This file did not pass validation checks.");
    }

    const document: WorkspaceDocument = {
      id: createId(),
      name: file.name,
      type: fileTypeLabel(file.name, file.type),
      sizeLabel: formatFileSize(file.size),
      sizeBytes: file.size,
      uploadedAt: new Date().toISOString(),
      status: "Queued",
    };

    const next = [document, ...loadDocuments(userId)];
    saveDocuments(userId, next);
    return document;
  },

  remove(userId: string, id: string): void {
    saveDocuments(
      userId,
      loadDocuments(userId).filter((doc) => doc.id !== id),
    );
  },
};
