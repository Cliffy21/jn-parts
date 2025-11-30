// lib/adminApi.ts
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
}

export function setAdminToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("admin_token", token);
}

export function clearAdminToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("admin_token");
}

// 🚀 FIXED TYPE ERROR HERE:
export async function adminFetch(path: string, options: RequestInit = {}) {
  const token = getAdminToken();

  // Force headers to be a normal key-value object
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 401 || res.status === 403) {
    throw new Error("unauthorized");
  }

  return res;
}
