"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "../_lib/api";
import type { Payment, PaymentStatus } from "../_lib/types";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  settled: "bg-green-100 text-green-700",
  expired: "bg-surface-strong text-primary/50",
  failed: "bg-red-100 text-red-700",
};

const FILTERS: { label: string; value: PaymentStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Settled", value: "settled" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Expired", value: "expired" },
  { label: "Failed", value: "failed" },
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filter, setFilter] = useState<PaymentStatus | "all">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const query = filter !== "all" ? `?status=${filter}` : "";
    apiFetch<Payment[]>(`/payments${query}`)
      .then(setPayments)
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.12em] text-primary/40">Dashboard</p>
        <h1 className="mt-1 text-2xl font-medium tracking-[-0.04em] text-primary">Payments</h1>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              filter === f.value
                ? "bg-brand text-white"
                : "border border-border bg-white text-primary/60 hover:text-primary"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-2 animate-pulse">
          {[1,2,3,4,5].map((i) => <div key={i} className="h-16 rounded-2xl bg-surface-strong" />)}
        </div>
      ) : payments.length === 0 ? (
        <div className="rounded-2xl border border-border bg-white px-6 py-12 text-center">
          <p className="text-sm text-primary/40">No payments found.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          {/* Table header */}
          <div className="hidden grid-cols-[1fr_auto_auto_auto] gap-4 border-b border-border px-5 py-3 sm:grid">
            {["Description / ID", "Amount", "Date", "Status"].map((h) => (
              <p key={h} className="text-xs font-medium text-primary/40">{h}</p>
            ))}
          </div>
          {payments.map((p, i) => (
            <a
              key={p.id}
              href={`/dashboard/payments/${p.id}`}
              className={`flex items-center justify-between px-5 py-4 transition hover:bg-surface sm:grid sm:grid-cols-[1fr_auto_auto_auto] sm:gap-4 ${i !== 0 ? "border-t border-border" : ""}`}
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-primary">{p.description ?? "—"}</p>
                <p className="mt-0.5 font-mono text-xs text-primary/40">{p.id}</p>
              </div>
              <p className="ml-4 text-sm font-medium text-primary sm:ml-0">{p.amount} USDC</p>
              <p className="hidden text-xs text-primary/45 sm:block">
                {new Date(p.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </p>
              <span className={`ml-3 rounded-full px-2.5 py-0.5 text-xs font-medium sm:ml-0 ${STATUS_COLORS[p.status]}`}>
                {p.status}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
