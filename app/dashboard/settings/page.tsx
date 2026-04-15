"use client";

import { useEffect, useState } from "react";
import { apiFetch, getKey } from "../_lib/api";
import type { Developer } from "../_lib/types";

export default function SettingsPage() {
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    apiFetch<Developer>("/me").then(setDeveloper).finally(() => setLoading(false));
  }, []);

  async function handleCopy() {
    const key = getKey();
    if (!key) return;
    await navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) return <div className="h-48 animate-pulse rounded-2xl bg-surface-strong" />;

  const maskedKey = "clink_sk_" + "•".repeat(24);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.12em] text-primary/40">Dashboard</p>
        <h1 className="mt-1 text-2xl font-medium tracking-[-0.04em] text-primary">API Key</h1>
      </div>

      {developer && (
        <div className="rounded-2xl border border-border bg-white px-6 py-6">
          <h2 className="mb-4 text-sm font-medium text-primary">Account</h2>
          <dl className="space-y-3">
            {[
              { label: "Name", value: developer.name },
              { label: "Email", value: developer.email },
              ...(developer.company ? [{ label: "Company", value: developer.company }] : []),
              { label: "Member since", value: new Date(developer.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) },
            ].map((item) => (
              <div key={item.label}>
                <dt className="text-xs text-primary/45">{item.label}</dt>
                <dd className="mt-0.5 text-sm text-primary">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="rounded-2xl border border-border bg-white px-6 py-6">
        <h2 className="mb-1 text-sm font-medium text-primary">Secret key</h2>
        <p className="mb-4 text-xs text-primary/45">
          Use this key to authenticate API requests. Keep it secret — never expose it in client-side code.
        </p>

        <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
          <p className="min-w-0 flex-1 truncate font-mono text-sm text-primary">
            {revealed ? getKey() : maskedKey}
          </p>
          <div className="ml-3 flex shrink-0 gap-2">
            <button
              onClick={() => setRevealed((r) => !r)}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-primary/60 transition hover:bg-surface-strong hover:text-primary"
            >
              {revealed ? "Hide" : "Reveal"}
            </button>
            <button
              onClick={handleCopy}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-primary/60 transition hover:bg-surface-strong hover:text-primary"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-xs text-amber-800">
            <span className="font-medium">Security reminder:</span> This key grants full access to your Clink account. If it&apos;s ever compromised, contact Clink support immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
