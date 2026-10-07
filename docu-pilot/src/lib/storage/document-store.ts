import type { WorkspaceDocument } from "@/src/types/document";

const PREFIX = "docupilot.documents.";

function keyForUser(userId: string): string {
  return `${PREFIX}${userId}`;
}

export function loadDocuments(userId: string): WorkspaceDocument[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(keyForUser(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as WorkspaceDocument[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveDocuments(userId: string, documents: WorkspaceDocument[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(keyForUser(userId), JSON.stringify(documents));
}
