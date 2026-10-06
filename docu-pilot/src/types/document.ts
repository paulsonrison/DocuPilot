export type DocumentStatus = "Queued" | "Analyzed" | "Failed";

export type WorkspaceDocument = {
  id: string;
  name: string;
  type: string;
  sizeLabel: string;
  sizeBytes: number;
  uploadedAt: string;
  status: DocumentStatus;
};

export type DocumentFilter = "All" | DocumentStatus;
