"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { documentService } from "@/src/services/document.service";
import { useAuth } from "@/src/app/providers/AuthProvider";
import type { WorkspaceDocument } from "@/src/types/document";

type DocumentsContextValue = {
  ready: boolean;
  documents: WorkspaceDocument[];
  addDocument: (file: File) => WorkspaceDocument;
  removeDocument: (id: string) => void;
  getDocument: (id: string) => WorkspaceDocument | undefined;
  getFile: (id: string) => File | undefined;
};

const DocumentsContext = createContext<DocumentsContextValue | undefined>(undefined);

export function DocumentsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const [documents, setDocuments] = useState<WorkspaceDocument[]>([]);
  const [ready, setReady] = useState(false);
  const filesRef = useRef<Map<string, File>>(new Map());

  useEffect(() => {
    if (!userId) {
      setDocuments([]);
      setReady(true);
      return;
    }
    setDocuments(documentService.list(userId));
    setReady(true);
  }, [userId]);

  const addDocument = useCallback(
    (file: File) => {
      if (!userId) throw new Error("You need to be signed in to save a document.");
      const created = documentService.add(userId, file);
      filesRef.current.set(created.id, file);
      setDocuments(documentService.list(userId));
      return created;
    },
    [userId],
  );

  const removeDocument = useCallback(
    (id: string) => {
      if (!userId) return;
      documentService.remove(userId, id);
      filesRef.current.delete(id);
      setDocuments(documentService.list(userId));
    },
    [userId],
  );

  const getDocument = useCallback(
    (id: string) => documents.find((doc) => doc.id === id),
    [documents],
  );

  const getFile = useCallback((id: string) => filesRef.current.get(id), []);

  const value = useMemo(
    () => ({ ready, documents, addDocument, removeDocument, getDocument, getFile }),
    [ready, documents, addDocument, removeDocument, getDocument, getFile],
  );

  return <DocumentsContext.Provider value={value}>{children}</DocumentsContext.Provider>;
}

export function useDocuments(): DocumentsContextValue {
  const context = useContext(DocumentsContext);
  if (!context) {
    throw new Error("useDocuments must be used within DocumentsProvider");
  }
  return context;
}
