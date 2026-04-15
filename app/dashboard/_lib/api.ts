"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.tryclink.com";

export function getKey(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("clink_secret_key");
}

export function saveKey(key: string): void {
  localStorage.setItem("clink_secret_key", key);
}

export function clearKey(): void {
  localStorage.removeItem("clink_secret_key");
}

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const key = getKey();
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
