"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.tryclink.com";

export function DemoCompleteButton({ paymentId }: { paymentId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleComplete() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/dev/payments/${paymentId}/settle`, {
        method: "POST",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.message ?? "Failed to complete demo payment.");
      }
    } catch {
      setError("Could not reach the Clink API.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="rounded-xl border border-dashed border-primary/20 bg-surface px-4 py-3 text-center">
        <p className="text-xs text-primary/40 mb-3">
          Demo mode — no real USDC required
        </p>
        <button
          onClick={handleComplete}
          disabled={loading}
          className="w-full rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Processing..." : "Complete Demo Payment"}
        </button>
        {error && (
          <p className="mt-2 text-xs text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}
