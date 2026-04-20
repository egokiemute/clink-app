"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { saveKey } from "../_lib/api";

type Step = "form" | "key";

export default function DashboardSignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("form");
  const [secretKey, setSecretKey] = useState("");
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/developer-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company || undefined,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.message ?? "Something went wrong. Please try again.");
        return;
      }
      const key: string = data?.developer?.secretKey;
      saveKey(key);
      setSecretKey(key);
      setStep("key");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(secretKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (step === "key") {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <a href="https://tryclink.com" className="text-sm font-medium tracking-[-0.03em] text-primary/60 transition hover:text-primary">
              Clink
            </a>
            <h1 className="mt-4 text-2xl font-medium tracking-[-0.04em] text-primary">
              Your secret key
            </h1>
            <p className="mt-2 text-sm text-primary/50">
              Copy and store it safely. You will not see it again.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white px-6 py-8 shadow-sm">
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
              <span className="font-medium">Important:</span> This key authenticates all your API requests. Keep it secret and never expose it in client-side code.
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
              <p className="min-w-0 flex-1 truncate font-mono text-sm text-primary">{secretKey}</p>
              <button
                onClick={handleCopy}
                className="ml-3 shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium text-primary/60 transition hover:bg-surface-strong hover:text-primary"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <button
              onClick={() => router.replace("/dashboard")}
              className="mt-6 flex w-full min-h-12 items-center justify-center rounded-full bg-brand px-8 py-3 text-[15px] tracking-[-0.01em] text-white transition"
            >
              Go to dashboard
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <a href="https://tryclink.com" className="text-sm font-medium tracking-[-0.03em] text-primary/60 transition hover:text-primary">
            Clink
          </a>
          <h1 className="mt-4 text-2xl font-medium tracking-[-0.04em] text-primary">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-primary/50">
            Get your API key and start accepting payments.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-white px-6 py-8 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium tracking-[-0.01em] text-primary">Name</label>
              <input
                id="name" type="text" required autoComplete="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="John Doe"
                className="min-h-13 rounded-2xl border border-border bg-white/90 px-4 py-3 text-sm text-primary outline-none transition focus:border-brand/50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium tracking-[-0.01em] text-primary">Email</label>
              <input
                id="email" type="email" required autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="john@acme.com"
                className="min-h-13 rounded-2xl border border-border bg-white/90 px-4 py-3 text-sm text-primary outline-none transition focus:border-brand/50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="company" className="text-sm font-medium tracking-[-0.01em] text-primary">
                Company <span className="font-normal text-primary/40">(optional)</span>
              </label>
              <input
                id="company" type="text" autoComplete="organization"
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                placeholder="Acme Inc"
                className="min-h-13 rounded-2xl border border-border bg-white/90 px-4 py-3 text-sm text-primary outline-none transition focus:border-brand/50"
              />
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 flex min-h-12 items-center justify-center rounded-full bg-brand px-8 py-3 text-[15px] tracking-[-0.01em] text-white transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-primary/50">
            Already have an account?{" "}
            <a href="/dashboard/login" className="font-medium text-primary underline underline-offset-4">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
