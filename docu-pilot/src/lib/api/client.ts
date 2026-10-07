import { env } from "@/src/lib/env";
import { clearSession, readSession } from "@/src/lib/auth/token-store";
import { ApiError, type FieldError } from "@/src/types/api";

export type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  auth?: boolean;
  skipSessionClearOn401?: boolean;
};

function userMessageForStatus(status: number, fallback: string): string {
  switch (status) {
    case 400:
      return fallback || "Please check the information you entered.";
    case 401:
      return fallback || "Your session is no longer valid. Please sign in again.";
    case 403:
      return fallback || "You do not have permission to continue.";
    case 404:
      return fallback || "We could not find what you were looking for.";
    case 409:
      return fallback || "That information is already in use.";
    case 429:
      return fallback || "Too many requests. Please try again later.";
    case 500:
      return "Something went wrong on our side. Please try again.";
    default:
      return fallback || "Something went wrong. Please try again.";
  }
}

function parseErrorBody(data: unknown): { message: string; errors?: FieldError[]; fields?: string[] } {
  if (!data || typeof data !== "object") {
    return { message: "" };
  }

  const record = data as Record<string, unknown>;
  let message = "";

  if (typeof record.message === "string") {
    message = record.message;
  } else if (record.message && typeof record.message === "object") {
    const nested = record.message as Record<string, unknown>;
    if (typeof nested.message === "string") message = nested.message;
  }

  const errors = Array.isArray(record.errors)
    ? (record.errors as FieldError[]).filter((item) => item && typeof item.message === "string")
    : undefined;
  const fields = Array.isArray(record.fields)
    ? record.fields.filter((item): item is string => typeof item === "string")
    : undefined;

  return { message, errors, fields };
}

function shouldClearSession(status: number, message: string): boolean {
  if (status !== 401) return false;
  const normalized = message.toLowerCase();
  return (
    normalized.includes("authentication") ||
    normalized.includes("token") ||
    normalized.includes("expired") ||
    normalized === "unauthorized"
  );
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth = false, skipSessionClearOn401 = false } = options;
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (auth) {
    const session = readSession();
    if (!session?.accessToken) {
      throw new ApiError({
        status: 401,
        message: "Authentication required",
      });
    }
    headers.Authorization = `Bearer ${session.accessToken}`;
  }

  let response: Response;
  try {
    response = await fetch(`${env.apiUrl}/api${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError({
      status: 0,
      message: "Network unavailable. Check your connection and try again.",
    });
  }

  let data: unknown = null;
  const text = await response.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    const parsed = parseErrorBody(data);
    const message = userMessageForStatus(response.status, parsed.message);
    if (auth && !skipSessionClearOn401 && shouldClearSession(response.status, parsed.message || message)) {
      clearSession();
      if (typeof window !== "undefined") {
        window.location.assign("/login?reason=expired");
      }
    }
    throw new ApiError({
      status: response.status,
      message,
      errors: parsed.errors,
      fields: parsed.fields,
    });
  }

  return data as T;
}
