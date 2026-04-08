"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  company: string;
};

export default function StartForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/developer-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company || undefined,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setErrorMessage(
          data?.message ?? "Something went wrong. Please try again."
        );
        return;
      }

      setSuccessMessage("Check your inbox — your API key is on the way.");
      setForm({
        name: "",
        email: "",
        company: "",
      });
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="text-sm font-medium tracking-[-0.01em] text-primary"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={(event) =>
            setForm((current) => ({ ...current, name: event.target.value }))
          }
          className="min-h-13 rounded-2xl border border-border bg-white/90 px-4 py-3 text-base text-primary outline-none transition focus:border-primary/35"
          placeholder="John Doe"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-sm font-medium tracking-[-0.01em] text-primary"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={(event) =>
            setForm((current) => ({ ...current, email: event.target.value }))
          }
          className="min-h-13 rounded-2xl border border-border bg-white/90 px-4 py-3 text-base text-primary outline-none transition focus:border-primary/35"
          placeholder="john@acme.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="company"
          className="text-sm font-medium tracking-[-0.01em] text-primary"
        >
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          value={form.company}
          onChange={(event) =>
            setForm((current) => ({ ...current, company: event.target.value }))
          }
          className="min-h-13 rounded-2xl border border-border bg-white/90 px-4 py-3 text-base text-primary outline-none transition focus:border-primary/35"
          placeholder="Acme Inc"
        />
      </div>

      {successMessage ? (
        <p className="rounded-2xl bg-secondary px-4 py-3 text-sm text-primary">
          {successMessage}
        </p>
      ) : null}

      {errorMessage ? (
        <p className="rounded-2xl bg-primary px-4 py-3 text-sm text-white">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 flex min-h-12 items-center justify-center rounded-full bg-primary px-8 py-3 text-center text-[16px] tracking-[-0.01em] text-tertiary transition disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Get API key"}
      </button>
    </form>
  );
}

