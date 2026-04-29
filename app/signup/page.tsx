"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type Step = "form" | "pending";

const BUSINESS_TYPES = [
  { value: "individual", label: "Individual / Sole Trader" },
  { value: "llc", label: "LLC" },
  { value: "corporation", label: "Corporation" },
  { value: "partnership", label: "Partnership" },
  { value: "ngo", label: "NGO / Non-Profit" },
  { value: "other", label: "Other" },
];

export default function SignupPage() {
  const [step, setStep] = useState<Step>("form");
  const [submittedEmail, setSubmittedEmail] = useState("");
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
      setSubmittedEmail(form.email);
      setStep("pending");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (step === "pending") {
    return (
      <main className="relative mx-auto flex w-full max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-10">
        <section className="relative z-10 mx-auto w-full max-w-3xl rounded-[0.4rem] border border-border bg-tertiary/90 p-8 backdrop-blur sm:p-10 lg:p-12">
          <div className="flex flex-col items-center gap-6 text-center py-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/60 text-3xl shadow-sm">
              ⏳
            </div>
            <div>
              <h1 className="text-2xl tracking-[-0.05em] text-black md:text-4xl">
                Application received.
              </h1>
              <p className="mt-3 text-base leading-7 text-black/78">
                We&apos;ll email <span className="font-medium text-black">{submittedEmail}</span> once your account is reviewed. This usually takes 1–2 business days.
              </p>
            </div>
            <p className="max-w-sm rounded-[0.4rem] border border-border bg-white/60 px-5 py-4 text-sm text-black/70 text-left">
              After approval you&apos;ll receive your secret API key by email. Use it to sign in to your merchant dashboard and start accepting stablecoin payments.
            </p>
          </div>

          <div className="mt-8 flex flex-row items-center justify-center gap-3 border-t border-border pt-6">
            <Link href="/" className="text-center text-[16px] tracking-[-0.01em] text-primary">
              Back home
            </Link>
            <span>|</span>
            <Link href="/documentation" className="text-center text-[16px] tracking-[-0.01em] text-secondary">
              View docs
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="relative mx-auto flex w-full max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-10">
      <section className="relative z-10 mx-auto w-full max-w-3xl rounded-[0.4rem] border border-border bg-tertiary/90 p-8 backdrop-blur sm:p-10 lg:p-12">
        <div className="flex flex-col gap-3">
          <h1 className="max-w-2xl text-2xl tracking-[-0.05em] text-black md:text-4xl sm:text-5xl lg:text-6xl">
            Apply for access.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-black/78 sm:text-lg">
            Tell us about your business and we&apos;ll review your application within 1–2 business days.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium tracking-[-0.01em] text-black">
                Full name
              </label>
              <input
                id="name" type="text" required autoComplete="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="John Doe"
                className="min-h-13 rounded-2xl border border-border bg-white/90 px-4 py-3 text-base text-black outline-none transition focus:border-brand/50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium tracking-[-0.01em] text-black">
                Email
              </label>
              <input
                id="email" type="email" required autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="john@acme.com"
                className="min-h-13 rounded-2xl border border-border bg-white/90 px-4 py-3 text-base text-black outline-none transition focus:border-brand/50"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="businessName" className="text-sm font-medium tracking-[-0.01em] text-black">
                Business name
              </label>
              <input
                id="businessName" type="text" required
                value={form.businessName}
                onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
                placeholder="Acme Inc"
                className="min-h-13 rounded-2xl border border-border bg-white/90 px-4 py-3 text-base text-black outline-none transition focus:border-brand/50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="businessType" className="text-sm font-medium tracking-[-0.01em] text-black">
                Business type
              </label>
              <select
                id="businessType" required
                value={form.businessType}
                onChange={(e) => setForm((f) => ({ ...f, businessType: e.target.value }))}
                className="min-h-13 rounded-2xl border border-border bg-white/90 px-4 py-3 text-base text-black outline-none transition focus:border-brand/50"
              >
                <option value="">Select type…</option>
                {BUSINESS_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="country" className="text-sm font-medium tracking-[-0.01em] text-black">
                Country
              </label>
              <input
                id="country" type="text" required
                value={form.country}
                onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                placeholder="Nigeria"
                className="min-h-13 rounded-2xl border border-border bg-white/90 px-4 py-3 text-base text-black outline-none transition focus:border-brand/50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="company" className="text-sm font-medium tracking-[-0.01em] text-black">
                Website <span className="font-normal text-black/40">(optional)</span>
              </label>
              <input
                id="company" type="text"
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                placeholder="https://acme.com"
                className="min-h-13 rounded-2xl border border-border bg-white/90 px-4 py-3 text-base text-black outline-none transition focus:border-brand/50"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex min-h-12 items-center justify-center rounded-full bg-brand px-8 py-3 text-center text-[16px] tracking-[-0.01em] text-white transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting application..." : "Submit application"}
          </button>
        </form>

        <div className="mt-8 flex flex-row items-center justify-center gap-3 border-t border-border pt-6">
          <Link href="/" className="text-center text-[16px] tracking-[-0.01em] text-primary">
            Back home
          </Link>
          <span>|</span>
          <Link href="/dashboard/login" className="text-center text-[16px] tracking-[-0.01em] text-secondary">
            Sign in
          </Link>
        </div>
      </section>
    </main>
  );
}
