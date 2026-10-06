import { allChecksPassed, validateDocumentFile, type FileValidation } from "@/src/services/document.service";

export function documentUploadError(file: File | null): string | null {
  if (!file) return "Choose a document to upload.";
  const checks = validateDocumentFile(file);
  if (!checks.supportedType) return "Use a PDF, DOCX, or TXT file.";
  if (!checks.withinSize) return "The file must be 10 MB or smaller.";
  if (!checks.safeFilename) return "Choose a file with a safer name.";
  if (!checks.integrity) return "This file looks empty or unreadable.";
  return null;
}

export function uploadChecks(file: File | null): FileValidation | null {
  if (!file) return null;
  return validateDocumentFile(file);
}

export function canSaveDocument(file: File | null): boolean {
  if (!file) return false;
  return allChecksPassed(validateDocumentFile(file));
}
