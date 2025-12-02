// lib/adminApi.ts
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("admin_token");
  // Return null for empty strings or null values
  return token && token.trim() ? token : null;
}

export function setAdminToken(token: string) {
  if (typeof window === "undefined") return;
  if (!token || !token.trim()) {
    // Don't store empty tokens
    localStorage.removeItem("admin_token");
    return;
  }
  localStorage.setItem("admin_token", token);
}

export function clearAdminToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("admin_token");
}

/**
 * Fetch wrapper for admin API endpoints
 * - Automatically adds JWT token from localStorage
 * - Handles auth errors by clearing token and redirecting
 * - Logs errors for debugging
 */
export async function adminFetch(path: string, options: RequestInit = {}) {
  const token = getAdminToken();

  // Force headers to be a normal key-value object
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // Only add Authorization header if we have a valid token
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  } else {
    console.warn(
      `[adminFetch] No valid token found for ${path}. Request may fail with 401/422.`
    );
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  // Handle auth failures
  if (res.status === 401 || res.status === 403) {
    // Clear invalid token and redirect to login
    clearAdminToken();
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
    throw new Error("Session expired. Please log in again.");
  }

  // Log 422 errors for debugging
  if (res.status === 422) {
    const body = await res.clone().json().catch(() => ({}));
    console.error(
      `[adminFetch] 422 Unprocessable Entity on ${path}:`,
      body
    );
  }

  return res;
}
