"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { clearSession, readSession, writeSession } from "@/src/lib/auth/token-store";
import { profileService } from "@/src/services/profile.service";
import type { AuthUser, ProfileUser } from "@/src/types/auth";

type AuthContextValue = {
  ready: boolean;
  user: AuthUser | ProfileUser | null;
  isAuthenticated: boolean;
  setSession: (accessToken: string, user: AuthUser) => void;
  refreshProfile: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<AuthUser | ProfileUser | null>(null);

  const hydrate = useCallback(async () => {
    const session = readSession();
    if (!session) {
      setUser(null);
      setReady(true);
      return;
    }
    setUser(session.user);
    setReady(true);
    try {
      const response = await profileService.get();
      setUser(response.user);
      writeSession({ accessToken: session.accessToken, user: response.user });
    } catch {
      if (!readSession()) {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  const setSession = useCallback((accessToken: string, nextUser: AuthUser) => {
    writeSession({ accessToken, user: nextUser });
    setUser(nextUser);
  }, []);

  const refreshProfile = useCallback(async () => {
    const response = await profileService.get();
    const session = readSession();
    if (session) {
      writeSession({ accessToken: session.accessToken, user: response.user });
    }
    setUser(response.user);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ready,
      user,
      isAuthenticated: Boolean(user),
      setSession,
      refreshProfile,
      logout,
    }),
    [ready, user, setSession, refreshProfile, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
