"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { saveKey, apiFetch } from "../_lib/api";
import type { Developer } from "../_lib/types";

export default function DashboardLoginPage() {
  const router = useRouter();
  const [secretKey, setSecretKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!secretKey.startsWith("clink_sk_")) {
      setError("Secret key must start with clink_sk_");
      return;
    }
    setIsSubmitting(true);
    setError("");
    try {
      saveKey(secretKey);
      await apiFetch<Developer>("/me");
      router.replace("/dashboard");
    } catch {
      setError("Invalid secret key. Check it and try again.");
      import("../_lib/api").then(({ clearKey }) => clearKey());
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <a href="https://tryclink.com" className="text-sm font-medium tracking-[-0.03em] text-primary/60 transition hover:text-primary">
            Clink
          </a>
          <h1 className="mt-4 text-2xl font-medium tracking-[-0.04em] text-primary">
            Sign in to dashboard
          </h1>
          <p className="mt-2 text-sm text-primary/50">
            Enter your secret key to access your payments.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-white px-6 py-8 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="key" className="text-sm font-medium tracking-[-0.01em] text-primary">
                Secret key
              </label>
              <input
                id="key"
                type="password"
                required
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="clink_sk_..."
                className="min-h-13 rounded-2xl border border-border bg-white/90 px-4 py-3 font-mono text-sm text-primary outline-none transition focus:border-primary/35"
              />
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 flex min-h-12 items-center justify-center rounded-full bg-primary px-8 py-3 text-[15px] tracking-[-0.01em] text-white transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Verifying..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-primary/50">
            Don&apos;t have an account?{" "}
            <a href="/dashboard/signup" className="font-medium text-primary underline underline-offset-4">
              Create one
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
