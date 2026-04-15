"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.tryclink.com";

export function getAdminKey(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("clink_admin_key");
}

export function saveAdminKey(key: string): void {
  localStorage.setItem("clink_admin_key", key);
}

export function clearAdminKey(): void {
  localStorage.removeItem("clink_admin_key");
}

export async function adminFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const key = getAdminKey();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(key ? { Authorization: `Bearer ${key}` } : {}),
      ...options?.headers,
    },
  });

  const data = await res.json().catch(() => ({ message: "Request failed" }));
  if (!res.ok) throw new Error(data?.message ?? "Request failed");
  return data as T;
}
