"use client";

import { FormEvent, useState } from "react";

type Step = "form" | "pending";

const BUSINESS_TYPES = [
  { value: "individual", label: "Individual / Sole Trader" },
  { value: "llc", label: "LLC" },
  { value: "corporation", label: "Corporation" },
  { value: "partnership", label: "Partnership" },
  { value: "ngo", label: "NGO / Non-Profit" },
  { value: "other", label: "Other" },
];

export default function DashboardSignupPage() {
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    businessName: "",
    businessType: "",
    country: "",
  });
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
          businessName: form.businessName,
          businessType: form.businessType,
          country: form.country,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.message ?? "Something went wrong. Please try again.");
        return;
      }
      setStep("pending");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (step === "pending") {
    return (
      <main className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <a href="https://tryclink.com" className="text-sm font-medium tracking-[-0.03em] text-primary/60 transition hover:text-primary">
              Clink
            </a>
            <h1 className="mt-4 text-2xl font-medium tracking-[-0.04em] text-primary">
              Application received
            </h1>
            <p className="mt-2 text-sm text-primary/50">
              We&apos;re reviewing your business details.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white px-6 py-8 shadow-sm">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-2xl">
                ⏳
              </div>
              <div>
                <p className="text-sm font-medium text-primary">Pending review</p>
                <p className="mt-1.5 text-sm text-primary/50">
                  We&apos;ll email <span className="font-medium text-primary">{form.email}</span> once your account is approved. This usually takes 1–2 business days.
                </p>
              </div>
              <div className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-left text-xs text-primary/50">
                <p>After approval you&apos;ll receive your secret API key via email. Use it to sign in to your dashboard and start accepting stablecoin payments.</p>
              </div>
            </div>

            <a
              href="https://tryclink.com"
              className="mt-6 flex w-full min-h-12 items-center justify-center rounded-full border border-border px-8 py-3 text-[15px] tracking-[-0.01em] text-primary/70 transition hover:bg-surface"
            >
              Back to home
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <a href="https://tryclink.com" className="text-sm font-medium tracking-[-0.03em] text-primary/60 transition hover:text-primary">
            Clink
          </a>
          <h1 className="mt-4 text-2xl font-medium tracking-[-0.04em] text-primary">
            Apply for access
          </h1>
          <p className="mt-2 text-sm text-primary/50">
            Tell us about your business to get started.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-white px-6 py-8 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-xs font-medium uppercase tracking-widest text-primary/40">Personal</p>

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium tracking-[-0.01em] text-primary">Full name</label>
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

            <p className="mt-2 text-xs font-medium uppercase tracking-widest text-primary/40">Business</p>

            <div className="flex flex-col gap-2">
              <label htmlFor="businessName" className="text-sm font-medium tracking-[-0.01em] text-primary">Business name</label>
              <input
                id="businessName" type="text" required
                value={form.businessName}
                onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
                placeholder="Acme Inc"
                className="min-h-13 rounded-2xl border border-border bg-white/90 px-4 py-3 text-sm text-primary outline-none transition focus:border-brand/50"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="businessType" className="text-sm font-medium tracking-[-0.01em] text-primary">Business type</label>
              <select
                id="businessType" required
                value={form.businessType}
                onChange={(e) => setForm((f) => ({ ...f, businessType: e.target.value }))}
                className="min-h-13 rounded-2xl border border-border bg-white/90 px-4 py-3 text-sm text-primary outline-none transition focus:border-brand/50"
              >
                <option value="">Select type…</option>
                {BUSINESS_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="country" className="text-sm font-medium tracking-[-0.01em] text-primary">Country</label>
              <input
                id="country" type="text" required
                value={form.country}
                onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                placeholder="Nigeria"
                className="min-h-13 rounded-2xl border border-border bg-white/90 px-4 py-3 text-sm text-primary outline-none transition focus:border-brand/50"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="company" className="text-sm font-medium tracking-[-0.01em] text-primary">
                Website <span className="font-normal text-primary/40">(optional)</span>
              </label>
              <input
                id="company" type="text" autoComplete="organization"
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                placeholder="https://acme.com"
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
              {isSubmitting ? "Submitting application..." : "Submit application"}
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
