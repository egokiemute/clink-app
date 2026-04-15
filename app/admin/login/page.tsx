"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { saveAdminKey } from "../_lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.tryclink.com";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.message ?? "Invalid email or password.");
        return;
      }
      saveAdminKey(data.token);
      router.replace("/admin");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium tracking-[-0.03em] text-primary/60">Clink</p>
          <h1 className="mt-4 text-2xl font-medium tracking-[-0.04em] text-primary">Admin sign in</h1>
          <p className="mt-2 text-sm text-primary/50">Internal use only.</p>
        </div>

        <div className="rounded-2xl border border-border bg-white px-6 py-8 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium tracking-[-0.01em] text-primary">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="admin@tryclink.com"
                className="min-h-13 rounded-2xl border border-border bg-white/90 px-4 py-3 text-sm text-primary outline-none transition focus:border-primary/35"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium tracking-[-0.01em] text-primary">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                className="min-h-13 rounded-2xl border border-border bg-white/90 px-4 py-3 text-sm text-primary outline-none transition focus:border-primary/35"
              />
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 flex min-h-12 items-center justify-center rounded-full bg-primary px-8 py-3 text-[15px] tracking-[-0.01em] text-white transition disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
