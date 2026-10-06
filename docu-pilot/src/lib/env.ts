function publicApiUrl(): string {
  const value = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (value) return value.replace(/\/+$/, "");
  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:8000";
  }
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

export const env = {
  get apiUrl() {
    return publicApiUrl();
  },
};
