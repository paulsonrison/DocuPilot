const TOKEN_KEY = "docupilot.session";

export type StoredSession = {
  accessToken: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
};

function canUseSessionStorage(): boolean {
  return typeof window !== "undefined";
}

export function readSession(): StoredSession | null {
  if (!canUseSessionStorage()) return null;
  try {
    const raw = window.sessionStorage.getItem(TOKEN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredSession;
    if (!parsed?.accessToken || !parsed?.user?.id) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeSession(session: StoredSession): void {
  if (!canUseSessionStorage()) return;
  window.sessionStorage.setItem(TOKEN_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  if (!canUseSessionStorage()) return;
  window.sessionStorage.removeItem(TOKEN_KEY);
}
